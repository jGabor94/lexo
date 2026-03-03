"use client"

import useMenuControl from '@/hooks/useMenuControl';
import { IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from "@mui/material";
import { EllipsisVertical, LogOutIcon, UserIcon } from 'lucide-react';
import { signOut } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { FC, Fragment } from "react";

const Settings: FC<{}> = () => {

    const router = useRouter()
    const menuControl = useMenuControl()

    const handleSignOutClick = async () => {
        await signOut()
        router.refresh()
    }


    return (
        <Fragment>

            <IconButton
                onClick={menuControl.handleOpen}>
                <EllipsisVertical />
            </IconButton>

            <Menu
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                anchorPosition={{ top: 100, left: 100 }}
                anchorEl={menuControl.anchorEl}
                open={menuControl.open}
                onClose={menuControl.handleClose}
                disableScrollLock
            >
                <MenuItem onClick={() => router.push("/profile")}>
                    <ListItemIcon>
                        <UserIcon size={20} />
                    </ListItemIcon>
                    <ListItemText>Profil</ListItemText>
                </MenuItem>
                <MenuItem onClick={handleSignOutClick}>
                    <ListItemIcon>
                        <LogOutIcon size={20} />
                    </ListItemIcon>
                    <ListItemText>Kijelentkezés</ListItemText>
                </MenuItem>
            </Menu>
            {/* 
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
            */}

        </Fragment>

    )

}

export default Settings