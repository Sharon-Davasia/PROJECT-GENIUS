import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ModuleBoard from "@/components/module-board";
import { SectionHead, Reveal } from "@/components/ui";
import { ensureSeeded } from "@/db/seed";
import { getModules } from "@/lib/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "The Protocol — PROJECT GENIUS",
  description:
    "Seven phases, 37 modules, zero tutorial hell: Python, data, ML, deep learning, GenAI ops, full-stack shipping, and the startup engine.",
};

export default async function ProtocolPage() {
  await ensureSeeded();
  const mods = await getModules();

  return (
    <div className="mx-auto max-w-5xl px-5 pb-24 pt-14 md:px-10">
      <SectionHead
        eyebrow="THE STARK PROTOCOL // TRACKABLE"
        title={
          <>
            37 modules. <span className="glow-cyan">14-day sprints.</span>
          </>
        }
        desc="Every module ends in a shippable deliverable — that is Law II. Toggle a module ACTIVE when you start the sprint, CLEARED when its deliverable is live. Progress persists in the reactor core (Postgres)."
      />

      <Reveal className="mt-8">
        <div className="hud-panel hud-panel-gold flex flex-col gap-3 p-5 sm:flex-row sm:items-center">
          <p className="flex-1 text-[13.5px] leading-relaxed text-fog">
            <span className="glow-gold font-bold">SPRINT LAW:</span> your transcript already proved
            the hardware works — 9.88 on a 14-day compression cycle. This board simply points that
            same engine at the industry stack. One ACTIVE module at a time. No exceptions, sir.
          </p>
          <Link href="/lab" className="hud-btn hud-btn-ghost inline-flex items-center gap-2 whitespace-nowrap">
            Stark Lab <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </Reveal>

      <div className="mt-10">
        <ModuleBoard initial={mods} />
      </div>
    </div>
  );
}
