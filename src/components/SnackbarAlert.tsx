"use client"

import useAlert from "@/lib/hooks/useAlert";
import { Alert, Snackbar } from "@mui/material";
import { FC } from "react";

export interface SnackbarAlertData {
    severity: "error" | "info" | "success" | "warning",
    content: string
}

const SnackbarAlert: FC<{ autoHideDuration?: number }> = ({ autoHideDuration }) => {

    const { alert, setAlert } = useAlert()

    const handleClose = (event?: React.SyntheticEvent | Event, reason?: string) => {
        if (reason === 'clickaway') {
            return;
        }
        setAlert(null);
    };

    return (
        <Snackbar
            open={alert ? true : false}
            autoHideDuration={autoHideDuration || 6000}
            onClose={handleClose}
        >
            <Alert
                onClose={handleClose}
                severity={alert?.severity}
                variant="standard"
                sx={{ width: '100%' }}
            >
                {alert?.content}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert