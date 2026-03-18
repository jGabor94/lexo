import PracticeCard from '@/features/practice/components/PracticeCard'
import { exerciseTheme } from '@/features/practice/lib/contants'
import LikeButton from '@/features/set/components/LikeButton'
import SaveButton from '@/features/set/components/SaveButton'
import SetHeader from '@/features/set/components/SetHeader'
import { getLikers, getSet } from '@/features/set/dal/queries'
import SetProvider from '@/features/set/providers'
import TermList from '@/features/term/components/TermList'
import { termColor } from '@/features/term/lib/constants'
import { getTermStats } from '@/features/term/utils'
import { formatSmartDate } from '@/utils'
import { Edit as EditIcon, FlashOn, Headphones, SmartToy } from '@mui/icons-material'
import { Avatar, Box, Paper, Skeleton, Stack, Typography } from '@mui/material'
import { FC, Suspense } from 'react'

const Page: FC<{ params: Promise<{ setid: string }> }> = async ({ params }) => {

    const { setid } = await params;
    const setResult = await getSet(setid)
    if (!setResult.success) return <>Hiba {setResult.error.type}</>

    const { data: set } = setResult

    const overallProgress = set.terms.length > 0
        ? (set.terms.reduce((sum, term) => sum + term.status, 0) / (set.terms.length * 5)) * 100
        : 0;

    const getLikersPromise = (async () => {
        const res = await getLikers(setid)
        if (!res.success) throw new Error("Failed to query likes")
        return res.data
    })()

    return (
        <SetProvider set={set}>
            <Stack gap={3} id="dashboard_container">
                <Stack gap={3} >
                    <SetHeader />
                    <Stack direction="row" justifyContent={{ xs: "space-between", sm: "start" }} gap={1} alignItems="flex-end">
                        <Stack direction="row" gap={1} alignItems="center">
                            <Stack direction="row" gap={1} alignItems="center">

                                <Avatar src={set.user.image} sx={{ width: 28, height: 28 }} />
                                <Typography variant="body2" color="text.secondary" sx={{ textWrap: "nowrap" }}>{set.user.name}</Typography>
                            </Stack>

                            <Typography variant="h6" color="text.secondary" >•</Typography>
                            <Typography variant="body2" color="text.secondary" sx={{ textWrap: "nowrap" }}>{formatSmartDate(set.createdAt)}</Typography>
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
                    <PracticeCard link={`/sets/${set.id}/flashcard`} Icon={exerciseTheme.flashcard.icon} name="Flashcard" color={exerciseTheme.flashcard.color} />
                    <PracticeCard link={`/sets/${set.id}/quiz`} Icon={exerciseTheme.quiz.icon} name="Kvíz" color={exerciseTheme.quiz.color} />
                    <PracticeCard link={""} Icon={EditIcon} name="Gépelés" color="#ec4899" />
                    <PracticeCard link={""} Icon={Headphones} name="Hallgatás" color="#eab308" />
                    <PracticeCard link={""} Icon={FlashOn} name="Sprint" color="#84cc16" />
                    <PracticeCard link={""} Icon={SmartToy} name="AI" color="#64748b" />


                </Box>


                <Typography variant='h5' mt={5}>Kifejezések</Typography>
                <TermList />

            </Stack >
        </SetProvider>
    )
}

export default Page