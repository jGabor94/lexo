import { languageCodes } from "@/constants/languages"

export type DictionaryLookupTranslations = Array<{
    confidence: number,
    displayTarget: string,
    normalizedTarget: string,
    posTag: string,
    prefixWord: string,
    backTranslations: Array<{
        displayText: string,
        frequencyCount: number,
        normalizedText: string,
        numExamples: number
    }>
}>

export type DictionaryLookupResponse = Array<{
    displaySource: string,
    normalizedSource: string,
    translations: DictionaryLookupTranslations
}>

export interface LangDetectionResponse {
    kind: string,
    results: {
        documents: Array<{
            id: string,
            warnings: Array<any>,
            detectedLanguage: {
                confidenceScore: number,
                iso6391Name: LanguageCode,
                name: string,
                script: string,
                scriptCode: string
            }
        }>,
        errors: Array<any>,
        modelVersion: string
    }
}

export type Translations = Array<{
    text: string,
    to: string
}>

export type TranslationResponse = Array<{
    detectedLanguage?: {
        language: string,
        score: number
    },
    translations: Translations
}>

export type LanguageCode = typeof languageCodes[number]
