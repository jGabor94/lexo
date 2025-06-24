import DeleteFolder from "@/features/folder/components/DeleteFolder";
import EditFolder from "@/features/folder/components/EditFolder";
import RemoveFromFolder from "@/features/folder/components/RemoveFromFolder";
import getFolder from "@/features/folder/queries/getFolder";
import CreateSet from "@/features/set/components/CreateSet";
import { RowSetCardLayout } from "@/features/set/components/ui/rowSetCard";
import { Paper, Stack, Typography } from "@mui/material";
import { Folder } from "lucide-react";
import { notFound } from "next/navigation";
import { FC } from "react";

export const revalidate = 0

const Page: FC<{ params: Promise<{ folderid: string }> }> = async props => {
    const params = await props.params;

    const folder = await getFolder(params.folderid)
    if (!folder) notFound()

    return (
        <Stack gap={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2} >
                <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                    <Folder size={30} />
                    <Typography sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "100%", fontWeight: 600, fontSize: 20 }}>/{folder.name}</Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                    <EditFolder folder={folder} />
                    <DeleteFolder folder={folder} />

                    <CreateSet variant="toolbar" />


                </Stack>
            </Stack>
            <Stack mt={4} gap={3}>
                {folder.sets.length > 0 ? folder.sets.map((set) => (
                    <RowSetCardLayout key={set.id} {...{ set, href: `/sets/${set.id}` }} >
                        <RemoveFromFolder set={set} />
                    </RowSetCardLayout>



                )) : (
                    <Paper component={Stack} sx={{ p: 3, width: "100%", alignItems: "center" }}>
                        <Typography>Üres mappa</Typography>
                    </Paper>
                )}
            </Stack>
        </Stack >

    );
}


export default Page
