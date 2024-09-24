"use client"

import { useState } from "react";

export interface ModalControl {
    open: boolean,
    handleOpen: () => void,
    handleClose: () => void,
}

const useModalControl = (): ModalControl => {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true)
    const handleClose = () => setOpen(false)
    return { open, handleOpen, handleClose }
}

export default useModalControl