import { LangDetectionResponse } from "./types";

const langDetector = async (text: string) => {

    const reqHeaders = new Headers();

    reqHeaders.append("Ocp-Apim-Subscription-Key", process.env.NEXT_PUBLIC_AZURE_LANGUAGE_API_KEY as string);
    reqHeaders.append("Ocp-Apim-Subscription-Region", "switzerlandnorth");
    reqHeaders.append("Content-Type", "application/json");

    const res = await fetch(
        `https://langdetection2.cognitiveservices.azure.com/language/:analyze-text?api-version=2023-11-15-preview`,
        {
            method: "POST",
            headers: reqHeaders,
            body: JSON.stringify({
                kind: "LanguageDetection",
                parameters: {
                    modelVersion: "latest",
                },
                analysisInput: {
                    documents: [
                        {
                            id: "1",
                            text,
                        },
                    ],
                },
            }),
        }
    );

    const data = await res.json() as LangDetectionResponse


    return data.results.documents[0].detectedLanguage.iso6391Name

};

export default langDetector