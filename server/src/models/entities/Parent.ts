import { pgTable, serial, text, varchar, bigint } from "drizzle-orm/pg-core";
import { students } from "..";

const parent = pgTable("parent", {
  id: serial("id").primaryKey().unique().notNull(),
  name: text("name").notNull(),
  usn: text("usn")
    .notNull()
    .references(() => students.usn),
  phNo: text("ph_no").notNull(),
  email: text("email").notNull(),
});

export default parent;
