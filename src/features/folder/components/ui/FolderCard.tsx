import FolderIcon from '@mui/icons-material/Folder';
import { Chip, Paper, Stack, Typography } from "@mui/material";
import Link from "next/link";
import { FC } from "react";
import { FolderListItem } from '../../types';

const FolderCard: FC<{ folder: FolderListItem }> = ({ folder }) => {

    return (
        <Paper component={Link} href={`/folders/${folder.id}`} sx={{ textDecoration: "none", width: "100%", p: 2 }}>
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


        </Paper>
    )
}

export default FolderCard