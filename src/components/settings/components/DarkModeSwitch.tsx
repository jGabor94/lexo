"use client"

import { Stack, Tooltip, useColorScheme, useTheme } from "@mui/material";
import { Laptop, Moon, Sun } from "lucide-react";

const props = {
    sx: {
        cursor: "pointer",
        height: 30,
        width: 30,
        borderRadius: 20,
        borderWidth: "1px",
        borderStyle: "solid",
        borderColor: "transparent",
        padding: "4px",
        transition: "border-color 0.5s ease",
    },
};

const ThemeSwitch = () => {

    const { mode, setMode } = useColorScheme();

    const theme = useTheme()


    return (
        <Stack direction="row" gap={0.2}>
            <Tooltip title="Világos">
                <Sun
                    {...{
                        ...props,
                        style: {
                            ...props.sx,
                            borderColor: mode === "light" ? theme.vars.palette.text.primary : "transparent",
                        },
                    }}
                    onClick={() => setMode("light")}
                />
            </Tooltip>

            <Tooltip title="Rendszer">
                <Laptop
                    {...{
                        ...props,
                        style: {
                            ...props.sx,
                            borderColor: mode === "system" ? theme.vars.palette.text.primary : "transparent",
                        },
                    }}
                    onClick={() => setMode("system")}
                />
            </Tooltip>

            <Tooltip title="Sötét">
                <Moon
                    {...{
                        ...props,
                        style: {
                            ...props.sx,
                            borderColor: mode === "dark" ? theme.vars.palette.text.primary : "transparent",
                        },
                    }}
                    onClick={() => setMode("dark")}
                />
            </Tooltip>
        </Stack>
    );
};

export default ThemeSwitch;
