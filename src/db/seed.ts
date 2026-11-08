import { sql } from "drizzle-orm";
import { db } from "@/db";
import { modules } from "@/db/schema";

type SeedModule = {
  phase: string;
  title: string;
  detail: string;
  deliverable: string;
  weeks: string;
  xp: number;
};

const SEED: SeedModule[] = [
  // ── PHASE 00 · CORE SYSTEMS ──────────────────────────────────────────
  {
    phase: "00",
    title: "Python, the AI-Era Way",
    detail:
      "Skip the 40-hour course. Write 30 tiny scripts — files, APIs, parsing, automation — and interrogate every line AI hands you until it stops feeling like magic.",
    deliverable: "30-script repo with brutally honest notes",
    weeks: "W1–W2",
    xp: 120,
  },
  {
    phase: "00",
    title: "Git & GitHub Fluency",
    detail:
      "Branch, PR, rebase, resolve. Your GitHub graph is your second transcript — recruiters read green squares faster than grade sheets.",
    deliverable: "Clean commit history on every repo from today",
    weeks: "W1",
    xp: 80,
  },
  {
    phase: "00",
    title: "Terminal, Linux & Environments",
    detail:
      "bash, ssh, pipes, permissions, venv/uv. The people who fear the terminal are the people the terminal replaces first.",
    deliverable: "One full no-GUI dev day, documented",
    weeks: "W2",
    xp: 80,
  },
  {
    phase: "00",
    title: "Reading & Debugging with the Suit",
    detail:
      "Stack traces, breakpoints, pdb, git bisect. AI writes; you root-cause. This single skill is 60% of a real engineering job.",
    deliverable: "10 public OSS good-first-issues fixed",
    weeks: "W3",
    xp: 140,
  },

  // ── PHASE 01 · DATA PIPELINES ────────────────────────────────────────
  {
    phase: "01",
    title: "NumPy & Vectorized Thinking",
    detail:
      "If you're writing loops over arrays, you're thinking in 2005. Matrices are the native tongue of everything you're about to build.",
    deliverable: "10 classic algorithms re-implemented loop-free",
    weeks: "W4",
    xp: 100,
  },
  {
    phase: "01",
    title: "Pandas on Ugly, Real Data",
    detail:
      "Kaggle datasets are groomed. The world's data is not. Missing values, cursed encodings, timezones — learn to enjoy the filth.",
    deliverable: "3 messy public datasets fully cleaned + profiled",
    weeks: "W4–W5",
    xp: 120,
  },
  {
    phase: "01",
    title: "SQL That Respects You Back",
    detail:
      "Joins, window functions, CTEs, EXPLAIN plans. Every company runs on SQL; almost no student is actually good at it.",
    deliverable: "50-question SQL gauntlet, timed",
    weeks: "W5",
    xp: 100,
  },
  {
    phase: "01",
    title: "EDA & Visual Storytelling",
    detail:
      "Charts that make a point, not a rainbow. One figure, one insight, one sentence a non-engineer understands.",
    deliverable: "1 EDA report that reads like a short story",
    weeks: "W6",
    xp: 100,
  },
  {
    phase: "01",
    title: "First Kaggle Blood",
    detail:
      "Enter one real competition. Copy the top notebooks line by line until you can predict their next move. Target: beat 75% of humanity.",
    deliverable: "Top-25% finish + public notebook",
    weeks: "W6–W7",
    xp: 160,
  },

  // ── PHASE 02 · ML CORE ───────────────────────────────────────────────
  {
    phase: "02",
    title: "Math: Just Enough to Be Dangerous",
    detail:
      "Linear algebra, probability, gradients — via 3Blue1Brown plus code, never theorem-proof hell. Intuition first, rigor on demand.",
    deliverable: "Visual cheat-sheet of the 12 core intuitions",
    weeks: "W8",
    xp: 140,
  },
  {
    phase: "02",
    title: "Classical ML with scikit-learn",
    detail:
      "Regression → trees → ensembles → SVM → clustering. 80% of industry ML is still this, and it trains in minutes, not eras.",
    deliverable: "Algorithm zoo notebook with when/why for each",
    weeks: "W8–W10",
    xp: 180,
  },
  {
    phase: "02",
    title: "Feature Engineering & Leakage Discipline",
    detail:
      "Models are dumb; features are the intelligence. Learn to smell data leakage — the silent killer of every beginner's Kaggle dreams.",
    deliverable: "Leakage horror-story writeup from your own bug",
    weeks: "W10",
    xp: 120,
  },
  {
    phase: "02",
    title: "Evaluation as a Religion",
    detail:
      "Baselines before sophistication. Cross-validation, metric trade-offs, error analysis. 'It works' is not a number.",
    deliverable: "Eval harness you reuse on every project",
    weeks: "W11",
    xp: 140,
  },
  {
    phase: "02",
    title: "ML Flagship I — Deployed End-to-End",
    detail:
      "Placement/churn/demand predictor: data → model → FastAPI → live web UI → Docker. One URL a recruiter can poke at 2 a.m.",
    deliverable: "Deployed ML product + architecture diagram",
    weeks: "W11–W13",
    xp: 220,
  },
  {
    phase: "02",
    title: "ML Flagship II — Paper to Code",
    detail:
      "Pick one classic paper, reproduce its headline result. Reading papers is how you stop consuming hype and start seeing the matrix.",
    deliverable: "Reproduction repo + 'what the paper got wrong' notes",
    weeks: "W12–W13",
    xp: 200,
  },

  // ── PHASE 03 · DEEP LEARNING ─────────────────────────────────────────
  {
    phase: "03",
    title: "PyTorch Mechanics",
    detail:
      "Tensors, autograd, training loops, GPU discipline. The framework disappears; the thinking stays.",
    deliverable: "Training loop built from scratch, no trainer API",
    weeks: "W14",
    xp: 140,
  },
  {
    phase: "03",
    title: "Backprop by Hand (Exactly Once)",
    detail:
      "Build a micrograd-style autodiff toy. Suffer for two days, understand gradients forever. Then never do it again — like quantum physics before the time machine.",
    deliverable: "Toy autodiff engine + gradient-check tests",
    weeks: "W14–W15",
    xp: 160,
  },
  {
    phase: "03",
    title: "CNNs & Modern Vision",
    detail:
      "Augmentation, transfer learning, fine-tuning pretrained backbones. Standing on giants is a skill, not cheating.",
    deliverable: "Vision classifier beating pretrained baseline",
    weeks: "W15–W16",
    xp: 180,
  },
  {
    phase: "03",
    title: "Sequences → Attention → Transformers",
    detail:
      "Why RNNs died, what attention actually computes, positional encoding as an idea not a formula.",
    deliverable: "Attention mechanism coded from equations alone",
    weeks: "W16–W17",
    xp: 180,
  },
  {
    phase: "03",
    title: "Karpathy's Zero-to-Hero, Full Send",
    detail:
      "Build GPT from nothing alongside the series. Pause, predict, then play. This is the single highest-ROI week in modern AI education.",
    deliverable: "Your own from-scratch GPT + training curves",
    weeks: "W17–W19",
    xp: 220,
  },
  {
    phase: "03",
    title: "DL Flagship — Train Something Real",
    detail:
      "Custom dataset, real training run, deployed demo. Vision sign-language reader, campus-food classifier, code-music generator — your call, but it must be alive on the internet.",
    deliverable: "Live demo + model card + failure analysis",
    weeks: "W19–W21",
    xp: 260,
  },

  // ── PHASE 04 · GENAI OPERATIONS ──────────────────────────────────────
  {
    phase: "04",
    title: "LLM APIs as Engineering",
    detail:
      "Tokens, context windows, temperature, structured outputs, cost math. Prompting is 5% — the other 95% is engineering around the model.",
    deliverable: "Costed benchmark of 3 models on one task",
    weeks: "W22",
    xp: 140,
  },
  {
    phase: "04",
    title: "Embeddings & Vector Search",
    detail:
      "Semantics as geometry. Chunking strategy, similarity, pgvector/Qdrant. The quiet infrastructure behind every 'chat with X' product.",
    deliverable: "Semantic search over 10k documents",
    weeks: "W22–W23",
    xp: 140,
  },
  {
    phase: "04",
    title: "RAG, Production-Grade",
    detail:
      "Retrieval, reranking, citations, hallucination containment. Toy RAG is a weekend; trustworthy RAG is a moat.",
    deliverable: "RAG system with measured hallucination rate",
    weeks: "W23–W24",
    xp: 180,
  },
  {
    phase: "04",
    title: "Agents & Tool Use",
    detail:
      "Function calling, planners, retries, failure trees. An agent is a loop with judgment — learn where LoopsGPT dies and why.",
    deliverable: "Agent that automates one task you genuinely hate",
    weeks: "W24–W25",
    xp: 180,
  },
  {
    phase: "04",
    title: "Fine-Tune a Small Model",
    detail:
      "LoRA on a niche, defensible task. Small models with sharp beats are the startup weapon of the decade.",
    deliverable: "Fine-tune that beats the base model on your eval",
    weeks: "W25–W26",
    xp: 200,
  },
  {
    phase: "04",
    title: "Evals & Guardrails",
    detail:
      "Demos impress; evals ship. Adversarial inputs, regression suites, human review loops. This is the difference between a toy and a company.",
    deliverable: "Eval dashboard for your best GenAI project",
    weeks: "W26–W27",
    xp: 160,
  },

  // ── PHASE 05 · FULL-STACK SHIPPING ───────────────────────────────────
  {
    phase: "05",
    title: "TypeScript + React/Next.js",
    detail:
      "Languages are syntax; shipping is the skill. One frontend stack to fluency — components, state, server actions, streaming UI.",
    deliverable: "Rebuild your best ML demo as a real product UI",
    weeks: "W28–W30",
    xp: 200,
  },
  {
    phase: "05",
    title: "FastAPI + Postgres",
    detail:
      "Typed APIs, background jobs, ORM discipline. Python pays you twice: models in, products out.",
    deliverable: "API with auth, rate limits, and tests",
    weeks: "W30–W31",
    xp: 160,
  },
  {
    phase: "05",
    title: "Docker & Deployment",
    detail:
      "Containers, envs, CI, one-command deploy. If it only runs on your laptop, it doesn't exist.",
    deliverable: "Every project repo has a working Dockerfile",
    weeks: "W31–W32",
    xp: 160,
  },
  {
    phase: "05",
    title: "Auth, Payments & the Boring Magic",
    detail:
      "Login, webhooks, Razorpay/Stripe, email. The unglamorous 20% that separates portfolios from businesses.",
    deliverable: "A page that can legally accept real money",
    weeks: "W32–W33",
    xp: 180,
  },
  {
    phase: "05",
    title: "Ship a Public SaaS Starter",
    detail:
      "Your reusable launchpad: landing, auth, dashboard, billing, deploy. Now every future idea is 2 weeks from revenue instead of 2 months.",
    deliverable: "Starter template + 1 real product built on it",
    weeks: "W33–W34",
    xp: 240,
  },

  // ── PHASE 06 · STARTUP ENGINE ────────────────────────────────────────
  {
    phase: "06",
    title: "Problem Journal — 30 Entries",
    detail:
      "Log every irritation that costs you or someone else time, money, or pride. Pain × frequency = gold. Thirty entries before you name a company.",
    deliverable: "30 scored entries in the Stark Lab",
    weeks: "W35–W36",
    xp: 200,
  },
  {
    phase: "06",
    title: "Ten Validation Interviews",
    detail:
      "Ask about past behavior, never opinions. 'Would you pay?' is fiction; 'What did you do last time it happened?' is data.",
    deliverable: "10 interview writeups with verbatim quotes",
    weeks: "W36–W37",
    xp: 200,
  },
  {
    phase: "06",
    title: "The 14-Day MVP",
    detail:
      "Top journal entry, smallest lovable solution, hard deadline. Cut features until you're embarrassed — then cut two more.",
    deliverable: "Live MVP with a real first user who isn't you",
    weeks: "W37–W39",
    xp: 260,
  },
  {
    phase: "06",
    title: "Launch & Learn Loop",
    detail:
      "Ship to 10 real users. Watch them. Weekly retention sketch. The product is a hypothesis; users are the peer review.",
    deliverable: "Weekly metrics log + 3 iteration writeups",
    weeks: "W39–W41",
    xp: 260,
  },
  {
    phase: "06",
    title: "The Decision Gate",
    detail:
      "Users returning? Someone paying? Pull the trigger — register, research, raise. Dead signal? Kill it fast and keep the XP. Both outcomes are wins.",
    deliverable: "Go/kill memo, written like an engineer",
    weeks: "W41+",
    xp: 300,
  },
];

let seeding = false;

export async function ensureSeeded() {
  if (seeding) return;
  seeding = true;
  try {
    const rows = await db
      .select({ count: sql<number>`count(*)::int` })
      .from(modules);
    if (rows[0]?.count === 0) {
      await db.insert(modules).values(
        SEED.map((m, i) => ({ ...m, sort: i + 1 })),
      );
    }
  } catch (err) {
    console.error("Seed failed:", err);
  } finally {
    seeding = false;
  }
}
