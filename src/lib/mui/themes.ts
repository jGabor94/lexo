'use client'

import { createTheme } from "@mui/material/styles";
import 'non.geist';
import { NotoSans } from "./fonts";
import tailwindColors from "./tailwindColors";



export const RootTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    typography: {
        allVariants: {
            fontFamily: 'Geist Variable',
        },
        fontFamily: 'Geist Variable',
    },
    defaultColorScheme: "light",
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#3CC8AF",
                    light: "#47dfc5",
                    dark: "#28b59c",
                    contrastText: "#fff",
                },
                secondary: {
                    main: "#3CC8F4",
                    contrastText: "#fff",
                },
                button: {
                    main: "#1f2937",
                    contrastText: "#fff",
                },
                background: {
                    default: "#F3F2F8",
                    paper: "#FFFFFF",
                },
                action: {
                    hover: "white",
                },
                text: {
                    primary: "#1f2937",
                    secondary: "#6b7280",
                },
                muted: {
                    main: "#d5d3de",
                    contrastText: "#676284",
                },
                ...tailwindColors,

            },
        },
        dark: {
            palette: {
                primary: {
                    main: "#3CC8AF",
                    light: "#47dfc5",
                    dark: "#28b59c",
                    contrastText: "rgba(0, 0, 0, 0.87)",
                },
                secondary: {
                    main: "#3CC8F4",
                },
                button: {
                    main: "#fff",
                    contrastText: "rgba(0, 0, 0, 0.87)",
                },
                background: {
                    default: "#151515",
                    paper: "#1f1f1f",
                },
                action: {
                    hover: "black",
                },
                text: {
                    primary: "#E5E7EB",
                    secondary: "#a7a7a7ff",
                },
                muted: {
                    main: "#d8d3ec",
                    contrastText: "#cac7dd",
                },
                ...tailwindColors,

            },
        },
    },
    components: {
        MuiPaper: {
            defaultProps: {
                elevation: 0,
            },
            styleOverrides: {

                root: ({ theme }) => {
                    return {
                        variants: [
                            {
                                props: { elevation: 0 },
                                style: {
                                    boxShadow: "none",
                                    border: "1px solid #DCDAE7",
                                },
                            },
                        ],
                        borderRadius: 12,
                    }
                },
            },
        },
        MuiLink: {
            defaultProps: {
                target: "blank",
                color: "inherit"
            },
        },
        MuiToggleButton: {
            styleOverrides: {
                root: {
                    textTransform: "none"
                }
            }
        },
        MuiButton: {
            defaultProps: {
                color: "button",
            },
            styleOverrides: {

                root: ({ theme, ownerState }) => {

                    return {
                        textTransform: "none",
                        borderRadius: theme.spacing(1),
                        fontFamily: NotoSans.style.fontFamily,
                        fontWeight: 600,
                        boxShadow: "none",
                        //border: ownerState.variant !== "text" ? `2px solid ${ownerState.color && ownerState.color !== "inherit" && theme.vars.palette[ownerState.color].main} ` : "",
                        flex: "none",
                        "&:hover": { boxShadow: "none" },
                        "&.Mui-disabled": {
                            border: "none"
                        },
                        "& .MuiSvgIcon-root": {
                            color: ownerState.variant === "contained" ? theme.vars.palette.button.contrastText : theme.vars.palette.button.main,
                        },
                    }
                }
            },

        },

        MuiSvgIcon: {
            styleOverrides: {
                root: ({ theme, ownerState }) => ({
                    color: theme.vars.palette.text.primary,
                })
            }
        },
        MuiTextField: {
            defaultProps: {
                inputProps: { autoCapitalize: "none" },
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    '& label': {
                        color: theme.vars.palette.text.primary,
                    },
                    '& label.Mui-focused': {
                        color: theme.vars.palette.text.primary,
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: "rgba(0 0 0 / 0.23)",
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.vars.palette.text.primary,
                            borderWidth: 1,

                        },
                    }
                })
            }
        },

    },

});


