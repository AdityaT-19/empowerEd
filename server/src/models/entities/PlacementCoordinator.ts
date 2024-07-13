import { pgTable, serial, text, varchar, bigint } from "drizzle-orm/pg-core";
import { students } from "..";

const place_cord = pgTable("place_cord", {
  id: serial("id").primaryKey().unique().notNull(),
  usn: text("usn")
    .notNull()
    .references(() => students.usn),
});

export default place_cord;
