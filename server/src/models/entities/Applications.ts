import { integer, pgTable, serial, text } from "drizzle-orm/pg-core";
import company from "./Company";
import students from "./Students";

const applications = pgTable("applications", {
  id: serial("id").primaryKey().unique().notNull(),
  usn: text("usn")
    .notNull()
    .references(() => students.usn),
  compid: integer("compid")
    .notNull()
    .references(() => company.id),
  status: text("status").notNull(),
});

export default applications;
