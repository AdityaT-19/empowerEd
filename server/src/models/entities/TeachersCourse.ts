import { pgTable, serial, text, varchar, bigint } from "drizzle-orm/pg-core";
import { teacher, courses } from "..";

const teachCourse = pgTable("teach_course", {
  id: serial("id").primaryKey().unique().notNull(),
  tid: text("tid")
    .notNull()
    .references(() => teacher.tid),
  cid: text("cid")
    .notNull()
    .unique()
    .references(() => courses.cid),
  section: text("section").notNull(),
});

export default teachCourse;
