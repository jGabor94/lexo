import { setsTable, usersTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { pgEnum, pgTable, primaryKey, text, timestamp, uuid, varchar } from "drizzle-orm/pg-core";
import { nanoid } from 'nanoid';

export const inviteTypeEnum = pgEnum("type", ["student", "teacher"]);

export const classesTable = pgTable("classes", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar('name', { length: 120 }).notNull(),
    description: text("description"),
    createdAt,
    updatedAt,
});

export const invitesTable = pgTable("invites", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    inviteId: varchar('inviteid', { length: 21 }).primaryKey().$defaultFn(() => nanoid()),
    classId: uuid("classid").references(() => classesTable.id, { onDelete: "cascade" }).notNull(),
    teacherId: text("teacherid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    email: varchar("email", { length: 255 }).notNull(),
    type: inviteTypeEnum().notNull(),
    createdAt,
    updatedAt,
});

export const tasksTable = pgTable("tasks", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    classId: uuid("classid").references(() => classesTable.id, { onDelete: "cascade" }).notNull(),
    name: varchar('name', { length: 120 }).notNull(),
    deadline: timestamp("deadline", { withTimezone: true }).notNull(),
    description: text("description"),
    createdAt,
    updatedAt,
});

export const classToTeachersTable = pgTable("class_to_teachers", {
    teacherId: text("teacherid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    classId: uuid("classid").references(() => classesTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.classId, t.teacherId] })],
);

export const classToStudentsTable = pgTable("class_to_students", {
    studentId: text("studentid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    classId: uuid("classid").references(() => classesTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.classId, t.studentId] })],
);

export const setToTaskTable = pgTable("set_to_tasks", {
    setId: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
    taskId: uuid("taskid").references(() => tasksTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.setId, t.taskId] })],
);