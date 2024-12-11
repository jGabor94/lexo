
import TextLine from "@/components/ui/TextLine";
import { auth } from "@/features/authentication/lib/auth";
import CreateFolder from "@/features/folder/components/CreateFolder";
import FolderCard from "@/features/folder/components/ui/FolderCard";
import getFolders from "@/features/folder/queries/getFolders";
import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';
import { Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()
    const folders = await getFolders(session?.user.id as string)

    return (
        <Stack gap={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                <TextLine>
                    <Typography sx={{ textWrap: "nowrap" }}>
                        Folders
                    </Typography>
                </TextLine>
                <CreateFolder />
            </Stack>
            <Stack gap={3} mt={4}>
                {folders.length > 0 ? folders.map(folder => (
                    <FolderCard key={folder.id} {...{ folder }} />
                )) : (
                    <Paper component={Stack} gap={1} sx={{ p: 3, width: "100%", alignItems: "center" }}>
                        <FolderOffOutlinedIcon sx={{ width: 50, height: 50 }} />
                        <Typography >{"You don't have any folders"}</Typography>
                    </Paper>
                )}
            </Stack>
        </Stack >
    );
}

export default Page