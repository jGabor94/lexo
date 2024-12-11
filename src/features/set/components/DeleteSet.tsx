"use client"

import ConfirmDialog from '@/components/ConfirmDialog'
import SA_DeleteSet from '@/features/set/actions/deleteSet'
import useConfirmControll from '@/hooks/useConfirmControll'
import useAction from '@/lib/serverAction/useAction'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import useSet from '../hooks/useSet'

const DeleteSet: FC<{}> = () => {

    const router = useRouter()
    const { set } = useSet()

    const { action: deleteSet } = useAction(SA_DeleteSet, {
        200: { severity: "success", content: "Set successfully deleted 🙂" },
    })

    const { controll, trigger: triggerDelete } = useConfirmControll(async () => {
        const res = await deleteSet(set.id)
        if (res.statusCode === 200) router.push("/library/all")
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