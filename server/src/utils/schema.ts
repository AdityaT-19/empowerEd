import {
  pgTable,
  serial,
  text,
  varchar,
  date,
  time,
  boolean,
  integer,
  timestamp,
  real,
} from "drizzle-orm/pg-core";

export const admin = pgTable("admin", {
  id: serial("id").primaryKey().unique().notNull(),
  name: text("name").notNull(),
  dept: text("dept").notNull(),
  email: text("email").notNull(),
});

export const applications = pgTable("applications", {
  id: serial("id").primaryKey().unique().notNull(),
  usn: text("usn")
    .notNull()
    .references(() => students.usn),
  compid: integer("compid")
    .notNull()
    .references(() => company.id),
  status: text("status").notNull(),
});

export const attendance = pgTable("attendance", {
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

export const company = pgTable("company", {
  id: serial("id").primaryKey().unique().notNull(),
  name: text("name").notNull(),
  ctc: text("ctc").notNull(),
  jobRole: text("jobRole").notNull(),
  jobLocation: text("jobLocation").notNull(),
  skills: text("skills").notNull(),
});

export const courses = pgTable("courses", {
  id: serial("id").primaryKey().unique().notNull(),
  cid: text("cid").unique().notNull(),
  name: text("name").notNull(),
  dept: text("dept").notNull(),
  semester: integer("semester").notNull(),
});

export const interview = pgTable("interview", {
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

export const placeCord = pgTable("place_cord", {
  id: serial("id").primaryKey().unique().notNull(),
  usn: text("usn")
    .notNull()
    .references(() => students.usn),
});

export const studCourse = pgTable("stud_course", {
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

export const students = pgTable("students", {
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

export const teacher = pgTable("teacher", {
  id: serial("id").primaryKey().unique().notNull(),
  tid: text("tid").unique().notNull(),
  name: text("name").notNull(),
  dept: text("dept").notNull(),
});

export const parent = pgTable("parent", {
  id: serial("id").primaryKey().unique().notNull(),
  name: text("name").notNull(),
  usn: text("usn")
    .notNull()
    .references(() => students.usn),
  phNo: text("ph_no").notNull(),
  email: text("email").notNull(),
});

export const teachCourse = pgTable("teach_course", {
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

// Students Table

// Teachers Table

// Placement Coordinator Table

// Courses Table

// Teach Course Table

// Company Table

// Interview Table

// Student Course Table

// Parent Table
