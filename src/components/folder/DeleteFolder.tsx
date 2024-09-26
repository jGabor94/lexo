"use client"

import SA_DeleteFolder from '@/lib/actions/folder/deleteFolder'
import useAction from '@/lib/assets/serverAction/useAction'
import { Folder } from '@/lib/database/queries/getFolder'
import useConfirmControll from '@/lib/hooks/useConfirmControll'
import { MenuControl } from '@/lib/hooks/useMenuControl'
import DeleteOutlineOutlinedIcon from '@mui/icons-material/DeleteOutlineOutlined'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import ConfirmDialog from '../ConfirmDialog'

const DeleteFolder: FC<{ folder: Folder, menuControl: MenuControl }> = ({ folder, menuControl }) => {

    const router = useRouter()

    const { action: deleteFolder } = useAction(SA_DeleteFolder, {
        200: { severity: "success", content: "Folder successfully deleted 🙂" },
    })

    const { controll, trigger: triggerDelete } = useConfirmControll(async () => {
        const res = await deleteFolder(folder._id)
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