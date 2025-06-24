import { setsTable } from "@/drizzle/schema";
import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { Acl } from "@/features/authorization/types";
import { relations } from "drizzle-orm";
import { integer, json, pgTable, uuid } from "drizzle-orm/pg-core";
import { LanguageCode } from "../types";

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
    status: integer('status').default(0).notNull(),
    createdAt,
    updatedAt,
});

export const termsTableRelations = relations(termsTable, ({ one, many }) => ({
    set: one(setsTable, {
        fields: [termsTable.setid],
        references: [setsTable.id],
    }),
}));






