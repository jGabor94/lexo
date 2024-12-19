import { Term } from '@/features/term/types';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface IQuizContext {
    index: number,
    handleSuccess: () => void
    handleWrong: () => void,
    terms: Term[],
    successItems: string[],
    wrongItems: string[],
}

export const QuizContext = createContext<IQuizContext>({} as IQuizContext);

interface props {
    terms: Term[];
    onCompleted: (successItems: string[], wrongItems: string[]) => void;
    children: ReactNode
}

const QuizProvider: FC<props> = ({ terms, onCompleted, children }) => {

    const [index, setIndex] = useState(0);
    const [successItems, setSuccessItems] = useState<string[]>([]);
    const [wrongItems, setWrongItems] = useState<string[]>([]);

    const reset = () => {
        setIndex(0)
        setSuccessItems([])
        setWrongItems([])
    }

    const handleSuccess = () => {
        setSuccessItems([...successItems, terms[index].id]);
        if (index !== terms.length - 1) setIndex(index + 1);
    }

    const handleWrong = () => {
        setWrongItems([...wrongItems, terms[index].id]);
        if (index !== terms.length - 1) setIndex(index + 1);
    }

    useEffect(() => {
        if (wrongItems.length + successItems.length === terms.length) {
            onCompleted(successItems, wrongItems);
            reset();
        }
    }, [wrongItems, successItems])

    return (
        <QuizContext.Provider value={{
            index,
            handleSuccess,
            handleWrong,
            terms,
            successItems,
            wrongItems,
        }}>
            {children}
        </QuizContext.Provider>
    )
}

export default QuizProvider