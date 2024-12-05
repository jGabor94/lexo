"use client"

import FavoriteButton from '@/features/set/components/FavoriteButton'
import SetMenu from '@/features/set/components/SetMenu'
import useSet from '@/features/set/hooks/useSet'
import TermList from '@/features/term/components/TermList'
import { getDate } from '@/utils'
import AddIcon from '@mui/icons-material/Add'
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined'
import { Avatar, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'

const Page: FC<{}> = () => {

    const { set, isOwner } = useSet()

    return (
        <Stack gap={3} >
            <Stack gap={3} component={Paper} variant="elevation" p={2}>
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

                    {isOwner && (
                        <Stack direction="row" gap={2} sx={{ width: "fit-content" }}>
                            <SetMenu />
                            <Button component={Link} href={`/sets/${set.id}/terms/create`} variant="contained" startIcon={<AddIcon sx={{ color: "primary.contrastText" }} />}>
                                Create Terms
                            </Button>
                        </Stack>
                    )}
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Stack direction="row" gap={1} >
                        <Avatar src={set.user.image} sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography fontSize={12}>Created by</Typography>
                            <Typography fontSize={15} fontWeight={500}>{set.user.name}</Typography>
                            <Typography fontSize={12}>{getDate(set.createdAt)}</Typography>
                        </Stack>
                    </Stack>
                    <Typography>Term number: {set.terms.length}</Typography>
                </Stack>
            </Stack>
            <Link href={`/sets/${set.id}/flashcards`} legacyBehavior>
                <Paper sx={{ width: "fit-content", p: 3, cursor: "pointer" }} >
                    <Stack direction="row" gap={1} alignItems="center">
                        <StyleOutlinedIcon sx={{ width: 40, height: 40 }} />
                        <Typography fontWeight={500} fontSize={18}>Flashcards</Typography>

                    </Stack>

                </Paper>
            </Link>
            <TermList />
        </Stack>
    )
}

export default Page