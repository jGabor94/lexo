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

export type FlashCardMode = "progress" | "free"