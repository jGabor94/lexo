"use client"

import { termColor } from '@/features/term/lib/constants'
import { getTermStats } from '@/features/term/utils'
import { Box, Paper, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import useSet from '../hooks/useSet'

const SetProgress: FC<{ overallProgress: number }> = ({ overallProgress }) => {

    const { set, isOwner } = useSet()

    return (isOwner || set.task) && (
        <Paper
            sx={{
                p: 2,
                bgcolor: 'card.main',
                border: "1px solid transparent",
                "&:hover": {
                    boxShadow: "0 12px 28px rgba(0,0,0,0.12)",
                },
            }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight={700}>
                    Haladás
                </Typography>
                <Typography variant="h5" fontWeight={700} sx={{ color: "primary.main" }}>
                    {Math.round(overallProgress)}%
                </Typography>
            </Stack>
            <Box
                sx={{
                    height: 12,
                    borderRadius: 10,
                    background: '#f3f4f6',
                    overflow: 'hidden',
                    width: '100%',
                    mb: 2.5,
                }}
            >
                <Box
                    sx={{
                        height: '100%',
                        width: `${overallProgress}%`,
                        bgcolor: "primary.main",
                        borderRadius: 10,
                        transition: 'width 0.3s ease',
                    }}
                />
            </Box>
            <Stack direction="row" justifyContent="space-between">
                <Stack alignItems="center" >
                    <Typography > {getTermStats(set.terms).all}</Typography>
                    <Typography fontSize="0.8rem" >Összes</Typography>
                </Stack>
                <Stack alignItems="center" color={termColor["learning"]}>
                    <Typography > {getTermStats(set.terms).learning}</Typography>
                    <Typography fontSize="0.8rem" >Tanulás alatt</Typography>
                </Stack>
                <Stack alignItems="center" color={termColor["review"]}>
                    <Typography >{getTermStats(set.terms).review}</Typography>
                    <Typography fontSize="0.8rem" >Ismétlés</Typography>
                </Stack>
                <Stack alignItems="center" color={termColor["learned"]}>
                    <Typography >{getTermStats(set.terms).learned}</Typography>
                    <Typography fontSize="0.8rem" >Megtanulva</Typography>
                </Stack>
            </Stack>
        </Paper >


    )
}

export default SetProgress