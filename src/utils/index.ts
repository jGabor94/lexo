import { ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}


export type NumFormatter = (input: number | string) => string

/*
    Json szerializáható objektum előállítása.
*/
export const toSerializableObject = <R>(data: any): R => JSON.parse(JSON.stringify(data))


export const getUnixTimestamp = (date: Date) => {
    if (date) {
        if (date instanceof Date) {
            return Math.ceil(date.getTime() / 1000)
        } else {
            return Math.ceil(Date.parse(date) / 1000)
        }
    } else {
        const currentDate = new Date()
        return Math.ceil(Date.parse(currentDate.toISOString()) / 1000)
    }

}

export const formatSmartDate = (date: Date) => {
    const now = new Date();
    // Segédváltozók az összehasonlításhoz
    const today = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime();
    const yesterday = today - 86400000; // 24 óra milliszekundumban
    const checkDate = new Date(date.getFullYear(), date.getMonth(), date.getDate()).getTime();

    // Idő formázása (HH:mm)
    const timeStr = date.toLocaleTimeString('hu-HU', {
        hour: '2-digit',
        minute: '2-digit'
    });

    if (checkDate === today) {
        return `Ma, ${timeStr}`;
    }

    if (checkDate === yesterday) {
        return `Tegnap, ${timeStr}`;
    }

    // Ha régebbi, csak a dátum (pl. febr. 19.)
    return date.toLocaleDateString('hu-HU', {
        month: 'short',
        day: 'numeric'
    });
}


export const formatCount = (count: number): string => {
    if (count < 100) return count.toString();

    if (count < 1000) return count.toString();

    if (count < 10_000) {
        return (count / 1000).toFixed(1).replace('.0', '') + "K";
    }

    if (count < 1_000_000) {
        return Math.floor(count / 1000) + "K";
    }

    if (count < 10_000_000) {
        return (count / 1_000_000).toFixed(1).replace('.0', '') + "M";
    }

    return Math.floor(count / 1_000_000) + "M";
};



































