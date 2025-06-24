import { Chip, Paper, Stack, Typography } from "@mui/material";
import { Folder } from 'lucide-react';
import Link from "next/link";
import { FC } from "react";
import { FolderListItem } from '../../types';

const FolderCard: FC<{ folder: FolderListItem }> = ({ folder }) => {

    return (

        <Paper component={Link} href={`/folders/${folder.id}`} sx={{ textDecoration: "none", width: "100%", p: 2 }}>
            <Stack direction="row" justifyContent="space-between" alignItems="center">
                <Stack direction="row" gap={2} alignItems="center"  >

                    <Folder size={40} />
                    <Typography fontSize={20} fontWeight={500}>
                        {folder.name}
                    </Typography>
                </Stack>
                <Chip
                    label={`${folder.setsCount} elem`}
                    sx={{
                        fontSize: 12,
                        fontWeight: "bold",
                        backgroundColor: "#e0f7fa",
                        color: "#00796b",
                    }}
                    size="small"
                />

            </Stack>


        </Paper>
    )
}

export default FolderCard