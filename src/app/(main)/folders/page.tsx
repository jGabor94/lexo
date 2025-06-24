
import { auth } from "@/features/authentication/lib/auth";
import CreateFolder from "@/features/folder/components/CreateFolder";
import FolderCard from "@/features/folder/components/ui/FolderCard";
import getFolders from "@/features/folder/queries/getFolders";
import { Paper, Stack, Typography } from "@mui/material";
import { FolderX } from "lucide-react";
import { FC } from "react";

const Page: FC<{}> = async () => {

    const session = await auth()
    const folders = await getFolders(session?.user.id as string)

    return (

        <Stack gap={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2}>
                <Typography sx={{ textWrap: "nowrap", fontWeight: 600, fontSize: 30 }}>
                    Mappák
                </Typography>
                <CreateFolder />
            </Stack>
            <Stack gap={3} mt={4}>
                {folders.length > 0 ? folders.map(folder => (
                    <FolderCard key={folder.id} {...{ folder }} />
                )) : (
                    <Paper component={Stack} gap={1} sx={{ p: 3, width: "100%", alignItems: "center" }}>
                        <FolderX width={50} />
                        <Typography >{"Még nincs egyetlen mappád sem"}</Typography>
                    </Paper>
                )}
            </Stack>
        </Stack >
    );
}

export default Page