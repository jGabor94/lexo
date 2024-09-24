import { SWRProvider } from "@/app/_providers/providers";
import FavoriteButton from "@/components/set/FavoriteButton";
import SetMenu from "@/components/set/SetMenu";
import CreateTerms from "@/components/Term/CreateTerms";
import TermList from "@/components/Term/TermList";
import TextLine from "@/components/ui/TextLine";
import { createObjectId, getDate } from "@/lib/assets/general";
import { getSet } from "@/lib/database/queries";
import { auth } from "@/lib/services/authentication/auth";
import { Avatar, Divider, Paper, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { FC } from "react";
import { unstable_serialize } from "swr";

const Page: FC<{ params: { setid: string } }> = async ({ params }) => {

    const session = await auth()
    const set = await getSet(createObjectId(params.setid), createObjectId(session?.user._id as string))
    if (!set) notFound()

    const owner = set.user._id === session?.user._id as string

    return (
        <SWRProvider value={{ fallback: { [unstable_serialize(['set', set._id])]: set } }}>
            <Stack gap={3} component={Paper} p={2} variant="elevation">
                <Stack gap={3} sx={{ width: 1100, maxWidth: "100%", margin: "0 auto" }}>
                    <Stack sx={{
                        gap: 2,
                        flexDirection: { xs: "column", sm: "row" },
                        alignItems: { xs: "flex-start", sm: "center" }
                    }}>
                        <TextLine>
                            <Stack direction="row" gap={2} alignItems="center">
                                <Typography sx={{ textWrap: "nowrap", fontSize: 35 }}>
                                    {set.name}
                                </Typography>
                                <Divider orientation="vertical" flexItem />
                                <FavoriteButton set={set} />
                            </Stack>
                        </TextLine>
                        {owner && (
                            <Stack direction="row" gap={2}>
                                <SetMenu />
                                <CreateTerms />
                            </Stack>
                        )}
                    </Stack>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                        <Stack direction="row" gap={1} >
                            <Avatar src={set.user.image} sx={{ width: 40, height: 40 }} />
                            <Stack>
                                <Typography fontSize={12}>Created by</Typography>
                                <Typography fontSize={15} fontWeight={500}>{set.user.name}</Typography>
                                <Typography fontSize={12}>{getDate(set.createdAt as string)}</Typography>
                            </Stack>
                        </Stack>
                        <Typography>Term number: {set.terms.length}</Typography>
                    </Stack>
                </Stack>
                <TermList />
            </Stack>
        </SWRProvider>

    )
}

export default Page