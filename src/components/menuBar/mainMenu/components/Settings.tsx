"use client"

import { FC, Fragment, useState } from "react"
import SettingsIcon from '@mui/icons-material/Settings';
import { Avatar, Box, Divider, IconButton, Modal, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { useSession } from "next-auth/react";
import SignOutButton from "./SignOutButton";
import ThemeSwitch from "./components/DarkModeSwitch";

const Settings: FC<{}> = () => {

    const { data: session } = useSession()

    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

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
                <Box component={Paper} sx={{
                    boxShadow: 10,
                    position: 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    width: 400,
                    maxWidth: "95%",
                    outline: "none",
                    p: 2
                }}>
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
                </Box>

            </Modal>
        </Fragment>

    )

}

export default Settings