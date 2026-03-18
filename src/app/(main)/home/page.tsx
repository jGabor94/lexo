import { HorizontalList, HorizontalListSkeleton } from "@/components/horizontalList";
import LikeIcon from "@/components/ui/LikeIcon";
import { auth } from "@/features/authentication/lib/auth";
import { getFavorites, getOwnSets, getSets } from "@/features/set/dal/queries";
import { Stack } from "@mui/material";
import { History, Users } from "lucide-react";
import { FC, Suspense } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()

    const promises = {
        userRecentSets: getOwnSets({ orderBy: { updatedAt: "desc" }, limit: 10 }),
        otherNEwSets: getSets({
            where: {
                NOT: { userid: session?.user.id }
            },
            orderBy: (t, { sql }) => sql`RANDOM()`,
            limit: 10
        }),
        favorites: getFavorites({
            orderBy: (t, { sql }) => sql`RANDOM()`,
            limit: 10
        })
    }

    return (
        <Stack gap={5} width="100%" >
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.userRecentSets} label="Legutóbbi" icon={<History />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.favorites} label="Kdevencek" icon={<LikeIcon />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.otherNEwSets} label={"Közösség"} icon={<Users />} />
            </Suspense>
        </Stack >
    );
}

export default Page