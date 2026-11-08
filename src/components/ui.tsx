"use client";

import { motion } from "framer-motion";
import type { ReactNode } from "react";

export function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function SectionHead({
  eyebrow,
  title,
  desc,
  align = "left",
}: {
  eyebrow: string;
  title: ReactNode;
  desc?: string;
  align?: "left" | "center";
}) {
  return (
    <Reveal className={align === "center" ? "text-center" : ""}>
      <p className="hud-label mb-3 flex items-center gap-2 justify-start data-[align=center]:justify-center" data-align={align}>
        <span className="inline-block h-1.5 w-1.5 bg-cyan-glow shadow-[0_0_8px_rgba(58,224,255,0.9)]" />
        {eyebrow}
      </p>
      <h2 className="font-display text-2xl font-extrabold uppercase leading-tight tracking-wide text-ink sm:text-4xl">
        {title}
      </h2>
      {desc && (
        <p className={`mt-4 max-w-2xl text-[15px] leading-relaxed text-fog ${align === "center" ? "mx-auto" : ""}`}>
          {desc}
        </p>
      )}
    </Reveal>
  );
}

export function StatChip({ label, value, gold = false }: { label: string; value: string; gold?: boolean }) {
  return (
    <div className={`hud-panel px-4 py-3 ${gold ? "hud-panel-gold" : ""}`}>
      <p className="font-mono text-[9px] tracking-[0.3em] text-dim">{label}</p>
      <p className={`font-display mt-1 text-lg font-bold ${gold ? "glow-gold" : "glow-cyan"}`}>
        {value}
      </p>
    </div>
  );
}
