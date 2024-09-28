import mongoose from "mongoose";
import { ThemeMode } from "../database/types";
import { Email } from "../types/types";


export type NumFormatter = (input: number | string) => string

/*
    Json szerializáható objektum előállítása.
*/
export const toSerializableObject = <R>(data: any): R => JSON.parse(JSON.stringify(data))


/*
    Felhasználónév kivontolás az email címből.
*/
export const extractUsername = (email: Email): string => email.split('@')[0]




export const toggleColorMode = (mode: ThemeMode) => mode === "dark" ? "light" : "dark"

export const createObjectId = (raw: string) => {
    try {
        const objectId = new mongoose.mongo.ObjectId(raw)
        return objectId
    } catch (err) {
        return new mongoose.mongo.ObjectId()
    }
}

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

export const getDate = (ISO8601Time: number | string | Date) => {
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
    } else {
        return dateObj.toLocaleDateString('hu-HU', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: 'numeric',
            minute: 'numeric'
        })
    }
}
































