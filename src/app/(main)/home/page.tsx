import { HorizontalList, HorizontalListSkeleton } from "@/components/horizontalList";
import { setsTable } from "@/drizzle/schema";
import { auth } from "@/features/authentication/lib/auth";
import getFavorites from "@/features/set/queries/getFavorites";
import { default as getSets } from "@/features/set/queries/getSets";
import GradeIcon from '@mui/icons-material/Grade';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Stack } from "@mui/material";
import { desc, eq, ne, sql } from "drizzle-orm";
import { FC, Suspense } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()

    const promises = {
        userRecentSets: getSets().where(eq(setsTable.userid, session?.user.id as string)).orderBy(desc(setsTable.updatedAt)).limit(10),
        otherNEwSets: getSets().where(ne(setsTable.userid, session?.user.id as string)).orderBy(sql`RANDOM()`).limit(10),
        favorites: getFavorites(session?.user.id as string).orderBy(sql`RANDOM()`).limit(10),
    }

    return (
        <Stack gap={5}>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.userRecentSets} label="Recent sets" icon={<NewReleasesIcon />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.favorites} label="My favorites" icon={<GradeIcon />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promises.otherNEwSets} label={"Other new sets"} icon={<PeopleAltIcon />} />
            </Suspense>
        </Stack >
    );
}

export default Page