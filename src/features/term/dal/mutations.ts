"use server"

import { db } from "@/drizzle/db";
import { setsTable } from "@/drizzle/schema";
import { Dal } from "@/lib/dal";
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types";
import { openai } from '@ai-sdk/openai';
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import { AzureKeyCredential, TextAnalyticsClient } from "@azure/ai-text-analytics";
import { generateText, Output } from 'ai';
import { eq, sql } from "drizzle-orm";
import { revalidatePath } from "next/cache";
import z from "zod";
import { progressesTable, termsTable } from "../drizzle/schema";
import { generateTermsAssistant } from "../lib/aiAssistants";
import { GenerateTermsInput, LanguageCode, TermInput } from "../types";
import { hasMultipleWords } from "../utils";
import { generateTermsSchema, languageCodesSchema, termFormSchema } from "../zod/schema";

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
    .operation(async ({ input, user }) => {
        const [terms, setid] = input;

        await db.transaction(async (tx) => {
            const insertedTerms = await tx.insert(termsTable).values(terms.map((term) => ({
                ...term,
                setid: setid,
            }))).returning({ id: termsTable.id })
            await tx.update(setsTable).set({ updatedAt: new Date() }).where(eq(setsTable.id, setid))
            await tx.insert(progressesTable).values(insertedTerms.map(({ id: termId }) => ({
                termId,
                userId: user.id,
            })))
        })

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
        const setid = await db.transaction(async (tx) => {
            const [term] = await tx.update(termsTable).set(newTerm).where(eq(termsTable.id, termid)).returning()
            await tx.update(progressesTable).set({ status: 0, attempts: 0 }).where(eq(progressesTable.termId, term.id))
            return term.setid
        })

        revalidatePath(`/sets/${setid}`)

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

            await Promise.all(terms.map(({ term, definition, id }) => (async () => {

                const newDefinition = { ...term, content: term.content.split(", ") }
                const newTerm = { ...definition, content: definition.content.join(", ") }

                await tx.update(termsTable).set({ term: newTerm, definition: newDefinition }).where(eq(termsTable.id, id))
                await tx.update(progressesTable).set({ status: 0, attempts: 0 }).where(eq(progressesTable.termId, id))

            })()))

            await tx.update(setsTable).set({ preferredTermLang: preferredDefinitionLang, preferredDefinitionLang: preferredTermLang }).where(eq(setsTable.id, setid))
        })


    })

export const updateProgress = Dal.create()
    .$Input<[setid: string, successTermsId: string[], wrongTermsId: string[], taskid?: string]>()
    .schema({
        input: z.tuple([z.uuidv4(), z.array(z.string()), z.array(z.string()), z.uuidv4().optional()]),
    })
    .authenticate()
    .authorize({
        resource: "set",
        action: "updateProgress",
        data: async (setid, successTermsId, wrongTermsId, taskid) => db.query.setsTable.findFirst({
            where: { id: setid }, ...taskid && {
                with: {
                    tasks: {
                        where: { id: taskid },
                        with: {
                            class: {
                                with: {
                                    students: true
                                }
                            }
                        }
                    }
                }
            }
        })
    })
    .operation(async ({ input, user }) => {

        const [setid, successTermsId, wrongTermsId, taskid] = input
        await db.transaction(async (tx) => {

            if (wrongTermsId.length > 0) await tx.insert(progressesTable).values(wrongTermsId.map((termid) => ({
                termId: termid,
                userId: user.id,
                taskId: taskid ?? null,
                status: 0,
                attempts: 1,
            }))).onConflictDoUpdate({
                target: [
                    progressesTable.userId,
                    progressesTable.termId,
                    progressesTable.taskId,
                ],
                set: {
                    status: sql`GREATEST(${progressesTable.status} - 1, 0)`,
                    attempts: sql`${progressesTable.attempts} + 1`,
                    updatedAt: new Date(),
                },
            })


            if (successTermsId.length > 0) await tx.insert(progressesTable).values(successTermsId.map((termid) => ({
                termId: termid,
                userId: user.id,
                taskId: taskid ?? null,
                status: 1,
                attempts: 1,
            })))
                .onConflictDoUpdate({
                    target: [
                        progressesTable.userId,
                        progressesTable.termId,
                        progressesTable.taskId,
                    ],
                    set: {
                        status: sql`LEAST(${progressesTable.status} + 1, 5)`,
                        attempts: sql`${progressesTable.attempts} + 1`,
                        updatedAt: new Date(),
                    },
                })

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


export const generateTerms = Dal.create()
    .$Input<[data: GenerateTermsInput & { preferredTermLang: LanguageCode, preferredDefinitionLang: LanguageCode }]>()
    .schema({
        input: z.tuple([generateTermsSchema.extend({
            preferredTermLang: languageCodesSchema,
            preferredDefinitionLang: languageCodesSchema
        })]),
    })
    .authenticate()
    .authorize({
        resource: "term",
        action: "create",
    })
    .operation(async ({ input }) => {
        const [data] = input;

        const res = await generateText({
            model: openai('gpt-5.4-mini-2026-03-17'),
            output: Output.array({
                element: termFormSchema,
            }),
            system: generateTermsAssistant.system,
            prompt: generateTermsAssistant.prompt({
                termNumber: data.termNumber,
                prompt: data.prompt,
                isExampleSentenceIncluded: data.isExampleSentenceIncluded,
                preferredTermLang: data.preferredTermLang,
                preferredDefinitionLang: data.preferredDefinitionLang
            }),
        });

        return createSuccessReturn({ output: res.output })
    })



