"use client"

import useAction from '@/lib/dal/useDal';
import { Tooltip } from '@mui/material';
import { CircleMinus } from 'lucide-react';
import { useParams } from 'next/navigation';
import { FC, useState } from 'react';
import { removeFromFolder as removeFromFolderAction } from '../dal/mutations';

const RemoveFromFolder: FC<{ setid: string }> = ({ setid }) => {

    const [loading, setLoading] = useState(false)

    const { folderid } = useParams<{ folderid: string }>()

    const { action: removeFromFolder } = useAction(removeFromFolderAction)

    const handleCLick: React.MouseEventHandler<SVGSVGElement> = async (e) => {
        e.stopPropagation()
        setLoading(true)
        await removeFromFolder(folderid, setid)
        setLoading(false)
    }


    return (

        <Tooltip title="Eltávolítás a mappából">
            <CircleMinus onClick={handleCLick} style={{ cursor: "pointer" }} />
        </Tooltip>

    )
}

export default RemoveFromFolder