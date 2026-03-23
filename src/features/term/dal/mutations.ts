"use server"

import { db } from "@/drizzle/db";
import { setsTable } from "@/drizzle/schema";
import { Dal } from "@/lib/dal";
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types";
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import { AzureKeyCredential, TextAnalyticsClient } from "@azure/ai-text-analytics";
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";
import { termsTable } from "../drizzle/schema";
import { LanguageCode, TermInput } from "../types";
import { hasMultipleWords } from "../utils";
import { languageCodesSchema, termFormSchema } from "../zod/schema";

export const createTerms = Dal.create()
    .$Input<[terms: Array<TermInput>, setid: string]>()
    .schema({
        input: z.tuple([z.array(termFormSchema), z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "term",
        action: "create",
    })
    .operation(async ({ input }) => {
        const [terms, setid] = input;

        await db.insert(termsTable).values(terms.map((term) => ({
            ...term,
            setid: setid,
            status: 0,
        })))

        revalidatePath(`sets/${setid}`, "page");
    })


export const deleteTerm = Dal.create()
    .$Input<[termid: string]>()
    .schema({
        input: z.tuple([z.string()]),
    })
    .authenticate()
    .authorize({
        resource: "term",
        action: "delete",
        data: async (termid) => (await db.query.termsTable.findFirst({ where: { id: termid }, with: { set: true } }))?.set
    })
    .operation(async ({ input }) => {
        const [termid] = input;
        const [term] = await db.delete(termsTable).where(eq(termsTable.id, termid)).returning()
        revalidatePath(`/sets/${term.setid}`)
    })


export const updateTerm = Dal.create()
    .$Input<[termid: string, newTerm: TermInput]>()
    .schema({
        input: z.tuple([z.string(), termFormSchema]),
    })
    .authenticate()
    .authorize({
        resource: "term",
        action: "update",
        data: async (termid) => (await db.query.termsTable.findFirst({ where: { id: termid }, with: { set: true } }))?.set
    })
    .operation(async ({ input }) => {
        const [termid, newTerm] = input
        const [term] = await db.update(termsTable).set(newTerm).where(eq(termsTable.id, termid)).returning()
        revalidatePath(`/sets/${term.setid}`)

    })


export const swapTerms = Dal.create()
    .$Input<[setid: string, preferredTermLang: LanguageCode, preferredDefinitionLang: LanguageCode]>()
    .schema({
        input: z.tuple([z.string(), languageCodesSchema, languageCodesSchema]),
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "update",
        data: async (setid) => db.query.setsTable.findFirst({ where: { id: setid } })
    })
    .operation(async ({ input }) => {
        const [setid, preferredTermLang, preferredDefinitionLang] = input

        const terms = await db.select().from(termsTable).where(eq(termsTable.setid, setid))

        await db.transaction(async (tx) => {

            await Promise.all(terms.map(({ term, definition, id }) => {

                const newDefinition = { ...term, content: term.content.split(", ") }
                const newTerm = { ...definition, content: definition.content.join(", ") }

                return tx.update(termsTable).set({ status: 0, term: newTerm, definition: newDefinition }).where(eq(termsTable.id, id))
            }))

            await tx.update(setsTable).set({ preferredTermLang: preferredDefinitionLang, preferredDefinitionLang: preferredTermLang }).where(eq(setsTable.id, setid))
        })


    })

export const updateProgress = Dal.create()
    .$Input<[setid: string, successTermsId: string[], wrongTermsId: string[]]>()
    .schema({
        input: z.tuple([z.string(), z.array(z.string()), z.array(z.string())]),
    })
    .authenticate()
    .operation(async ({ input }) => {

        const [setid, successTermsId, wrongTermsId] = input

        await db.transaction(async (tx) => {

            const promises1 = wrongTermsId.map(termid => tx.update(termsTable)
                .set({ status: sql`GREATEST(${termsTable}.status - 1, 0)`, lastReviewedAt: new Date() })
                .where(eq(termsTable.id, termid))
            )

            const promises2 = successTermsId.map(termid => tx.update(termsTable)
                .set({ status: sql`LEAST(${termsTable}.status + 1, 5)`, lastReviewedAt: new Date() })
                .where(eq(termsTable.id, termid))
            )

            await Promise.all([...promises1, ...promises2])
            await tx.update(setsTable).set({ updatedAt: new Date() }).where(eq(setsTable.id, setid))

        })


    })

export const langDetection = Dal.create()
    .$Input<[text: string]>()
    .schema({
        input: z.tuple([z.string()]),
        output: z.object({ lang: z.string() }),
    })
    .authenticate()

    .operation(async ({ input }) => {
        const key = process.env.AZURE_LANGUAGE_API_KEY as string;
        const endpoint = "https://langdetection2.cognitiveservices.azure.com";

        const [text] = input

        const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

        const [result] = await client.detectLanguage([text]);
        if (result.error) {
            return createErrorReturn({ type: "lang-detection-error", error: result.error.message })
        }


        return createSuccessReturn({ lang: result.primaryLanguage.iso6391Name })
    })

export const translate = Dal.create()
    .$Input<[from: string, to: string, text: string]>()
    .schema({
        input: z.tuple([z.string(), z.string(), z.string()]),
        output: z.object({
            from: z.string(),
            to: z.string(),
            translations: z.array(z.string())
        }),
    })
    .authenticate()
    .operation(async ({ input }) => {
        const apiKey = process.env.AZURE_TRANSLATATOR_API_KEY as string;
        const endpoint = "https://api.cognitive.microsofttranslator.com";
        const region = process.env.AZURE_REGION as string;

        const [from, to, text] = input

        if (from === to) return createErrorReturn({ type: 'identical-lang-inputs' })

        const translationClient = TextTranslationClient(endpoint, {
            key: apiKey,
            region,
        });

        const inputText = [{ text }];

        if (hasMultipleWords(text)) {

            const translateResponse = await translationClient.path("/translate").post({
                body: inputText,
                queryParameters: { to, from }
            });

            if (isUnexpected(translateResponse)) return createErrorReturn({ type: "translation-error", error: "Error during translation" })

            const { translations } = translateResponse.body[0];

            return createSuccessReturn({
                from, to,
                translations: translations.map(translation => translation.text)
            });
        }

        const translateResponse = await translationClient.path("/dictionary/lookup").post({
            body: inputText,
            queryParameters: { to, from }
        });

        if (isUnexpected(translateResponse)) return createErrorReturn({ type: "translation-error", error: "Error during translation" })

        const { translations } = translateResponse.body[0];

        return createSuccessReturn({
            from, to,
            translations: translations.map(translation => translation.normalizedTarget)
        });



    })
