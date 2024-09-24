'use client'

import { createTheme } from "@mui/material/styles";
import 'non.geist';
import { NotoSans } from "./fonts";

export const RootTheme = createTheme({
    cssVariables: {
        colorSchemeSelector: 'class'
    },
    typography: {
        fontFamily: 'Geist Variable',
    },
    colorSchemes: {
        light: {
            palette: {
                primary: {
                    main: "#3CC8AF",
                    light: "#47dfc5",
                    dark: "#28b59c",
                    contrastText: "#fff",
                },
                background: {
                    default: "#fafafa",
                },
                action: {
                    hover: "white",
                },
            },
        },
        dark: {
            palette: {
                primary: {
                    main: "#3CC8AF",
                    light: "#47dfc5",
                    dark: "#28b59c",
                },
                background: {
                    default: "#151515",
                },
                action: {
                    hover: "black",
                },
            },
        },
    },
    components: {
        MuiPaper: {
            defaultProps: {
                variant: "outlined",
            },
            styleOverrides: {
                root: ({ theme }) => ({
                    borderRadius: 10,
                    backgroundColor: theme.palette.background.default,

                }),
            },
        },
        MuiLink: {
            defaultProps: {
                target: "blank",
                color: "inherit"
            },
        },
        MuiButton: {
            styleOverrides: {
                root: ({ theme }) => ({
                    textTransform: "none",
                    borderRadius: theme.spacing(1),
                    fontSize: 12,
                    fontFamily: NotoSans.style.fontFamily,
                    fontWeight: 600,
                    boxShadow: "none",
                    flex: "none",
                    "&:hover": { boxShadow: "none" }
                })
            },

        },
        MuiTextField: {
            styleOverrides: {
                root: ({ theme }) => ({
                    '& label.Mui-focused': {
                        color: theme.palette.text.primary,
                    },
                    '& .MuiOutlinedInput-root': {
                        '&:hover fieldset': {
                            borderColor: theme.palette.text.primary,
                        },
                        '&.Mui-focused fieldset': {
                            borderColor: theme.palette.text.primary,
                        },
                    }
                })
            }
        },
        MuiTypography: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.palette.text.secondary,
                })
            }
        },

    },

});


