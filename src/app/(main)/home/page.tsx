import TextLine from "@/components/ui/TextLine";
import { createObjectId } from "@/lib/assets/general";
import { getSets } from "@/lib/database/queries";
import getFavorites from "@/lib/database/queries/getFavorites";
import { auth } from "@/lib/services/authentication/auth";
import GradeIcon from '@mui/icons-material/Grade';
import NewReleasesIcon from '@mui/icons-material/NewReleases';
import PeopleAltIcon from '@mui/icons-material/PeopleAlt';
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import ScrolledItems from "./ScrolledItems";

const Page: FC<{}> = async () => {

    const session = await auth()

    const promise_userSets = getSets([
        { $match: { user: createObjectId(session?.user._id as string) } },
        { $limit: 10 }
    ])

    const promise_otherSets = getSets([
        { $match: { user: { $ne: createObjectId(session?.user._id as string) } } },
        { $sample: { size: 10 } }
    ])

    const promise_favorites = getFavorites([
        { $match: { _id: createObjectId(session?.user._id as string) } },
        { $sample: { size: 10 } }
    ])


    const [userSets, otherSets, favorites] = await Promise.all([promise_userSets, promise_otherSets, promise_favorites])




    return (
        <Stack gap={5}>
            {userSets.length > 0 && (
                <Stack gap={3}>
                    <TextLine>
                        <Stack direction="row" gap={1}>
                            <NewReleasesIcon />
                            <Typography>
                                New in the library
                            </Typography>
                        </Stack>
                    </TextLine>
                    <ScrolledItems sets={userSets} />
                </Stack>
            )}
            {favorites.length > 0 && (
                <Stack gap={3}>
                    <TextLine>
                        <Stack direction="row" gap={1}>
                            <GradeIcon />
                            <Typography>
                                My favorites
                            </Typography>
                        </Stack>
                    </TextLine>
                    <ScrolledItems sets={favorites} />
                </Stack>
            )}
            {otherSets.length > 0 && (
                <Stack gap={3}>
                    <TextLine>
                        <Stack direction="row" gap={1}>
                            <PeopleAltIcon />
                            <Typography>
                                Other people&#39s collections
                            </Typography>
                        </Stack>
                    </TextLine>
                    <ScrolledItems sets={otherSets} />
                </Stack>
            )}
        </Stack >
    );
}


export default Page