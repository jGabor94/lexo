"use client"

import useDal from '@/lib/dal/useDal';
import { IconButton, Tooltip } from '@mui/material';
import { CircleMinus } from 'lucide-react';
import { FC } from 'react';
import { removeFromFolder as removeFromFolderAction } from '../dal/mutations';
import useFolder from '../hooks';

const RemoveFromFolder: FC<{ setid: string }> = ({ setid }) => {

    const { folder, mutate } = useFolder()
    const { action: removeFromFolder, progress } = useDal(removeFromFolderAction)

    const handleCLick: React.MouseEventHandler<HTMLButtonElement> = async (e) => {
        e.stopPropagation()
        mutate({ ...folder, sets: folder.sets.filter(set => set.id !== setid) }, { revalidate: false })
        await removeFromFolder(folder.id, setid)
    }

    return (
        <Tooltip title="Eltávolítás a mappából">
            <IconButton onClick={handleCLick} disabled={progress}>
                <CircleMinus />
            </IconButton>
        </Tooltip>
    )
}

export default RemoveFromFolder