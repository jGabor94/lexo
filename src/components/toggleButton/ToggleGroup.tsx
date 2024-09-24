"use client"

import { createContext, Dispatch, FC, MouseEvent, ReactNode, SetStateAction, useState } from 'react';

interface ToggleButtonContext {
    selected: string | null,
    setSelected: Dispatch<SetStateAction<string | null>>,
    onChange: (e: MouseEvent<HTMLElement>, newValue: any) => void
}

export const ToggleButtonContext = createContext<ToggleButtonContext>({} as ToggleButtonContext);

const ToggleGroup: FC<{
    onChange: (e: MouseEvent<HTMLElement>, newValue: any) => void,
    children: ReactNode
}> = ({ onChange, children }) => {

    const [selected, setSelected] = useState<string | null>(null)

    return (
        <ToggleButtonContext.Provider value={{ selected, setSelected, onChange }} >
            {children}
        </ToggleButtonContext.Provider>
    )
}

export default ToggleGroup