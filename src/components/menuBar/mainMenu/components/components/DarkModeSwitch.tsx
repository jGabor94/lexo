"use client"

import ComputerIcon from "@mui/icons-material/Computer";
import DarkModeIcon from "@mui/icons-material/DarkMode";
import LightModeIcon from "@mui/icons-material/LightMode";
import { Stack, Tooltip, useColorScheme } from "@mui/material";

const props = {
    sx: {
        color: "text.primary",
        cursor: "pointer",
        height: 25,
        width: 25,
        borderRadius: 20,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        p: 0.3,
        transition: "border-color 0.5s ease",
    },
};

const ThemeSwitch = () => {

    const { mode, setMode, systemMode } = useColorScheme();


    return (
        <Stack direction="row" gap={0.2}>
            <Tooltip title="Light">
                <LightModeIcon
                    {...{
                        ...props,
                        sx: {
                            ...props.sx,
                            borderColor: mode === "light" ? "text.primary" : "transparent",
                        },
                    }}
                    onClick={() => setMode("light")}
                />
            </Tooltip>

            <Tooltip title="System">
                <ComputerIcon
                    {...{
                        ...props,
                        sx: {
                            ...props.sx,
                            borderColor: mode === "system" ? "text.primary" : "transparent",
                        },
                    }}
                    onClick={() => setMode("system")}
                />
            </Tooltip>

            <Tooltip title="Dark">
                <DarkModeIcon
                    {...{
                        ...props,
                        sx: {
                            ...props.sx,
                            borderColor: mode === "dark" ? "text.secondary" : "transparent",
                        },
                    }}
                    onClick={() => setMode("dark")}
                />
            </Tooltip>
        </Stack>
    );
};

export default ThemeSwitch;
