"use client"

import { Chip, Stack } from '@mui/material'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { FC } from 'react'

const ChipMenu: FC<{ list: Array<{ label: string, href: string, icon?: JSX.Element }> }> = ({ list }) => {

    const pathname = usePathname()

    return (
        <Stack direction="row" spacing={1} >
            {
                list.map(({ label, href, icon }, index) => (
                    <Chip
                        key={index}
                        icon={icon}
                        label={label}
                        component={Link}
                        href={href}
                        variant={pathname === href ? "filled" : "outlined"}
                        sx={{ cursor: "pointer" }
                        }
                    />
                ))}
        </Stack>
    )
}

export default ChipMenu