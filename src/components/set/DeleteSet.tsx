"use client"

import SA_DeleteSet from '@/lib/actions/set/deleteSet'
import useAction from '@/lib/assets/serverAction/useAction'
import { Set } from '@/lib/database/queries/getSet'
import useConfirmControll from '@/lib/hooks/useConformControll'
import { MenuControl } from '@/lib/hooks/useMenuControl'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import ConfirmDialog from '../ConfirmDialog'

const DeleteSet: FC<{ set: Set, menuControl: MenuControl }> = ({ set, menuControl }) => {

    const router = useRouter()
    const { promise, open, setOpen, dialogProcess } = useConfirmControll()

    const { action: deleteSet } = useAction(SA_DeleteSet, {
        200: { severity: "success", content: "Set successfully deleted 🙂" },
    })

    const handleDelete = async () => {
        try {
            await dialogProcess()
            const res = await deleteSet(set._id)
            if (res.statusCode === 200) router.push("/sets/all")
        } catch (err) {
            setOpen(false)
            menuControl.handleClose()
        }
    }

    return (
        <Fragment>
            <ConfirmDialog {...{ open, promise, dialogText: `Are you sure you want to delete the following set: ${set.name}?` }} />
            <MenuItem onClick={handleDelete}>
                <ListItemIcon>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Fragment>

    )
}

export default DeleteSet