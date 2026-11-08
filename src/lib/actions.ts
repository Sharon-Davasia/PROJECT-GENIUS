"use server";

import { asc, desc, eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import { db } from "@/db";
import { modules, problems } from "@/db/schema";

const MODULE_STATUSES = new Set(["PENDING", "ACTIVE", "DONE"]);

function refresh() {
  revalidatePath("/");
  revalidatePath("/protocol");
  revalidatePath("/lab");
}

export async function setModuleStatus(id: number, status: string) {
  if (!Number.isInteger(id) || !MODULE_STATUSES.has(status)) {
    return { ok: false as const };
  }
  await db
    .update(modules)
    .set({
      status,
      completedAt:
        status === "DONE" ? new Date() : status === "PENDING" ? null : undefined,
    })
    .where(eq(modules.id, id));
  refresh();
  return { ok: true as const };
}

export async function addProblem(input: {
  title: string;
  domain: string;
  pain: number;
  frequency: number;
  notes: string;
}) {
  const title = (input.title ?? "").trim().slice(0, 160);
  const domain = (input.domain ?? "").trim().slice(0, 60) || "General";
  const notes = (input.notes ?? "").trim().slice(0, 1200);
  const pain = Math.min(10, Math.max(1, Math.round(input.pain) || 5));
  const frequency = Math.min(10, Math.max(1, Math.round(input.frequency) || 5));

  if (title.length < 4) return { ok: false as const, error: "Give the pain a real name." };

  await db.insert(problems).values({ title, domain, pain, frequency, notes });
  refresh();
  return { ok: true as const };
}

export async function deleteProblem(id: number) {
  if (!Number.isInteger(id)) return { ok: false as const };
  await db.delete(problems).where(eq(problems.id, id));
  refresh();
  return { ok: true as const };
}

// ── read helpers ──────────────────────────────────────────────────────────

export async function getModules() {
  return db.select().from(modules).orderBy(asc(modules.sort));
}

export async function getProblems() {
  return db
    .select()
    .from(problems)
    .orderBy(desc(sql`${problems.pain} * ${problems.frequency}`), desc(problems.createdAt));
}

export async function getVitals() {
  const all = await db.select().from(modules).orderBy(asc(modules.sort));
  const done = all.filter((m) => m.status === "DONE");
  const active = all.filter((m) => m.status === "ACTIVE");
  const xpEarned = done.reduce((s, m) => s + m.xp, 0);
  const xpTotal = all.reduce((s, m) => s + m.xp, 0);

  // streak: consecutive days (ending today/yesterday) with at least one completion
  const days = new Set(
    done
      .filter((m) => m.completedAt)
      .map((m) => m.completedAt!.toISOString().slice(0, 10)),
  );
  let streak = 0;
  const cursor = new Date();
  if (!days.has(cursor.toISOString().slice(0, 10))) {
    cursor.setDate(cursor.getDate() - 1);
  }
  while (days.has(cursor.toISOString().slice(0, 10))) {
    streak += 1;
    cursor.setDate(cursor.getDate() - 1);
  }

  const probRows = await db
    .select({ count: sql<number>`count(*)::int` })
    .from(problems);

  return {
    total: all.length,
    done: done.length,
    active: active.length,
    xpEarned,
    xpTotal,
    streak,
    problems: probRows[0]?.count ?? 0,
  };
}
