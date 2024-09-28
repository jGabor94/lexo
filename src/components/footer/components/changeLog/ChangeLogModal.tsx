"use client"

import useModalControl from "@/lib/hooks/useModalControl";
import { Box, Link, Modal, Paper } from "@mui/material";
import { FC, Fragment, ReactNode } from "react";

const ChangeLogModal: FC<{ children: ReactNode }> = ({ children }) => {

    const { open, handleOpen, handleClose } = useModalControl()

    return (
        <Fragment>
            <Link onClick={handleOpen} sx={{ cursor: "pointer", width: "fit-content", textDecoration: "none" }}>Change log</Link>
            <Modal
                open={open}
                onClose={handleClose}
            >
                <Box component={Paper} sx={{
                    boxShadow: 10,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 700,
                    maxWidth: "95%",
                    outline: "none",
                }}>
                    {children}
                </Box>
            </Modal>
        </Fragment>
    )
}

export default ChangeLogModal