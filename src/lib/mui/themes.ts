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
                    paper: "#fafafa",
                },
                action: {
                    hover: "white",
                },
                text: {
                    primary: "rgba(0, 0, 0, 0.6)",
                    secondary: "rgba(0, 0, 0, 0.87)"
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
                background: {
                    default: "#151515",
                    paper: "#151515",
                },
                action: {
                    hover: "black",
                },
                text: {
                    primary: "rgba(255, 255, 255, 0.7)",
                    secondary: "#fff"
                }


            },
        },
    },
    components: {
        MuiPaper: {
            defaultProps: {
                variant: "outlined",
            },
            styleOverrides: {
                root: () => ({
                    borderRadius: 10,
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

        MuiSvgIcon: {
            styleOverrides: {
                root: ({ theme }) => ({
                    color: theme.vars.palette.text.primary,
                })
            }
        },
        MuiTextField: {
            defaultProps: {
                slotProps: {
                    htmlInput: {
                        autoCapitalize: 'none'
                    }
                }
            },
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

    },

});


