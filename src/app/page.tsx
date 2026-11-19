import Image from "next/image";
import Link from "next/link";
import {
  ArrowRight,
  Brain,
  ChevronRight,
  Cpu,
  Flame,
  FlaskConical,
  Gauge,
  ShieldCheck,
  Workflow,
} from "lucide-react";
import ArcReactor from "@/components/arc-reactor";
import { Reveal, SectionHead, StatChip } from "@/components/ui";
import { DIAGNOSIS, LAWS, PHASES, SPLIT } from "@/data/content";
import { ensureSeeded } from "@/db/seed";
import { getVitals } from "@/lib/actions";

export const dynamic = "force-dynamic";

/** Logged pains needed to unlock the Decision Gate (keep in sync with /lab). */
const PATTERN_THRESHOLD = 30;

export default async function CommandDeck() {
  await ensureSeeded();
  const vitals = await getVitals();
  const pct = vitals.total === 0 ? 0 : Math.round((vitals.done / vitals.total) * 100);
  const C = 2 * Math.PI * 56;

  return (
    <div className="animate-flicker">
      {/* ── HERO ─────────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-0 opacity-[0.16]">
          <Image src="/images/circuit.jpg" alt="" fill priority sizes="100vw" className="object-cover" />
          <div className="absolute inset-0 bg-gradient-to-b from-abyss/40 via-transparent to-abyss" />
        </div>

        <div className="relative mx-auto grid max-w-7xl gap-14 px-5 pb-20 pt-16 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:items-center lg:pb-28 lg:pt-24">
          <div>
            <Reveal>
              <p className="hud-label mb-5 flex items-center gap-3">
                <span className="inline-block h-1.5 w-1.5 animate-blink bg-cyan-glow shadow-[0_0_8px_rgba(58,224,255,0.9)]" />
                PROTOCOL v5.0 // SEM-V // AI-NATIVE EDITION
              </p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1 className="font-display text-[clamp(2.1rem,6vw,4.6rem)] font-black uppercase leading-[1.02] tracking-wide">
                Build the suit.
                <br />
                <span className="glow-cyan">Then build</span>
                <br />
                <span className="glow-gold">the company.</span>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p className="mt-6 max-w-xl text-[15.5px] leading-relaxed text-fog">
                You are a 9.51-SGPA brain running on two-week compression cycles, asking the only
                question that matters in 2026: <span className="text-ink">what is still worth learning
                when machines write the code?</span> This console is the answer — a Stark-grade protocol
                for ML, deep learning, GenAI, full-stack shipping, and a startup engine. In sprints.
                With receipts.
              </p>
            </Reveal>
            <Reveal delay={0.24}>
              <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link href="/protocol" className="hud-btn inline-flex items-center gap-2">
                  Initialize Protocol <ArrowRight className="h-4 w-4" />
                </Link>
                <Link href="/lab" className="hud-btn hud-btn-ghost inline-flex items-center gap-2">
                  <FlaskConical className="h-4 w-4" /> Open Stark Lab
                </Link>
              </div>
            </Reveal>
            <Reveal delay={0.32}>
              <div className="mt-10 grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                <StatChip label="AVG SGPA" value="9.51" />
                <StatChip label="PEAK SGPA" value="9.88" gold />
                <StatChip label="COMPRESSION" value="14D → 9.88" />
                <StatChip label="MODULES" value={String(vitals.total)} gold />
              </div>
            </Reveal>
          </div>

          {/* reactor visual */}
          <Reveal delay={0.2} className="relative mx-auto hidden lg:block">
            <div className="relative h-[460px] w-[460px]">
              <div className="absolute inset-[52px] overflow-hidden rounded-full border border-cyan-glow/20 animate-floaty">
                <Image src="/images/reactor.jpg" alt="" fill sizes="460px" className="object-cover opacity-90" />
                <div className="absolute inset-0 rounded-full shadow-[inset_0_0_60px_rgba(4,7,13,0.9)]" />
              </div>
              <div className="pointer-events-none absolute inset-0">
                <ArcReactor size={460} />
              </div>
              <span className="hud-chip absolute -left-4 top-16 animate-floaty bg-abyss/90">ML CORE</span>
              <span className="hud-chip absolute -right-6 top-40 animate-floaty bg-abyss/90 [animation-delay:1.2s]">GENAI OPS</span>
              <span className="hud-chip absolute bottom-24 -left-2 animate-floaty bg-abyss/90 [animation-delay:2s]">SHIP / WEEK</span>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── DIAGNOSIS ────────────────────────────────────────────────── */}
      <section className="border-t border-cyan-glow/10">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
          <SectionHead
            eyebrow={DIAGNOSIS.eyebrow}
            title={
              <>
                You are half right. <span className="glow-cyan">The half you&apos;re right about matters.</span>
              </>
            }
          />
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {DIAGNOSIS.body.map((p, i) => (
              <Reveal key={i} delay={i * 0.1}>
                <div className="hud-panel h-full p-6">
                  <p className="font-mono text-[10px] tracking-[0.3em] text-cyan-glow/70">
                    LOG 0{i + 1}
                  </p>
                  <p className="mt-3 text-[14.5px] leading-relaxed text-fog">{p}</p>
                </div>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.2}>
            <div className="hud-panel hud-panel-gold mt-6 flex flex-col items-start gap-4 p-6 sm:flex-row sm:items-center">
              <ShieldCheck className="h-8 w-8 shrink-0 text-gold" strokeWidth={1.5} />
              <p className="text-[15px] leading-relaxed text-fog">
                <span className="glow-gold font-bold">VERDICT:</span> Tony never mined the palladium
                or hand-soldered the Mark II — and he still knew exactly why the reactor worked,
                what would break it, and what to build next. That line between{" "}
                <span className="text-ink">the architect and the prompt-repeater</span> is where
                your entire career gets decided.
              </p>
            </div>
          </Reveal>
        </div>
      </section>

      {/* ── FIVE LAWS ────────────────────────────────────────────────── */}
      <section className="border-t border-cyan-glow/10 bg-[linear-gradient(180deg,rgba(58,224,255,0.02),transparent)]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
          <SectionHead
            eyebrow="OPERATING PRINCIPLES"
            title={
              <>
                The five laws of the <span className="glow-cyan">Stark Protocol</span>
              </>
            }
            desc="Every module in this system compiles down to these five laws. Violate them and you're studying. Obey them and you're compounding."
          />
          <div className="mt-12 grid gap-5 md:grid-cols-2 xl:grid-cols-3">
            {LAWS.map((law, i) => (
              <Reveal key={law.numeral} delay={i * 0.07} className={i === 0 ? "md:col-span-2 xl:col-span-1" : ""}>
                <div className="hud-panel group relative h-full overflow-hidden p-6">
                  <span className="pointer-events-none absolute -right-3 -top-7 font-display text-[7rem] font-black text-cyan-glow/[0.06] transition-all duration-500 group-hover:text-cyan-glow/[0.12]">
                    {law.numeral}
                  </span>
                  <p className="font-mono text-[9px] tracking-[0.32em] text-gold/80">LAW {law.numeral}</p>
                  <h3 className="font-display mt-2 text-[15px] font-bold tracking-wide text-ink">
                    {law.name}
                  </h3>
                  <p className="mt-3 text-[13.5px] leading-relaxed text-fog">{law.body}</p>
                  <p className="hud-chip mt-5">{law.metric}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── SUIT vs BRAIN ────────────────────────────────────────────── */}
      <section className="border-t border-cyan-glow/10">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
          <SectionHead
            eyebrow="RESOURCE ALLOCATION"
            title={
              <>
                What the suit does. <span className="glow-gold">What only you can.</span>
              </>
            }
            desc="The question isn't 'should I use AI' — it's 'what do I keep inside my own skull.' Allocate ruthlessly."
          />
          <div className="mt-12 grid gap-6 lg:grid-cols-2">
            <Reveal>
              <div className="hud-panel h-full p-7">
                <div className="flex items-center gap-3">
                  <Cpu className="h-6 w-6 text-cyan-glow" strokeWidth={1.5} />
                  <h3 className="font-display text-lg font-bold tracking-wider text-cyan-glow">
                    {SPLIT.suit.title}
                  </h3>
                </div>
                <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-dim">{SPLIT.suit.note}</p>
                <ul className="mt-6 space-y-3.5">
                  {SPLIT.suit.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-fog">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-cyan-glow/70" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
            <Reveal delay={0.12}>
              <div className="hud-panel hud-panel-gold h-full p-7">
                <div className="flex items-center gap-3">
                  <Brain className="h-6 w-6 text-gold" strokeWidth={1.5} />
                  <h3 className="font-display text-lg font-bold tracking-wider glow-gold">
                    {SPLIT.brain.title}
                  </h3>
                </div>
                <p className="mt-2 font-mono text-[11px] tracking-[0.14em] text-dim">{SPLIT.brain.note}</p>
                <ul className="mt-6 space-y-3.5">
                  {SPLIT.brain.items.map((item) => (
                    <li key={item} className="flex items-start gap-3 text-[14px] text-fog">
                      <ChevronRight className="mt-0.5 h-4 w-4 shrink-0 text-gold/80" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* ── LIVE VITALS ──────────────────────────────────────────────── */}
      <section className="border-t border-cyan-glow/10 bg-[linear-gradient(180deg,rgba(242,176,76,0.02),transparent)]">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
          <SectionHead
            eyebrow="LIVE TELEMETRY // POSTGRES-LINKED"
            title={
              <>
                Proof-of-work <span className="glow-cyan">vitals</span>
              </>
            }
            desc="This console is wired to a real database. Every module you complete and every pain you log updates this telemetry in real time."
          />
          <div className="mt-12 grid items-center gap-8 lg:grid-cols-[340px_1fr]">
            <Reveal className="mx-auto">
              <div className="relative h-[240px] w-[240px]">
                <svg
                  viewBox="0 0 128 128"
                  className="h-full w-full -rotate-90"
                  role="img"
                  aria-label={`Protocol sync ${pct}%`}
                >
                  <circle cx="64" cy="64" r="56" fill="none" stroke="rgba(58,224,255,0.1)" strokeWidth="7" />
                  <circle
                    cx="64" cy="64" r="56" fill="none"
                    stroke="url(#vitalGrad)" strokeWidth="7" strokeLinecap="round"
                    strokeDasharray={C}
                    strokeDashoffset={C - (C * pct) / 100}
                    className="transition-all duration-1000"
                  />
                  <defs>
                    <linearGradient id="vitalGrad" x1="0" y1="0" x2="1" y2="1">
                      <stop offset="0%" stopColor="#3ae0ff" />
                      <stop offset="100%" stopColor="#f2b04c" />
                    </linearGradient>
                  </defs>
                </svg>
                <div className="absolute inset-0 grid place-items-center">
                  <div className="text-center">
                    <p className="font-display text-4xl font-black glow-cyan">{pct}%</p>
                    <p className="font-mono text-[8.5px] tracking-[0.3em] text-dim">PROTOCOL SYNC</p>
                  </div>
                </div>
              </div>
            </Reveal>
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
              {[
                { icon: Workflow, label: "MODULES CLEARED", value: `${vitals.done}/${vitals.total}` },
                { icon: Gauge, label: "XP ACCUMULATED", value: `${vitals.xpEarned.toLocaleString()}`, sub: `of ${vitals.xpTotal.toLocaleString()}` },
                { icon: Flame, label: "SHIP STREAK", value: `${vitals.streak}D` },
                { icon: FlaskConical, label: "PAINS LOGGED", value: `${vitals.problems}/${PATTERN_THRESHOLD}` },
              ].map((s, i) => (
                <Reveal key={s.label} delay={i * 0.08}>
                  <div className="hud-panel h-full p-5">
                    <s.icon className="h-5 w-5 text-cyan-glow/80" strokeWidth={1.5} />
                    <p className="font-display mt-3 text-2xl font-bold text-ink">{s.value}</p>
                    {s.sub && <p className="font-mono text-[9px] text-dim">{s.sub}</p>}
                    <p className="mt-2 font-mono text-[8.5px] tracking-[0.24em] text-dim">{s.label}</p>
                  </div>
                </Reveal>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── PHASE PREVIEW ────────────────────────────────────────────── */}
      <section className="border-t border-cyan-glow/10">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-10">
          <div className="flex flex-wrap items-end justify-between gap-6">
            <SectionHead
              eyebrow="FLIGHT PLAN"
              title={
                <>
                  Seven phases. <span className="glow-cyan">Zero tutorial hell.</span>
                </>
              }
            />
            <Reveal>
              <Link href="/protocol" className="hud-btn hud-btn-ghost mb-1 inline-flex items-center gap-2">
                Full Protocol <ArrowRight className="h-4 w-4" />
              </Link>
            </Reveal>
          </div>
          <div className="mt-10 flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4">
            {PHASES.map((p, i) => (
              <Reveal key={p.code} delay={i * 0.05} className="snap-start">
                <Link
                  href="/protocol"
                  className="hud-panel group flex h-[230px] w-[270px] shrink-0 flex-col p-5 transition-transform duration-300 hover:-translate-y-1.5"
                >
                  <div className="flex items-center justify-between">
                    <span className="font-display text-3xl font-black text-cyan-glow/25 transition-colors group-hover:text-cyan-glow/60">
                      {p.code}
                    </span>
                    <span className="hud-chip">{p.span}</span>
                  </div>
                  <h3 className="font-display mt-3 text-sm font-bold tracking-wider text-ink">{p.name}</h3>
                  <p className="mt-1.5 font-mono text-[10px] leading-relaxed tracking-wide text-cyan-glow/60">
                    {p.focus}
                  </p>
                  <p className="mt-auto text-[12px] leading-relaxed text-fog">{p.tagline}</p>
                </Link>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ── MANIFESTO ────────────────────────────────────────────────── */}
      <section className="relative overflow-hidden border-t border-cyan-glow/10">
        <div className="pointer-events-none absolute inset-0 opacity-[0.1]">
          <Image src="/images/circuit.jpg" alt="" fill sizes="100vw" className="object-cover" />
        </div>
        <div className="relative mx-auto max-w-5xl px-5 py-28 text-center md:px-10">
          <Reveal>
            <p className="hud-label mb-6 inline-flex items-center gap-2">
              <span className="h-1.5 w-1.5 bg-gold shadow-[0_0_8px_rgba(242,176,76,0.9)]" />
              FINAL LOG
            </p>
            <p className="font-display text-[clamp(1.5rem,4.5vw,3.2rem)] font-black uppercase leading-tight tracking-wide">
              <span className="glow-cyan">&ldquo;Sometimes you gotta run</span>
              <br />
              <span className="glow-gold">before you can walk.&rdquo;</span>
            </p>
            <p className="mx-auto mt-6 max-w-xl text-[15px] leading-relaxed text-fog">
              The plan is armed. The reactor is lit. Sprint one starts today — not after the
              semester, not after one more playlist. <span className="text-ink">Today.</span>
            </p>
            <div className="mt-10 flex flex-wrap justify-center gap-4">
              <Link href="/protocol" className="hud-btn inline-flex items-center gap-2">
                Begin Phase 00 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link href="/trajectory" className="hud-btn hud-btn-ghost">
                View Trajectory
              </Link>
            </div>
          </Reveal>
        </div>
      </section>
    </div>
  );
}
