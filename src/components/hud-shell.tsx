"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState, type ReactNode } from "react";
import {
  FlaskConical,
  Hexagon,
  LayoutDashboard,
  Orbit,
  Rocket,
  Workflow,
} from "lucide-react";
import Boot from "@/components/boot";
import Particles from "@/components/particles";
import Jarvis from "@/components/jarvis";

const NAV = [
  { href: "/", label: "COMMAND", icon: LayoutDashboard },
  { href: "/protocol", label: "PROTOCOL", icon: Workflow },
  { href: "/arsenal", label: "ARSENAL", icon: Rocket },
  { href: "/lab", label: "STARK LAB", icon: FlaskConical },
  { href: "/trajectory", label: "TRAJECTORY", icon: Orbit },
];

function Clock() {
  const [now, setNow] = useState<Date | null>(null);
  useEffect(() => {
    setNow(new Date());
    const t = setInterval(() => setNow(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  if (!now) return <span className="font-mono text-xs text-dim">--:--:--</span>;
  return (
    <span className="font-mono text-xs tracking-[0.2em] text-fog tabular-nums">
      {now.toLocaleTimeString("en-GB", { hour12: false })}
      <span className="ml-2 hidden text-dim sm:inline">
        {now
          .toLocaleDateString("en-GB", { day: "2-digit", month: "short", year: "numeric" })
          .toUpperCase()}
      </span>
    </span>
  );
}

export default function HudShell({ children }: { children: ReactNode }) {
  const pathname = usePathname();

  return (
    <>
      <Boot />
      <Particles />

      {/* top status bar */}
      <header className="fixed inset-x-0 top-0 z-[60] border-b border-cyan-glow/10 bg-abyss/80 backdrop-blur-md">
        <div className="flex h-12 items-center justify-between gap-3 px-4 md:px-6">
          <Link href="/" className="group flex items-center gap-2.5">
            <span className="relative grid h-7 w-7 place-items-center">
              <Hexagon className="h-7 w-7 text-cyan-glow transition-transform duration-500 group-hover:rotate-90" strokeWidth={1.4} />
              <span className="absolute h-2 w-2 rounded-full bg-cyan-glow shadow-[0_0_10px_rgba(58,224,255,0.9)]" />
            </span>
            <span className="font-display text-[13px] font-bold tracking-[0.28em] text-ink">
              PROJECT<span className="text-cyan-glow">GENIUS</span>
            </span>
          </Link>
          <div className="hidden items-center gap-2 lg:flex">
            <span className="hud-chip">
              <span className="h-1.5 w-1.5 animate-blink rounded-full bg-cyan-glow" />
              SYSTEMS NOMINAL
            </span>
            <span className="hud-chip hidden xl:inline-flex">OPERATOR: B.TECH / CSE / SEM-V</span>
            <span className="hud-chip hidden xl:inline-flex text-[#ffe3b0] border-gold/30 bg-gold/5">
              AVG 9.51 · PEAK 9.88
            </span>
          </div>
          <Clock />
        </div>
      </header>

      {/* left rail — desktop */}
      <nav className="fixed bottom-0 left-0 top-12 z-[60] hidden w-[76px] flex-col items-center gap-1 border-r border-cyan-glow/10 bg-abyss/70 py-5 backdrop-blur-md md:flex">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex w-full flex-col items-center gap-1.5 py-3.5 transition-colors ${
                active ? "text-cyan-glow" : "text-dim hover:text-fog"
              }`}
            >
              {active && (
                <span className="absolute left-0 top-1/2 h-8 w-[2px] -translate-y-1/2 bg-cyan-glow shadow-[0_0_10px_rgba(58,224,255,0.9)]" />
              )}
              <Icon className="h-[19px] w-[19px]" strokeWidth={1.6} />
              <span className="font-mono text-[8px] tracking-[0.24em]">{item.label}</span>
            </Link>
          );
        })}
        <div className="mt-auto flex flex-col items-center gap-1 pb-1">
          <span
            className="font-mono text-[8px] tracking-[0.3em] text-dim/70"
            style={{ writingMode: "vertical-rl" }}
          >
            MARK-V // STARK PROTOCOL
          </span>
        </div>
      </nav>

      {/* bottom bar — mobile */}
      <nav className="fixed inset-x-0 bottom-0 z-[60] flex items-stretch justify-around border-t border-cyan-glow/10 bg-abyss/90 backdrop-blur-md md:hidden">
        {NAV.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center gap-1 px-3 py-2.5 ${
                active ? "text-cyan-glow" : "text-dim"
              }`}
            >
              <Icon className="h-[18px] w-[18px]" strokeWidth={1.6} />
              <span className="font-mono text-[7.5px] tracking-[0.18em]">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      <main className="relative z-10 pt-12 pb-20 md:pl-[76px] md:pb-0">{children}</main>

      <Jarvis />
    </>
  );
}
