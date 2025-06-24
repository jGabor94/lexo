"use client"

import useSet from '@/features/set/hooks/useSet'
import { IconButtonGrey } from '@/lib/mui/styled'
import useAction from '@/lib/serverAction/useAction'
import { Tooltip } from '@mui/material'
import { ArrowLeftRight } from 'lucide-react'
import { FC } from 'react'
import SA_SwapTerms from '../actions/swapTerms'

const SwapTerms: FC<{}> = () => {

    const { set, mutate } = useSet()

    const { action: swapTerms } = useAction(SA_SwapTerms, {
        200: { severity: "success", content: "Szópárok sikeresen felcserélve 🙂" }
    })

    const handleClick = async () => {
        await swapTerms(set.id, set.preferredTermLang, set.preferredDefinitionLang)
        mutate()
    }

    return (
        <Tooltip title="Szópárok felcserélése">
            <IconButtonGrey onClick={handleClick}>
                <ArrowLeftRight />
            </IconButtonGrey>
        </Tooltip>
    )
}

export default SwapTerms