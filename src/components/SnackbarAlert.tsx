"use client"

import useAlert from "@/hooks/useAlert";
import { Alert, Snackbar } from "@mui/material";
import { CheckIcon, X } from "lucide-react";
import { FC } from "react";

export interface SnackbarAlertData {
    severity: "error" | "success",
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
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            open={alert ? true : false}
            autoHideDuration={autoHideDuration || 40000}
            onClose={handleClose}

        >
            <Alert
                onClose={handleClose}
                severity={alert?.severity}
                variant="filled"
                components={{
                    CloseIcon: () => <X color="white" size={20} style={{ cursor: "pointer", }} />
                }}


                iconMapping={{
                    success: <CheckIcon color="white" />
                }}
                sx={{ width: '100%', border: "none", }}
            >
                {alert?.content}
            </Alert>
        </Snackbar>
    )
}

export default SnackbarAlert