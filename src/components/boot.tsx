"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const LINES = [
  "STARK_OS v5.0.77 — cold boot sequence",
  "Loading neural interface bridge ............ OK",
  "Calibrating compression heuristics [AVG SGPA 9.51] ... OK",
  "Peak recall profile detected [9.88 / 14-day cycle] ... OK",
  "Mounting protocol modules [37] ............. OK",
  "Arsenal blueprints indexed [6] ............. OK",
  "Startup engine ............................. STANDBY",
  "IDENTITY VERIFIED — WELCOME BACK, SIR.",
];

export default function Boot() {
  const [show, setShow] = useState(false);
  const [count, setCount] = useState(0);
  const timer = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    try {
      if (sessionStorage.getItem("pg-booted")) return;
    } catch {
      /* noop */
    }
    setShow(true);
    timer.current = setInterval(() => {
      setCount((c) => {
        if (c >= LINES.length) {
          if (timer.current) clearInterval(timer.current);
          setTimeout(() => {
            setShow(false);
            try {
              sessionStorage.setItem("pg-booted", "1");
            } catch {
              /* noop */
            }
          }, 620);
          return c;
        }
        return c + 1;
      });
    }, 210);
    return () => {
      if (timer.current) clearInterval(timer.current);
    };
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[100] flex items-center justify-center bg-abyss"
          exit={{ opacity: 0, filter: "blur(6px)" }}
          transition={{ duration: 0.55 }}
        >
          <div className="w-[min(90vw,560px)]">
            <div className="mb-6 flex items-center gap-3">
              <div className="h-2.5 w-2.5 rounded-full bg-cyan-glow shadow-[0_0_14px_rgba(58,224,255,0.9)]" />
              <span className="font-mono text-xs tracking-[0.4em] text-cyan-glow">
                J.A.R.V.I.S // BOOT
              </span>
            </div>
            <div className="font-mono text-[12.5px] leading-7 text-fog">
              {LINES.slice(0, count).map((line, i) => (
                <motion.p
                  key={line}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={i === LINES.length - 1 ? "glow-cyan font-bold" : ""}
                >
                  <span className="mr-3 text-cyan-glow/60">{String(i).padStart(2, "0")}</span>
                  {line}
                </motion.p>
              ))}
              <span className="animate-blink text-cyan-glow">▊</span>
            </div>
            <div className="mt-8 h-px w-full bg-cyan-glow/15">
              <motion.div
                className="h-px bg-cyan-glow shadow-[0_0_12px_rgba(58,224,255,0.8)]"
                animate={{ width: `${(Math.min(count, LINES.length) / LINES.length) * 100}%` }}
                transition={{ ease: "easeOut", duration: 0.25 }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
