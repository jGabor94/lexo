import PracticeCard from '@/features/practice/components/PracticeCard'
import { exerciseTheme } from '@/features/practice/lib/contants'
import LikeButton from '@/features/set/components/LikeButton'
import SaveButton from '@/features/set/components/SaveButton'
import SetHeader from '@/features/set/components/SetHeader'
import SetProgress from '@/features/set/components/SetProgress'
import { getLikers, getSet } from '@/features/set/dal/queries'
import SetProvider from '@/features/set/providers'
import TermList from '@/features/term/components/TermList'
import { formatSmartDate } from '@/utils'
import { Edit as EditIcon, FlashOn, Headphones, SmartToy } from '@mui/icons-material'
import { Avatar, Box, Skeleton, Stack, Typography } from '@mui/material'
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
                            <Typography variant="h6" color="text.secondary" display={{ xs: "none", sm: "block" }}>•</Typography>
                        </Stack>

                        <Stack direction="row" gap={1} alignItems="center">
                            <Suspense fallback={<Skeleton variant="rounded" width={50} height={32} sx={{ borderRadius: 10 }} />}>
                                <LikeButton setid={set.id} getLikeResult={getLikersPromise} />
                            </Suspense>
                            <SaveButton />
                        </Stack>
                    </Stack>
                </Stack>

                <SetProgress overallProgress={overallProgress} />

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
                    <PracticeCard link={`/sets/${set.id}/flashcard`} overallProgress={overallProgress} Icon={exerciseTheme.flashcard.icon} name="Flashcard" color={exerciseTheme.flashcard.color} />
                    <PracticeCard link={`/sets/${set.id}/quiz`} overallProgress={overallProgress} Icon={exerciseTheme.quiz.icon} name="Kvíz" color={exerciseTheme.quiz.color} />
                    <PracticeCard link={""} Icon={EditIcon} overallProgress={overallProgress} name="Gépelés" color="#ec4899" />
                    <PracticeCard link={""} Icon={Headphones} overallProgress={overallProgress} name="Hallgatás" color="#eab308" />
                    <PracticeCard link={""} Icon={FlashOn} overallProgress={overallProgress} name="Sprint" color="#84cc16" />
                    <PracticeCard link={""} Icon={SmartToy} overallProgress={overallProgress} name="AI" color="#64748b" />


                </Box>


                <Typography variant='h5' mt={5}>Kifejezések</Typography>
                <TermList />

            </Stack >
        </SetProvider>
    )
}

export default Page