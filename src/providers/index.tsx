"use client";


import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { FC, ReactNode } from "react";
import { SWRConfig, SWRConfiguration } from "swr";

interface SWRProviderProps {
    value?: SWRConfiguration | ((parentConfig?: SWRConfiguration | undefined) => SWRConfiguration) | undefined;
    children: ReactNode
}

export const SWRProvider: FC<SWRProviderProps> = ({ children, ...SWRConfigProps }) => (
    <SWRConfig {...SWRConfigProps}>{children}</SWRConfig>
)

export const DateTimePickerProvider: FC<{ children: ReactNode }> = ({ children }) => (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
        {children}
    </LocalizationProvider>
)









