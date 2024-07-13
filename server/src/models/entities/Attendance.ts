import {
  pgTable,
  serial,
  text,
  date,
  time,
  boolean,
} from "drizzle-orm/pg-core";
import { students, courses } from "..";

const attendance = pgTable("attendance", {
  id: serial("id").primaryKey().unique().notNull(),
  usn: text("usn")
    .notNull()
    .references(() => students.usn),
  cid: text("cid")
    .notNull()
    .references(() => courses.cid),
  date: date("date").notNull(),
  hour: time("hour").notNull(),
  present: boolean("present").notNull(),
});

export default attendance;
