"use client"

import useSet from '@/features/set/hooks/useSet'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { ChevronLeft, RotateCcw } from 'lucide-react'
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
            <Stack direction="row" gap={3} alignItems="center" >
                <Box component="img" src="/confetti.png" sx={{ width: 70 }} />
                <Typography fontWeight={600} fontSize={25}>Szép munka!</Typography>
            </Stack>
            <Stack direction="row" gap={2} width="100%">
                <Paper
                    component={Stack}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ flex: 1, p: 2, backgroundColor: "warning.main", border: "none" }}
                >
                    <Typography>Helytelen válasz:</Typography>
                    <Typography>{wrongItems.length}</Typography>
                </Paper>
                <Paper
                    component={Stack}
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    sx={{ flex: 1, p: 2, backgroundColor: "primary.main", border: "none" }}>
                    <Typography>Helyes válasz:</Typography>
                    <Typography>{successItems.length}</Typography>
                </Paper>
            </Stack>
            {isOwner && (
                <Fragment>
                    <Stack gap={1}>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography>Megtanult:</Typography>
                            <Typography>{learnedNum}</Typography>
                        </Stack>
                        <Stack direction="row" justifyContent="space-between">
                            <Typography>Tanulás alatt:</Typography>
                            <Typography>{set.terms.length - learnedNum}</Typography>
                        </Stack>
                    </Stack>

                    <ProgressGauge percentage={percentage} />
                </Fragment>
            )}


            <Stack direction="row" justifyContent="space-between" gap={2} alignItems="flex-end">
                <Stack direction="row" gap={0.5} component={Link} href={`/sets/${set.id}`} sx={{ textWrap: "nowrap", color: "text.primary", textDecoration: "none" }}>
                    <ChevronLeft />
                    <Typography>Vissza a szógyűjteményhez</Typography>
                </Stack>
                <Stack direction="row" alignItems="center" gap={0.5} onClick={() => setCompleted(null)} sx={{ cursor: "pointer" }}>
                    <RotateCcw />
                    <Typography>Újra próbálom</Typography>
                </Stack>


            </Stack>

        </Stack>
    )
}

export default Completed