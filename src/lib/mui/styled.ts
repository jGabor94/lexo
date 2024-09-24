"use client"

import { Paper, Stack, styled, Typography } from "@mui/material";
import { JuraFont } from "./fonts";

export const Card = styled(Paper)(({ theme }) => ({
    "&:hover": {
        backgroundColor: theme.palette.background.paper,
    },
})) as typeof Paper

export const LogoText = styled(Typography)({
    fontFamily: JuraFont.style.fontFamily,
    color: "text.primary",
    cursor: "pointer",
    fontWeight: 700,
    fontSize: 30,
    background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)",
    backgroundClip: "text",
    textFillColor: "transparent",
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

