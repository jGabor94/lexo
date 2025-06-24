'use client'

import { IconButtonGrey } from '@/lib/mui/styled'
import useAction from '@/lib/serverAction/useAction'
import { Tooltip } from '@mui/material'
import { CopyCheck } from 'lucide-react'
import { FC } from 'react'
import SA_CreateCopy from '../actions/createCopy'

const CreateCopy: FC<{ setid: string }> = ({ setid }) => {

    const { action: createCopy } = useAction(SA_CreateCopy, {
        200: { severity: "success", content: "Másolat elkészült 🙂. Megtalálod a könyvtáradban." }
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