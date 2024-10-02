import { RowSetCardContent, RowSetCardLayout } from "@/components/ui/card/rowSetCard";
import { createObjectId } from "@/lib/assets/general";
import getFavorites from "@/lib/database/queries/getFavorites";
import { auth } from "@/lib/services/authentication/auth";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()

    const sets = await getFavorites([
        { $match: { _id: createObjectId(session?.user._id as string) } },
    ])

    return (<Stack gap={2}>
        <Typography>Set number {sets.length}</Typography>
        {
            sets.map(set => (
                <RowSetCardLayout key={set._id}>
                    <RowSetCardContent {...{ set, href: `/sets/${set._id}` }} />
                </RowSetCardLayout>
            ))
        }
    </Stack>


    );
}

export default Page