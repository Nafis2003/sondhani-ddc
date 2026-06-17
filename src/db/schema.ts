import { pgTable, varchar, integer, boolean, bigint } from "drizzle-orm/pg-core";

export const patients = pgTable("patients", {
  id: varchar("id", { length: 255 }).primaryKey(),
  refId: varchar("ref_id", { length: 255 }).notNull(),
  name: varchar("name", { length: 255 }).notNull(),
  age: integer("age").notNull(),
  mobile: varchar("mobile", { length: 50 }).notNull(),
  date: varchar("date", { length: 50 }).notNull(),
  time: varchar("time", { length: 50 }).notNull(),
  hbsAg: varchar("hbs_ag", { length: 50 }).notNull(),
  hcv: varchar("hcv", { length: 50 }).notNull(),
  malaria: varchar("malaria", { length: 50 }).notNull(),
  hiv: varchar("hiv", { length: 50 }).notNull(),
  vdrl: varchar("vdrl", { length: 50 }).notNull(),
  bloodGlucose: varchar("blood_glucose", { length: 50 }).notNull(),
  createdAt: bigint("created_at", { mode: "number" }).notNull(),
  updatedAt: bigint("updated_at", { mode: "number" }).notNull().default(0),
  isDeleted: boolean("is_deleted").default(false).notNull(),
  synced: boolean("synced").default(true).notNull(),
});
