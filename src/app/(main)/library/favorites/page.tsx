import SetList from "@/features/set/components/SetList";
import { getFavorites } from "@/features/set/dal/queries";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";

const Page: FC<{}> = async () => {

    const res = await getFavorites()
    if (!res.success) return <>Hiba: {res.error.type}</>

    return (
        <Stack gap={2}>
            <Typography sx={{ fontWeight: 600, fontSize: 30 }}>Kedvencek</Typography>
            <SetList {...{ sets: res.data }} />
        </Stack>
    )
}

export default Page