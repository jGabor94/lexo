import { HorizontalList, HorizontalListSkeleton } from "@/components/horizontalList";
import { createObjectId } from "@/lib/assets/general";
import { getSets } from "@/lib/database/queries";
import getFavorites from "@/lib/database/queries/getFavorites";
import { auth } from "@/lib/services/authentication/auth";
import { Stack } from "@mui/material";
import { FC, Suspense } from "react";

import GradeIcon from '@mui/icons-material/Grade';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';



const Page: FC<{}> = async () => {

    const session = await auth()


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