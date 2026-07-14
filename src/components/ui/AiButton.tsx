"use client"

import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome'
import { Button, ButtonProps } from '@mui/material'
import { FC } from 'react'

const AiButton: FC<ButtonProps> = (props) => {



    return (
        <Button
            type="button"
            startIcon={<AutoAwesomeIcon fontSize="small" />}
            {...props}
            sx={{
                position: "relative",
                overflow: "hidden",
                borderRadius: 999,
                px: 2,
                minHeight: 40,
                fontWeight: 800,
                textTransform: "none",
                color: "#fff",
                background: "linear-gradient(135deg, #3CC8AF 0%, #3CC8F4 58%, #8b5cf6 100%)",
                boxShadow: "0 10px 26px rgba(60, 200, 244, 0.32)",
                "&::before": {
                    content: '""',
                    position: "absolute",
                    inset: 0,
                    background: "linear-gradient(120deg, transparent 0%, rgba(255,255,255,0.34) 38%, transparent 68%)",
                    transform: "translateX(-120%)",
                    transition: "transform 0.6s ease",
                },
                "&:hover": {
                    boxShadow: "0 14px 34px rgba(60, 200, 244, 0.42)",
                    transform: "translateY(-1px)",
                    background: "linear-gradient(135deg, #32bfa7 0%, #32bdf0 58%, #7c3aed 100%)",
                    "&::before": {
                        transform: "translateX(120%)",
                    },
                },
                "& .MuiButton-startIcon, & .MuiButton-icon, & .MuiButton-startIcon + *": {
                    position: "relative",
                    zIndex: 1,
                },
                ...props.sx
            }}
        >
            {props.children}
        </Button>

    )
}

export default AiButton