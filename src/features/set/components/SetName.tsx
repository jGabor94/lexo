"use client"

import { Typography } from '@mui/material'
import { FC } from 'react'
import useSet from '../hooks/useSet'

const SetName: FC<{}> = () => {

    const { set } = useSet()

    return (
        <Typography sx={{ textWrap: "nowrap", fontSize: 35 }}>
            {set.name}
        </Typography>
    )
}

export default SetName