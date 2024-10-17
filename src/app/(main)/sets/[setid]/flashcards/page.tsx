"use client"

import TextLine from '@/components/ui/TextLine'
import useSet from '@/lib/hooks/useSet'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined'
import { Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'

const Page: FC<{}> = () => {

    const { set } = useSet()

    return (

        <Stack gap={3}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2} >
                <TextLine>
                    <Stack direction="row" gap={1} sx={{ flexShrink: 1, minWidth: 0, alignItems: "center" }}>
                        <StyleOutlinedIcon sx={{ width: 40, height: 40 }} />
                        <Typography sx={{ overflow: "hidden", whiteSpace: "nowrap", fontSize: 25, textOverflow: "ellipsis", maxWidth: "100%" }}>{set.name}</Typography>
                    </Stack>
                </TextLine>

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
                        Free mode
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
                        Progress mode
                    </Paper>
                </Link>

            </Stack>
        </Stack>

    )



}

export default Page