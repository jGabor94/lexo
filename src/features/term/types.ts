import { LanguageCode } from "@/lib/language_tools/types";
import { Set } from "../set/types";
import { termsTable, progressesTable } from "@/drizzle/schema";

export type TermInput = {
    term: {
        content: string;
        lang: LanguageCode;
    },
    definition: {
        content: string[];
        lang: LanguageCode;
    }
}
export type HiddenMode = "terms" | "definitions" | null

export type Term = NonNullable<Set>["terms"][number];

export type InsertTerm = typeof termsTable.$inferInsert;
export type SelectTerm = typeof termsTable.$inferSelect;

export type InsertProgress = typeof progressesTable.$inferInsert;
export type SelectProgress = typeof progressesTable.$inferSelect;