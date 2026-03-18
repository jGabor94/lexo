"use client"

import useSet from '@/features/set/hooks/useSet'
import useDal from '@/lib/dal/useDal'
import { IconButtonGrey } from '@/lib/mui/styled'
import SwapHorizIcon from '@mui/icons-material/SwapHoriz'
import { Tooltip } from '@mui/material'
import { FC } from 'react'
import { swapTerms as swapTermsAction } from '../dal/mutations'

const SwapTerms: FC<{}> = () => {

    const { set, mutate } = useSet()

    const { action: swapTerms } = useDal(swapTermsAction, {
        alerts: {
            success: { severity: "success", content: "Szópárok sikeresen felcserélve 🙂" }
        }
    })

    const handleClick = async () => {
        const error = await swapTerms(set.id, set.preferredTermLang, set.preferredDefinitionLang)
        if (!error) mutate()
    }

    return (
        <Tooltip title="Szópárok felcserélése">
            <IconButtonGrey onClick={handleClick}>
                <SwapHorizIcon />
            </IconButtonGrey>
        </Tooltip>
    )
}

export default SwapTerms