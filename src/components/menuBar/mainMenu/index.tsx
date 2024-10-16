"use client"

import { Logo } from "@/components/ui/logo";
import CategoryIcon from '@mui/icons-material/Category';
import FolderIcon from '@mui/icons-material/Folder';
import HomeIcon from '@mui/icons-material/Home';
import { Box, Stack, useMediaQuery, useTheme } from "@mui/material";
import { FC } from "react";
import MenuList from "./components/MenuList";
import Settings from "./components/Settings";
import MobilMenu from "./components/components/MobilMenu";

interface MenuBarProps {
    height: number
}

const menuItems = [
    { label: "Home", path: "/home", icon: HomeIcon },
    { label: "Library", path: "/library/all", icon: CategoryIcon },
    { label: "Folders", path: "/folders", icon: FolderIcon },
]

const MainMenu: FC<MenuBarProps> = ({ height }) => {

    const theme = useTheme()
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ height, zIndex: 10 }}>
            <Box sx={{
                zIndex: 10,
                height,
                borderBottomStyle: "solid",
                borderBottomWidth: "1px",
                borderBottomColor: "text.secondary",
                width: "100%",
                position: "fixed",
                pr: 3,
                pl: 3,
                backdropFilter: "blur(7px)",
                opacity: 1
            }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ height, width: 1000, maxWidth: "100%", margin: "0 auto" }}>
                    <Stack direction="row" gap={5} alignItems="center">
                        <Stack direction="row" alignItems="center" gap={1}>
                            <MobilMenu {...{ menuItems }} />
                            <Logo />
                        </Stack>
                        <MenuList {...{ menuItems }} />
                    </Stack>
                    <Stack direction="row" gap={1}>
                        <Settings />
                    </Stack>
                </Stack>
            </Box>
        </Box >
    )
}

export default MainMenu