import { integer, pgTable, serial, text, timestamp } from "drizzle-orm/pg-core";

export const modules = pgTable("modules", {
  id: serial("id").primaryKey(),
  phase: text("phase").notNull(),
  title: text("title").notNull(),
  detail: text("detail").notNull(),
  deliverable: text("deliverable").notNull(),
  weeks: text("weeks").notNull(),
  xp: integer("xp").notNull().default(100),
  sort: integer("sort").notNull().default(0),
  status: text("status").notNull().default("PENDING"), // PENDING | ACTIVE | DONE
  completedAt: timestamp("completed_at", { withTimezone: true }),
});

export const problems = pgTable("problems", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  domain: text("domain").notNull(),
  pain: integer("pain").notNull().default(5),
  frequency: integer("frequency").notNull().default(5),
  notes: text("notes").notNull().default(""),
  createdAt: timestamp("created_at", { withTimezone: true })
    .notNull()
    .defaultNow(),
});

export type Module = typeof modules.$inferSelect;
export type Problem = typeof problems.$inferSelect;
