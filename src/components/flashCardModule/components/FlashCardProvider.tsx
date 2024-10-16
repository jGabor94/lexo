import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';
import { ProgressResult, Term } from '../types';

interface IFlashCardContext {
    index: number,
    handleSuccess: () => void
    handleWrong: () => void,
    handleUndo: () => void,
    isFlipped: boolean,
    setIsFlipped: Dispatch<SetStateAction<boolean>>
    terms: Term[],
    successItems: ProgressResult[],
    wrongItems: ProgressResult[],
}

export const FlashCardContext = createContext<IFlashCardContext>({} as IFlashCardContext);

interface props {
    terms: Term[];
    onCompleted: (successItems: ProgressResult[], wrongItems: ProgressResult[]) => void;
    children: ReactNode
}

const FlashCardProvider: FC<props> = ({ terms, onCompleted, children }) => {

    const [index, setIndex] = useState(0);
    const [successItems, setSuccessItems] = useState<ProgressResult[]>([]);
    const [wrongItems, setWrongItems] = useState<ProgressResult[]>([]);
    const [isFlipped, setIsFlipped] = useState(false);

    const reset = () => {
        setIndex(0)
        setSuccessItems([])
        setWrongItems([])
        setIsFlipped(false)
    }

    const handleSuccess = () => {

        setSuccessItems([...successItems, {
            progressid: terms[index].progress?._id ? terms[index].progress._id : null,
            termid: terms[index]._id,
            status: terms[index].progress?.status ? terms[index].progress.status < 5 ? terms[index].progress.status + 1 : 5 : 1
        }]);

        if (index !== terms.length - 1) setIndex(index + 1);

    }

    const handleWrong = () => {

        setWrongItems([...wrongItems, {
            progressid: terms[index].progress?._id ? terms[index].progress._id : null,
            termid: terms[index]._id,
            status: terms[index].progress?.status && (terms[index].progress.status > 0) ? terms[index].progress.status - 1 : 0
        }]);

        if (index !== terms.length - 1) setIndex(index + 1);

    }

    const handleUndo = () => {

        const prevTermId = terms[index - 1]._id;
        setSuccessItems((prev) => prev.filter((result) => result.termid !== prevTermId));
        setWrongItems((prev) => prev.filter((result) => result.termid !== prevTermId));
        setIndex(index - 1);

    };

    useEffect(() => {
        setIsFlipped(false)
        if (wrongItems.length + successItems.length === terms.length) {
            onCompleted(successItems, wrongItems);
            reset();
        }
    }, [wrongItems, successItems])

    return (
        <FlashCardContext.Provider value={{
            index,
            handleSuccess,
            handleWrong,
            isFlipped,
            setIsFlipped,
            handleUndo,
            terms,
            successItems,
            wrongItems,
        }}>
            {children}
        </FlashCardContext.Provider>
    )
}

export default FlashCardProvider