/* Builds the page from content.js and wires up the interactions.
   You shouldn't need to edit this file. Change js/content.js instead. */
(function () {
  "use strict";
  const P = window.PORTFOLIO;
  const $ = (s, el = document) => el.querySelector(s);
  const $$ = (s, el = document) => [...el.querySelectorAll(s)];
  const esc = s => String(s ?? "").replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
  const reduceMotion = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const canHover = matchMedia("(hover: hover)").matches;
  const safe = (fn, fb) => { try { return fn(); } catch (e) { return fb; } };
  const local = { set: (k, v) => safe(() => localStorage.setItem(k, v)) };
  const ARROW = '<svg viewBox="0 0 12 12" width="11" height="11" fill="none" stroke="currentColor" stroke-width="1.7" aria-hidden="true"><path d="M3 9 L9 3 M4 3 H9 V8"/></svg>';

  /* ---------- plain text bindings ---------- */
  $$("[data-bind]").forEach(el => { el.textContent = el.dataset.bind.split(".").reduce((o, k) => (o ? o[k] : ""), P) ?? ""; });
  document.title = `${P.profile.name} · Data Analyst`;
  $("#year").textContent = new Date().getFullYear();
  $("#hero-resume").href = P.profile.resume;
  $("#brand-rest").textContent = P.profile.name.replace(P.profile.shortName, "").trim();   // "Kumar Sahni", shown small under the first name
  const words = P.profile.headline.trim().split(" "), lastWord = words.pop();
  $("#headline").innerHTML = `${esc(words.join(" "))} <em>${esc(lastWord)}</em>`;

  /* proof strip: facts a recruiter can verify further down the page */
  (function proof() {
    const n = P.projects.length, ai = P.projects.filter(p => p.category === "AI").length, years = P.certificates.map(c => c.year);
    const items = [
      ["Google Data Analytics certified", "Professional Certificate, 2025"],
      [`${n} projects`, `${n - ai} dashboards and analyses, ${ai} AI builds`],
      ["Power BI, SQL, Python, Excel, Tableau", "The tools behind them"],
      [`${P.certificates.length} certificates`, `Newest from ${Math.max(...years)}`]
    ];
    $("#proof").innerHTML = items.map(([a, b]) => `<li>${esc(a)}<small>${esc(b)}</small></li>`).join("");
  })();

  /* The headline starts as raw characters and resolves left to right while a scan line sweeps the portrait.
     Timer-based (not animation frames) and always ends on the real text, even in a background tab. */
  (function decodeHeadline() {
    const h = $("#headline"), subject = $("#subject");
    if (reduceMotion || document.hidden) return;
    const nodes = [];
    (function walk(n) { n.childNodes.forEach(c => (c.nodeType === 3 ? nodes.push(c) : walk(c))); })(h);
    const finals = nodes.map(n => n.textContent), total = finals.join("").length, JUNK = "#01_?/NA%$";
    const DUR = 1700, TICK = 55;
    let timer, started = false, done = false, t0 = 0;
    const show = k => {
      let idx = 0;
      nodes.forEach((n, j) => { n.textContent = [...finals[j]].map(c => (idx++ / total < k || c === " " ? c : JUNK[(Math.random() * JUNK.length) | 0])).join(""); });
    };
    const finish = () => {
      if (done) return; done = true; clearInterval(timer);
      nodes.forEach((n, j) => { n.textContent = finals[j]; });
      h.removeAttribute("aria-label"); h.classList.remove("decoding"); h.style.minHeight = "";
    };
    const start = () => {
      if (started) return; started = true;
      h.style.minHeight = h.offsetHeight + "px";            // keep the layout still while the characters change
      h.setAttribute("aria-label", finals.join(""));         // screen readers get the real words
      h.classList.add("decoding"); show(0);
      t0 = performance.now();
      timer = setInterval(() => { const k = (performance.now() - t0) / DUR; if (k >= 1) finish(); else show(Math.max(0, k)); }, TICK);
      setTimeout(finish, DUR + 1800);                        // failsafe: never leave junk on screen
      setTimeout(() => { subject.classList.remove("scanning"); void subject.offsetWidth; subject.classList.add("scanning"); }, 150);
    };
    h.classList.add("decoding");                            // grey from the first paint, no flash of the final words
    show(0);
    Promise.race([document.fonts ? document.fonts.ready : Promise.resolve(), new Promise(r => setTimeout(r, 700))]).then(() => setTimeout(start, 250));
    setTimeout(finish, 4500);                               // absolute failsafe
  })();

  /* ---------- theme ---------- */
  const root = document.documentElement, themeBtn = $("#theme-toggle");
  function syncTheme() {
    const dark = root.getAttribute("data-theme") === "dark";
    themeBtn.setAttribute("aria-label", dark ? "Switch to light theme" : "Switch to dark theme");
    $('meta[name="theme-color"]').setAttribute("content", dark ? "#0e1411" : "#f1f3ec");
  }
  syncTheme();
  themeBtn.addEventListener("click", () => {
    const next = root.getAttribute("data-theme") === "dark" ? "light" : "dark";
    root.setAttribute("data-theme", next); local.set("pks-theme", next); syncTheme();
  });

  /* ---------- top bar: menu, active link, progress ---------- */
  const nav = $("#nav"), menuBtn = $("#menu-btn"), bar = $("#topbar");
  const setMenu = open => { nav.classList.toggle("open", open); menuBtn.setAttribute("aria-expanded", open); menuBtn.setAttribute("aria-label", open ? "Close menu" : "Open menu"); };
  menuBtn.addEventListener("click", () => setMenu(!nav.classList.contains("open")));
  nav.addEventListener("click", e => { if (e.target.closest("a")) setMenu(false); });
  document.addEventListener("click", e => { if (nav.classList.contains("open") && !e.target.closest("#nav, #menu-btn")) setMenu(false); });

  const links = $$("#nav a"), sections = [$("#home"), ...links.map(a => $(a.getAttribute("href")))].filter(Boolean);
  const spy = new IntersectionObserver(entries => entries.forEach(en => {
    if (en.isIntersecting) links.forEach(a => {   // Home has no link, so none is active there
      const on = a.getAttribute("href") === "#" + en.target.id;
      a.classList.toggle("active", on);
      if (on) a.setAttribute("aria-current", "location"); else a.removeAttribute("aria-current");
    });
  }), { rootMargin: "-45% 0px -50% 0px" });
  sections.forEach(s => spy.observe(s));

  /* ---------- hero avatar: looping video, gentle tilt ---------- */
  const wrap = $("#avatar-wrap"), img = $("#avatar"), vid = $("#avatar-video"), V = P.profile.avatarVideo;
  img.src = P.profile.avatar;
  let heroVisible = true;
  if (V && !reduceMotion) {
    vid.poster = P.profile.avatar;
    vid.innerHTML = (V.webm ? `<source src="${esc(V.webm)}" type="video/webm">` : "") + (V.mp4 ? `<source src="${esc(V.mp4)}" type="video/mp4">` : "");
    vid.hidden = false; vid.muted = true; vid.defaultMuted = true; vid.autoplay = true; vid.setAttribute("autoplay", "");
    vid.addEventListener("playing", () => wrap.classList.add("has-video"), { once: true });
    const play = () => { if (!heroVisible || document.hidden) return; const p = vid.play(); if (p && p.catch) p.catch(() => {}); };
    vid.addEventListener("canplay", play);
    vid.load();
    new IntersectionObserver(([en]) => { heroVisible = en.isIntersecting; if (heroVisible) play(); else vid.pause(); }, { threshold: 0.1 }).observe(wrap);
    document.addEventListener("visibilitychange", play);
    addEventListener("focus", play); addEventListener("pageshow", play);
    setInterval(() => { if (vid.paused && heroVisible && !document.hidden) play(); }, 1500);   // browsers sometimes pause hidden videos
  } else vid.remove();
  if (!reduceMotion && canHover) {
    const subject = $("#subject");
    addEventListener("mousemove", e => {
      if (!heroVisible) return;
      const r = subject.getBoundingClientRect();
      const nx = Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)), ny = Math.min(1, Math.max(0, (e.clientY - r.top) / r.height));
      wrap.style.transform = `rotateY(${((nx - .5) * 10).toFixed(2)}deg) rotateX(${(-(ny - .5) * 10).toFixed(2)}deg)`;
    });
  }

  /* ---------- about, education, experience ---------- */
  $("#about-text").innerHTML = P.about.map(t => `<p>${esc(t)}</p>`).join("");
  $("#education").innerHTML = P.education.map(e => `
    <li>
      <div>
        <h4>${esc(e.degree)}</h4>
        <p class="school"><span>${esc(e.school)}</span><span class="period">${esc(e.period)}</span></p>
        ${e.note ? `<p class="note">${esc(e.note).replace(/^(Thesis:)/, "<b>$1</b>")}</p>` : ""}
      </div>
    </li>`).join("");
  $("#leadership").innerHTML = P.leadership.map(l => `
    <li>
      <div>
        <h4>${esc(l.role)}</h4>
        <p class="school"><span>${esc(l.org)}</span><span class="period">${esc(l.period)}</span></p>
        ${l.note ? `<p class="note">${esc(l.note)}</p>` : ""}
        ${l.link ? `<p class="note"><a class="inline-link" href="${esc(l.link.href)}" target="_blank" rel="noopener">${esc(l.link.label)} ↗</a></p>` : ""}
      </div>
    </li>`).join("");
  $("#experience-list").innerHTML = P.experience.map(j => `
    <article class="job reveal">
      <div class="job-head">
        <h3>${esc(j.role)}</h3>
        <p class="co"><span>${esc(j.company)}, ${esc(j.place)}</span><span class="period">${esc(j.period)}</span></p>
      </div>
      <ul>${j.bullets.map(b => `<li>${esc(b)}</li>`).join("")}</ul>
      ${j.link ? `<a class="award" href="${esc(j.link.href)}" target="_blank" rel="noopener">${esc(j.link.label)} ${ARROW}</a>` : ""}
    </article>`).join("");

  /* ---------- lightbox ---------- */
  const lb = $("#lightbox"); let lbFocus = null;
  function openLightbox(src, cap) {
    lbFocus = document.activeElement;
    $("#lightbox-img").src = src; $("#lightbox-img").alt = cap || ""; $("#lightbox-cap").textContent = cap || "";
    lb.hidden = false; document.body.style.overflow = "hidden"; $("#lightbox-close").focus();
  }
  function closeLightbox() { lb.hidden = true; document.body.style.overflow = ""; if (lbFocus) lbFocus.focus(); }
  $("#lightbox-close").addEventListener("click", closeLightbox);
  lb.addEventListener("click", e => { if (e.target === lb) closeLightbox(); });
  document.addEventListener("click", e => { const b = e.target.closest("[data-img]"); if (b) openLightbox(b.dataset.img, b.dataset.cap); });

  /* ---------- case study panel ---------- */
  const caseEl = $("#case"), casePanel = $("#case-panel"); let caseFocus = null;
  function openCase(id) {
    const p = P.projects.find(x => x.id === id); if (!p || !p.case) return;
    caseFocus = document.activeElement;
    $("#case-body").innerHTML = `<h2 id="case-title">${esc(p.case.heading)}</h2>` + p.case.blocks.map(b => `
      <section>
        <h3>${esc(b.h)}</h3>
        ${b.p ? `<p>${esc(b.p)}</p>` : ""}
        ${b.ol ? `<ol>${b.ol.map(i => `<li><b>${esc(i.b)}</b> ${esc(i.t)}</li>`).join("")}</ol>` : ""}
      </section>`).join("");
    caseEl.hidden = false; document.body.style.overflow = "hidden"; casePanel.scrollTop = 0; $("#case-close").focus();
  }
  function closeCase() { caseEl.hidden = true; document.body.style.overflow = ""; if (caseFocus) caseFocus.focus(); }
  $("#case-close").addEventListener("click", closeCase);
  caseEl.addEventListener("click", e => { if (e.target === caseEl) closeCase(); });
  document.addEventListener("click", e => { const b = e.target.closest("[data-case]"); if (b) openCase(b.dataset.case); });
  caseEl.addEventListener("keydown", e => {            // keep Tab inside the panel while it is open
    if (e.key !== "Tab") return;
    const f = $$("button, a[href]", casePanel); if (!f.length) return;
    const first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });

  /* ---------- projects ---------- */
  const aiGrid = $("#ai-grid");
  const dataProjects = P.projects.filter(p => p.category !== "AI"), aiProjects = P.projects.filter(p => p.category === "AI");
  function card(p) {
    const t = esc(p.title);
    return `
    <article class="card reveal">
      ${p.image ? `<button class="shot" type="button" data-img="${esc(p.image)}" data-cap="${t}" aria-label="Enlarge the ${t} dashboard"><img src="${esc(p.image)}" alt="${t} dashboard screenshot" loading="lazy"></button>` : ""}
      <div class="card-body">
        <p class="card-meta"><span class="${p.category === "AI" ? "cat-ai" : ""}">${esc(p.category === "AI" ? "AI build" : "Dashboard")}</span></p>
        <h3>${t}</h3>
        <p class="sum">${esc(p.summary)}</p>
        <ul class="results">${p.results.map(r => `<li>${esc(r)}</li>`).join("")}</ul>
        <ul class="tags">${p.tools.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      </div>
      <footer class="card-foot">
        <span class="yr">${p.year}</span>
        <div class="card-links">${linksHtml(p)}</div>
      </footer>
    </article>`;
  }
  /* one place for the link / screenshot buttons, used by every layout */
  const linksHtml = p => {
    const t = esc(p.title);
    return (p.links || []).filter(l => l.href || l.img || l.case).map(l => l.case
      ? `<button type="button" data-case="${esc(p.id)}" aria-label="${esc(l.label)}: ${t}">${esc(l.label)}</button>`
      : l.img
      ? `<button type="button" data-img="${esc(l.img)}" data-cap="${t}" aria-label="${esc(l.label)}: ${t}">${esc(l.label)}</button>`
      : `<a href="${esc(l.href)}" target="_blank" rel="noopener" aria-label="${esc(l.label)}: ${t}">${esc(l.label)} ${ARROW}</a>`).join("");
  };
  /* three big case studies, then a quiet list */
  const featured = dataProjects.filter(p => p.image).slice(0, 3), rest = dataProjects.filter(p => !featured.includes(p));
  $("#project-feature").innerHTML = featured.map((p, i) => {
    const t = esc(p.title);
    return `
    <article class="feat reveal${i % 2 ? " flip" : ""}">
      <button class="feat-shot shot" type="button" data-img="${esc(p.image)}" data-cap="${t}" aria-label="Enlarge the ${t} dashboard"><img src="${esc(p.image)}" alt="${t} dashboard screenshot" loading="lazy"></button>
      <div class="feat-body">
        <p class="yr">${p.year}</p>
        <h3>${t}</h3>
        <p class="sum">${esc(p.summary)}</p>
        <ul class="results">${p.results.map(r => `<li>${esc(r)}</li>`).join("")}</ul>
        <ul class="tags">${p.tools.map(x => `<li>${esc(x)}</li>`).join("")}</ul>
        <div class="card-links">${linksHtml(p)}</div>
      </div>
    </article>`;
  }).join("");
  /* list rows keep two fixed link slots (post, screenshot) so the columns line up row to row */
  const rowLinks = p => {
    const t = esc(p.title), ls = (p.links || []);
    const a = ls.find(l => l.href), s = ls.find(l => l.img);
    return (a ? `<a href="${esc(a.href)}" target="_blank" rel="noopener" aria-label="${esc(a.label)}: ${t}">${esc(a.label)} ${ARROW}</a>` : "<span></span>")
         + (s ? `<button type="button" data-img="${esc(s.img)}" data-cap="${t}" aria-label="${esc(s.label)}: ${t}">${esc(s.label)}</button>` : "<span></span>");
  };
  const shotOf = p => p.image || ((p.links || []).find(l => l.img) || {}).img || "";
  $("#project-list").innerHTML = rest.map(p => `
    <li class="prow reveal" data-peek="${esc(shotOf(p))}">
      <span class="yr">${p.year}</span>
      <div class="pmain"><h4>${esc(p.title)}</h4><p>${esc(p.results[0])}</p></div>
      <ul class="tags">${p.tools.slice(0, 3).map(x => `<li>${esc(x)}</li>`).join("")}</ul>
      <div class="card-links">${rowLinks(p)}</div>
    </li>`).join("");

  /* hover a row to preview its dashboard next to the cursor (mouse only) */
  if (canHover) {
    const peek = $("#peek"), pimg = $("img", peek);
    const place = e => { const w = 340, x = Math.min(e.clientX + 28, innerWidth - w - 16), y = Math.max(16, Math.min(e.clientY - 90, innerHeight - 230)); peek.style.transform = `translate(${x}px, ${y}px)`; };
    $("#project-list").addEventListener("mousemove", e => {
      const row = e.target.closest(".prow"); const src = row && row.dataset.peek;
      if (!src) { peek.classList.remove("on"); return; }
      if (pimg.getAttribute("src") !== src) pimg.src = src;
      place(e); peek.classList.add("on");
    });
    $("#project-list").addEventListener("mouseleave", () => peek.classList.remove("on"));
    addEventListener("scroll", () => peek.classList.remove("on"), { passive: true });
  }

  /* ---------- ask my profile (open, answers appear under the prompt) ---------- */
  const DB = window.ProfileDB, out = $("#console-out"), input = $("#console-input"), form = $("#console-form");
  $("#asks").innerHTML = DB.examples.slice(0, 6).map((x, i) => `<button type="button" data-i="${i}">${esc(x.ask)}</button>`).join("");
  const hl = sql => esc(sql)
    .replace(/&#39;([^&]*)&#39;/g, `<span class="str">'$1'</span>`)
    .replace(/\b(SELECT|FROM|WHERE|AND|ORDER BY|LIMIT|DESC|ASC|LIKE|SHOW|TABLES|DESCRIBE|count)\b/gi, m => `<span class="kw">${m}</span>`)
    .replace(/(^|[\s=<>])(\d+)(?=\s|$)/g, `$1<span class="numv">$2</span>`);
  const autoCtx = res => {
    if (res.error || res.note || !res.rows) return "";
    const n = res.rows.length;
    if (!n) return "Nothing matched. Loosen the WHERE, or try SHOW TABLES.";
    return `${n} ${res.table === "information_schema" ? "table" : "row"}${n > 1 ? "s" : ""} from ${res.table}${res.where ? ` where ${res.where}` : ""}.`;
  };
  function renderResult(sql, res, ctx) {
    let h = `<div class="res latest"><div class="q"><code>${hl(sql)}</code></div>`;
    if (res.error) h += `<div class="err">ERROR · ${esc(res.error)}</div>`;
    else if (res.note) h += `<div class="cnote">${esc(res.note)}</div>`;
    else if (res.rows && res.rows.length) {
      const cols = Object.keys(res.rows[0]);
      h += `<div style="overflow-x:auto"><table><thead><tr>${cols.map(c => `<th>${esc(c)}</th>`).join("")}</tr></thead><tbody>` +
        res.rows.map((r, i) => `<tr style="animation-delay:${i * 45}ms">${cols.map(c => `<td>${esc(Array.isArray(r[c]) ? r[c].join(", ") : r[c] ?? "–")}</td>`).join("")}</tr>`).join("") + `</tbody></table></div>`;
    }
    const c = ctx || autoCtx(res);
    if (c) h += `<div class="ctx">${esc(c)}</div>`;
    if (res.rows) h += `<div class="stat">${res.rows.length} row${res.rows.length === 1 ? "" : "s"} · ${res.ms} ms · read-only</div>`;
    $$(".res.latest", out).forEach(el => el.classList.remove("latest"));
    out.insertAdjacentHTML("afterbegin", h + `</div>`);   // newest answer on top
    out.scrollTop = 0;
  }
  const history = []; let hIdx = 0;
  const exec = (sql, ctx) => { if (!sql.trim()) return; history.push(sql); hIdx = history.length; renderResult(sql, DB.run(sql), ctx); };
  function typeAndRun(sql, ctx) {
    if (reduceMotion) { input.value = sql; return exec(sql, ctx); }
    let i = 0; input.value = ""; clearInterval(input._t); form.classList.add("typing");
    input._t = setInterval(() => {
      input.value = sql.slice(0, ++i);
      if (i >= sql.length) { clearInterval(input._t); setTimeout(() => { exec(sql, ctx); form.classList.remove("typing"); }, 450); }
    }, 22);
  }
  form.addEventListener("submit", e => { e.preventDefault(); clearInterval(input._t); form.classList.remove("typing"); exec(input.value); });
  input.addEventListener("keydown", e => {
    if (e.key === "ArrowUp" && hIdx > 0) { input.value = history[--hIdx]; e.preventDefault(); }
    if (e.key === "ArrowDown") { input.value = history[++hIdx] || ""; hIdx = Math.min(hIdx, history.length); e.preventDefault(); }
  });
  $("#asks").addEventListener("click", e => { const b = e.target.closest("button"); if (b) { const x = DB.examples[+b.dataset.i]; typeAndRun(x.sql, x.ctx); } });

  /* ---------- skills ---------- */
  $("#skills-list").innerHTML = P.skills.map(g => `<div class="row"><dt>${esc(g.group)}</dt><dd>${g.items.map(i => `<span>${esc(i)}</span>`).join("")}</dd></div>`).join("");

  /* ---------- certifications ---------- */
  const viewLink = c => c.image ? `<button type="button" data-img="${esc(c.image)}" data-cap="${esc(c.title)}" aria-label="View certificate: ${esc(c.title)}">View</button>`
    : c.file ? `<a href="${esc(c.file)}" target="_blank" rel="noopener" aria-label="View certificate: ${esc(c.title)}">View ${ARROW}</a>` : "";
  const verifyLink = c => c.verify ? `<a href="${esc(c.verify)}" target="_blank" rel="noopener" aria-label="Verify credential: ${esc(c.title)}">Verify ${ARROW}</a>` : "";
  const top = P.certificates.filter(c => c.featured), more = P.certificates.filter(c => !c.featured);
  $("#certs-top").innerHTML = top.map(c => `
    <article class="cert reveal">
      <p class="yr">${c.year}</p><h3>${esc(c.title)}</h3><p class="by">${esc(c.issuer)}</p>
      <div class="links">${viewLink(c)}${verifyLink(c)}</div>
    </article>`).join("");
  $("#certs-more").innerHTML = more.map(c => `
    <li><div><span class="t">${esc(c.title)}</span><span class="m">${esc(c.issuer)} · ${c.year}</span></div><div class="links">${viewLink(c)}${verifyLink(c)}</div></li>`).join("");
  const cToggle = $("#certs-toggle"), cMore = $("#certs-more");
  if (more.length) {
    const label = open => open ? "Show fewer" : `Show all ${P.certificates.length}`;
    cToggle.textContent = label(false);
    cToggle.addEventListener("click", () => { const open = cMore.hidden; cMore.hidden = !open; cToggle.setAttribute("aria-expanded", open); cToggle.textContent = label(open); });
  } else { cToggle.remove(); cMore.remove(); }
  $("#badges").innerHTML = P.badges.map(b => `<img src="${esc(b.image)}" alt="${esc(b.title)} badge" title="${esc(b.title)}" loading="lazy">`).join("");

  /* ---------- contact ---------- */
  const L = P.profile.links;
  $("#contact-links").innerHTML =
    `<a class="btn btn-amber" href="mailto:${esc(P.profile.email)}">${esc(P.profile.email)}</a>` +
    `<a class="btn btn-ghost" href="${esc(L.linkedin)}" target="_blank" rel="noopener">LinkedIn ${ARROW}</a>` +
    `<a class="btn btn-ghost" href="${esc(L.github)}" target="_blank" rel="noopener">GitHub ${ARROW}</a>` +
    `<a class="btn btn-ghost" href="${esc(P.profile.resume)}" target="_blank" rel="noopener">Résumé ${ARROW}</a>`;
  const hlog = $("#hire-log"); let logTimer;
  function typeLog(lines, done) {
    clearTimeout(logTimer); hlog.textContent = ""; let i = 0;
    const step = () => { if (i < lines.length) { hlog.textContent += lines[i++] + "\n"; logTimer = setTimeout(step, reduceMotion ? 0 : 380); } else if (done) logTimer = setTimeout(done, 350); };
    step();
  }
  const hireYes = () => typeLog(["> excellent decision.", `> composing a message to ${P.profile.email}`, "> subject: Let's talk: analyst role", "> opening your mail client_"],
    () => { location.href = `mailto:${P.profile.email}?subject=${encodeURIComponent("Let's talk: analyst role")}`; });
  const hireNo = () => typeLog(["> noted. one visit is a small sample size.", "> suggestion: open another project, then re-run this query."]);
  ["#hire-y", "#hire-y2"].forEach(s => $(s).addEventListener("click", hireYes));
  ["#hire-n", "#hire-n2"].forEach(s => $(s).addEventListener("click", hireNo));
  let contactVisible = false;
  new IntersectionObserver(([en]) => { contactVisible = en.isIntersecting; }, { threshold: .5 }).observe($(".term"));

  /* ---------- keys ---------- */
  addEventListener("keydown", e => {
    if (e.key === "Escape") { if (!caseEl.hidden) closeCase(); if (!lb.hidden) closeLightbox(); if (nav.classList.contains("open")) setMenu(false); return; }
    if (e.key === "Tab" && !lb.hidden) { e.preventDefault(); $("#lightbox-close").focus(); return; }
    if (contactVisible && lb.hidden && !/input|textarea/i.test(document.activeElement.tagName)) {
      if (e.key === "y" || e.key === "Y") hireYes();
      if (e.key === "n" || e.key === "N") hireNo();
    }
  });

  /* ---------- scroll: progress line + top bar ---------- */
  const prog = $("#progress"); let ticking = false;
  function onScroll() {
    const max = Math.max(1, document.documentElement.scrollHeight - innerHeight);
    prog.style.setProperty("--p", Math.min(1, Math.max(0, scrollY / max)).toFixed(4));
    bar.classList.toggle("scrolled", scrollY > 8);
  }
  addEventListener("scroll", () => { if (!ticking) { ticking = true; requestAnimationFrame(() => { onScroll(); ticking = false; }); } }, { passive: true });
  addEventListener("resize", onScroll);

  /* ---------- one accent line sweeps each section's top edge as it arrives ---------- */
  const io = new IntersectionObserver(entries => entries.forEach(en => {
    if (!en.isIntersecting) return;
    en.target.classList.add("seen"); io.unobserve(en.target);
  }), { rootMargin: "0px 0px -55% 0px" });
  $$("main .section").forEach(s => io.observe(s));
  const observeReveals = () => {}, showNow = () => {};

  /* ---------- start ---------- */
  $("#ai-intro").textContent = P.ai.intro;
  $("#ai-method").innerHTML = P.ai.method.map(s => `<li><b>${esc(s.title)}</b><span>${esc(s.text)}</span></li>`).join("");
  aiGrid.innerHTML = aiProjects.map(card).join(""); observeReveals(aiGrid);
  observeReveals(document);
  onScroll();
})();
