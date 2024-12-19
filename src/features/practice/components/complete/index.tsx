"use client"

import useSet from '@/features/set/hooks/useSet'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import RestartAltIcon from '@mui/icons-material/RestartAlt'
import { Box, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { Dispatch, FC, Fragment, SetStateAction } from 'react'
import ProgressGauge from './components/ProgressGauge'

interface props {
    successItems: string[],
    wrongItems: string[],
    setCompleted: Dispatch<SetStateAction<{
        successItems: string[];
        wrongItems: string[];
    } | null>>
}

const Completed: FC<props> = ({ successItems, wrongItems, setCompleted }) => {

    const { set, isOwner } = useSet()

    const learnedNum = set.terms.reduce((acc, curr) => {
        return curr.status === 5 ? acc + 1 : acc
    }, 0)


    const sum = set.terms.reduce((acc, curr) => {
        return acc + (curr.status || 0)
    }, 0)

    const percentage = Math.round(sum / (set.terms.length * 5 * 0.01))

    return (
        <Stack gap={2} sx={{ width: 600, maxWidth: "100%", margin: "0 auto" }} >
            <Stack direction="row" gap={3} alignItems="center" justifyContent="space-between">
                <Typography fontWeight={600} fontSize={25}>You have completed the exercise</Typography>
                <Box component="img" src="/confetti.svg" sx={{ width: 70, height: 70 }} />
            </Stack>
            <Stack direction="row" gap={2} width="100%">
                <Paper
                    component={Stack}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ flex: 1, p: 2, backgroundColor: "warning.main" }}
                >
                    <Typography>Not memoized:</Typography>
                    <Typography>{wrongItems.length}</Typography>
                </Paper>
                <Paper
                    component={Stack}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ flex: 1, p: 2, backgroundColor: "primary.main" }}>
                    <Typography>Memoized:</Typography>
                    <Typography>{successItems.length}</Typography>
                </Paper>
            </Stack>
            {isOwner && (
                <Fragment>
                    <Stack gap={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography>Learned:</Typography>
                            <Typography>{learnedNum}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography>Still learning:</Typography>
                            <Typography>{set.terms.length - learnedNum}</Typography>
                        </Stack>
                    </Stack>

                    <ProgressGauge percentage={percentage} />
                </Fragment>
            )}


            <Stack direction="row" justifyContent="space-between" gap={2} alignItems="flex-end">
                <Stack direction="row" gap={0.5} component={Link} href={`/sets/${set.id}`} sx={{ textWrap: "nowrap", color: "text.primary", textDecoration: "none" }}>
                    <ArrowBackIcon />
                    <Typography>Back to the set</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.5} onClick={() => setCompleted(null)} sx={{ cursor: "pointer" }}>
                    <RestartAltIcon />
                    <Typography>Restart</Typography>
                </Stack>


            </Stack>

        </Stack>
    )
}

export default Completed