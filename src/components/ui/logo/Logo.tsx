import { LondrinaFont } from "@/lib/mui/fonts"
import { LogoText } from "@/lib/mui/styled"
import { Typography, TypographyProps } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

const Logo: FC<TypographyProps> = (props) => (
    <Typography

        {...props}
        sx={{

            color: "text.primary",
            fontFamily: LondrinaFont.style.fontFamily,
            cursor: "pointer",
            fontWeight: 400,
            fontSize: 50,
            mt: -0.7,
            background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            ...props.sx
        }}
    >
        Lexo
    </Typography>
)


export const LogoWhite: FC<TypographyProps> = (props) => (
    <LogoText
        component={Link}
        href="/"
        {...props}
        sx={{
            color: "white",
            fontFamily: LondrinaFont.style.fontFamily,
            cursor: "pointer",
            fontWeight: 400,
            fontSize: 50,
            mt: -0.7,
            ...props.sx
        }}
    >
        Lexo
    </LogoText>
)

export default Logo
