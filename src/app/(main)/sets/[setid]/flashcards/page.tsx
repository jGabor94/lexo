"use client"

import useSet from '@/lib/hooks/useSet'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined'
import { Box, Divider, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'

const Page: FC<{}> = () => {

    const { set } = useSet()

    return (

        <Stack gap={3}>
            <Stack direction="row" gap={2} alignItems="center">
                <Stack direction="row" alignItems="center" gap={2}>
                    <Typography sx={{ textWrap: "nowrap", fontSize: 35 }}>
                        {set.name}
                    </Typography>
                    <Divider orientation="vertical" flexItem />
                    <StyleOutlinedIcon sx={{ width: 40, height: 40 }} />
                </Stack>
                <Box sx={{ width: "100%", height: "1px", backgroundColor: "divider" }} />
                <Stack direction="row" gap={0.5} component={Link} href={`/sets/${set._id}`} sx={{ textWrap: "nowrap", color: "text.primary", textDecoration: "none" }}>
                    <ArrowBackIcon />
                    <Typography>Back to the set</Typography>
                </Stack>
            </Stack>
            <Stack gap={2} sx={{ flexDirection: { xs: "column", sm: "row" } }}>

                <Link href={`/sets/${set._id}/flashcards/free`} legacyBehavior>
                    <Paper variant='elevation' component={Stack} sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        aspectRatio: "2 / 1",
                        flex: 1,
                        cursor: "pointer"
                    }}>
                        Free
                    </Paper>
                </Link>
                <Link href={`/sets/${set._id}/flashcards/progress`} legacyBehavior>
                    <Paper variant='elevation' component={Stack} sx={{
                        alignItems: "center",
                        justifyContent: "center",
                        aspectRatio: "2 / 1",
                        flex: 1,
                        cursor: "pointer"
                    }}>
                        Progress
                    </Paper>
                </Link>

            </Stack>
        </Stack>

    )



}

export default Page