"use client"

import { SetListItem } from '@/features/set/types';
import useAction from '@/lib/serverAction/useAction';
import { Tooltip } from '@mui/material';
import { CircleMinus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import SA_RemoveFromFolder from '../actions/removeFromFolder';

const RemoveFromFolder: FC<{ set: SetListItem }> = ({ set }) => {

    const [loading, setLoading] = useState(false)

    const { folderid } = useParams<{ folderid: string }>()

    const { action: removeFromFolder } = useAction(SA_RemoveFromFolder)

    const handleCLick: React.MouseEventHandler<SVGSVGElement> = async (e) => {
        e.stopPropagation()
        setLoading(true)
        await removeFromFolder(folderid, set.id)
        setLoading(false)
    }


    return (

        <Tooltip title="Eltávolítás a mappából">
            <CircleMinus onClick={handleCLick} style={{ cursor: "pointer" }} />
        </Tooltip>

    )
}

export default RemoveFromFolder