import { Term } from '@/features/term/types';
import { createContext, Dispatch, FC, ReactNode, SetStateAction, useEffect, useState } from 'react';

interface IFlashCardContext {
    index: number,
    handleSuccess: () => void
    handleWrong: () => void,
    handleUndo: () => void,
    isFlipped: boolean,
    setIsFlipped: Dispatch<SetStateAction<boolean>>
    terms: Term[],
    successItems: string[],
    wrongItems: string[],
}

export const FlashCardContext = createContext<IFlashCardContext>({} as IFlashCardContext);

interface props {
    terms: Term[];
    onCompleted: (successItems: string[], wrongItems: string[]) => void;
    children: ReactNode
}

const FlashCardProvider: FC<props> = ({ terms, onCompleted, children }) => {

    const [index, setIndex] = useState(0);
    const [successItems, setSuccessItems] = useState<string[]>([]);
    const [wrongItems, setWrongItems] = useState<string[]>([]);
    const [isFlipped, setIsFlipped] = useState(false);

    const reset = () => {
        setIndex(0)
        setSuccessItems([])
        setWrongItems([])
        setIsFlipped(false)
    }


    const handleSuccess = () => {
        setSuccessItems([...successItems, terms[index].id]);
        if (index !== terms.length - 1) setIndex(index + 1);
    }

    const handleWrong = () => {
        setWrongItems([...wrongItems, terms[index].id]);
        if (index !== terms.length - 1) setIndex(index + 1);
    }

    const handleUndo = () => {
        const prevTermId = terms[index - 1].id;
        setSuccessItems((prev) => prev.filter((termid) => termid !== prevTermId));
        setWrongItems((prev) => prev.filter((termid) => termid !== prevTermId));
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