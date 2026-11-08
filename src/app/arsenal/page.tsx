import type { Metadata } from "next";
import { Clock3, Crosshair, Sparkles, Zap } from "lucide-react";
import { Reveal, SectionHead } from "@/components/ui";
import { ARSENAL } from "@/data/content";

export const metadata: Metadata = {
  title: "The Arsenal — PROJECT GENIUS",
  description:
    "Six industry-grade project blueprints that end interviews early: RAG systems, deployed ML, fine-tunes, agents, edge vision, and a revenue-capped micro-SaaS.",
};

function Difficulty({ level }: { level: number }) {
  return (
    <span className="flex items-center gap-1" title={`Difficulty ${level}/5`}>
      {Array.from({ length: 5 }, (_, i) => (
        <span
          key={i}
          className={`h-3 w-1.5 skew-x-[-12deg] ${
            i < level
              ? level >= 4
                ? "bg-gold shadow-[0_0_6px_rgba(242,176,76,0.7)]"
                : "bg-cyan-glow shadow-[0_0_6px_rgba(58,224,255,0.7)]"
              : "bg-dim/25"
          }`}
        />
      ))}
    </span>
  );
}

export default function ArsenalPage() {
  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-14 md:px-10">
      <SectionHead
        eyebrow="WEAPONS CACHE // 6 BLUEPRINTS"
        title={
          <>
            Projects that <span className="glow-cyan">end interviews early</span>
          </>
        }
        desc="Recruiters process proof, not potential. Each blueprint below is a full weapons system: build spec, stack, and the exact reason a hiring manager stops scrolling. Build three of these and your GPA becomes the footnote."
      />

      <div className="mt-12 grid gap-6 lg:grid-cols-2">
        {ARSENAL.map((p, i) => {
          const heavy = p.difficulty >= 4;
          return (
            <Reveal key={p.codename} delay={(i % 2) * 0.1}>
              <article
                className={`hud-panel group relative h-full overflow-hidden p-7 ${heavy ? "hud-panel-gold" : ""}`}
              >
                {/* ghost codename */}
                <span
                  className={`pointer-events-none absolute -bottom-6 -right-2 font-display text-[5.2rem] font-black uppercase leading-none tracking-tight ${
                    heavy ? "text-gold/[0.05]" : "text-cyan-glow/[0.05]"
                  } transition-all duration-500 group-hover:text-opacity-10`}
                >
                  {p.codename}
                </span>

                <div className="relative">
                  <div className="flex flex-wrap items-center justify-between gap-3">
                    <p className={`font-mono text-[10px] tracking-[0.3em] ${heavy ? "text-gold/80" : "text-cyan-glow/70"}`}>
                      UNIT :: {p.codename}
                    </p>
                    <Difficulty level={p.difficulty} />
                  </div>

                  <h3 className="font-display mt-3 text-xl font-extrabold uppercase tracking-wide text-ink">
                    {p.title}
                  </h3>
                  <p className="mt-1 font-mono text-[11px] tracking-wide text-dim">{p.subtitle}</p>

                  <div className="mt-4 flex flex-wrap gap-2">
                    {p.stack.map((s) => (
                      <span key={s} className="hud-chip">{s}</span>
                    ))}
                  </div>

                  <div className={`mt-5 border-l-2 py-1 pl-4 ${heavy ? "border-gold/50" : "border-cyan-glow/50"}`}>
                    <p className="font-mono text-[9px] tracking-[0.28em] text-dim">WHY IT WINS</p>
                    <p className="mt-1.5 text-[13.5px] leading-relaxed text-fog">{p.why}</p>
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {p.spec.map((s) => (
                      <li key={s} className="flex items-start gap-2.5 text-[13px] text-fog">
                        <Crosshair className={`mt-0.5 h-3.5 w-3.5 shrink-0 ${heavy ? "text-gold/70" : "text-cyan-glow/70"}`} />
                        {s}
                      </li>
                    ))}
                  </ul>

                  <div className="mt-5 flex items-start gap-2.5 border border-dim/15 bg-abyss/40 p-3.5">
                    <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-gold" />
                    <p className="text-[12.5px] leading-relaxed text-fog">
                      <span className="font-mono text-[9px] tracking-[0.24em] text-gold">STRETCH: </span>
                      {p.stretch}
                    </p>
                  </div>

                  <div className="mt-5 flex flex-wrap items-center gap-4 font-mono text-[10px] tracking-[0.16em] text-dim">
                    <span className="inline-flex items-center gap-1.5">
                      <Clock3 className="h-3.5 w-3.5" /> {p.weeks}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-[#ffe3b0]">
                      <Zap className="h-3.5 w-3.5 text-gold" /> +{p.xp} PORTFOLIO XP
                    </span>
                  </div>
                </div>
              </article>
            </Reveal>
          );
        })}
      </div>

      <Reveal className="mt-12">
        <div className="hud-panel p-6 text-center">
          <p className="font-mono text-[11px] leading-relaxed tracking-[0.14em] text-dim">
            PROCUREMENT RULE: build in this order — ORACLE → FRIDAY → STARK INDUSTRIES.
            <span className="text-ink"> Three deployed units = placement season handled.</span>
          </p>
        </div>
      </Reveal>
    </div>
  );
}
