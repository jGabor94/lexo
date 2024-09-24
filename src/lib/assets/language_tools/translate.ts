import { DictionaryLookupResponse, TranslationResponse } from "./types";

const reqHeaders = new Headers();

reqHeaders.append("Ocp-Apim-Subscription-Key", process.env.NEXT_PUBLIC_AZURE_TRANSLATATOR_API_KEY as string);
reqHeaders.append("Ocp-Apim-Subscription-Region", "swedencentral");
reqHeaders.append("Content-Type", "application/json");

const hasMultipleWords = (str: string) => str.trim().includes(" ");

const dictionaryLookupAPI = async (from: string, to: string, text: string) => {

    const res = await fetch(
        `https://api.cognitive.microsofttranslator.com/dictionary/lookup?api-version=3.0&from=${from}&to=${to}`,
        {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify([{ text }]),
        }
    );

    if (!res.ok) {
        throw new Error(`Fetch error with status code ${res.status}`)
    }

    const data = await res.json() as DictionaryLookupResponse

    return {
        from,
        to,
        translations: data[0].translations.map(translation => translation.normalizedTarget)
    }

};

const translateAPI = async (from: string, to: string, text: string) => {

    const res = await fetch(
        `https://api.cognitive.microsofttranslator.com/translate?api-version=3.0&from=${from}&to=${to}`,
        {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify([{ text }]),
        }
    );

    if (!res.ok) {
        throw new Error(`Fetch error with status code ${res.status}`)
    }

    const data = await res.json() as TranslationResponse

    return {
        from,
        to,
        translations: data[0].translations.map(translation => translation.text)
    }

};


const translate = async (from: string, to: string, text: string) => {

    if (from === to) throw new Error('Identical languages inputs')

    try {
        if (hasMultipleWords(text)) return await translateAPI(from, to, text)
        return await dictionaryLookupAPI(from, to, text)
    } catch (err) {
        return { from, to, translations: [] }
    }



}

export default translate 