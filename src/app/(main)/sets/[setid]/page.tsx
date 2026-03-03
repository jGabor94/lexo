import PracticeCard from '@/features/practice/components/PracticeCard'
import CreateCopy from '@/features/set/components/CreateCopy'
import LikeButton from '@/features/set/components/LikeButton'
import SaveButton from '@/features/set/components/SaveButton'
import SetMenu from '@/features/set/components/SetMenu'
import { getLikers, getSet } from '@/features/set/dal/queries'
import { isOwner as getIsOwner } from '@/features/set/utils'
import SwapTerms from '@/features/term/components/SwapTerms'
import TermList from '@/features/term/components/TermList'
import { termColor } from '@/features/term/lib/constants'
import { getTermStats } from '@/features/term/utils'
import { IconButtonGrey } from '@/lib/mui/styled'
import { getDate } from '@/utils'
import { Edit as EditIcon, FlashOn, Headphones, Quiz, SmartToy, Style } from '@mui/icons-material'
import { Avatar, Box, Paper, Skeleton, Stack, Tooltip, Typography } from '@mui/material'
import { PlusIcon } from 'lucide-react'
import Link from 'next/link'
import { FC, Fragment, Suspense } from 'react'


const Page: FC<{ params: Promise<{ setid: string }> }> = async ({ params }) => {

    const { setid } = await params;
    const res = await getSet(setid)

    if (!res.success) return <>Hiba {res.error.type}</>
    const { data: set } = res

    const isOwner = await getIsOwner(set.user.id)

    const overallProgress = set.terms.length > 0
        ? (set.terms.reduce((sum, term) => sum + term.status, 0) / (set.terms.length * 5)) * 100
        : 0;

    const getLikersPromise = (async () => {
        const res = await getLikers(setid)
        console.log(res)
        if (!res.success) throw new Error("Failed to query likes")
        return res.data
    })()

    return (
        <Stack gap={3} id="dashboard_container"
        >
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
                    <Stack direction={{ xs: "column", sm: "row" }} gap={2} alignItems={{ xs: "flex-start", sm: "center" }} >
                        <Stack direction="row" gap={1} alignItems="center">
                            <Stack direction="row" gap={1} alignItems="center">

                                <Avatar src={set.user.image} sx={{ width: 28, height: 28 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ textWrap: "nowrap" }}>{set.user.name}</Typography>
                            </Stack>

                            <Typography variant="h6" color="text.secondary" >•</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ textWrap: "nowrap" }}>{getDate(set.createdAt)}</Typography>
                            <Typography variant="body2" color="text.secondary" display={{ xs: "none", sm: "block" }}>•</Typography>
                        </Stack>


                        <Stack direction="row" gap={1} alignItems="center">
                            <Suspense fallback={<Skeleton variant="rounded" width={50} height={32} sx={{ borderRadius: 10 }} />}>
                                <LikeButton setid={set.id} getLikeResult={getLikersPromise} />
                            </Suspense>
                            <SaveButton />
                        </Stack>

                    </Stack>
                </Stack>
            </Stack>

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

            <Typography variant='h5' mt={5}>Gyakorlás</Typography>
            <Box sx={{
                display: "grid",
                gap: 2, height: "auto",
                gridTemplateColumns: {
                    xs: 'repeat(3, 1fr)',
                    md: 'repeat(3, 1fr)',
                    xl: 'repeat(6, 1fr)'
                },
            }}>
                <PracticeCard Icon={Style} name="Flashcard" color="#8B5CF6" />
                <PracticeCard Icon={Quiz} name="Kvíz" color="#3CC8AF" />
                <PracticeCard Icon={EditIcon} name="Gépelés" color="#ec4899" />
                <PracticeCard Icon={Headphones} name="Hallgatás" color="#eab308" />
                <PracticeCard Icon={FlashOn} name="Sprint" color="#84cc16" />
                <PracticeCard Icon={SmartToy} name="AI" color="#64748b" />


            </Box>
            {/*
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
            */}


            <Typography variant='h5' mt={5}>Kifejezések</Typography>

            <TermList />

        </Stack >
    )
}

export default Page