import { termColor } from "../lib/constants";
import { Term } from "../types";

export const termStatusCondition = {
    "learning": (term: Term) => term.status < 5,
    "review": (term: Term) => term.status === 5 && term.lastReviewedAt && (new Date(term.lastReviewedAt).getTime() - Date.now()) > 1209600000,
    "learned": (term: Term) => term.status === 5,
}



export const getTermUiData = (term: Term) => {

    if (termStatusCondition["review"](term)) return {
        statusLabel: 'review',
        color: termColor["review"]
    };
    if (termStatusCondition["learned"](term)) return {
        statusLabel: 'learned',
        color: termColor["learned"]
    };

    if (termStatusCondition["learning"](term)) return {
        statusLabel: 'learning',
        color: termColor["learning"]
    };
    return {
        statusLabel: 'new',
        color: termColor["new"]
    };
};



export const getTermStats = (terms: Term[]) => ({
    all: terms.length,
    learning: terms.filter((t) => getTermUiData(t).statusLabel === 'learning').length,
    review: terms.filter((t) => getTermUiData(t).statusLabel === 'review').length,
    learned: terms.filter((t) => getTermUiData(t).statusLabel === 'learned').length,
});

export const hasMultipleWords = (str: string) => str.trim().includes(" ");

