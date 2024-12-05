"use client"

import ConfirmDialog from '@/components/ConfirmDialog'
import useConfirmControll from '@/hooks/useConfirmControll'
import useAction from '@/lib/serverAction/useAction'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import SA_DeleteFolder from '../actions/deleteFolder'
import { Folder } from '../types'

const DeleteFolder: FC<{ folder: Folder }> = ({ folder }) => {

    const router = useRouter()

    const { action: deleteFolder } = useAction(SA_DeleteFolder, {
        200: { severity: "success", content: "Folder successfully deleted 🙂" },
    })

    const { controll, trigger: triggerDelete } = useConfirmControll(async () => {
        const res = await deleteFolder(folder.id)
        if (res.statusCode === 200) router.push("/folders")
    })

    return (
        <Fragment>
            <ConfirmDialog {...{ controll, dialogText: `Are you sure you want to delete the following folder: ${folder.name}?` }} />
            <MenuItem onClick={triggerDelete}>
                <ListItemIcon>
                    <DeleteOutlineOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Delete</ListItemText>
            </MenuItem>
        </Fragment>

    )
}

export default DeleteFolder