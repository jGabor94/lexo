"use client"

import useSet from '@/lib/hooks/useSet'
import { Typography } from '@mui/material'
import { FC } from 'react'

const SetName: FC<{}> = () => {

    const { set } = useSet()

    return (
        <Typography sx={{ textWrap: "nowrap", fontSize: 35 }}>
            {set.name}
        </Typography>
    )
}

export default SetName