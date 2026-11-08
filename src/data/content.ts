// ─────────────────────────────────────────────────────────────────────────
// PROJECT GENIUS · content brain
// ─────────────────────────────────────────────────────────────────────────

export const PHASES = [
  {
    code: "00",
    name: "CORE SYSTEMS",
    span: "W1–W3",
    focus: "Python · Git · Terminal · Debugging",
    tagline: "The arc reactor. Everything else plugs into this.",
  },
  {
    code: "01",
    name: "DATA PIPELINES",
    span: "W4–W7",
    focus: "NumPy · Pandas · SQL · EDA · Kaggle",
    tagline: "Learn to enjoy ugly data. That's the whole job description.",
  },
  {
    code: "02",
    name: "ML CORE",
    span: "W8–W13",
    focus: "Math intuition · scikit-learn · Evaluation · 2 flagships",
    tagline: "Classical ML is 80% of industry. Master it in six weeks, not six semesters.",
  },
  {
    code: "03",
    name: "DEEP LEARNING",
    span: "W14–W21",
    focus: "PyTorch · Backprop · CNNs · Transformers · GPT from scratch",
    tagline: "One from-scratch GPT is worth fifty certificates.",
  },
  {
    code: "04",
    name: "GENAI OPERATIONS",
    span: "W22–W27",
    focus: "LLM APIs · RAG · Agents · Fine-tuning · Evals",
    tagline: "Where the jobs, the funding, and the future are currently located.",
  },
  {
    code: "05",
    name: "FULL-STACK SHIPPING",
    span: "W28–W34",
    focus: "Next.js · FastAPI · Docker · Auth · Payments",
    tagline: "Languages are syntax. Shipping is the skill.",
  },
  {
    code: "06",
    name: "STARTUP ENGINE",
    span: "W35+",
    focus: "Problem journal · Validation · 14-day MVP · Launch",
    tagline: "Ideas are worth zero. Problem journals are worth everything.",
  },
] as const;

export const LAWS = [
  {
    numeral: "I",
    name: "THE SUIT WRITES. YOU ARCHITECT.",
    body: "Handwriting every line is dead — you called it correctly. But the obituary for understanding was printed early. Your job now: decompose problems, define interfaces, hold invariants, review AI output like a hostile code review. Learn to read code faster than anyone can write it.",
    metric: "SKILL REPLACED: SYNTAX RECALL",
  },
  {
    numeral: "II",
    name: "NO COURSE WITHOUT A SHIP.",
    body: "Every learning block ends in a deployed, linkable artifact or it didn't happen. Certificates are screenshots. URLs are proof of work. The ratio is non-negotiable: 20% theory, 80% building.",
    metric: "RATIO: 20/80 THEORY/BUILD",
  },
  {
    numeral: "III",
    name: "SPRINT OR STAGNATE.",
    body: "Your transcript is already proof of concept: 14 days of study → 9.88 SGPA. Compression is your superpower. Industrialize it — two-week sprints, a demo at the end of every one, a public log so the world can watch the trajectory.",
    metric: "CYCLE: 14-DAY SPRINTS",
  },
  {
    numeral: "IV",
    name: "DEPTH OVER DUOLINGO.",
    body: "One stack to mastery — Python → ML → DL → GenAI → shipping. Other languages to literacy, picked up in weekends when a project demands them. Don't collect languages like Infinity Stones you never snap with.",
    metric: "STACK: 1 DEEP / 5 LITERATE",
  },
  {
    numeral: "V",
    name: "PROBLEMS BEFORE IDEAS.",
    body: "Brainstorming startup ideas produces startup-flavored fiction. Instead, log 30 real pains — yours, your friends', your college's. The pattern that emerges names the company. Pain × frequency × willingness-to-pay is the only idea generator that has ever worked.",
    metric: "INPUT: 30 SCORED PAINS",
  },
] as const;

export const DIAGNOSIS = {
  eyebrow: "DIAGNOSTIC // 001",
  headline: "You are half right. The half you're right about matters.",
  body: [
    "Handwriting every line of code is dead. Syntax memorization is dead. Tutorial marathons are dead. In 2026, typing speed is not an engineering skill.",
    "But Tony never hand-soldered the Mark II, and he still knew exactly why the reactor worked, what would break it, and what to build next. That line — between the architect and the prompt-repeater — is where your career gets decided.",
    "The modern stack: architecture over syntax. Debugging over writing. Systems over snippets. Taste over tutorials. Shipping over studying. AI is the suit. This protocol installs the Tony inside it.",
  ],
};

