"use client"

import useSet from '@/features/set/hooks/useSet'
import useAction from '@/lib/serverAction/useAction'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { IconButton, Tooltip } from '@mui/material'
import { FC } from 'react'
import SA_SwapTerms from '../actions/swapTerms'

const SwapTerms: FC<{}> = () => {

    const { set, mutate } = useSet()

    const { action: swapTerms } = useAction(SA_SwapTerms, {
        200: { severity: "success", content: "Swap successfull 🙂" }
    })

    const handleClick = async () => {
        await swapTerms(set.id)
        mutate()
    }

    return (
        <Tooltip title="Swap terms">
            <IconButton onClick={handleClick}>
                <SwapHorizIcon />
            </IconButton>
        </Tooltip>
    )
}

export default SwapTerms