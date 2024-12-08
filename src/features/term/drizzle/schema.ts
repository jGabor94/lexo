import { setsTable, users } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { Acl } from "@/features/authorization/types";
import { LanguageCode } from "@/lib/language_tools/types";
import { integer, json, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const termsTable = pgTable("term", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    setid: uuid("setid").references(() => setsTable.id, { onDelete: "cascade" }).notNull(),
    acl: json().$type<Acl>().notNull(),
    term: json().$type<{
        content: string;
        lang: LanguageCode;
    }>().notNull(),
    definition: json().$type<{
        content: string[];
        lang: LanguageCode;
    }>().notNull(),
    createdAt,
    updatedAt,
});

export const progressesTable = pgTable("progresse", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    termid: uuid("termid").notNull().references(() => termsTable.id, { onDelete: "cascade" }),
    userid: text("userid").notNull().references(() => users.id, { onDelete: "cascade" }),
    status: integer('status').default(0).notNull(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});




