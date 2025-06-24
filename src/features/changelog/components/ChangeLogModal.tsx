"use client"

import ModalOverlay from "@/components/ui/ModalOverlay";
import useModalControl from "@/hooks/useModalControl";
import { Link, Modal } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";

const ChangeLogModal: FC<{ children: ReactNode }> = ({ children }) => {

    const { open, handleOpen, handleClose } = useModalControl()

    return (
        <Fragment>
            <Link onClick={handleOpen} sx={{ cursor: "pointer", width: "fit-content", textDecoration: "none", fontWeight: 500 }}>Verziótörténet</Link>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <ModalOverlay width={700} onClose={handleClose}>
                    {children}
                </ModalOverlay>
            </Modal>
        </Fragment>
    )
}

export default ChangeLogModal