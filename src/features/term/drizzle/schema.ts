import { tasksTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { setsTable } from "@/features/set/drizzle/schema";
import { usersTable } from "@/features/user/drizzle/schema";
import { integer, json, pgTable, text, unique, uuid } from "drizzle-orm/pg-core";
import { LanguageCode } from "../types";

export const termsTable = pgTable("terms", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
    term: json().$type<{
        content: string;
        lang: LanguageCode;
    }>().notNull(),
    definition: json().$type<{
        content: string[];
        lang: LanguageCode;
    }>().notNull(),
    exampleSentence: text("example_sentence"),
    createdAt,
    updatedAt,
});

export const progressesTable = pgTable("progresses", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    userId: text("userid").references(() => usersTable.id, { onDelete: "cascade" }).notNull(),
    termId: uuid("termid").references(() => termsTable.id, { onDelete: "cascade" }).notNull(),
    taskId: uuid("taskid").references(() => tasksTable.id, { onDelete: "cascade" }),
    status: integer('status').default(0).notNull(),
    attempts: integer('attempts').default(0).notNull(),
    createdAt,
    updatedAt,
}, (t) => [unique().on(t.userId, t.termId, t.taskId).nullsNotDistinct()]);








