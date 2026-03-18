"use client"

import useSet from '@/features/set/hooks/useSet';
import { updateProgress as updateProgressAction } from "@/features/term/dal/mutations";
import { Term } from '@/features/term/types';
import useDal from '@/lib/dal/useDal';
import { useParams } from 'next/navigation';
import { createContext, FC, ReactNode, useEffect, useReducer } from 'react';
import { ExerciseAction, ExerciseMode, ExerciseState, IExerciseControllerContext } from '../types';
import { shuffle } from '../utils';

export const ExerciseControllerContext = createContext<IExerciseControllerContext>({} as IExerciseControllerContext);

const initialState = {
    completed: false,
    index: 0,
    successItems: [],
    wrongItems: [],
    isFlipped: false
};

const prepareArray = (array: Term[], mode: ExerciseMode) =>
    shuffle(mode === "progress" ? array.filter((term) => term.status < 5) : array);

const flashCardReducer = (state: ExerciseState, action: ExerciseAction): ExerciseState => {
    switch (action.type) {
        case 'SUCCESS':
            return {
                ...state,
                successItems: [...state.successItems, state.terms[state.index].id],
                index: state.index < state.terms.length - 1 ? state.index + 1 : state.index,
            };
        case 'WRONG':
            return {
                ...state,
                wrongItems: [...state.wrongItems, state.terms[state.index].id],
                index: state.index < state.terms.length - 1 ? state.index + 1 : state.index,
            };
        case 'UNDO':
            if (state.index === 0) return state;
            return {
                ...state,
                index: state.index - 1,
                successItems: state.successItems.filter(id => id !== state.terms[state.index - 1].id),
                wrongItems: state.wrongItems.filter(id => id !== state.terms[state.index - 1].id),
            };
        case "SET_COMPLETED":
            return { ...state, completed: true }
        case 'RESET':
            return { ...initialState, terms: action.terms || state.terms };
        default:
            return state;
    }
};

const ExerciseController: FC<{ children: ReactNode }> = ({ children }) => {

    const { mode } = useParams<{ mode: ExerciseMode }>()
    const { set, mutate, isLoading } = useSet()
    const [state, dispatch] = useReducer(flashCardReducer, { ...initialState, terms: prepareArray(set.terms, mode) })
    const { action: updateProgress, progress } = useDal(updateProgressAction)

    useEffect(() => {
        if (state.wrongItems.length + state.successItems.length === state.terms.length) {
            (async () => {
                if (mode === "progress") {
                    await updateProgress(set.id, state.successItems, state.wrongItems)
                    await mutate()
                }
                dispatch({ type: "SET_COMPLETED" })
            })()

        }
    }, [state.wrongItems, state.successItems])


    return (
        <ExerciseControllerContext.Provider value={{
            ...state,
            loading: isLoading || progress,
            handleSuccess: () => {
                dispatch({ type: "SUCCESS" })
            },
            handleWrong: () => {
                dispatch({ type: "WRONG" })
            },
            handleUndo: () => {
                dispatch({ type: "UNDO" })
            },
            setCompleted: () => {
                dispatch({ type: "SET_COMPLETED" })
            },
            reset: (terms: Term[]) => {
                dispatch({ type: "RESET", terms: prepareArray(terms, mode) })
            }

        }}>
            {children}
        </ExerciseControllerContext.Provider>
    )
}

export default ExerciseController