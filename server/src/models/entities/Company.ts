import { pgTable, serial, text } from "drizzle-orm/pg-core";

const company = pgTable("company", {
  id: serial("id").primaryKey().unique().notNull(),
  name: text("name").notNull(),
  ctc: text("ctc").notNull(),
  jobRole: text("jobRole").notNull(),
  jobLocation: text("jobLocation").notNull(),
  skills: text("skills").notNull(),
});

export default company;
