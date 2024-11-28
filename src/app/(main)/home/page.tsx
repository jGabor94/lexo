import { HorizontalList, HorizontalListSkeleton } from "@/components/horizontalList";
import { db } from "@/drizzle/db";
import { setsTable } from "@/drizzle/schema";
import { auth } from "@/features/authentication/lib/auth";
import GradeIcon from '@mui/icons-material/Grade';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Stack } from "@mui/material";
import { FC, Suspense } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()
    //console.log({ session })

    const sets = await db.select().from(setsTable)

    console.log({ sets })

    /*
    const userRecentSets = getSets([
        { $match: { user: createObjectId(session?.user._id as string) } },
        { $limit: 10 },
        { $sort: { updatedAt: -1 } },
    ])

    const promise_otherNewSets = getSets([
        { $match: { user: { $ne: createObjectId(session?.user._id as string) } } },
        { $sample: { size: 10 } },
        { $sort: { createdAt: -1 } },
    ])

    const promise_favorites = getFavorites([
        { $match: { _id: createObjectId(session?.user._id as string) } },
        { $sample: { size: 10 } }
    ])
*/
    return <></>

    return (
        <Stack gap={5}>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={userRecentSets} label="Recent sets" icon={<NewReleasesIcon />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promise_favorites} label="My favorites" icon={<GradeIcon />} />
            </Suspense>
            <Suspense fallback={<HorizontalListSkeleton />}>
                <HorizontalList promise={promise_otherNewSets} label={"Other new sets"} icon={<PeopleAltIcon />} />
            </Suspense>


        </Stack >
    );
}


export default Page