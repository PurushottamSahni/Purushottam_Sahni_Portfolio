/* =====================================================================
   CONTENT FILE: this is the ONLY file you need to edit.
   Everything on the site (text, projects, certificates, links) is read
   from here. Keep the quotes and commas intact.
   ===================================================================== */

window.PORTFOLIO = {

  /* ---------- Who you are ---------- */
  profile: {
    name: "Purushottam Kumar Sahni",
    shortName: "Purushottam",
    role: "Data Analyst · Business & Product Analytics",
    headline: "I follow signals.",                    // the last word gets the wavy underline
    subline: "I turn business data into decisions with SQL, Power BI, Python and AI.",
    location: "Noida, India",
    availability: "Open to remote, hybrid and relocation",
    languages: "English (fluent) · Hindi (fluent) · German (beginner)",
    avatar: "assets/avatar-poster.webp",             // still image (shown first, and when motion is reduced)
    avatarVideo: { webm: "assets/avatar.webm", mp4: "assets/avatar.mp4" },   // set to null to use the still image only
    resume: "assets/resume.pdf",
    email: "purushottamsahni07@gmail.com",
    links: {
      linkedin: "https://www.linkedin.com/in/dataanalystpurushottam-sahni/",
      github: "https://github.com/PurushottamSahni"
    }
  },

  /* ---------- Timeline (About) ----------
     Built only from facts elsewhere in this file.
     TODO: 2022 to 2025 is covered by certificates and projects only; add a job, freelance work or anything else from those years. */
  timeline: [
    { when: "2015 – 2019", what: "B.Sc. Agriculture (Hons.) at Dr. K.N. Modi University. Founded and led the Green Club, and helped organise a national sports meet and an international conference." },
    { when: "Jan – Mar 2019", what: "Rural Agricultural Work Experience at Kota Agriculture University, leading a team of 30." },
    { when: "2020 – 2022", what: "Master of Agri-Business Management at Banaras Hindu University. Thesis on blockchain in food supply chain management." },
    { when: "2021", what: "Marketing research intern at Ingemann Data, Denmark. Led 80 volunteers and 1,500+ guests as Accommodation Head at the Agricultural Science Congress." },
    { when: "2022 – 2023", what: "First analytics certificates: Power BI, Excel, Python and prompt engineering." },
    { when: "2024", what: "First dashboards in Power BI, Excel and Looker Studio, plus SQL and business analysis training." },
    { when: "2025", what: "Google Data Analytics certificate. Reddit sentiment analysis in Python." },
    { when: "2026", what: "Google AI certificate. Built a DeFi research terminal, a trading research bot and Product Sentinel, an AI product analyst." }
  ],

  /* ---------- About ---------- */
  about: [
    "I'm a data analyst focused on business and product questions. I build dashboards in Power BI, Excel and Looker Studio, use SQL and Python to prepare the data, and use AI tools to speed up the first pass of an analysis.",
    "I like turning messy numbers into one clear answer that a team can act on."
  ],

  /* ---------- Education ---------- */
  education: [
    {
      degree: "Master of Agri-Business Management (MABM)",
      school: "Institute of Agricultural Sciences, Banaras Hindu University",
      period: "2020 – 2022",
      note: "Thesis: Role of Blockchain Technology in Food Supply Chain Management"
    },
    {
      degree: "B.Sc. Agriculture (Hons.)",
      school: "Dr. K.N. Modi University",
      period: "2015 – 2019"
    }
  ],

  /* ---------- Experience ---------- */
  /* ---------- AI section ---------- */
  ai: {
    intro: "I use AI the way I use SQL or Power BI: as a tool I direct and check. These builds show what I can make with it, and where I step in myself.",
    method: [
      { title: "I set the question", text: "I decide what needs answering and what a good result looks like before I write a single prompt." },
      { title: "AI drafts, I direct", text: "I use AI to write code, layouts and first drafts quickly, and I steer it step by step." },
      { title: "I check every number", text: "I read the output, test it against the real data and fix what is wrong. Nothing ships unchecked." },
      { title: "I say what is real", text: "Where something is a demo or rule-based, I label it that way on the page." }
    ]
  },

  leadership: [
    {
      role: "Accommodation Head, XV Agricultural Science Congress & ASC EXPO",
      org: "Banaras Hindu University",
      period: "November 2021",
      note: "Led 80 volunteers and managed 1,500+ guests across 25+ guest houses and hotels, including transport from the airport, railway and bus stations."
    },
    {
      role: "Lead Designer, Placement Brochure, MABM batch 2020–2022",
      org: "Institute of Agricultural Sciences, Banaras Hindu University",
      period: "2021",
      note: "Did most of the design work on the placement brochure, with three batchmates helping.",
      link: { label: "View the post", href: "https://www.linkedin.com/posts/dataanalystpurushottam-sahni_mabm-placement-brochure-batch-2020-2022-ugcPost-6871886767285444608-o8ql/" }
    },
    {
      role: "Green Club Head",
      org: "Dr. K.N. Modi University",
      period: "2017 – 2018",
      note: "Founded the club and led 20 volunteers. Raised over ₹8,000 from about 500 students and voluntary teacher contributions, and used it to install seven pairs of dustbins and water containers on the campus trees for birds. Ran cleanliness and safety campaigns and awareness events such as painting competitions. Designed the club's logo myself. Handed the club over to a junior in 2018 and trained them for the role."
    },
    {
      role: "Organiser and Head of Volunteers, Food and Accommodation",
      org: "International Conference on Environment and Justice",
      period: "2017",
      note: "Part of the organising team, and led the volunteers for food and accommodation. Looked after international guests from Italy, the USA and Japan, including a mother and daughter from Italy whose arrival went badly. I sorted out their stay, and they left saying they would always remember India for the care they were shown."
    },
    {
      role: "Organiser, National Sports Meet UTOPIA",
      org: "Dr. K.N. Modi University",
      period: "2017"
    },
    {
      role: "School Captain",
      org: "A.A.M Children's Academy",
      period: "2013 – 2014",
      note: "Won the district art and craft competition in 2012 and placed second in 2013."
    }
  ],

  experience: [
    {
      role: "Marketing Research Intern",
      company: "Ingemann Data A/S",
      place: "Denmark · Remote",
      period: "June – October 2021",
      bullets: [
        "Researched Indian crop data and analysed demand and supply across regions.",
        "Gave recommendations for agricultural projects started by the Government of India.",
        "Organised and evaluated the collected data in Excel."
      ],
      link: { label: "Certificate of achievement from the managing director", href: "assets/certs/ingemann-research-award.pdf" }
    },
    {
      role: "Rural Agricultural Work Experience (RAWE)",
      company: "Kota Agriculture University",
      place: "Rajasthan, India",
      period: "January – March 2019",
      bullets: [
        "Led a team of 30, assigning tasks and guiding day-to-day work.",
        "Wrote daily progress briefings and coordinated KVK training for local farmers and college students.",
        "Worked with ICAR scientists on a field survey, and organised a farmers' fair."
      ]
    }
  ],

  /* ---------- Projects ----------
     category: "Data" (shown in Projects) or "AI" (shown in the AI section)
     image:    optional dashboard screenshot (click to enlarge)
     results:  1–2 short real results                                     */
  projects: [
    {
      /* TODO(currency): the dashboard shows "57M" with no symbol; add the currency once confirmed. */
      id: "creditcard", category: "Data", year: 2024,
      title: "Credit Card Transaction Report",
      summary: "Weekly and quarterly view of card revenue, interest and customer segments.",
      results: ["57M revenue across 667K transactions", "Blue cards bring in 47M of it"],
      tools: ["Power BI", "DAX", "Power Query"],
      image: "assets/projects/creditcard.webp",
      links: [{ label: "LinkedIn post", href: "https://www.linkedin.com/posts/purushottam-sahni_weekly-credit-card-analysis-activity-7200493655462170624-tCz_" }]
    },
    {
      id: "uktrain", category: "Data", year: 2024,
      title: "Maven UK Train Analysis",
      summary: "Revenue, routes, ticket types and journey reliability for UK rail, January to April 2024.",
      results: ["86.8% of journeys on time", "€649.3K revenue, €92.6K refunded"],
      tools: ["Power BI", "MySQL", "DAX", "Power Query"],
      image: "assets/projects/uktrain.webp",
      links: [{ label: "LinkedIn post", href: "https://www.linkedin.com/feed/update/urn:li:activity:7201488327538073600" }]
    },
    {
      id: "olympics", category: "Data", year: 2024,
      title: "Paris 2024 Olympic Games Analysis",
      summary: "Athletes, medals by country and gender, and a world map of winning nations, built from a Kaggle dataset.",
      results: ["11,113 athletes, 92 medal-winning countries", "329 gold, 333 silver, 390 bronze"],
      tools: ["Power BI", "DAX", "Power Query"],
      image: "assets/projects/olympics.webp",
      links: [{ label: "LinkedIn post", href: "https://www.linkedin.com/posts/dataanalystpurushottam-sahni_dataanalytics-powerbi-olympics-ugcPost-7272838345544622082-anVW/" }]
    },
    {
      id: "sentinel", category: "AI", year: 2026,
      title: "Product Sentinel: an AI product analyst",
      summary: "An AI agent that watches a product's funnel metrics, catches drops, finds the root cause and acts. It sends Slack alerts and Jira tickets on its own, and asks a human before pausing a rollout.",
      results: ["Seven stages from trigger to record, with a human approval gate on pause actions", "11 of 11 automated tests pass; real Jira tickets and Slack alerts verified end to end", "Built solo for the All Things Agentic Hackathon, Taskmaster track"],
      tools: ["FastAPI", "React", "BigQuery", "Vertex AI (Gemini)", "Cloud Run", "Slack and Jira APIs"],
      case: {
        heading: "Product Sentinel: an AI product analyst",
        blocks: [
          { h: "The problem", p: "Product analysts spend hours noticing that a metric dropped, working out why, and telling the right people. Most of that loop is routine, and it is slow." },
          { h: "What I built", p: "Sentinel is an AI agent that watches a product's funnel metrics, catches drops, finds the root cause and acts on it. I built it solo for the All Things Agentic Hackathon, Taskmaster track. To test it, I made a fictional task-management app called TaskFlow for it to monitor." },
          { h: "How it works", p: "Seven stages, from a metric dropping to a recorded action. For safe steps Sentinel acts on its own. Before anything irreversible, it asks a human first.",
            pipeline: [
              { t: "Trigger", d: "A scheduler starts a check on the product's funnel metrics." },
              { t: "Detect", d: "Sentinel looks for drops, narrowing to the affected platform first so a platform-specific fall is not hidden by the product-wide average." },
              { t: "Verify", d: "It checks that the drop is real and the data can be trusted before raising an alarm." },
              { t: "Investigate", d: "It works through the data to find the root cause of the drop." },
              { t: "Explain", d: "It writes a plain-language explanation of what happened and why." },
              { t: "Act", d: "Slack alerts and Jira tickets go out on their own. Pausing a rollout is the one step that waits for a human to approve it.", gate: true },
              { t: "Record", d: "It logs what it saw and what it did, so there is a trail to review." }
            ] },
          { h: "What I checked", p: "11 of 11 automated tests pass. I verified real Jira tickets and Slack alerts end to end, and the human approval gate works on pause actions." },
          { h: "Five problems I solved", ol: [
            { b: "Detection dilution.", t: "Scanning the whole product hid drops that affected only one platform. I fixed it by narrowing to the affected platform before the trust check, not after." },
            { b: "Settings lost on deploy.", t: "Build-time environment variables were dropped. I switched to runtime configuration: a startup script writes the settings from Cloud Run's environment variables." },
            { b: "Secrets not updating.", t: "A secret's \"latest\" version is only read at deploy time, so updating it needs a new revision." },
            { b: "Confusing errors.", t: "Wrong API calls came back as web pages, because the app's fallback routing turned bad /api calls into HTML. That produced JSON errors that made no sense." },
            { b: "Broken secrets on Windows.", t: "PowerShell added a hidden carriage return to secrets when I piped them in. I wrote them to a temporary file instead." }
          ] },
          { h: "Stack", p: "FastAPI and React on Google Cloud Run, BigQuery, Firestore, Vertex AI (Gemini), Cloud Scheduler, Pub/Sub and Secret Manager, with Slack and Jira integrations." },
          { h: "What it shows", p: "This is product analyst work and not only an AI demo: funnel analysis, root-cause thinking, and designing the step from a decision to an action." }
        ]
      },
      links: [
        { label: "Case study", case: true },
        { label: "Live app", href: "https://product-sentinel-ui-308019468791.asia-south1.run.app/" },
        { label: "GitHub", href: "https://github.com/PurushottamSahni/product-sentinel" }
      ]
    },
    {
      id: "defi", category: "AI", year: 2026,
      title: "DeFi Analyst Terminal",
      summary: "A research terminal that explains DeFi data in plain language: live protocol TVL with a risk badge, and an Ethereum wallet analyzer.",
      results: ["Built solo in under 12 hours for the MeDo hackathon", "Live data from DefiLlama and Etherscan, with rule-based analyst commentary"],
      tools: ["MeDo", "DefiLlama API", "Etherscan API", "Rule-based engine"],
      links: [
        { label: "Live app", href: "https://app-brgixyu4ak1t.appmedo.com" },
        { label: "Screenshot", img: "assets/projects/defi-terminal.webp" }
      ]
    },
    {
      /* TODO: no link or screenshot yet. */
      id: "tradingbot", category: "AI", year: 2026,
      title: "Algo-trading bot: backtest to paper trade",
      summary: "A Python research bot for BTC, ETH and SOL: a multi-timeframe strategy, a backtester, and a paper-trading bot on Delta Exchange's test network.",
      results: ["Backtest: about +4% over 2.6 years", "After fees, GST and slippage the edge was roughly zero"],
      tools: ["Python", "Backtesting", "Monte Carlo simulation"],
      links: []
    },
    {
      /* TODO: no link or screenshot yet (the GitHub repo could be linked here). */
      id: "portfolio", category: "AI", year: 2026,
      title: "This portfolio, built with AI",
      summary: "Designed and built with Claude Code. The avatar video was rebuilt frame by frame from a Gemini clip.",
      results: ["239 video frames head-tracked with OpenCV", "A working SQL console over my own profile"],
      tools: ["Claude Code", "OpenCV", "JavaScript", "ffmpeg"],
      links: []
    },
    {
      id: "blinkit", category: "Data", year: 2024,
      title: "Blinkit Sales Dashboard",
      summary: "Sales, ratings and item mix for 8,523 grocery items, by outlet type, size and location.",
      results: ["₹1.20M in total sales, average rating 4.0", "Supermarket Type 1 outlets bring in ₹787.55K; Tier 3 cities lead at ₹472.13K"],
      tools: ["Power BI", "Excel"],
      links: [
        { label: "LinkedIn post", href: "https://www.linkedin.com/posts/dataanalystpurushottam-sahni_powerbi-dataanalytics-salesinsights-ugcPost-7272469449448857601-m475/" },
        { label: "Screenshot", img: "assets/projects/blinkit.webp" }
      ]
    },
    {
      /* TODO: add the LinkedIn post link if there is one. */
      id: "ola", category: "Data", year: 2024,
      title: "OLA Ride Analytics",
      summary: "Bookings, revenue, cancellations and ratings across seven vehicle types, built on a synthetic Bengaluru ride dataset.",
      results: ["103,024 bookings, of which 28% were cancelled", "₹35M successful booking value; cash and UPI make up about 95%"],
      tools: ["Power BI", "Excel"],
      links: [
        { label: "Screenshot", img: "assets/projects/ola.webp" }
      ]
    },
    {
      /* TODO: no link or screenshot yet. */
      id: "sentiment", category: "Data", year: 2025,
      title: "Reddit Sentiment: Tesla, Cars and Tech",
      summary: "Collected Reddit posts and their comments, cleaned the text, scored sentiment, and built a Power BI report.",
      results: ["126,728 comments from 300 posts in three subreddits", "43.7% positive, 33.2% neutral, 23.1% negative"],
      tools: ["Python", "PRAW", "NLTK", "Power BI"],
      links: []
    },
    {
      /* TODO: add the LinkedIn post link if there is one. */
      id: "healthcare", category: "Data", year: 2024,
      title: "Healthcare Dashboard",
      summary: "A Power BI report on hospital waiting lists by specialty, case type and age profile, 2018 to 2021.",
      results: ["709K people on the waiting list, up from 640K a year earlier", "Outpatient waiting list rising through 2018–2021"],
      tools: ["Power BI", "DAX", "Power Query"],
      links: [
        { label: "Screenshot", img: "assets/projects/healthcare.webp" }
      ]
    },
    {
      id: "profit", category: "Data", year: 2024,
      title: "Profit Analysis Dashboard",
      summary: "Sales, profit and unit-cost trends by quarter (Q4 2021 to Q2 2024), channel, category and region.",
      results: ["$55.4M in sales and $31.6M in profit from 15K orders", "Online is the top channel: $27.2M, against $13.5M in store"],
      tools: ["Google Sheets", "Looker Studio"],
      links: [
        { label: "LinkedIn post", href: "https://www.linkedin.com/posts/dataanalystpurushottam-sahni_profit-analysis-ugcPost-7202391257740943361--vRQ/" },
        { label: "Screenshot", img: "assets/projects/profit.webp" }
      ]
    },
    {
      id: "furniture", category: "Data", year: 2024,
      title: "US Furniture and Office Sales Report",
      summary: "A sales report for a US company selling home and office furniture, built with Google Sheets and Looker Studio.",
      results: ["10K orders, $2.3M in sales and $286.4K profit across 49 states", "Sales split by category, ship mode and sub-category, with profit by region"],
      tools: ["Google Sheets", "Looker Studio"],
      links: [
        { label: "LinkedIn post", href: "https://www.linkedin.com/posts/dataanalystpurushottam-sahni_sales-report-ugcPost-7204862139105234948-k2KK/" },
        { label: "Screenshot", img: "assets/projects/furniture.webp" }
      ]
    },
    {
      id: "coffee", category: "Data", year: 2024,
      title: "Coffee Shop Sales Dashboard",
      summary: "An Excel dashboard of sales, footfall and product mix across three New York stores.",
      results: ["$698.8K in sales and 149K footfall", "Coffee is 39% and tea 28% of sales; average bill $4.69"],
      tools: ["Excel"],
      links: [
        { label: "LinkedIn post", href: "https://www.linkedin.com/feed/update/urn:li:activity:7207376065587994625/" },
        { label: "Screenshot", img: "assets/projects/coffee.webp" }
      ]
    },
    {
      id: "ev", category: "Data", year: 2024,
      title: "Electric Vehicles in Washington State",
      summary: "Registrations by model year, make, model and state, with clean-fuel eligibility.",
      results: ["150,413 vehicles: 77.6% battery-electric, 22.4% plug-in hybrid", "Tesla leads with 52.7%; average electric range 67.83 miles"],
      tools: ["Tableau", "Excel"],
      links: [
        { label: "LinkedIn post", href: "https://www.linkedin.com/posts/dataanalystpurushottam-sahni_key-vehicle-trend-ugcPost-7208086215747653632-v2xo/" },
        { label: "Screenshot", img: "assets/projects/ev.webp" }
      ]
    },
    {
      id: "fnp", category: "Data", year: 2024,
      title: "Ferns & Patels Sales Analysis",
      summary: "An Excel dashboard of gift orders by occasion, category, hour, month and city, with date and occasion slicers.",
      results: ["₹3.52M revenue from 1,000 orders; ₹3,521 average spend", "Revenue peaks in August and February; Anniversary is the top occasion"],
      tools: ["Excel", "Pivot tables", "Slicers"],
      links: [
        { label: "LinkedIn post", href: "https://www.linkedin.com/posts/dataanalystpurushottam-sahni_dataanalytics-powerbi-excel-share-7271843740510486528-hWkd/" },
        { label: "Screenshot", img: "assets/projects/fnp.webp" }
      ]
    },
    {
      id: "netflix", category: "Data", year: 2024,
      title: "Netflix Content Analysis",
      summary: "Movies versus TV shows, ratings, top genres and releases over time.",
      results: ["6,234 titles: 68.4% movies and 31.6% TV shows", "Documentaries are the top genre (299 titles); TV-MA is the most common rating"],
      tools: ["Tableau"],
      links: [
        { label: "LinkedIn post", href: "https://www.linkedin.com/posts/dataanalystpurushottam-sahni_tableau-netflix-dataanalyst-share-7204358457980809217-IhbY/" },
        { label: "Screenshot", img: "assets/projects/netflix.webp" }
      ]
    }
  ],

  /* ---------- Skills ---------- */
  skills: [
    { group: "Query",     items: ["SQL (MySQL)", "Excel", "Google Sheets"] },
    { group: "Visualize", items: ["Power BI", "Looker Studio", "Tableau"] },
    { group: "Model",     items: ["Python (pandas)", "DAX", "Power Query"] },
    { group: "AI tools",  items: ["Claude", "ChatGPT", "Gemini", "Prompt engineering", "AI-assisted analytics", "LLM workflows"] },
    { group: "Business",  items: ["Market research", "Business analysis", "Product analytics", "Financial analytics"] }
  ],

  /* ---------- Certifications ----------
     featured: true → shown first; the rest appear under "Show all"
     file = PDF (opens in a new tab)   image = picture (opens in the viewer)   */
  certificates: [
    { featured: true, title: "Google AI Professional Certificate",             issuer: "Google · Coursera",     year: 2026, id: "0O9EYIJU37BI", verify: "https://coursera.org/verify/professional-cert/0O9EYIJU37BI", file: "assets/certs/google-ai-professional.pdf" },
    { featured: true, title: "Google Data Analytics Professional Certificate", issuer: "Google · Coursera",     year: 2025, id: "", verify: "https://www.credly.com/go/fU64Im2M", file: "assets/certs/google-data-analytics.pdf" },
    { featured: true, title: "Career Essentials in Data Analysis",             issuer: "Microsoft · LinkedIn",  year: 2025, id: "5eecd0fee135", verify: "https://www.linkedin.com/learning/certificates/5eecd0fee13574b52973036e2da0f5710627bc90485dfd10f652ecb3abbefe4d", file: "assets/certs/microsoft-career-essentials-data-analysis.pdf" },
    { featured: true, title: "SQL Essential Training",                         issuer: "LinkedIn Learning",     year: 2025, id: "", verify: "", file: "assets/certs/linkedin-sql-essential-training.pdf" },
    { title: "SQL for Data Analysis",                           issuer: "Codebasics",            year: 2024, id: "", verify: "", file: "assets/certs/codebasics-sql.pdf" },
    { title: "Business Analysis Foundations (IIBA)",            issuer: "LinkedIn Learning",     year: 2024, id: "", verify: "", file: "assets/certs/linkedin-business-analysis-foundations.pdf" },
    { title: "Excel for Data Analysis",                         issuer: "Codebasics",            year: 2023, id: "", verify: "", file: "assets/certs/codebasics-excel.pdf" },
    { title: "Python for Data Analytics",                       issuer: "Udemy",                 year: 2023, id: "UC-e54f19a1", verify: "https://ude.my/UC-e54f19a1-b38f-4b97-89d8-58f83b649628", image: "assets/certs/udemy-python-data-analytics.jpg" },
    { title: "Prompt Engineering for ChatGPT",                  issuer: "Vanderbilt · Coursera", year: 2023, id: "GYFJHKKNZ8Z9", verify: "https://coursera.org/verify/GYFJHKKNZ8Z9", file: "assets/certs/vanderbilt-prompt-engineering.pdf" },
    { title: "Power BI: Data Analytics Essentials",             issuer: "Udemy",                 year: 2022, id: "UC-bb7009f9", verify: "https://ude.my/UC-bb7009f9-071d-4f9f-a1f0-c82b269896c0", image: "assets/certs/udemy-power-bi.jpg" },
    { title: "Excel Data Visualization: 20+ Charts and Graphs", issuer: "LinkedIn Learning",     year: 2022, id: "", verify: "", file: "assets/certs/linkedin-excel-data-visualization.pdf" }
  ],

  badges: [
    { title: "Google Data Analytics",               image: "assets/badges/google-data-analytics.png" },
    { title: "Google AI Professional",              image: "assets/badges/google-ai-professional.png" },
    { title: "IBM Generative AI",                   image: "assets/badges/ibm-generative-ai.png" },
    { title: "Google Cloud: Generative AI",         image: "assets/badges/gcloud-generative-ai.png" },
    { title: "Google Cloud: Large Language Models", image: "assets/badges/gcloud-llms.png" },
    { title: "Google Cloud: Responsible AI",        image: "assets/badges/gcloud-responsible-ai.png" }
  ]
};
