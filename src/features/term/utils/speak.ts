import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import { getSpeakIssueToken } from "../dal/queries";
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
            const res = await getSpeakIssueToken()
            if (!res.success) throw new Error("Nem sikerült a token lekérése")
            token = {
                data: res.data.token,
                exp: new Date(Date.now() + 9 * 60 * 1000) // 9 min

            }
            region = res.data.region
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
                    console.log({ result })
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