"use client"

import ModalOverlay from '@/components/ui/modal';
import useModalControl from '@/lib/hooks/useModalControl';
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Divider, IconButton, Modal, Stack, Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import { FC, Fragment } from "react";
import SignOutButton from "./SignOutButton";
import ThemeSwitch from "./components/DarkModeSwitch";

const Settings: FC<{}> = () => {

    const { data: session } = useSession()
    const { open, handleOpen, handleClose } = useModalControl()

    return (
        <Fragment>
            <Tooltip title="Settings">
                <IconButton onClick={handleOpen}>
                    <SettingsIcon />
                </IconButton>
            </Tooltip>
            <Modal
                open={open}
                onClose={handleClose}

            >
                <ModalOverlay width={400} onClose={handleClose}>
                    <Stack gap={2}>
                        <Typography fontSize={23}>Settings</Typography>
                        <Divider flexItem />
                        <Stack gap={4}>
                            <Stack direction="row" justifyContent="space-between" alignItems="center">
                                <Typography>Theme mode:</Typography>
                                <ThemeSwitch />
                            </Stack>
                            <Stack gap={2} >
                                <Stack direction="row" justifyContent="space-between" alignItems="center">
                                    <Typography>Signed in as <b>{session?.user.name}</b></Typography>
                                    <Avatar src={session?.user.image} />
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