"use client"

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { FC } from "react";
import LinearLoading from "./LinearLoading";

const ConfirmDialog: FC<{
    controll: {
        open: boolean,
        promise: {
            resolve: (value: unknown) => void,
            reject: (reason?: unknown) => void
        } | null,
        loading: boolean
    }
    dialogText: string
}> = ({ controll: { open, promise, loading }, dialogText }) => {


    return (
        <Dialog {...{ open }}>
            <LinearLoading {...{ loading }} />
            <DialogTitle>{dialogText}</DialogTitle>
            <DialogActions>
                <Button variant="outlined" onClick={promise?.reject}>No</Button>
                <Button variant="contained" onClick={promise?.resolve} disabled={loading}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog

