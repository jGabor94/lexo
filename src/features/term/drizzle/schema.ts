import { createdAt, updatedAt } from "@/drizzle/schemaTypes";
import { setsTable } from "@/features/set/drizzle/schema";
import { integer, json, pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
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
    status: integer('status').default(0).notNull(),
    lastReviewedAt: timestamp('last_reviewed_at'),
    createdAt,
    updatedAt,
});







