import { SnackbarAlertData } from "@/components/SnackbarAlert";
import { Dispatch, SetStateAction } from "react";

export interface IAlertContext {
    alert: SnackbarAlertData | null,
    setAlert: Dispatch<SetStateAction<SnackbarAlertData | null>>
}






