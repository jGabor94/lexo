import TextLine from "@/components/ui/TextLine";
import FolderMenu from "@/features/folder/components/FolderMenu";
import RemoveFromFolder from "@/features/folder/components/RemoveFromFolder";
import getFolder from "@/features/folder/queries/getFolder";
import CreateSet from "@/features/set/components/CreateSet";
import { RowSetCardContent, RowSetCardLayout, RowSetCardMenu } from "@/features/set/components/ui/rowSetCard";
import FolderIcon from '@mui/icons-material/Folder';
import { Paper, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { FC } from "react";

export const revalidate = 0

const Page: FC<{ params: { folderid: string } }> = async ({ params }) => {

    const folder = await getFolder(params.folderid)
    if (!folder) notFound()

    return (
        <Stack gap={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2} >
                <TextLine>
                    <Stack direction="row" gap={1} sx={{ flexShrink: 1, minWidth: 0, }}>
                        <FolderIcon />
                        <Typography sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "100%" }}>/{folder.name}</Typography>
                    </Stack>
                </TextLine>

                <FolderMenu {...{ folder }} />
                <CreateSet />
            </Stack>
            <Stack mt={4} gap={3}>
                {folder.sets.length > 0 ? folder.sets.map((set) => (
                    <RowSetCardLayout key={set.id}>
                        <RowSetCardContent {...{ set, href: `/sets/${set.id}` }} />
                        <RowSetCardMenu sx={{ mr: -1, }}>
                            <RemoveFromFolder set={set} />
                        </RowSetCardMenu>

                    </RowSetCardLayout>

                )) : (
                    <Paper component={Stack} sx={{ p: 3, width: "100%", alignItems: "center" }}>
                        <Typography>This folder has no sets yet</Typography>
                    </Paper>
                )}
            </Stack>
        </Stack >

    );
}


export default Page
