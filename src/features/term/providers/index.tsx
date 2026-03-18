"use client";

import { createContext, ReactNode, useContext, useOptimistic } from "react";
import { OptimisticTermAction, Term, TermContextType } from "../types";

const TermContext = createContext({} as TermContextType);

export function TermProvider({
    children,
    initialTerms
}: {
    children: ReactNode;
    initialTerms: Term[]
}) {

    const [optimisticTerms, dispatchOptimisticTerms] = useOptimistic(
        initialTerms,
        (state: Term[], action: OptimisticTermAction) => {
            if (action.type === "delete") return state.filter(term => term.id !== action.termid)
            return state.map((term) => term.id === action.termid ? { ...term, ...action.data } : term)
        }
    );

    return (
        <TermContext.Provider value={{ terms: optimisticTerms, dispatchOptimisticTerms }}>
            {children}
        </TermContext.Provider>
    );
}

export const useTerms = () => useContext(TermContext);
