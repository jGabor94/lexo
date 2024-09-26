import { SnackbarAlertData } from "@/components/SnackbarAlert";
import { ThemeMode } from "@/lib/database/types";
import { Dispatch, SetStateAction } from "react";

export interface IColorModeContext {
    toggleColorMode: () => void,
}

export interface IConfigContext {
    theme: ThemeMode,
}

export interface IAlertContext {
    alert: SnackbarAlertData | null,
    setAlert: Dispatch<SetStateAction<SnackbarAlertData | null>>
}




