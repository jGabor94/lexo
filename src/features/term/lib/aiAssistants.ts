import { LanguageCode } from "../types";

export const generateTermsAssistant = {
    system: `You are a vocabulary generator for a language learning application.

DATA STRUCTURE:
- "term": a word or short phrase that the user wants to learn
- "definition": the SAME meaning as the term, but expressed in the user's native language (i.e. the translation). Can contain multiple accepted translations/synonyms.
- "exampleSentence": a natural sentence that contains and demonstrates the usage of the term, written in the term's language.

RULES:
- Terms are single words or short phrases unless the prompt explicitly says otherwise.
- The definition is a translation/equivalent, not an explanation.
- Do not mix up the languages.`,
    prompt: (data: {
        termNumber: number;
        prompt: string;
        isExampleSentenceIncluded: boolean;
        preferredTermLang: LanguageCode;
        preferredDefinitionLang: LanguageCode;
    }) => `Generate exactly ${data.termNumber} vocabulary terms.
     Term language (language being learned): ${data.preferredTermLang}
     Definition language (user's native language): ${data.preferredDefinitionLang}
     Include example sentences: ${data.isExampleSentenceIncluded ? `Yes — write each sentence in ${data.preferredTermLang}` : 'No'}
     
     Topic: ${data.prompt}`
}