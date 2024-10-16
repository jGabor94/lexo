"use client"

import FavoriteButton from '@/components/set/FavoriteButton'
import SetMenu from '@/components/set/SetMenu'
import TermList from '@/components/Term/TermList'
import TextLine from '@/components/ui/TextLine'
import { getDate } from '@/lib/assets/general'
import useSet from '@/lib/hooks/useSet'
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
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" }
                }}>
                    <TextLine>
                        <Stack direction="row" gap={2} alignItems="center">
                            <Typography sx={{ textWrap: "nowrap", fontSize: 35 }}>
                                {set.name}
                            </Typography>
                            <Divider orientation="vertical" flexItem />
                            <FavoriteButton />
                        </Stack>
                    </TextLine>

                    {isOwner && (
                        <Stack direction="row" gap={2}>
                            <SetMenu />
                            <Button component={Link} href={`/sets/${set._id}/terms/create`} variant="contained" startIcon={<AddIcon sx={{ color: "primary.contrastText" }} />}>
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
                            <Typography fontSize={12}>{getDate(set.createdAt as string)}</Typography>
                        </Stack>
                    </Stack>
                    <Typography>Term number: {set.terms.length}</Typography>
                </Stack>
            </Stack>
            <Link href={`/sets/${set._id}/flashcards`} legacyBehavior>
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