"use client"

import SA_DeleteChangeLog from '@/features/changelog/actions/deleteChangeLog'
import useAction from '@/lib/serverAction/useAction'
import { IconButton, Tooltip } from '@mui/material'
import { DeleteIcon } from 'lucide-react'
import { FC, useState } from 'react'
import { SelectChangeLog } from '../types'

const DeleteChangeLog: FC<{ log: SelectChangeLog }> = ({ log }) => {

    const [isDelete, setIsDelete] = useState(false)

    const { action: deleteChangeLog } = useAction(SA_DeleteChangeLog, {
        200: ({ severity: "success", content: "Törlés sikeres 🙂" })
    })

    const handleDelete = async (id: string) => {
        setIsDelete(true)
        await deleteChangeLog(id)
        setIsDelete(false)
    }

    return (
        <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(log.id)} disabled={isDelete}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    )
}

export default DeleteChangeLog