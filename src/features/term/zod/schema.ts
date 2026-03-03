import z from "zod";
import { languageCodes } from "../lib/constants";

export const languageCodesSchema = z.enum(languageCodes)

export const termFormSchema = z.object({
    term: z.object({
        content: z.string().min(1, { message: "Kifejezés megadása kötelező!" }),
        lang: languageCodesSchema
    }),
    definition: z.object({
        content: z.array(z.string().min(1, { message: "Definíció megadása kötelező!" })).min(1),
        lang: languageCodesSchema
    }),
    exampleSentence: z.string().nullable()

})