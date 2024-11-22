"use client"

import SA_DeleteChangeLog from '@/features/chnagelog/actions/deleteChangeLog'
import useAction from '@/lib/serverAction/useAction'
import HighlightOffIcon from '@mui/icons-material/HighlightOff'
import { IconButton, Tooltip } from '@mui/material'
import { FC, useState } from 'react'
import { ChangeLog } from '../types'

const DeleteChangeLog: FC<{ log: ChangeLog }> = ({ log }) => {

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