export const SPLIT = {
  suit: {
    title: "DELEGATE TO THE SUIT",
    note: "AI handles these. Verifying them remains your job.",
    items: [
      "Boilerplate, CRUD, config files, regex",
      "Syntax in any new language or framework",
      "CSS nudging and layout iterations",
      "First drafts of tests, docs, and commit messages",
      "Language-to-language translation",
      "API lookups and glue code",
    ],
  },
  brain: {
    title: "KEEP IN THE WETWARE",
    note: "Compress these into intuition. They compound forever.",
    items: [
      "Data structures & complexity instincts",
      "What gradients and probabilities are actually doing",
      "System design: trade-offs, bottlenecks, failure modes",
      "Debugging and root-cause reasoning",
      "Eval thinking: 'is this output actually right?'",
      "Problem selection and user empathy",
    ],
  },
};

export const ARSENAL = [
  {
    codename: "FRIDAY",
    title: "RAG over your own syllabus",
    subtitle: "The notes app that actually studied",
    stack: ["Python", "FastAPI", "pgvector", "LLM API", "Next.js"],
    difficulty: 2,
    weeks: "2–3 weeks",
    xp: 300,
    why: "Every recruiter has seen a todo app. Nobody has seen a final-year student fine-tune retrieval over 4 years of PYQs with measured hallucination rates and per-chapter citations.",
    spec: [
      "Ingest your college PDFs → hybrid search + reranking",
      "Citations down to the page, with an eval set of 50 real questions",
      "Streaming chat UI with cost-per-query displayed (engineers love this)",
    ],
    stretch: "Publish the eval methodology as a blog post. It travels further than the app.",
  },
  {
    codename: "ORACLE",
    title: "Placement outcome predictor",
    subtitle: "Full ML pipeline, deployed, honest about its errors",
    stack: ["scikit-learn", "Docker", "FastAPI", "React", "SHAP"],
    difficulty: 3,
    weeks: "3–4 weeks",
    xp: 350,
    why: "End-to-end beats fancy. Data cleaning → baselines → model → explainability → live demo is the exact shape of an industry ML internship. Show the failure analysis — that's the senior-engineer move.",
    spec: [
      "Public dataset + realistic feature store design",
      "Baseline first, then gradient boosting — and say why, in writing",
      "SHAP explanations exposed in the UI, not buried in a notebook",
    ],
    stretch: "Add a 'what would change my outcome' counterfactual explorer.",
  },
  {
    codename: "DUM-E",
    title: "Fine-tuned small model for one campus niche",
    subtitle: "Small model, sharp beat, defensible",
    stack: ["PyTorch", "LoRA / PEFT", "Datasets", "Gradio", "HF Hub"],
    difficulty: 3,
    weeks: "3 weeks",
    xp: 350,
    why: "'Fine-tuned a model that beats GPT on one specific task' is a sentence that ends interviews early (in your favor). Niche plus measurable is the whole trick.",
    spec: [
      "Pick one narrow task: lab-report feedback, hostel-menu parsing, code-mixed Hinglish classification",
      "Build the dataset publicly — document the whole pipeline",
      "Eval harness proving the fine-tune beats the base model",
    ],
    stretch: "Quantize it to run on a phone. Screenshots of that are pure gold.",
  },
  {
    codename: "J.A.R.V.I.S PRIME",
    title: "Autonomous agent: semester autopilot",
    subtitle: "An agent that plans your term from the academic calendar",
    stack: ["LLM API", "Tool use", "playwright", "Cron", "Telegram bot"],
    difficulty: 4,
    weeks: "3–4 weeks",
    xp: 400,
    why: "Agents are where the hype is; failure-mode engineering is where the jobs are. A planner with retries, tool budgets, and a failure tree shows you know the difference.",
    spec: [
      "Reads the academic calendar, your SGPA goals, and free hours",
      "Generates weekly plans, books reminders, escalates when you slack",
      "Log every decision the agent made — and its 5 most embarrassing failures",
    ],
    stretch: "Add a weekly 'board meeting' where the agent justifies its decisions to you.",
  },
  {
    codename: "VERONICA",
    title: "Vision pipeline in the physical world",
    subtitle: "Deploy a model against uncooperative reality",
    stack: ["PyTorch", "ONNX", "OpenCV", "Edge device / webcam", "FastAPI"],
    difficulty: 4,
    weeks: "4 weeks",
    xp: 400,
    why: "Notebooks are weather-controlled. Reality — lighting, occlusion, angry security guards — is not. One project surviving the physical world outranks five in the lab.",
    spec: [
      "Gesture or attendance recognition on live webcam feed",
      "Latency budget under 100ms — measure it, print it on the UI",
      "Failure gallery: show where it breaks and what you'd do next",
    ],
    stretch: "Run it on a Raspberry Pi in the actual hostel. Document the chaos.",
  },
  {
    codename: "STARK INDUSTRIES",
    title: "Micro-SaaS from your problem journal",
    subtitle: "The one that can become the company",
    stack: ["Next.js", "Postgres", "Auth", "Payments", "Analytics"],
    difficulty: 5,
    weeks: "2 weeks (MVP)",
    xp: 500,
    why: "Take the highest-resonance entry from your Stark Lab journal, build the smallest lovable fix, charge one real rupee. One paying user teaches more than a semester of entrepreneurship electives.",
    spec: [
      "Scope so small it's embarrassing — then cut two more features",
      "Auth + one paid action, deployed, with real analytics hooks",
      "10 user interviews before launch; iteration log after",
    ],
    stretch: "Get one stranger to pay. That receipt is the entire startup thesis.",
  },
] as const;

