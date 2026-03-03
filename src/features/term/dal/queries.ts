"use server"

import { Dal } from "@/lib/dal";
import { createErrorReturn, createSuccessReturn } from "@/lib/dal/types";
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import { AzureKeyCredential, TextAnalyticsClient } from "@azure/ai-text-analytics";
import z from "zod";
import { hasMultipleWords } from "../utils";


export const getSpeakIssueToken = Dal.create()
    .schema({
        output: z.object({
            token: z.string(),
            region: z.string()
        }),
    })
    .authenticate()
    .authorize({
        resource: "term",
        action: "speak",
    })
    .operation(async () => {
        const region = process.env.AZURE_REGION as string;

        const res = await fetch(`https://${region}.api.cognitive.microsoft.com/sts/v1.0/issueToken`,
            {
                method: "POST",
                headers: {
                    "Ocp-Apim-Subscription-Key": process.env.AZURE_SPEECH_API_KEY as string,
                    "Content-Type": "application/x-www-form-urlencoded",
                },
            }

        );

        if (!res.ok) return createErrorReturn({ type: "token-not-available", error: "Nem sikerült a token lekérése" });
        const token = await res.text();

        return createSuccessReturn({ token, region });
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

