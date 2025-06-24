import { termsTable } from "@/drizzle/schema";
import { Set } from "../set/types";
import { languageCodes } from "./lib/constants";

export type LanguageCode = typeof languageCodes[number]

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
