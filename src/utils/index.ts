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

export const getDate = (ISO8601Time: number | string | Date, time: boolean = true) => {
    const dateObj = new Date(ISO8601Time);
    const currentDate = new Date()
    if (dateObj.toISOString().slice(0, 10) === currentDate.toISOString().slice(0, 10)) {
        return dateObj.toLocaleTimeString('hu-HU', {
            hour: 'numeric',
            minute: 'numeric'
        })
    }
    else if (getUnixTimestamp(currentDate) - getUnixTimestamp(dateObj) < (60 * 60 * 24 * 6)) {
        return dateObj.toLocaleDateString('hu-HU', {
            weekday: 'short',
            hour: 'numeric',
            minute: 'numeric'
        })
    } else if (time) {
        return dateObj.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
    } else {
        return dateObj.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }
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



































