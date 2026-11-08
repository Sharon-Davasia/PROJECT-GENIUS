"use client";

import { useMemo, useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ChevronDown, RotateCcw, Zap } from "lucide-react";
import type { Module } from "@/db/schema";
import { PHASES } from "@/data/content";
import { setModuleStatus } from "@/lib/actions";

const STATUS_STYLE: Record<string, { dot: string; text: string; label: string }> = {
  PENDING: { dot: "bg-dim/50", text: "text-dim", label: "STANDBY" },
  ACTIVE: { dot: "bg-cyan-glow shadow-[0_0_8px_rgba(58,224,255,0.9)] animate-blink", text: "text-cyan-glow", label: "IN PROGRESS" },
  DONE: { dot: "bg-gold shadow-[0_0_8px_rgba(242,176,76,0.9)]", text: "glow-gold", label: "CLEARED" },
};

function PhaseBlock({
  phase,
  items,
  onAdvance,
  onReset,
  pending,
  defaultOpen,
}: {
  phase: (typeof PHASES)[number];
  items: Module[];
  onAdvance: (m: Module) => void;
  onReset: (m: Module) => void;
  pending: boolean;
  defaultOpen: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const done = items.filter((m) => m.status === "DONE").length;

  return (
    <div className="hud-panel">
      <button
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center gap-4 p-5 text-left md:gap-6 md:p-6"
      >
        <span className="font-display text-3xl font-black text-cyan-glow/25 md:text-4xl">
          {phase.code}
        </span>
        <span className="min-w-0 flex-1">
          <span className="flex flex-wrap items-center gap-x-4 gap-y-1">
            <span className="font-display text-sm font-bold tracking-wider text-ink md:text-base">
              {phase.name}
            </span>
            <span className="hud-chip">{phase.span}</span>
          </span>
          <span className="mt-1 block truncate font-mono text-[10px] tracking-wide text-cyan-glow/60">
            {phase.focus}
          </span>
          <span className="mt-2 block h-[3px] w-full max-w-xs bg-cyan-glow/10">
            <motion.span
              className="block h-full bg-gradient-to-r from-cyan-glow to-gold"
              animate={{ width: `${items.length ? (done / items.length) * 100 : 0}%` }}
              transition={{ duration: 0.5 }}
            />
          </span>
        </span>
        <span className="font-mono text-[10px] tracking-[0.2em] text-dim">
          {done}/{items.length}
        </span>
        <ChevronDown
          className={`h-5 w-5 shrink-0 text-dim transition-transform duration-300 ${open ? "rotate-180" : ""}`}
        />
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            className="overflow-hidden"
          >
            <div className="border-t border-cyan-glow/10">
              {items.map((m) => {
                const st = STATUS_STYLE[m.status] ?? STATUS_STYLE.PENDING;
                return (
                  <div
                    key={m.id}
                    className={`group flex flex-col gap-3 border-b border-cyan-glow/[0.06] px-5 py-4 transition-colors last:border-0 md:flex-row md:items-center md:gap-5 md:px-6 ${
                      m.status === "DONE" ? "bg-gold/[0.03]" : "hover:bg-cyan-glow/[0.03]"
                    } ${pending ? "opacity-80" : ""}`}
                  >
                    <span className="flex items-center gap-2.5 md:w-24 md:shrink-0">
                      <span className={`h-2 w-2 shrink-0 rounded-full ${st.dot}`} />
                      <span className={`font-mono text-[9px] tracking-[0.2em] ${st.text}`}>{st.label}</span>
                    </span>
                    <div className="min-w-0 flex-1">
                      <p className={`text-[14.5px] font-semibold ${m.status === "DONE" ? "text-dim line-through decoration-gold/40" : "text-ink"}`}>
                        {m.title}
                      </p>
                      <p className="mt-1 text-[12.5px] leading-relaxed text-fog/90">{m.detail}</p>
                      <p className="mt-2 flex items-center gap-2 font-mono text-[10px] tracking-wide text-gold/75">
                        <Zap className="h-3 w-3" /> DELIVERABLE: {m.deliverable}
                      </p>
                    </div>
                    <div className="flex shrink-0 items-center gap-2 md:flex-col md:items-end">
                      <span className="hud-chip">{m.weeks}</span>
                      <span className="hud-chip text-[#ffe3b0] border-gold/30 bg-gold/5">+{m.xp} XP</span>
                      <div className="flex gap-2">
                        <button
                          disabled={pending || m.status === "DONE"}
                          onClick={() => onAdvance(m)}
                          className={`border px-3 py-1.5 font-mono text-[10px] tracking-[0.14em] transition-all ${
                            m.status === "DONE"
                              ? "cursor-default border-gold/40 text-gold"
                              : "border-cyan-glow/35 text-cyan-glow hover:bg-cyan-glow/10"
                          }`}
                        >
                          {m.status === "DONE" ? (
                            <span className="inline-flex items-center gap-1">
                              <Check className="h-3 w-3" /> CLEARED
                            </span>
                          ) : m.status === "ACTIVE" ? (
                            "MARK COMPLETE"
                          ) : (
                            "INITIALIZE"
                          )}
                        </button>
                        {m.status !== "PENDING" && (
                          <button
                            disabled={pending}
                            onClick={() => onReset(m)}
                            aria-label="Reset module"
                            className="border border-dim/30 px-2 py-1.5 text-dim transition-all hover:border-stark/60 hover:text-stark"
                          >
                            <RotateCcw className="h-3 w-3" />
                          </button>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function ModuleBoard({ initial }: { initial: Module[] }) {
  const [mods, setMods] = useState(initial);
  const [pending, startTransition] = useTransition();

  const mutate = (id: number, status: string) => {
    setMods((ms) => ms.map((m) => (m.id === id ? { ...m, status } : m)));
    startTransition(async () => {
      await setModuleStatus(id, status);
    });
  };

  const advance = (m: Module) => mutate(m.id, m.status === "PENDING" ? "ACTIVE" : "DONE");
  const reset = (m: Module) => mutate(m.id, "PENDING");

  const grouped = useMemo(
    () =>
      PHASES.map((p) => ({
        phase: p,
        items: mods.filter((m) => m.phase === p.code),
      })),
    [mods],
  );

  const doneAll = mods.filter((m) => m.status === "DONE").length;
  const xpEarned = mods.filter((m) => m.status === "DONE").reduce((s, m) => s + m.xp, 0);
  const xpTotal = mods.reduce((s, m) => s + m.xp, 0);
  const pct = mods.length ? Math.round((doneAll / mods.length) * 100) : 0;

  return (
    <div>
      {/* overall progress */}
      <div className="hud-panel mb-8 p-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <p className="hud-label">GLOBAL SYNC RATE</p>
            <p className="font-display mt-2 text-4xl font-black glow-cyan">{pct}%</p>
          </div>
          <div className="flex gap-6 font-mono text-[11px] tracking-widest text-dim">
            <span>MODULES <span className="text-ink">{doneAll}/{mods.length}</span></span>
            <span>XP <span className="glow-gold">{xpEarned.toLocaleString()}</span>/{xpTotal.toLocaleString()}</span>
          </div>
        </div>
        <div className="mt-4 h-1.5 w-full bg-cyan-glow/10">
          <motion.div
            className="h-full bg-gradient-to-r from-cyan-glow via-cyan-glow to-gold shadow-[0_0_12px_rgba(58,224,255,0.5)]"
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
        <p className="mt-3 font-mono text-[10px] tracking-[0.14em] text-dim">
          INSTRUCTION: one module ACTIVE at a time. Sprint it. Ship the deliverable. Advance.
        </p>
      </div>

      <div className="space-y-5">
        {grouped.map(({ phase, items }, i) => (
          <PhaseBlock
            key={phase.code}
            phase={phase}
            items={items}
            onAdvance={advance}
            onReset={reset}
            pending={pending}
            defaultOpen={i === 0}
          />
        ))}
      </div>
    </div>
  );
}
