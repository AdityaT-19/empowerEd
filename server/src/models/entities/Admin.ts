import { pgTable, serial, text } from "drizzle-orm/pg-core";

const admin = pgTable("students", {
  id: serial("id").primaryKey().unique().notNull(),
  name: text("name").notNull(),
  dept: text("dept").notNull(),
  email: text("email").notNull(),
});

export default admin;
