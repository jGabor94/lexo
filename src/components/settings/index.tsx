"use client"

import ModalOverlay from '@/components/ui/ModalOverlay';
import useModalControl from '@/hooks/useModalControl';
import { Avatar, Box, Divider, IconButton, Modal, Stack, Tooltip, Typography } from "@mui/material";
import { useSession } from '@toolpad/core/useSession';
import { FC, Fragment } from "react";
import ThemeSwitch from "./components/DarkModeSwitch";
import SignOutButton from './components/SignOutButton';

const Settings: FC<{}> = () => {

    const session = useSession()
    const { open, handleOpen, handleClose } = useModalControl()

    return (
        <Fragment>
            <Tooltip title="Beállítások" sx={{ width: "fit-content" }}>
                <IconButton onClick={handleOpen}>
                    <Box component="img" src="/setting.png" width={25} />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <ModalOverlay width={400} onClose={handleClose}>
                    <Stack gap={2}>
                        <Typography fontSize={23}>Beállítások</Typography>
                        <Divider flexItem />
                        <Stack gap={4}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography>Téma:</Typography>
                                <ThemeSwitch />
                            </Stack>
                            <Stack gap={2} >
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography>Bejelentkezve mint <b>{session?.user?.name}</b></Typography>
                                    <Avatar src={session?.user?.image || ""} />
                                </Stack>
                                <SignOutButton size="small" />

                            </Stack>
                        </Stack>

                    </Stack>
                </ModalOverlay>

            </Modal>
        </Fragment>

    )

}

export default Settings