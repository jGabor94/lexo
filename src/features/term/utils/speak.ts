import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { langToLocaleMap } from "../lib/constants";
import { LanguageCode } from "../types";

let token: {
    data: string
    exp: Date
} | null = null

let region: string | null = null


const speak = async (text: string, lang?: LanguageCode) => {

    try {
        if (!region || !token || token.exp < new Date()) {
            console.log("Token expired or region not set, fetching new token...")
            const res = await fetch(`/api/term/speak/issuetoken`)
            if (!res.ok) {
                throw new Error("Nem sikerült a token lekérése")
            }
            const data: { token: string, region: string } = await res.json()
            token = {
                data: data.token,
                exp: new Date(Date.now() + 9 * 60 * 1000) // 9 min

            }
            region = data.region
        }

        const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(token.data, region);

        if (lang) {
            //speechConfig.speechSynthesisVoiceName = `${langToLocaleMap[lang]}-NoemiNeural`; // Hungarian woman sound
            speechConfig.speechSynthesisLanguage = langToLocaleMap[lang];
        }

        const synthesizer = new SpeechSDK.SpeechSynthesizer(speechConfig);

        synthesizer.speakTextAsync(
            text,
            result => {
                if (result.reason === SpeechSDK.ResultReason.SynthesizingAudioCompleted) {
                } else {
                    console.error("Hiba: ", result.errorDetails);
                }
                synthesizer.close();
            },
            error => {
                console.error("Hiba történt: ", error);
                synthesizer.close();
            }
        );




    } catch (err) {
        console.error("Error in speech synthesis: ", err);
    }
}

export default speak