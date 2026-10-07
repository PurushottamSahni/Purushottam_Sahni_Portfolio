/* Tiny SQL-ish engine over content.js
   Supports:
     SELECT col1, col2 | * | count(*) FROM table
       [WHERE col = 'x' | col != 'x' | col > n | col < n | col LIKE '%x%']  (joined by AND)
       [ORDER BY col [ASC|DESC]] [LIMIT n]
     SHOW TABLES;   DESCRIBE table;   HELP;
   Array columns (e.g. tools) match with = if any element matches.            */

window.ProfileDB = (function () {
  const P = window.PORTFOLIO;

  const tables = {
    skills: () => P.skills.flatMap(g => g.items.map(tool => ({ tool, area: g.group }))),
    projects: () => P.projects.map(p => ({
      title: p.title, category: p.category, tools: p.tools, result: (p.results && p.results[0]) || null, year: p.year
    })),
    certificates: () => P.certificates.map(c => ({ title: c.title, issuer: c.issuer, year: c.year })),
    education: () => P.education.map(e => ({ degree: e.degree, school: e.school, period: e.period })),
    experience: () => P.experience.map(e => ({ role: e.role, company: e.company, place: e.place, period: e.period })),
    contact: () => [{
      name: P.profile.name, email: P.profile.email, location: P.profile.location,
      availability: P.profile.availability, linkedin: P.profile.links.linkedin
    }]
  };

  const norm = v => String(v).toLowerCase();

  function cmp(cell, op, val) {
    if (Array.isArray(cell)) return op === "!=" ? !cell.some(c => cmp(c, "=", val)) : cell.some(c => cmp(c, op, val));
    const a = typeof cell === "number" ? cell : norm(cell);
    const num = parseFloat(val);
    const b = typeof cell === "number" && !isNaN(num) ? num : norm(val);
    switch (op) {
      case "=": return a == b;
      case "!=": return a != b;
      case ">": return a > b;
      case "<": return a < b;
      case ">=": return a >= b;
      case "<=": return a <= b;
      case "like": {
        const re = new RegExp("^" + norm(val).replace(/[.*+?^${}()|[\]\\]/g, "\\$&").replace(/%/g, ".*").replace(/_/g, ".") + "$");
        return re.test(String(a));
      }
    }
    return false;
  }

  function parseWhere(str, cols) {
    return str.split(/\s+and\s+/i).map(part => {
      const m = part.trim().match(/^(\w+)\s*(!=|>=|<=|=|>|<|\s+like\s+)\s*(?:'([^']*)'|"([^"]*)"|([\w.\-]+))$/i);
      if (!m) throw new Error(`can't read condition: ${part.trim()}`);
      const col = m[1].toLowerCase();
      if (!cols.includes(col)) throw new Error(`unknown column '${col}'. try: ${cols.join(", ")}`);
      const op = m[2].trim().toLowerCase();
      const val = m[3] ?? m[4] ?? m[5];
      return row => cmp(row[col], op, val);
    });
  }

  function run(sql) {
    const q = sql.trim().replace(/;+\s*$/, "");
    if (!q) return { note: "type a query, or HELP" };
    const lower = q.toLowerCase();

    if (lower === "help") return {
      note: "tables: " + Object.keys(tables).join(", ") +
        "\nsyntax: SELECT cols FROM table [WHERE col = 'x' AND ...] [ORDER BY col DESC] [LIMIT n]" +
        "\nalso:   SHOW TABLES; DESCRIBE projects;"
    };
    if (lower === "show tables") return { table: "information_schema", rows: Object.keys(tables).map(t => ({ table: t, rows: tables[t]().length })) };
    let m = lower.match(/^(?:describe|desc)\s+(\w+)$/);
    if (m) {
      if (!tables[m[1]]) throw new Error(`no table '${m[1]}'`);
      const r = tables[m[1]]()[0];
      return { table: m[1], rows: Object.keys(r).map(k => ({ column: k, type: Array.isArray(r[k]) ? "array" : r[k] === null ? "text" : typeof r[k] })) };
    }
    if (/^(drop|delete|update|insert|alter|truncate)\b/.test(lower))
      return { error: "permission denied. this database is read-only (unlike my curiosity)." };
    if (lower.includes("hire")) return { note: "-- best query so far. the answer is in the contact section below ↓" };

    m = q.match(/^select\s+(.+?)\s+from\s+(\w+)(?:\s+where\s+(.+?))?(?:\s+order\s+by\s+(\w+)(?:\s+(asc|desc))?)?(?:\s+limit\s+(\d+))?$/i);
    if (!m) throw new Error("couldn't parse that. try: SELECT * FROM projects WHERE category = 'AI'");

    const [, colStr, tableRaw, where, orderCol, orderDir, limit] = m;
    const tName = tableRaw.toLowerCase();
    if (!tables[tName]) throw new Error(`no table '${tName}'. try SHOW TABLES`);
    let rows = tables[tName]();
    const allCols = Object.keys(rows[0] || {});

    if (where) {
      const preds = parseWhere(where, allCols);
      rows = rows.filter(r => preds.every(p => p(r)));
    }
    if (orderCol) {
      const oc = orderCol.toLowerCase();
      if (!allCols.includes(oc)) throw new Error(`unknown column '${oc}'`);
      const dir = (orderDir || "asc").toLowerCase() === "desc" ? -1 : 1;
      rows.sort((a, b) => (a[oc] > b[oc] ? 1 : a[oc] < b[oc] ? -1 : 0) * dir);
    }
    if (limit) rows = rows.slice(0, +limit);

    let cols = allCols;
    if (colStr.trim() !== "*") {
      if (/^count\(\s*\*\s*\)$/i.test(colStr.trim())) return { table: tName, where, rows: [{ "count(*)": rows.length }] };
      cols = colStr.split(",").map(c => c.trim().toLowerCase());
      const bad = cols.find(c => !allCols.includes(c));
      if (bad) throw new Error(`unknown column '${bad}'. try: ${allCols.join(", ")}`);
    }
    return { table: tName, where, rows: rows.map(r => Object.fromEntries(cols.map(c => [c, r[c]]))) };
  }

  return {
    run(sql) {
      const t0 = performance.now();
      let res;
      try { res = run(sql); } catch (e) { res = { error: e.message }; }
      res.ms = (performance.now() - t0).toFixed(2);
      return res;
    },
    tables() { return Object.keys(tables); },
    /* plain-language questions → real SQL + a line of context */
    examples: [
      { ask: "What are your core tools?",        sql: "SELECT tool, area FROM skills",                                          ctx: "Grouped as Query, Visualize, Model, AI tools and Business." },
      { ask: "What have you built with Power BI?", sql: "SELECT title, year FROM projects WHERE tools = 'Power BI'",           ctx: "Power BI is my main dashboarding tool. Each of these has a screenshot or a LinkedIn post above." },
      { ask: "Which projects use AI?",           sql: "SELECT title, year FROM projects WHERE category = 'AI'",                 ctx: "Four builds: an autonomous product analyst, a DeFi research terminal, a trading research bot, and this portfolio." },
      { ask: "What's your newest evidence?",     sql: "SELECT title, issuer, year FROM certificates WHERE year >= 2025",        ctx: "The newest credentials lean toward AI-assisted analytics." },
      { ask: "Where did you study?",             sql: "SELECT degree, school, period FROM education",                           ctx: "Agri-business and agriculture, at Banaras Hindu University and Dr. K.N. Modi University." },
      { ask: "How do I reach you?",              sql: "SELECT email, availability FROM contact",                                ctx: "Or skip the SQL and use the contact section at the bottom." },
      { ask: "What tables exist?",               sql: "SHOW TABLES",                                                            ctx: "Six tables. Try DESCRIBE projects to see the columns." }
    ]
  };
})();
