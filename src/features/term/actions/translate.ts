"use server";

import { isLogged } from "@/features/authentication/utils";
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction";
import { createServerActionResponse } from "@/lib/serverAction/response/response";
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";
import { hasMultipleWords } from "../utils/translate";

const apiKey = process.env.AZURE_TRANSLATATOR_API_KEY as string;
const endpoint = "https://api.cognitive.microsofttranslator.com";
const region = process.env.AZURE_REGION as string;

interface Request {
    params: [from: string, to: string, text: string]
}

const SA_Translate = createServerAction(isLogged, async ({ params }: Request) => {

    const [from, to, text] = params

    if (from === to) return createServerActionResponse({ status: 400, error: 'Identical languages inputs' })

    try {
        const translationClient = TextTranslationClient(endpoint, {
            key: apiKey,
            region,
        });

        const inputText = [{ text }];

        if (hasMultipleWords(text)) {


            const translateResponse = await translationClient.path("/translate").post({
                body: inputText,
                queryParameters: {
                    to,
                    from,
                },
            });

            if (isUnexpected(translateResponse)) throw new Error("Error during translation")

            const { translations } = translateResponse.body[0];

            return createServerActionResponse({
                payload: {
                    from,
                    to,
                    translations: translations.map(translation => translation.text)
                }
            });
        }

        const translateResponse = await translationClient.path("/dictionary/lookup").post({
            body: inputText,
            queryParameters: {
                to,
                from,
            },
        });

        if (isUnexpected(translateResponse)) throw new Error("Error during translation")

        const { translations } = translateResponse.body[0];

        return createServerActionResponse({
            payload: {
                from,
                to,
                translations: translations.map(translation => translation.normalizedTarget)
            }
        });


    } catch (err) {
        return createServerActionResponse({
            payload: { from, to, translations: [] }
        });
    }

});

export default SA_Translate;
