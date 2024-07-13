import { pgTable, serial, text, integer } from "drizzle-orm/pg-core";

const courses = pgTable("courses", {
  id: serial("id").primaryKey().unique().notNull(),
  cid: text("cid").unique().notNull(),
  name: text("name").notNull(),
  dept: text("dept").notNull(),
  semester: integer("semester").notNull(),
});

export default courses;
