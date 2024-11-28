import { usersTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { Acl } from "@/features/authorization/types";
import { setsTable } from "@/features/set/drizzle/schema";
import { integer, json, pgTable, text, uuid } from "drizzle-orm/pg-core";
import { Word } from "../types";

export const termsTable = pgTable("terms", {
    id: uuid("id").primaryKey().defaultRandom(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
    acl: json().$type<Acl>().notNull(),
    term: json().$type<Word>().notNull(),
    definiton: json().$type<Word>().notNull(),
    createdAt,
    updatedAt,
});

export const progressesTable = pgTable("progresses", {
    id: uuid("id").primaryKey().defaultRandom(),
    termid: uuid("termid").notNull().references(() => termsTable.id, { onDelete: "cascade" }).unique(),
    userid: text("userid").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    status: integer('status').$type<0 | 1 | 2 | 3 | 4 | 5>().default(0).notNull(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});