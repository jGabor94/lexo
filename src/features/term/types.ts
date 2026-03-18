import { termsTable } from "@/drizzle/schema";
import z from "zod";
import { Set } from "../set/types";
import { languageCodes } from "./lib/constants";
import { termFormSchema } from "./zod/schema";

export type LanguageCode = typeof languageCodes[number]
export type TermInput = z.infer<typeof termFormSchema>
export type HiddenMode = "terms" | "definitions" | null
export type Term = NonNullable<Set>["terms"][number];
export type InsertTerm = typeof termsTable.$inferInsert;
export type SelectTerm = typeof termsTable.$inferSelect;

export type TermContextType = {
    terms: Term[];
    dispatchOptimisticTerms: (action: OptimisticTermAction) => void;
};

export type OptimisticTermAction = {
    type: "delete",
    termid: string
} | {
    type: "update",
    termid: string,
    data: TermInput
}