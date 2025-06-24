'use client'

import { createTheme } from "@mui/material/styles";
import 'non.geist';
import { NotoSans } from "./fonts";

export const RootTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class',
    },
    typography: {
        allVariants: {
            fontFamily: 'Geist Variable',
            fontWeight: 500
        },
        fontFamily: 'Geist Variable',
    },
    defaultColorScheme: "dark",
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
                    main: "rgba(0, 0, 0, 0.54)",
                    contrastText: "#fff",
                },
                background: {
                    default: "rgb(248, 248, 248)",
                    paper: "rgb(248, 248, 248)",
                },
                action: {
                    hover: "white",
                },
                text: {
                    primary: "rgba(0, 0, 0, 0.8)",
                    secondary: "rgba(0, 0, 0, 0.59)",
                }
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
                    primary: "rgba(255, 255, 255, 0.8)",
                    secondary: "#fff",

                }


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
                        border: `2px solid ${theme.vars.palette.text.disabled}`,
                        backgroundColor: theme.vars.palette.background.default,
                        borderRadius: 10,
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
                        }
                    }
                }
            },

        },

        MuiSvgIcon: {
            styleOverrides: {
                root: ({ theme }) => ({
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
                            borderColor: theme.vars.palette.text.primary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.vars.palette.text.primary,
                        },
                    }
                })
            }
        },

    },

});


