import { exerciseTheme } from '@/features/practice/lib/contants';
import ExerciseController from '@/features/practice/providers/ExerciseController';
import { Exercise, ExerciseMode } from '@/features/practice/types';
import { getSet } from '@/features/set/dal/queries';
import SetProvider from '@/features/set/providers';
import { getIsOwner } from '@/features/set/utils';
import { Box, Paper, Stack, Tooltip, Typography } from '@mui/material';
import { X } from 'lucide-react';
import Link from 'next/link';
import { notFound, redirect } from 'next/navigation';
import { FC, ReactNode } from 'react';

const layout: FC<{ children: ReactNode, params: Promise<{ setid: string, exercise: string, mode: string }> }> = async ({ children, params }) => {
    const { setid, exercise: exerciseParam, mode: modeParam } = await params;
    const exercise = exerciseParam as Exercise;
    const mode = modeParam as ExerciseMode;

    const res = await getSet(setid)
    if (!res.success) return <>Hiba {res.error.type}</>
    const { data: set } = res
    const isOwner = await getIsOwner(set.user.id)
    if (!isOwner && mode !== "free") redirect(`/sets/${set.id}/${exercise}/free`)
    if (!exerciseTheme[exercise]) return notFound()

    const Icon = exerciseTheme[exercise].icon

    return (
        <SetProvider set={set}>
            <Stack gap={3} sx={{ overflowX: "visible", }} >
                <Paper component={Stack} direction="row" p={2} justifyContent="space-between" alignItems="center" gap={2} sx={{ border: "none", backgroundColor: "background.paper" }} >
                    <Stack direction="row" gap={2} sx={{ flexShrink: 1, minWidth: 0, alignItems: "center" }}>
                        <Box
                            sx={{
                                p: 2,
                                borderRadius: '50%',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                mx: 'auto',
                                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.15)',
                                backgroundColor: exerciseTheme[exercise].color
                            }}
                        >
                            <Icon sx={{ fontSize: 26, color: 'white' }} />
                        </Box>
                        <Stack>

                            <Typography sx={{ overflow: "hidden", whiteSpace: "nowrap", fontSize: 27, textOverflow: "ellipsis", maxWidth: "100%" }}>{exerciseTheme[exercise].name}</Typography>
                            <Typography sx={{ overflow: "hidden", whiteSpace: "nowrap", fontSize: 14, textOverflow: "ellipsis", maxWidth: "100%" }} color="text.secondary">{set.name}</Typography>
                        </Stack>

                    </Stack>


                    <Tooltip title="Bezárás" sx={{ height: "max-content" }} >
                        <Link href={`/sets/${set.id}`} style={{ textDecoration: "none", color: "inherit" }}>
                            <X />
                        </Link>
                    </Tooltip>

                </Paper>
                <Stack alignItems="center" sx={{ overflowX: "hidden", maxWidth: "100%" }}>
                    <ExerciseController>
                        {children}
                    </ExerciseController>
                </Stack>
            </Stack>
        </SetProvider>

    )
}

export default layout