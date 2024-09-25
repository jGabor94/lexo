import FolderMenu from "@/components/folder/FolderMenu";
import RemoveFromFolder from "@/components/folder/RemoveFromFolder";
import CreateSet from "@/components/set/CreateSet";
import { RowSetCardContent, RowSetCardLayout, RowSetCardMenu } from "@/components/ui/card/rowSetCard";
import TextLine from "@/components/ui/TextLine";
import { createObjectId } from "@/lib/assets/general";
import { getFolder } from "@/lib/database/queries";
import FolderIcon from '@mui/icons-material/Folder';
import { Paper, Stack, Typography } from "@mui/material";
import { notFound } from "next/navigation";
import { FC } from "react";

const Page: FC<{ params: { folderid: string } }> = async ({ params }) => {

    const folder = await getFolder(createObjectId(params.folderid))

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
                    <RowSetCardLayout key={set._id}>
                        <RowSetCardContent {...{ set, href: `/set/${set._id}` }} />
                        <RowSetCardMenu>
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
