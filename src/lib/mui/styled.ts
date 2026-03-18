"use client"

import { Chip, IconButton, Stack, styled, Typography } from "@mui/material";
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
        height: "fit-content",
        border: `2px solid ${rest.disabled ? theme.vars.palette.action.disabled : theme.vars.palette.action.active}`,
        [theme.breakpoints.down("sm")]: {
            borderWidth: "1px",
        },
    })
}) as typeof IconButton

export const TagLabel = styled(Chip)(({ theme, color }) => color && color !== "default" && (color === "emerald" || color === "cyan" || color === "amber") && ({
    color: theme.palette[color][700],
    backgroundColor: theme.palette[color][100],
    fontWeight: 600
}
)) as typeof Chip

