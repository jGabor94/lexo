"use client"

import CreateSet from '@/features/set/components/CreateSet'
import { Stack, Typography } from '@mui/material'
import { Folder } from 'lucide-react'
import { FC } from 'react'
import useFolder from '../hooks'
import DeleteFolder from './DeleteFolder'
import FolderList from './FolderList'
import UpdateFolder from './UpdateFolder'

const FolderResult: FC<{}> = () => {

    const { folder } = useFolder()

    return (
        <Stack gap={1}>
            <Stack direction="row" justifyContent="space-between" alignItems="center" gap={2} >
                <Stack direction="row" gap={1} sx={{ alignItems: "center" }}>
                    <Folder size={30} />
                    <Typography sx={{ overflow: "hidden", whiteSpace: "nowrap", textOverflow: "ellipsis", maxWidth: "100%", fontWeight: 600, fontSize: 20 }}>/{folder.name}</Typography>
                </Stack>
                <Stack direction="row" gap={1}>
                    <UpdateFolder />
                    <DeleteFolder folder={folder} />
                    <CreateSet variant="toolbar" />
                </Stack>
            </Stack>
            <FolderList />
        </Stack >)
}

export default FolderResult