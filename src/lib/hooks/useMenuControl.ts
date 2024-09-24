"use client"

import { MouseEvent, useState } from "react";

export interface MenuControl {
    open: boolean,
    handleOpen: (e: MouseEvent<HTMLButtonElement>) => void,
    handleClose: () => void,
    anchorEl: null | HTMLElement
}

const useMenuControl = (): MenuControl => {
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleOpen = (e: MouseEvent<HTMLButtonElement>) => setAnchorEl(e.currentTarget);
    const handleClose = () => setAnchorEl(null);

    return { open, handleOpen, handleClose, anchorEl }
}

export default useMenuControl