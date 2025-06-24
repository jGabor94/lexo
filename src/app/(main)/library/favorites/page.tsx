import { auth } from "@/features/authentication/lib/auth";
import SetList from "@/features/set/components/SetList";
import getFavorites from "@/features/set/queries/getFavorites";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()
    const sets = await getFavorites(session?.user.id as string)

    return (
        <Stack gap={2}>
            <Typography sx={{ fontWeight: 600, fontSize: 30 }}>Kedvencek</Typography>
            <SetList {...{ sets }} />
        </Stack>
    )
}

export default Page