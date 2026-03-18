"use client"

import useDal from '@/lib/dal/useDal'
import { IconButton, Tooltip } from '@mui/material'
import { DeleteIcon } from 'lucide-react'
import { FC } from 'react'
import { deleteChangeLog as deleteChangeLogAction } from '../dal/mutations'
import { SelectChangeLog } from '../types'

const DeleteChangeLog: FC<{ log: SelectChangeLog }> = ({ log }) => {

    const { action: deleteChangeLog, progress } = useDal(deleteChangeLogAction, {
        alerts: {
            success: ({ severity: "success", content: "Törlés sikeres 🙂" })
        }
    })

    const handleDelete = async (id: string) => {
        await deleteChangeLog(id)
    }

    return (
        <Tooltip title="Delete">
            <IconButton onClick={() => handleDelete(log.id)} disabled={progress}>
                <DeleteIcon />
            </IconButton>
        </Tooltip>
    )
}

export default DeleteChangeLog