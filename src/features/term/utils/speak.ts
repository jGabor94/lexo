import * as SpeechSDK from "microsoft-cognitiveservices-speech-sdk";
import SA_GetSpeakIssueToken from "../actions/getSpeakIssueToken";
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
            const res = await SA_GetSpeakIssueToken()
            if (res.statusCode !== 200) throw new Error("Nem sikerült a token lekérése")
            token = {
                data: res.payload.token,
                exp: new Date(Date.now() + 9 * 60 * 1000) // 9 perc

            }
            region = res.payload.region
        }


        const speechConfig = SpeechSDK.SpeechConfig.fromAuthorizationToken(token.data, region);
        console.log(lang)
        if (lang) {
            //speechConfig.speechSynthesisVoiceName = `${langToLocaleMap[lang]}-NoemiNeural`; // Magyar női hang
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