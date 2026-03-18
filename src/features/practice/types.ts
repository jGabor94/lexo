import { Term } from "../term/types"

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

export type ExerciseMode = "progress" | "free"
export type Exercise = "flashcard" | "quiz"

export type ExerciseState = {
    completed: boolean;
    index: number;
    successItems: string[];
    wrongItems: string[];
    terms: Term[]
};

export interface IExerciseControllerContext extends ExerciseState {
    handleSuccess: () => void
    handleWrong: () => void,
    handleUndo: () => void,
    setCompleted: (isCompleted: boolean) => void,
    reset: (terms: Term[]) => void,
    terms: Term[],
    loading: boolean
}

export type ExerciseAction =
    | { type: 'SUCCESS' }
    | { type: 'WRONG' }
    | { type: 'UNDO' }
    | { type: 'SET_COMPLETED' }
    | { type: 'RESET', terms?: Term[] }