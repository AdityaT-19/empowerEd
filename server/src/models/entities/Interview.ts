import {
  pgTable,
  serial,
  text,
  varchar,
  bigint,
  timestamp,
  integer,
} from "drizzle-orm/pg-core";
import { company, students } from "../index.js";

const interview = pgTable("interview", {
  id: serial("id").primaryKey().unique().notNull(),
  compid: integer("compid")
    .notNull()
    .references(() => company.id),
  usn: text("usn")
    .notNull()
    .references(() => students.usn),
  start_time: timestamp("start_time").notNull(),
  end_time: timestamp("end_time").notNull(),
});

export default interview;
