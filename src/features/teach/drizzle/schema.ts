import { usersTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { pgTable, primaryKey, text, uuid, varchar } from "drizzle-orm/pg-core";

export const classesTable = pgTable("classes", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    name: varchar('name', { length: 120 }).notNull(),
    description: text("description"),
    createdAt,
    updatedAt,
});

export const classToUsersTable = pgTable("class_to_users", {
    teacherId: text("teacherid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    classId: uuid("classid").references(() => classesTable.id, { onDelete: "cascade" }).notNull(),
}, (t) => [primaryKey({ columns: [t.classId, t.teacherId] })],
);