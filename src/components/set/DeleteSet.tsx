"use client"

import SA_DeleteSet from '@/lib/actions/set/deleteSet'
import useAction from '@/lib/assets/serverAction/useAction'
import useConfirmControll from '@/lib/hooks/useConfirmControll'
import useSet from '@/lib/hooks/useSet'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import ConfirmDialog from '../ConfirmDialog'

const DeleteSet: FC<{}> = () => {

    const router = useRouter()
    const { set } = useSet()

    const { action: deleteSet } = useAction(SA_DeleteSet, {
        200: { severity: "success", content: "Set successfully deleted 🙂" },
    })

    const { controll, trigger: triggerDelete } = useConfirmControll(async () => {
        const res = await deleteSet(set._id)
        if (res.statusCode === 200) router.push("/sets/all")
    })

    return (
        <Fragment>
            <ConfirmDialog {...{ controll, dialogText: `Are you sure you want to delete the following set: ${set.name}?` }} />
            <MenuItem onClick={triggerDelete}>
                <ListItemIcon>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Fragment>

    )
}

export default DeleteSet