"use client";

import { useEffect, useRef } from "react";

type Speck = {
  x: number;
  y: number;
  r: number;
  vy: number;
  vx: number;
  a: number;
  gold: boolean;
  tw: number;
};

export default function Particles() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let raf = 0;
    let w = 0;
    let h = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const specks: Speck[] = [];
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    const resize = () => {
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      specks.length = 0;
      const n = Math.min(110, Math.floor((w * h) / 16000));
      for (let i = 0; i < n; i++) {
        specks.push({
          x: Math.random() * w,
          y: Math.random() * h,
          r: Math.random() * 1.5 + 0.4,
          vy: -(Math.random() * 0.16 + 0.03),
          vx: (Math.random() - 0.5) * 0.08,
          a: Math.random() * 0.5 + 0.15,
          gold: Math.random() < 0.14,
          tw: Math.random() * Math.PI * 2,
        });
      }
    };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (const s of specks) {
        s.y += s.vy;
        s.x += s.vx;
        s.tw += 0.02;
        if (s.y < -6) {
          s.y = h + 6;
          s.x = Math.random() * w;
        }
        if (s.x < -6) s.x = w + 6;
        if (s.x > w + 6) s.x = -6;
        const alpha = s.a * (0.65 + 0.35 * Math.sin(s.tw));
        ctx.beginPath();
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2);
        ctx.fillStyle = s.gold
          ? `rgba(242,176,76,${alpha})`
          : `rgba(88,210,255,${alpha})`;
        ctx.shadowColor = s.gold ? "rgba(242,176,76,0.8)" : "rgba(58,224,255,0.8)";
        ctx.shadowBlur = 6;
        ctx.fill();
        ctx.shadowBlur = 0;
      }
      if (!reduceMotion) raf = requestAnimationFrame(tick);
    };

    resize();
    seed();
    tick();
    const onResize = () => {
      resize();
      seed();
      if (reduceMotion) tick();
    };
    window.addEventListener("resize", onResize);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", onResize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      className="pointer-events-none fixed inset-0 -z-[5] opacity-70"
      aria-hidden
    />
  );
}
