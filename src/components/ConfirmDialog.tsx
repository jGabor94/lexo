"use client"

import { Button, Dialog, DialogActions, DialogTitle } from "@mui/material";
import { FC } from "react";

const ConfirmDialog: FC<{
    open: boolean,
    promise: {
        resolve: (value: unknown) => void,
        reject: (reason?: unknown) => void
    } | null,
    dialogText: string
}> = ({ open, promise, dialogText }) => {


    return (
        <Dialog {...{ open }}>
            <DialogTitle>{dialogText}</DialogTitle>
            <DialogActions>
                <Button variant="outlined" onClick={promise?.reject}>No</Button>
                <Button variant="contained" onClick={promise?.resolve}>Yes</Button>
            </DialogActions>
        </Dialog>
    )
}

export default ConfirmDialog

