"use client";

import { useState, useTransition } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { FlaskConical, Plus, Trash2 } from "lucide-react";
import type { Problem } from "@/db/schema";
import { addProblem, deleteProblem } from "@/lib/actions";

const DOMAINS = [
  "Campus Life", "Education", "Money / FinTech", "Health", "Productivity",
  "Hiring / Careers", "Hostel / Housing", "Food", "Creator Economy", "Dev Tools", "Other",
];

function resonance(pain: number, freq: number) {
  return pain * freq;
}

function ResonanceBadge({ score }: { score: number }) {
  const tier =
    score >= 64
      ? { label: "MVP CANDIDATE", cls: "border-gold/50 bg-gold/10 text-[#ffe3b0]" }
      : score >= 36
        ? { label: "VALIDATE", cls: "border-cyan-glow/40 bg-cyan-glow/[0.08] text-cyan-glow" }
        : { label: "KEEP LOGGING", cls: "border-dim/25 bg-abyss/40 text-dim" };
  return (
    <span className={`font-mono text-[9px] tracking-[0.18em] border px-2 py-1 ${tier.cls}`}>
      R:{score} · {tier.label}
    </span>
  );
}

function Meter({ label, value, gold }: { label: string; value: number; gold?: boolean }) {
  return (
    <span className="flex items-center gap-2">
      <span className="font-mono text-[8.5px] tracking-[0.2em] text-dim">{label}</span>
      <span className="flex gap-[3px]">
        {Array.from({ length: 10 }, (_, i) => (
          <span
            key={i}
            className={`h-2.5 w-[3px] ${
              i < value ? (gold ? "bg-gold" : "bg-cyan-glow") : "bg-dim/20"
            }`}
          />
        ))}
      </span>
      <span className="font-mono text-[9px] text-fog">{value}</span>
    </span>
  );
}

