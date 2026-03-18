'use client'

import useDal from '@/lib/dal/useDal'
import { IconButtonGrey } from '@/lib/mui/styled'
import { Tooltip } from '@mui/material'
import { CopyCheck } from 'lucide-react'
import { FC } from 'react'
import { createCopy as createCopyAction } from '../dal/mutations'

const CreateCopy: FC<{ setid: string }> = ({ setid }) => {

    const { action: createCopy } = useDal(createCopyAction, {
        alerts: {
            success: { severity: "success", content: "Másolat elkészült 🙂. Megtalálod a könyvtáradban." },
        }
    })

    const handleCopy = async () => {
        await createCopy(setid)
    }

    return (
        <Tooltip title="Másolás saját gyűjteménybe">
            <IconButtonGrey onClick={handleCopy}>
                <CopyCheck />
            </IconButtonGrey>
        </Tooltip>
    )
}

export default CreateCopy