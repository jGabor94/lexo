"use client"

import SA_DeleteChangeLog from '@/lib/actions/deleteChangeLog'
import useAction from '@/lib/assets/serverAction/useAction'
import { ChangeLogListItem } from '@/lib/database/queries/getChangleLog'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconButton, Tooltip } from '@mui/material'
import { FC, useState } from 'react'

const DeleteChangeLog: FC<{ log: ChangeLogListItem }> = ({ log }) => {

    const [isDelete, setIsDelete] = useState(false)

    const { action: deleteChangeLog } = useAction(SA_DeleteChangeLog, {
        200: ({ severity: "success", content: "Deletion successful 🙂" })
    })

    const handleDelete = async (_id: string) => {
        setIsDelete(true)
        await deleteChangeLog(_id)
        setIsDelete(false)
    }

    return (
        <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(log._id)} disabled={isDelete}>
                <HighlightOffIcon />
            </IconButton>
        </Tooltip>
    )
}

export default DeleteChangeLog