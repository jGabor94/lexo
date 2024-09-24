"use client"

import { Stack, Tooltip, useColorScheme } from "@mui/material";
import LightModeIcon from "@mui/icons-material/LightMode";
import ComputerIcon from "@mui/icons-material/Computer";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const props = {
    sx: {
        color: "text.secondary",
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

    const currentMode = mode === "system" ? systemMode : mode

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setMode(e.target.checked ? "dark" : "light");
    }

    return (
        <Stack direction="row" gap={0.2}>
            <Tooltip title="Light">
                <LightModeIcon
                    {...{
                        ...props,
                        sx: {
                            ...props.sx,
                            borderColor: mode === "light" ? "text.secondary" : "transparent",
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
                            borderColor: mode === "system" ? "text.secondary" : "transparent",
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
