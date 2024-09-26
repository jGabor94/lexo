"use client";


import { SnackbarAlertData } from "@/components/SnackbarAlert";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, ReactNode, useState } from "react";
import { SWRConfig, SWRConfiguration } from "swr";
import { AlertContext } from "./Context/context";

interface SWRProviderProps {
    value?: SWRConfiguration | ((parentConfig?: SWRConfiguration | undefined) => SWRConfiguration) | undefined;
    children: ReactNode
}

export const SWRProvider: FC<SWRProviderProps> = ({ children, ...SWRConfigProps }) => (
    <SWRConfig {...SWRConfigProps}>{children}</SWRConfig>
)

export const AlertProvider: FC<{ children: ReactNode }> = ({ children }) => {

    const [alert, setAlert] = useState<SnackbarAlertData | null>(null)

    return (
        <AlertContext.Provider value={{ alert, setAlert }}>
            {children}
        </AlertContext.Provider>
    )

}

export const DateTimePickerProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
    </LocalizationProvider>
)





