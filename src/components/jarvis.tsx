"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Minus, SendHorizonal, Zap } from "lucide-react";
import { JARVIS_FALLBACKS, JARVIS_GREETING, JARVIS_RULES, QUICK_PROMPTS } from "@/data/content";

type Msg = { role: "user" | "jarvis"; text: string };

const replyUse = new Map<string, number>();
let fallbackIdx = 0;

function answer(query: string): string {
  for (const rule of JARVIS_RULES) {
    if (rule.match.test(query)) {
      const key = rule.match.source;
      const used = replyUse.get(key) ?? 0;
      const reply = rule.replies[used % rule.replies.length];
      replyUse.set(key, used + 1);
      return reply;
    }
  }
  const reply = JARVIS_FALLBACKS[fallbackIdx % JARVIS_FALLBACKS.length];
  fallbackIdx += 1;
  return reply;
}

export default function Jarvis() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>([{ role: "jarvis", text: JARVIS_GREETING }]);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timers = useRef<ReturnType<typeof setInterval>[]>([]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: "smooth" });
  }, [messages, typing, open]);

  useEffect(() => () => timers.current.forEach(clearInterval), []);

  const send = (raw: string) => {
    const text = raw.trim();
    if (!text || typing) return;
    setMessages((m) => [...m, { role: "user", text }]);
    setInput("");
    setTyping(true);

    const full = answer(text);
    let i = 0;
    setMessages((m) => [...m, { role: "jarvis", text: "" }]);
    const t = setInterval(() => {
      i += 2;
      const slice = full.slice(0, i);
      setMessages((m) => {
        const copy = [...m];
        copy[copy.length - 1] = { role: "jarvis", text: slice };
        return copy;
      });
      if (i >= full.length) {
        clearInterval(t);
        setTyping(false);
      }
    }, 14);
    timers.current.push(t);
  };

  return (
    <>
      {/* launcher orb */}
      <motion.button
        onClick={() => setOpen((o) => !o)}
        aria-label="Open JARVIS"
        className="group fixed bottom-[72px] right-4 z-[90] grid h-14 w-14 place-items-center rounded-full md:bottom-6 md:right-6"
        whileHover={{ scale: 1.06 }}
        whileTap={{ scale: 0.94 }}
      >
        <span className="absolute inset-0 rounded-full border border-cyan-glow/40" />
        <span className="absolute inset-0 animate-ping rounded-full border border-cyan-glow/25 [animation-duration:2.6s]" />
        <span className="absolute inset-1 rounded-full bg-[radial-gradient(circle_at_50%_40%,rgba(58,224,255,0.35),rgba(6,14,24,0.95)_70%)] shadow-[0_0_26px_rgba(58,224,255,0.35)]" />
        <Zap className="relative h-5 w-5 text-cyan-glow transition-transform duration-300 group-hover:rotate-12" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 24, scale: 0.96 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            className="hud-panel fixed bottom-[140px] right-3 z-[90] flex h-[480px] w-[calc(100vw-24px)] max-w-[400px] flex-col md:bottom-[96px] md:right-6"
          >
            {/* header */}
            <div className="flex items-center justify-between border-b border-cyan-glow/12 px-4 py-3">
              <div className="flex items-center gap-2.5">
                <span className="relative grid h-7 w-7 place-items-center">
                  <span className="absolute inset-0 animate-pulse-core rounded-full bg-cyan-glow/20" />
                  <span className="h-2 w-2 rounded-full bg-cyan-glow shadow-[0_0_10px_rgba(58,224,255,0.9)]" />
                </span>
                <div>
                  <p className="font-display text-[11px] font-bold tracking-[0.3em] text-ink">
                    J.A.R.V.I.S
                  </p>
                  <p className="font-mono text-[8.5px] tracking-[0.24em] text-dim">
                    STRATEGIC ADVISOR // ONLINE
                  </p>
                </div>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="p-1 text-dim transition-colors hover:text-cyan-glow"
                aria-label="Minimize JARVIS"
              >
                <Minus className="h-4 w-4" />
              </button>
            </div>

            {/* messages */}
            <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
              {messages.map((m, i) => (
                <div key={i} className={m.role === "user" ? "flex justify-end" : "flex justify-start"}>
                  <div
                    className={
                      m.role === "user"
                        ? "max-w-[85%] border border-cyan-glow/25 bg-cyan-glow/10 px-3 py-2 text-[13px] leading-relaxed text-[#d8f4ff]"
                        : "max-w-[90%] border border-gold/20 bg-gold/[0.05] px-3 py-2 text-[13px] leading-relaxed text-fog"
                    }
                  >
                    {m.role === "jarvis" && (
                      <span className="mb-1 block font-mono text-[8px] tracking-[0.3em] text-gold/80">
                        J.A.R.V.I.S
                      </span>
                    )}
                    {m.text}
                    {m.role === "jarvis" && typing && i === messages.length - 1 && (
                      <span className="animate-blink text-cyan-glow">▊</span>
                    )}
                  </div>
                </div>
              ))}
              {typing && messages[messages.length - 1]?.text === "" && (
                <div className="flex gap-1.5 px-1 py-1">
                  {[0, 1, 2].map((d) => (
                    <span
                      key={d}
                      className="typing-dot h-1.5 w-1.5 rounded-full bg-cyan-glow"
                      style={{ animationDelay: `${d * 0.18}s` }}
                    />
                  ))}
                </div>
              )}

              {/* quick prompts */}
              {messages.length === 1 && (
                <div className="flex flex-wrap gap-2 pt-2">
                  {QUICK_PROMPTS.map((q) => (
                    <button
                      key={q}
                      onClick={() => send(q)}
                      className="border border-cyan-glow/20 bg-cyan-glow/[0.05] px-2.5 py-1.5 font-mono text-[10px] tracking-wide text-fog transition-all hover:border-cyan-glow/50 hover:text-cyan-glow"
                    >
                      {q}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* input */}
            <form
              onSubmit={(e) => {
                e.preventDefault();
                send(input);
              }}
              className="flex items-center gap-2 border-t border-cyan-glow/12 px-3 py-3"
            >
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask about startups, internships, the protocol…"
                className="flex-1 bg-transparent px-2 font-mono text-[12px] text-ink placeholder:text-dim/60 focus:outline-none"
              />
              <button
                type="submit"
                disabled={typing || !input.trim()}
                className="grid h-8 w-8 place-items-center border border-cyan-glow/30 text-cyan-glow transition-all hover:bg-cyan-glow/10 disabled:opacity-30"
                aria-label="Send"
              >
                <SendHorizonal className="h-4 w-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
