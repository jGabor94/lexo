import { ProgressResult } from '@/features/practice/types';
import { Term } from '@/features/term/types';
import { createContext, FC, ReactNode, useEffect, useState } from 'react';

interface IQuizContext {
    index: number,
    handleSuccess: () => void
    handleWrong: () => void,
    terms: Term[],
    successItems: ProgressResult[],
    wrongItems: ProgressResult[],
}

export const QuizContext = createContext<IQuizContext>({} as IQuizContext);

interface props {
    terms: Term[];
    onCompleted: (successItems: ProgressResult[], wrongItems: ProgressResult[]) => void;
    children: ReactNode
}

const QuizProvider: FC<props> = ({ terms, onCompleted, children }) => {

    const [index, setIndex] = useState(0);
    const [successItems, setSuccessItems] = useState<ProgressResult[]>([]);
    const [wrongItems, setWrongItems] = useState<ProgressResult[]>([]);

    const reset = () => {
        setIndex(0)
        setSuccessItems([])
        setWrongItems([])
    }

    const handleSuccess = () => {

        setSuccessItems([...successItems, {
            progressid: terms[index].progress?.id ? terms[index].progress.id : null,
            termid: terms[index].id,
            status: terms[index].progress?.status ? terms[index].progress.status < 5 ? terms[index].progress.status + 1 : 5 : 1
        }]);

        if (index !== terms.length - 1) setIndex(index + 1);

    }

    const handleWrong = () => {

        setWrongItems([...wrongItems, {
            progressid: terms[index].progress?.id ? terms[index].progress.id : null,
            termid: terms[index].id,
            status: terms[index].progress?.status && (terms[index].progress.status > 0) ? terms[index].progress.status - 1 : 0
        }]);

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