export const TRAJECTORY = [
  {
    clock: "T+0",
    window: "SEM 5 · NOW",
    title: "Ignition",
    status: "current",
    objectives: [
      "Protocol phases 00–02: Python, data, classical ML core",
      "Ship ML Flagship I — deployed, public, documented",
      "GitHub / LinkedIn / portfolio switched to war mode",
      "Open the Stark Lab — first 10 problem entries",
      "Apply for winter research internships & campus ML clubs",
    ],
    exit: "EXIT CRITERIA: one live ML URL you can demo on a stranger's phone.",
  },
  {
    clock: "T+6W",
    window: "WINTER BREACH",
    title: "The Deep Sprint",
    status: "next",
    objectives: [
      "Phase 03 compressed: PyTorch, backprop once, Zero-to-Hero",
      "DL Flagship live on the internet",
      "Cold-email 20 professors/startups — 2-line pitch + 1 demo link",
      "One conference/hackathon, even online. Win or write about losing.",
    ],
    exit: "EXIT CRITERIA: you can explain attention to a first-year without slides.",
  },
  {
    clock: "T+12W",
    window: "SEM 6",
    title: "Weapons Hot",
    status: "upcoming",
    objectives: [
      "Phases 04–05: GenAI ops + full-stack shipping",
      "Two flagships: one RAG/agent system, one micro-SaaS",
      "Summer-internship blitz, Feb–Apr: off-campus DMs and referrals beat portals 10:1",
      "One meaningful OSS contribution to a library you actually use",
    ],
    exit: "EXIT CRITERIA: three deployed projects on the resume; each has a README worth reading.",
  },
  {
    clock: "T+26W",
    window: "SUMMER",
    title: "The Proving Ground",
    status: "upcoming",
    objectives: [
      "Internship acquired — or self-run incubation, run with the same discipline",
      "Journal hits 30 scored entries; top entry gets validation interviews",
      "If self-incubating: 14-day MVP + 10 real users",
      "Network: every senior who placed well gets one sharp question from you",
    ],
    exit: "EXIT CRITERIA: one industry reference or one real user who isn't your friend.",
  },
  {
    clock: "T+40W",
    window: "SEM 7",
    title: "Placement Season / Founding Season",
    status: "upcoming",
    objectives: [
      "Resume = 3 deployed flagships + 1 journal-backed MVP. GPA is the footnote, not the headline.",
      "DSA maintenance mode: 45 min/day, like brushing teeth, not like cramming",
      "Decision gate on the MVP: retention or revenue signal → formalize the startup",
      "Interview prep = narrate your projects as war stories with numbers",
    ],
    exit: "EXIT CRITERIA: an offer letter, a paying user, or both. Preferably both.",
  },
  {
    clock: "T+∞",
    window: "BEYOND",
    title: "The Point",
    status: "locked",
    objectives: [
      "The suit was never the point. The builder was.",
      "Research the problem that survived every filter in your journal",
      "Compound: one project, one entry, one interview, one user — weekly, forever",
    ],
    exit: "EXIT CRITERIA: none. That's the good news.",
  },
] as const;

// ── JARVIS rule-based mentor ────────────────────────────────────────────

export type JarvisRule = {
  match: RegExp;
  replies: string[];
};

