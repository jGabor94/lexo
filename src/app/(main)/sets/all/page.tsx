import { RowSetCardContent, RowSetCardLayout } from "@/components/ui/card/rowSetCard";
import { createObjectId } from "@/lib/assets/general";
import { getSets } from "@/lib/database/queries";
import { auth } from "@/lib/services/authentication/auth";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const wait = () => new Promise(res => setTimeout(res, 4000))

const Page: FC<{}> = async () => {

    const session = await auth()

    const sets = await getSets([
        { $match: { user: createObjectId(session?.user._id as string) } },
    ])

    await wait()

    return (
        <Stack gap={2}>
            <Typography>Set number {sets.length}</Typography>
            {
                sets.map(set => (
                    <RowSetCardLayout key={set._id}>
                        <RowSetCardContent {...{ set, href: `/set/${set._id}` }} />
                    </RowSetCardLayout>
                ))
            }
        </Stack>


    );
}

export default Page