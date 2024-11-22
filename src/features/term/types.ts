import { LanguageCode } from "@/lib/language_tools/types";
import { Mongoose_Progress } from "./models/ProgressModel";
import { Mongoose_Term } from "./models/TermModel";

export type TermRaw<T = {}> = Omit<Mongoose_Term, "_id" | "currentTime"> & { _id: string } & T
export type Term = TermRaw<{ progress: ProgressRaw }>
export type ProgressRaw = Omit<Mongoose_Progress, "_id" | "currentTime"> & { _id: string }

export type TermInput = {
    term: {
        content: string,
        lang: LanguageCode
    },
    definition: {
        content: string[],
        lang: LanguageCode
    }
}