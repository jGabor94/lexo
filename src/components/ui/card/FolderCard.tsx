import { FolderListItem } from "@/lib/database/queries/getFolders";
import { Card } from "@/lib/mui/styled";
import FolderIcon from '@mui/icons-material/Folder';
import { Chip, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";



const FolderCard: FC<{ folder: FolderListItem }> = ({ folder }) => {

    return (
        <Card component={Link} href={`/folders/${folder._id}`} sx={{ textDecoration: "none", width: "100%", p: 2 }}>
            <Stack direction="row" justifyContent="space-between">
                <Stack direction="row" gap={2} alignItems="center" sx={{ height: 70, }} >
                    <FolderIcon sx={{ width: 60, height: 70 }} />
                    <Stack justifyContent="space-between" sx={{ height: 60 }}>
                        <Typography fontSize={20}>
                            {folder.name}
                        </Typography>
                        <Chip size="small" label={`${folder.setsCount} item`} sx={{ width: "fit-content" }} />
                    </Stack>
                </Stack>
            </Stack>


        </Card>
    )
}

export default FolderCard