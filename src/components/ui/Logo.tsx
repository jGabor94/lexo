import { JuraFont } from "@/lib/mui/fonts"
import { LogoText } from "@/lib/mui/styled"
import { TypographyProps } from "@mui/material"
import Link from "next/link"
import { FC } from "react"

const Logo: FC<TypographyProps> = (props) => (
    <LogoText
        component={Link}
        href="/"
        sx={{
            fontFamily: JuraFont.style.fontFamily,
            cursor: "pointer",
            fontWeight: 700,
            fontSize: 30,
            background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)",
            backgroundClip: "text",
            textFillColor: "transparent",
            textDecoration: "none",
            ...props
        }}
    >
        Lexo
    </LogoText>
)

export default Logo
