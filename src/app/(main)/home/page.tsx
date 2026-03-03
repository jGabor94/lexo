import { HorizontalList, HorizontalListSkeleton } from "@/components/horizontalList";
import { auth } from "@/features/authentication/lib/auth";
import { getFavorites, getOwnSets } from "@/features/set/dal/queries";

import { Stack } from "@mui/material";
import { History, Star, Users } from "lucide-react";
import { FC, Suspense } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()

    const promises = {
        userRecentSets: getOwnSets(), //.where(eq(setsTable.userid, session?.user.id as string)).orderBy(desc(setsTable.updatedAt)).limit(10),
        otherNEwSets: getOwnSets(), //.where(ne(setsTable.userid, session?.user.id as string)).orderBy(sql`RANDOM()`).limit(10),
        favorites: getFavorites() //.orderBy(sql`RANDOM()`).limit(10),
    }

    return (
        <Stack gap={5} width="100%" >
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.userRecentSets} label="Legutóbbi" icon={<History />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.favorites} label="Kdevencek" icon={<Star />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.otherNEwSets} label={"Közösség"} icon={<Users />} />
            </Suspense>
        </Stack >
    );
}

export default Page