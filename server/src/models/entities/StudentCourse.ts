import { pgTable, serial, text, integer, real } from "drizzle-orm/pg-core";
import { courses, students } from "..";

const studCourse = pgTable("stud_course", {
  id: serial("id").primaryKey().unique().notNull(),
  usn: text("usn")
    .notNull()
    .references(() => students.usn),
  cid: text("cid")
    .notNull()
    .references(() => courses.cid),
  ia1: integer("ia1").notNull(),
  ia2: integer("ia2").notNull(),
  ia3: integer("ia3").notNull(),
  grade: text("grade").notNull(),
  attPer: real("att_per").notNull(),
});

export default studCourse;
