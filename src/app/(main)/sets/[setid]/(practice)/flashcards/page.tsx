"use client"

import useSet from '@/features/set/hooks/useSet'
import { CircularProgress, Paper, Stack } from '@mui/material'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { FC, useEffect } from 'react'

const Page: FC<{}> = () => {

    const { set, isOwner } = useSet()
    const router = useRouter()

    useEffect(() => {
        if (!isOwner) {
            router.push(`/sets/${set.id}/flashcards/free`)
        }
    }, [])


    if (!isOwner) {
        return (
            <Stack alignItems="center" justifyContent="center" height={500}>
                <CircularProgress />
            </Stack>
        )
    }

    return (
        <Stack gap={2} alignItems="center">

            <Link href={`/sets/${set.id}/flashcards/free`} style={{ textDecoration: "none", color: "inherit" }}>
                <Paper variant='elevation' component={Stack} sx={{
                    width: 300,
                    py: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    cursor: "pointer"
                }}>
                    Gyakorlás
                </Paper>
            </Link>
            <Link href={`/sets/${set.id}/flashcards/progress`} style={{ textDecoration: "none", color: "inherit" }}>
                <Paper variant='elevation' component={Stack} sx={{
                    width: 300,
                    py: 4,
                    alignItems: "center",
                    justifyContent: "center",
                    flex: 1,
                    cursor: "pointer"
                }}>
                    Vizsga
                </Paper>
            </Link>

        </Stack>

    )



}

export default Page