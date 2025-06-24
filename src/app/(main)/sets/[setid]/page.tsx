"use client"

import CreateCopy from '@/features/set/components/CreateCopy'
import FavoriteButton from '@/features/set/components/FavoriteButton'
import SetMenu from '@/features/set/components/SetMenu'
import useSet from '@/features/set/hooks/useSet'
import SwapTerms from '@/features/term/components/SwapTerms'
import TermList from '@/features/term/components/TermList'
import { IconButtonGrey } from '@/lib/mui/styled'
import { getDate } from '@/utils'
import { Avatar, Box, Divider, Paper, Stack, Tooltip, Typography } from '@mui/material'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { FC, Fragment } from 'react'

const Page: FC<{}> = () => {

    const { set, isOwner } = useSet()

    return (
        <Stack gap={3} >
            <Stack gap={3} >
                <Stack sx={{
                    gap: 2,
                    flexDirection: { sm: "column", md: "row" },
                    alignItems: { sm: "flex-start", md: "center" },
                    justifyContent: "space-between"
                }}>
                    <Stack direction="row" gap={2} alignItems="center" sx={{ flexShrink: 0, minWidth: 0, }}>
                        <Typography sx={{
                            textWrap: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            whiteSpace: "nowrap", minWidth: 0, fontSize: 35
                        }}>
                            {set.name}
                        </Typography>
                        <Divider orientation="vertical" flexItem />
                        <FavoriteButton />
                    </Stack>


                    <Stack direction="row" gap={1} sx={{ width: "fit-content" }}>
                        {!isOwner ? (
                            <CreateCopy setid={set.id} />
                        ) : (
                            <Fragment>
                                <SetMenu />
                                <SwapTerms />
                                <Tooltip title="Szópárok hozzáadása">
                                    <IconButtonGrey component={Link} href={`/sets/${set.id}/terms/create`}>
                                        <PlusIcon />
                                    </IconButtonGrey>
                                </Tooltip>
                            </Fragment>

                        )}
                    </Stack>

                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Stack direction="row" gap={1} >
                        <Avatar src={set.user.image} sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography fontSize={12}>Létrehozta</Typography>
                            <Typography fontSize={15} fontWeight={500}>{set.user.name}</Typography>
                            <Typography fontSize={12}>{getDate(set.createdAt)}</Typography>
                        </Stack>
                    </Stack>
                    <Typography>Kifejezések száma: {set.terms.length}</Typography>
                </Stack>
            </Stack>
            <Stack direction="row" gap={2}>
                <Link href={`/sets/${set.id}/flashcards`} style={{ textDecoration: "none" }} >
                    <Paper sx={{ width: "fit-content", p: 3, cursor: "pointer" }} >
                        <Stack direction="row" gap={1} alignItems="center">
                            <Box component="img" src="/flashcards.png" width={40} />
                            <Typography fontWeight={500} fontSize={18}>Szókártyák</Typography>
                        </Stack>
                    </Paper>
                </Link>
                <Link href={`/sets/${set.id}/quiz`} style={{ textDecoration: "none" }}  >

                    <Paper sx={{ width: "fit-content", p: 3, cursor: "pointer" }} >
                        <Stack direction="row" gap={1} alignItems="center">
                            <Box component="img" src="/quiz.png" width={40} />
                            <Typography fontWeight={500} fontSize={18}>Kvíz</Typography>
                        </Stack>
                    </Paper>
                </Link>
            </Stack>


            <TermList />
        </Stack>
    )
}

export default Page