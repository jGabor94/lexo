"use client"

import { RowSetCardLayout } from '@/features/set/components/ui/rowSetCard'
import { Paper, Stack, Typography } from '@mui/material'
import { FC } from 'react'
import useFolder from '../hooks'
import RemoveFromFolder from './RemoveFromFolder'

const FolderList: FC = () => {

    const { folder } = useFolder()

    return (
        <Stack mt={4} gap={3}>
            {folder.sets.length > 0 ? folder.sets.map((set) => (
                <RowSetCardLayout key={set.id} {...{ set, href: `/sets/${set.id}` }} >
                    <RemoveFromFolder setid={set.id} />
                </RowSetCardLayout>
            )) : (
                <Paper component={Stack} sx={{ p: 3, width: "100%", alignItems: "center" }}>
                    <Typography>Üres mappa</Typography>
                </Paper>
            )}
        </Stack>
    )
}

export default FolderList