import { LanguageCode } from "@/lib/language_tools/types";
import { progressesTable } from "./drizzle/schema";
import { Mongoose_Progress } from "./models/ProgressModel";
import { Mongoose_Term } from "./models/TermModel";

export type TermRaw<T = {}> = Omit<Mongoose_Term, "_id" | "currentTime"> & { _id: string } & T
export type Term = TermRaw<{ progress: ProgressRaw }>
export type ProgressRaw = Omit<Mongoose_Progress, "_id" | "currentTime"> & { _id: string }

export type Word = {
    content: string;
    lang: LanguageCode;
}

export type TermInput = {
    term: Word,
    definition: Word
}

export type InsertProgress = typeof progressesTable.$inferInsert;
export type SelectProgress = typeof progressesTable.$inferSelect;