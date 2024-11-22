"use client"

import { SnackbarAlertData } from "@/components/SnackbarAlert";
import { createContext, FC, ReactNode, useState } from "react";
import { IAlertContext } from "./types";

export const AlertContext = createContext<IAlertContext>({} as IAlertContext);

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [alert, setAlert] = useState<SnackbarAlertData | null>(null)

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    )

}