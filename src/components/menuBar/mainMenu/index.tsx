import { Logo } from "@/components/ui/logo";
import { Box, Stack } from "@mui/material";
import { FC } from "react";
import MenuList from "./components/MenuList";
import Settings from "./components/Settings";

interface MenuBarProps {
    height: number
}

const MainMenu: FC<MenuBarProps> = async ({ height }) => {
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
                        <Logo />

                        <MenuList {...{
                            menuItems: [
                                { label: "Home", path: "/home" },
                                { label: "Library", path: "/library/all" },
                                { label: "Folders", path: "/folders" },
                            ]
                        }} />
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