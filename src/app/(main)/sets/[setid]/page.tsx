"use client"

import SA_CreateDraft from '@/features/set/actions/createDraft'
import FavoriteButton from '@/features/set/components/FavoriteButton'
import SetMenu from '@/features/set/components/SetMenu'
import useSet from '@/features/set/hooks/useSet'
import TermList from '@/features/term/components/TermList'
import useAction from '@/lib/serverAction/useAction'
import { getDate } from '@/utils'
import AddIcon from '@mui/icons-material/Add'
import MoveUpIcon from '@mui/icons-material/MoveUp'
import QuizIcon from '@mui/icons-material/Quiz'
import StyleOutlinedIcon from '@mui/icons-material/StyleOutlined'
import { Avatar, Button, Divider, Paper, Stack, Typography } from '@mui/material'
import Link from 'next/link'
import { FC, Fragment } from 'react'

const Page: FC<{}> = () => {

    const { set, isOwner } = useSet()

    const { action: createDraft } = useAction(SA_CreateDraft, {
        200: { severity: "success", content: "Draft successfully created 🙂. You can find it in your library." }
    })

    const handleDraft = async () => {
        await createDraft(set.id)
    }

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


                    <Stack direction="row" gap={2} sx={{ width: "fit-content" }}>
                        {!isOwner ? (
                            <Button startIcon={<MoveUpIcon />} onClick={handleDraft} variant="outlined">
                                Draft
                            </Button>
                        ) : (
                            <Fragment>
                                <SetMenu />
                                <Button component={Link} href={`/sets/${set.id}/terms/create`} variant="contained" startIcon={<AddIcon sx={{ color: "primary.contrastText" }} />}>
                                    Create Terms
                                </Button>
                            </Fragment>

                        )}
                    </Stack>

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
            <Stack direction="row" gap={2}>
                <Link href={`/sets/${set.id}/flashcards`} legacyBehavior>
                    <Paper sx={{ width: "fit-content", p: 3, cursor: "pointer" }} >
                        <Stack direction="row" gap={1} alignItems="center">
                            <StyleOutlinedIcon sx={{ width: 40, height: 40 }} />
                            <Typography fontWeight={500} fontSize={18}>Flashcards</Typography>
                        </Stack>
                    </Paper>
                </Link>
                <Link href={`/sets/${set.id}/quiz`} legacyBehavior>

                    <Paper sx={{ width: "fit-content", p: 3, cursor: "pointer" }} >
                        <Stack direction="row" gap={1} alignItems="center">
                            <QuizIcon sx={{ width: 40, height: 40 }} />
                            <Typography fontWeight={500} fontSize={18}>Quiz</Typography>
                        </Stack>
                    </Paper>
                </Link>
            </Stack>


            <TermList />
        </Stack>
    )
}

export default Page