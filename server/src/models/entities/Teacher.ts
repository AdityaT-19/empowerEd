import { pgTable, serial, text, varchar, bigint } from "drizzle-orm/pg-core";

const teacher = pgTable("teacher", {
  id: serial("id").primaryKey().unique().notNull(),
  tid: text("tid").notNull().unique(),
  name: text("name").notNull(),
  dept: text("dept").notNull(),
  email: text("email").notNull(),
});

export default teacher;
