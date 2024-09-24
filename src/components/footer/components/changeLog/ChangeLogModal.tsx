"use client"

import { Box, Link, Modal, Paper } from "@mui/material";
import { FC, Fragment, ReactNode, useState } from "react";

const ChangeLogModal: FC<{ children: ReactNode }> = ({ children }) => {


    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);


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