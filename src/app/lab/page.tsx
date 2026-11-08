import type { Metadata } from "next";
import LabBoard from "@/components/lab-board";
import { SectionHead } from "@/components/ui";
import { getProblems } from "@/lib/actions";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Stark Lab — PROJECT GENIUS",
  description:
    "The problem journal: 30 scored pains before you name a company. Pain × frequency = resonance. Resonance ≥ 64 earns a 14-day MVP.",
};

export default async function LabPage() {
  const problems = await getProblems();

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-14 md:px-10">
      <SectionHead
        eyebrow="STARK LAB // LAW V ENFORCEMENT"
        title={
          <>
            Ideas are worth zero. <span className="glow-gold">Pains are priceless.</span>
          </>
        }
        desc="You wanted to stop brainstorming and start finding ideas in real problems. Correct instincts. This journal is the machine for that: log every pain, score it, and when a pattern crosses resonance 64, Phase 06 takes over."
      />
      <div className="mt-12">
        <LabBoard key={problems.length} initial={problems} />
      </div>
    </div>
  );
}
