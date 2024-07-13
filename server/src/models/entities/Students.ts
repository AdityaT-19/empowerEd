import { pgTable, serial, text, integer, real } from "drizzle-orm/pg-core";

const students = pgTable("students", {
  id: serial("id").primaryKey().unique().notNull(),
  usn: text("usn").unique().notNull(),
  name: text("name").notNull(),
  sem: integer("sem").notNull(),
  email: text("email").notNull(),
  dept: text("dept").notNull(),
  cgpa: real("cgpa").notNull(),
  section: text("section").notNull(),
  achievements: text("achievements").array().notNull(),
  counsel_rep: text("counsel_rep").array().notNull(),
});

export default students;
