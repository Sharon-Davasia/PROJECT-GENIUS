import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, CheckSquare, Lock } from "lucide-react";
import { Reveal, SectionHead } from "@/components/ui";
import { TRAJECTORY } from "@/data/content";

export const metadata: Metadata = {
  title: "Trajectory — PROJECT GENIUS",
  description:
    "The mission clock: Sem 5 ignition to placement season and the startup decision gate, with exit criteria for every stage.",
};

const STATUS_META: Record<string, { node: string; chip: string; label: string }> = {
  current: {
    node: "bg-cyan-glow shadow-[0_0_16px_rgba(58,224,255,0.9)]",
    chip: "border-cyan-glow/50 bg-cyan-glow/10 text-cyan-glow",
    label: "ACTIVE NOW",
  },
  next: {
    node: "bg-gold shadow-[0_0_12px_rgba(242,176,76,0.8)]",
    chip: "border-gold/50 bg-gold/10 text-[#ffe3b0]",
    label: "NEXT WINDOW",
  },
  upcoming: {
    node: "bg-dim/60",
    chip: "border-dim/30 bg-abyss/40 text-fog",
    label: "SCHEDULED",
  },
  locked: {
    node: "bg-dim/30",
    chip: "border-dim/20 bg-abyss/40 text-dim",
    label: "INFINITE",
  },
};

export default function TrajectoryPage() {
  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-14 md:px-10">
      <SectionHead
        eyebrow="MISSION CLOCK // T+0 = TODAY"
        title={
          <>
            Sem 5 to <span className="glow-cyan">founding season</span>
          </>
        }
        desc="The academic calendar is not a constraint — it's a launch rail. Internships, winter breaches, and placement season are fixed waypoints; the protocol threads through them. Every stage has exit criteria, because 'I worked hard' is not a checkpoint."
      />

      <div className="relative mt-14">
        {/* rail */}
        <div className="absolute bottom-4 left-[15px] top-2 w-px bg-gradient-to-b from-cyan-glow via-gold/60 to-dim/20 md:left-[19px]" />

        <div className="space-y-10">
          {TRAJECTORY.map((stage, i) => {
            const meta = STATUS_META[stage.status];
            const gold = stage.status === "next";
            return (
              <Reveal key={stage.clock} delay={i * 0.06}>
                <div className="relative pl-12 md:pl-16">
                  {/* node */}
                  <span className={`absolute left-2 top-7 h-4 w-4 rounded-full border-2 border-abyss md:left-3 ${meta.node}`}>
                    {stage.status === "current" && (
                      <span className="absolute inset-[-7px] animate-ping rounded-full border border-cyan-glow/50 [animation-duration:2.2s]" />
                    )}
                  </span>

                  <div className={`hud-panel p-6 md:p-7 ${gold ? "hud-panel-gold" : ""}`}>
                    <div className="flex flex-wrap items-center justify-between gap-3">
                      <div className="flex items-center gap-4">
                        <span className={`font-display text-2xl font-black md:text-3xl ${stage.status === "current" ? "glow-cyan" : gold ? "glow-gold" : "text-dim"}`}>
                          {stage.clock}
                        </span>
                        <div>
                          <p className="font-mono text-[10px] tracking-[0.3em] text-dim">{stage.window}</p>
                          <h3 className="font-display text-lg font-bold tracking-wide text-ink md:text-xl">
                            {stage.title}
                          </h3>
                        </div>
                      </div>
                      <span className={`font-mono text-[9px] tracking-[0.24em] border px-2.5 py-1.5 ${meta.chip}`}>
                        {stage.status === "locked" ? (
                          <span className="inline-flex items-center gap-1.5">
                            <Lock className="h-3 w-3" /> {meta.label}
                          </span>
                        ) : (
                          meta.label
                        )}
                      </span>
                    </div>

                    <ul className="mt-5 grid gap-2.5 md:grid-cols-2">
                      {stage.objectives.map((o) => (
                        <li key={o} className="flex items-start gap-2.5 text-[13.5px] leading-relaxed text-fog">
                          <CheckSquare className={`mt-0.5 h-4 w-4 shrink-0 ${gold ? "text-gold/70" : "text-cyan-glow/60"}`} />
                          {o}
                        </li>
                      ))}
                    </ul>

                    <div className="mt-5 border border-cyan-glow/15 bg-abyss/50 px-4 py-3">
                      <p className="font-mono text-[10px] leading-relaxed tracking-[0.14em] text-cyan-glow/80">
                        {stage.exit}
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>
            );
          })}
        </div>
      </div>

      <Reveal className="mt-14 text-center">
        <p className="font-mono text-[11px] tracking-[0.2em] text-dim">
          TELEMETRY SYNCED · THE CLOCK IS ALREADY RUNNING
        </p>
        <Link href="/protocol" className="hud-btn mt-6 inline-flex items-center gap-2">
          Return to Protocol <ArrowRight className="h-4 w-4" />
        </Link>
      </Reveal>
    </div>
  );
}