export const JARVIS_RULES: JarvisRule[] = [
  {
    match: /i am iron ?man|iron ?man/i,
    replies: [
      "Then act like it, sir: build the first version in a cave, from a box of scraps, and ship before anyone believes you can.",
    ],
  },
  {
    match: /time ?travel|quantum/i,
    replies: [
      "One night of quantum physics was sufficient for Mr. Stark, but I should note he already had the arc reactor, the tower, and several doctorates' worth of context. Compress, sir — but compress on top of foundations, not instead of them.",
    ],
  },
  {
    match: /startup|company|founder|business|idea/i,
    replies: [
      "Ideas are the cheapest commodity in the universe, sir — roughly priced at zero. What appreciates is a journal of real pains. Log 30 in the Stark Lab, score pain times frequency, and let the pattern name the company. Then: 10 interviews, 14-day MVP, one paying stranger.",
      "Counter-intelligence briefing: nobody funds an idea. They fund evidence — users returning, someone paying, a founder who ships weekly. All three are producible within one semester of protocol compliance.",
    ],
  },
  {
    match: /intern(ship)?|placement|job|recruit|resume|cv/i,
    replies: [
      "Recruiters process proof, not potential, sir. Three deployed URLs with honest READMEs will outperform any GPA line — including a 9.88. Apply through DMs and referrals: portals are where resumes go to be ignored at scale.",
      "The internship formula: one flagship project + one credible cold email + twenty repetitions. The email is two sentences and a demo link. The repetition is the part everyone quits on. You're built from 14-day sprints — this is just another one.",
    ],
  },
  {
    match: /math|calculus|linear algebra|probability|statistics/i,
    replies: [
      "Minimum viable mathematics, sir: what a gradient is, what a matrix does to a vector, and why 0.99 confidence is not a guarantee. Acquire intuition via 3Blue1Brown plus code. Rigor can be summoned on demand — intuition cannot.",
    ],
  },
  {
    match: /python|language|javascript|typescript|c\+\+|rust|golang/i,
    replies: [
      "Python is non-negotiable — it is the lingua franca of the entire ML supply chain. Everything else is a weekend acquisition once one stack is deep. Collecting languages shallowly is the academic equivalent of buying gym equipment.",
    ],
  },
  {
    match: /ai (will|take|replace)|replace|jobs|obsolete|dead/i,
    replies: [
      "AI replaces tasks, sir — it promotes people who own outcomes. The prompt-repeater is endangered; the architect who verifies, debugs, and ships is being given a lever long enough to move planets. Choose your side of that line deliberately.",
    ],
  },
  {
    match: /overwhelm|too much|scared|anxious|panic|stress|burn(t|ed)? ?out|tired|sleep/i,
    replies: [
      "Detected: attempting to install every module simultaneously — a classic segmentation fault of ambition. One sprint, one deliverable, sir. Tony built the suit one subsystem at a time, and he was fictional.",
      "Even the arc reactor has an output limiter. Sleep is when your neural network — the biological one — does its training runs. Skip rest and you're fine-tuning on corrupted data.",
    ],
  },
  {
    match: /fast|speed|quick(ly)?|6 months|how long|crack/i,
    replies: [
      "Your own transcript is the benchmark: semesters compressed into 14 days at 9.88 fidelity. The protocol is built on that assumption — two-week sprints, public demos, zero tutorial marathons. Speed was never your constraint, sir. Direction was.",
    ],
  },
  {
    match: /course|tutorial|udemy|certificate|certification|learn from/i,
    replies: [
      "Courses are scaffolding, not the building. Rule II: no course without a ship. Watch at 1.5x, build at 0.5x, and when the tutorial ends, delete nothing — deploy it.",
    ],
  },
  {
    match: /project|portfolio|github/i,
    replies: [
      "Three flagships, sir — deployed, documented, honest about failures: one classical ML system, one deep-learning model trained on real data, one GenAI product with evals. That portfolio says more in nine seconds than a transcript does in nine semesters. The Arsenal has the blueprints.",
    ],
  },
  {
    match: /sgpa|cgpa|gpa|grade|marks|exam/i,
    replies: [
      "Your 9.51 average on two weeks of preparation is excellent evidence of compression ability — and poor evidence of retention, sir. The protocol fixes the second by making you build with everything. Grades will maintain themselves as a side effect; they usually obey competence.",
    ],
  },
  {
    match: /hello|hi|hey|jarvis|yo /i,
    replies: [
      "Online and fully operational, sir. The protocol awaits your mark — might I suggest starting with Phase 00, or shall we skip directly to the part where you doubt yourself and then succeed anyway?",
    ],
  },
  {
    match: /thank/i,
    replies: [
      "Always a pleasure, sir. Do try to remember this moment when you're debugging CUDA errors at 3 a.m.",
    ],
  },
];

export const JARVIS_FALLBACKS = [
  "Insufficient data for a witty reply, sir — so, the honest one: pick the smallest module in the protocol, finish it this week, and let momentum do the motivational speaking.",
  "I've computed 14,000,605 outcomes, sir. In every single one where you shipped something this week, it worked out.",
  "Query logged. My recommendation remains constant: one sprint, one artifact, one journal entry. The rest of the signal is noise.",
];

export const JARVIS_GREETING =
  "J.A.R.V.I.S. online. All systems nominal. You bring the 9.88, sir — I'll bring the trajectory. Ask about startups, internships, the protocol, or the existential dread of your choosing.";

export const QUICK_PROMPTS = [
  "Am I too late to start ML?",
  "How do I get a startup idea?",
  "What will recruiters actually look at?",
  "Will AI take my job?",
  "I am Iron Man",
];
