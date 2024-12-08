import { setsTable, usersTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { Acl } from "@/features/authorization/types";
import { LanguageCode } from "@/lib/language_tools/types";
import { relations } from "drizzle-orm";
import { integer, json, pgTable, text, uuid } from "drizzle-orm/pg-core";

export const termsTable = pgTable("terms", {
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

export const progressesTable = pgTable("progresses", {
    id: uuid("id").primaryKey().defaultRandom().unique(),
    termid: uuid("termid").notNull().references(() => termsTable.id, { onDelete: "cascade" }),
    userid: text("userid").notNull().references(() => usersTable.id, { onDelete: "cascade" }),
    status: integer('status').default(0).notNull(),
    acl: json().$type<Acl>().notNull(),
    createdAt,
    updatedAt,
});

export const termsTableRelations = relations(termsTable, ({ one, many }) => ({
    set: one(setsTable, {
        fields: [termsTable.setid],
        references: [setsTable.id],
    }),
    progresses: many(progressesTable)

}));

export const progressesTableRelations = relations(progressesTable, ({ one }) => ({
    term: one(termsTable, {
        fields: [progressesTable.termid],
        references: [termsTable.id],
    }),
    user: one(usersTable, {
        fields: [progressesTable.userid],
        references: [usersTable.id],
    }),
}));




