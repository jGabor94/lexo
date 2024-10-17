
import CreateFolder from "@/components/folder/CreateFolder";
import FolderCard from "@/components/ui/card/FolderCard";
import TextLine from "@/components/ui/TextLine";
import { createObjectId } from "@/lib/assets/general";
import { getFolders } from "@/lib/database/queries";
import { auth } from "@/lib/services/authentication/auth";
import FolderOffOutlinedIcon from '@mui/icons-material/FolderOffOutlined';
import { Paper, Stack, Typography } from "@mui/material";
import { FC } from "react";

export const revalidate = 0

const Page: FC<{}> = async () => {

    const user = await auth()
    const folders = await getFolders(createObjectId(user?.user._id as string))

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
                    <FolderCard key={folder._id} {...{ folder }} />
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