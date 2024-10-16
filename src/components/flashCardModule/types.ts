import { Mongoose_Progress_Serializable, Mongoose_Term_Serializable } from "@/lib/database/types";

export type Term = Mongoose_Term_Serializable<{ progress: Mongoose_Progress_Serializable }>
export type ClickAnimation = {
    action: "wrong" | "success" | "undo",
    content: string
}

export type ProgressResult = {
    progressid: string | null,
    termid: string,
    status: number
}

export type Delta = { x: number, y: number }
