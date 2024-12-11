"use client"

import LinearLoading from '@/components/LinearLoading';
import { SetListItem } from '@/features/set/types';
import useAction from '@/lib/serverAction/useAction';
import RemoveIcon from '@mui/icons-material/Remove';
import { ListItemIcon, ListItemText, MenuItem, } from '@mui/material';
import { useParams } from 'next/navigation';
import { FC, Fragment, useState } from 'react';
import SA_RemoveFromFolder from '../actions/removeFromFolder';

const RemoveFromFolder: FC<{ set: SetListItem }> = ({ set }) => {

    const [loading, setLoading] = useState(false)

    const { folderid } = useParams<{ folderid: string }>()

    const { action: removeFromFolder } = useAction(SA_RemoveFromFolder)

    const handleCLick = async () => {
        setLoading(true)
        await removeFromFolder(folderid, set.id)
        setLoading(false)
    }


    return (
        <Fragment>
            <LinearLoading {...{ loading }} />
            <MenuItem onClick={handleCLick}>
                <ListItemIcon>
                    <RemoveIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Remove</ListItemText>
            </MenuItem>
        </Fragment>

    )
}

export default RemoveFromFolder