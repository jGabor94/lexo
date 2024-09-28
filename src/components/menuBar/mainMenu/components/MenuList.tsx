"use client"

import { Stack, Typography } from "@mui/material"
import Link from "next/link"
import { usePathname } from "next/navigation"
import 'non.geist'
import { FC } from "react"

const MenuList: FC<{ menuItems: Array<{ label: string, path: string }> }> = ({ menuItems }) => {

    const pathname = usePathname()

    return (
        <Stack direction="row" gap={4}>
            {menuItems.map((item, index) => (
                <Typography
                    key={index}
                    component={Link}
                    href={item.path}
                    sx={{
                        '&:hover': {
                            color: "white"
                        },
                        textAlign: 'center',
                        fontWeight: 400,
                        fontSize: 15,
                        textDecoration: "none",
                        color: pathname === item.path ? "text.secondary" : "text.primary"
                    }}>{item.label}</Typography>
            ))}
        </Stack>

    )
}

export default MenuList