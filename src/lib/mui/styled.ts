"use client"

import { IconButton, Stack, styled, Typography } from "@mui/material";
import { JuraFont } from "./fonts";



export const LogoText = styled(Typography)({
    fontFamily: JuraFont.style.fontFamily,
    color: "text.primary",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 30,
    textDecoration: "none",
}) as typeof Typography



export const LangCodeLabel = styled(Stack)(({ theme }) => ({
    alignItems: "center",
    justifyContent: "center",
    p: 1,
    width: 30,
    height: 30,
    borderSize: "1px",
    borderColor: theme.palette.text.secondary,
    borderStyle: "solid",
    borderRadius: "100%",
})) as typeof Stack


export const IconButtonGrey = styled(IconButton)(({ theme, ...rest }) => {
    return ({
        borderRadius: "100%",
        border: rest.disabled ? `2px solid ${theme.vars.palette.action.disabled}` : `2px solid ${theme.vars.palette.action.active}}`,
    })
}) as typeof IconButton


