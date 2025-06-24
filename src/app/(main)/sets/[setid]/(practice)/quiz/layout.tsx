"use client"

import useSet from '@/features/set/hooks/useSet'
import { Box, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { X } from 'lucide-react'
import Link from 'next/link'
import { FC, ReactNode } from 'react'

const Layout: FC<{ children: ReactNode }> = ({ children }) => {


    const { set } = useSet()

    return (
        <Stack gap={3}   >
            <Paper component={Stack} direction="row" p={2} justifyContent="space-between" alignItems="center" gap={2} sx={{ border: "none", backgroundColor: "background.paper" }} >
                <Stack mb={3} >
                    <Stack direction="row" gap={1} sx={{ flexShrink: 1, minWidth: 0, alignItems: "center" }}>
                        <Box component="img" src="/quiz.png" width={50} />
                        <Typography sx={{ overflow: "hidden", whiteSpace: "nowrap", fontSize: 27, textOverflow: "ellipsis", maxWidth: "100%" }}>Kvíz</Typography>
                    </Stack>
                    <Typography sx={{ overflow: "hidden", whiteSpace: "nowrap", fontSize: 18, textOverflow: "ellipsis", maxWidth: "100%" }} color="text.secondary">{set.name}</Typography>

                </Stack>

                <Tooltip title="Bezárás" sx={{ height: "max-content" }} >
                    <Link href={`/sets/${set.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                        <X />
                    </Link>
                </Tooltip>

            </Paper>
            {children}
        </Stack>
    )
}

export default Layout