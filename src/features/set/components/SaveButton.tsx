"use client"

import FolderIcon from '@mui/icons-material/Folder';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import { Box } from '@mui/material';
import { FC, useState } from 'react';
import ActionChip from '../../../components/ui/ActionChip';

const SaveButton: FC<{}> = () => {

    const [saved, setSaved] = useState(false);


    return (
        <Box onClick={() => setSaved(!saved)} sx={{ cursor: "pointer" }}>
            {
                saved ? (
                    <ActionChip label="Mentve" Icon={FolderIcon} color="cyan" />
                ) : (
                    <ActionChip label="Mentés" Icon={FolderOpenIcon} />
                )
            }
        </Box>
    )


}

export default SaveButton