export default function LabBoard({ initial }: { initial: Problem[] }) {
  const [items, setItems] = useState(initial);
  const [title, setTitle] = useState("");
  const [domain, setDomain] = useState(DOMAINS[0]);
  const [pain, setPain] = useState(6);
  const [freq, setFreq] = useState(5);
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");
  const [pending, startTransition] = useTransition();

  const preview = resonance(pain, freq);
  const remaining = Math.max(0, 30 - items.length);

  const submit = () => {
    if (title.trim().length < 4) {
      setError("Give the pain a real name — 4+ characters.");
      return;
    }
    setError("");
    const optimistic: Problem = {
      id: Date.now(),
      title: title.trim(),
      domain,
      pain,
      frequency: freq,
      notes: notes.trim(),
      createdAt: new Date(),
    };
    setItems((xs) =>
      [...xs, optimistic].sort(
        (a, b) => resonance(b.pain, b.frequency) - resonance(a.pain, a.frequency),
      ),
    );
    startTransition(async () => {
      const res = await addProblem({ title: optimistic.title, domain, pain, frequency: freq, notes: notes.trim() });
      if (!res.ok) setError(res.error ?? "Failed to log entry.");
    });
    setTitle("");
    setNotes("");
  };

  const remove = (id: number) => {
    setItems((xs) => xs.filter((x) => x.id !== id));
    startTransition(async () => {
      await deleteProblem(id);
    });
  };

  return (
    <div className="grid gap-6 lg:grid-cols-[400px_1fr]">
      {/* entry console */}
      <div className="hud-panel h-fit p-6 lg:sticky lg:top-20">
        <div className="flex items-center gap-3">
          <FlaskConical className="h-5 w-5 text-gold" strokeWidth={1.5} />
          <h3 className="font-display text-sm font-bold tracking-[0.2em] text-ink">LOG A PAIN</h3>
        </div>
        <p className="mt-2 font-mono text-[10px] leading-relaxed tracking-[0.1em] text-dim">
          Something that costs you (or someone near you) time, money, or pride. Raw honesty &gt;
          startup-cosplay.
        </p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="hud-label mb-1.5 block">THE PAIN</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="e.g. Mess menu decided by one uncle's mood"
              className="w-full border border-cyan-glow/20 bg-abyss/60 px-3 py-2.5 text-[13px] text-ink placeholder:text-dim/50 focus:border-cyan-glow/60 focus:outline-none"
            />
          </div>
          <div>
            <label className="hud-label mb-1.5 block">DOMAIN</label>
            <select
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              className="w-full border border-cyan-glow/20 bg-abyss/60 px-3 py-2.5 text-[13px] text-ink focus:border-cyan-glow/60 focus:outline-none"
            >
              {DOMAINS.map((d) => (
                <option key={d} value={d} className="bg-panel">
                  {d}
                </option>
              ))}
            </select>
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="hud-label">PAIN INTENSITY</label>
              <span className="font-mono text-[11px] text-gold">{pain}/10</span>
            </div>
            <input
              type="range" min={1} max={10} value={pain}
              onChange={(e) => setPain(Number(e.target.value))}
              className="w-full accent-gold"
            />
          </div>
          <div>
            <div className="mb-1.5 flex items-center justify-between">
              <label className="hud-label">HOW OFTEN IT STRIKES</label>
              <span className="font-mono text-[11px] text-cyan-glow">{freq}/10</span>
            </div>
            <input
              type="range" min={1} max={10} value={freq}
              onChange={(e) => setFreq(Number(e.target.value))}
              className="w-full accent-cyan-glow"
            />
          </div>
          <div>
            <label className="hud-label mb-1.5 block">FIELD NOTES (WHO, WHEN, WHAT IT COSTS)</label>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              rows={3}
              placeholder="Who suffers? How did they cope last time? Would they pay to make it stop?"
              className="w-full resize-none border border-cyan-glow/20 bg-abyss/60 px-3 py-2.5 text-[13px] text-ink placeholder:text-dim/50 focus:border-cyan-glow/60 focus:outline-none"
            />
          </div>

          <div className="flex items-center justify-between border border-gold/25 bg-gold/[0.05] px-3 py-2.5">
            <span className="font-mono text-[9px] tracking-[0.24em] text-dim">RESONANCE FORECAST</span>
            <ResonanceBadge score={preview} />
          </div>

          {error && <p className="font-mono text-[11px] text-stark">{error}</p>}

          <button
            onClick={submit}
            disabled={pending}
            className="hud-btn flex w-full items-center justify-center gap-2 disabled:opacity-60"
          >
            <Plus className="h-4 w-4" /> Log to Journal
          </button>
        </div>
      </div>

      {/* journal */}
      <div>
        <div className="hud-panel hud-panel-gold mb-5 p-5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            <p className="font-mono text-[10px] tracking-[0.26em] text-dim">JOURNAL CAPACITY</p>
            <p className="font-mono text-[10px] tracking-[0.2em] text-[#ffe3b0]">
              {items.length}/30 — {remaining === 0 ? "PATTERN UNLOCKED: RUN THE DECISION GATE" : `${remaining} TO PATTERN THRESHOLD`}
            </p>
          </div>
          <div className="mt-3 h-1.5 w-full bg-gold/10">
            <motion.div
              className="h-full bg-gradient-to-r from-gold to-stark"
              animate={{ width: `${Math.min(100, (items.length / 30) * 100)}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <p className="mt-3 font-mono text-[10px] leading-relaxed tracking-[0.1em] text-dim">
            RESONANCE = PAIN × FREQUENCY. ≥64 earns validation interviews. ≥36 earns a second look.
            Below that, it was a rant — still worth logging.
          </p>
        </div>

        <div className="space-y-3">
          <AnimatePresence initial={false}>
            {items.length === 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="hud-panel grid h-40 place-items-center p-6 text-center"
              >
                <p className="max-w-sm font-mono text-[11px] leading-relaxed tracking-[0.12em] text-dim">
                  JOURNAL EMPTY. Tony noticed an empty cave and built the Mark I.
                  Log the first irritation that cost you something this week.
                </p>
              </motion.div>
            )}
            {items.map((p) => (
              <motion.article
                key={p.id}
                layout
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, x: 40 }}
                transition={{ duration: 0.3 }}
                className="hud-panel group p-5"
              >
                <div className="flex flex-wrap items-start justify-between gap-3">
                  <div className="min-w-0 flex-1">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="hud-chip">{p.domain}</span>
                      <ResonanceBadge score={resonance(p.pain, p.frequency)} />
                    </div>
                    <h4 className="mt-2.5 text-[15px] font-semibold text-ink">{p.title}</h4>
                    {p.notes && (
                      <p className="mt-1.5 text-[12.5px] leading-relaxed text-fog/90">{p.notes}</p>
                    )}
                  </div>
                  <button
                    onClick={() => remove(p.id)}
                    disabled={pending}
                    aria-label="Delete entry"
                    className="border border-dim/20 p-2 text-dim opacity-0 transition-all hover:border-stark/60 hover:text-stark group-hover:opacity-100"
                  >
                    <Trash2 className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="mt-3.5 flex flex-wrap items-center gap-5">
                  <Meter label="PAIN" value={p.pain} gold />
                  <Meter label="FREQ" value={p.frequency} />
                  <span className="ml-auto font-mono text-[9px] tracking-[0.2em] text-dim/70">
                    {p.createdAt
                      ? new Date(p.createdAt).toLocaleDateString("en-GB", {
                          day: "2-digit", month: "short", year: "numeric",
                        }).toUpperCase()
                      : "LOGGING…"}
                  </span>
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
