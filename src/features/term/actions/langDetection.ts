"use server";

import { isLogged } from "@/features/authentication/utils";
import { createServerAction } from "@/lib/serverAction/createServerAction/createServerAction";
import { createServerActionResponse } from "@/lib/serverAction/response/response";
import { AzureKeyCredential, TextAnalyticsClient } from "@azure/ai-text-analytics";

const key = process.env.AZURE_LANGUAGE_API_KEY as string;
const endpoint = "https://langdetection2.cognitiveservices.azure.com";

interface Request {
    params: [text: string]
}

const SA_LangDetection = createServerAction(isLogged, async ({ params }: Request) => {

    const [text] = params

    const client = new TextAnalyticsClient(endpoint, new AzureKeyCredential(key));

    const [result] = await client.detectLanguage([text]);
    if (result.error) {
        throw new Error(result.error.message);
    }


    return createServerActionResponse({ payload: { lang: result.primaryLanguage.iso6391Name } })
});

export default SA_LangDetection;
