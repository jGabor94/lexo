"use client"

import { Paper, Stack } from '@mui/material'
import { FC, ReactNode } from 'react'

const RowSetCardLayout: FC<{ children: ReactNode }> = ({ children }) => (
    <Paper  >
        <Stack direction="row" sx={{ p: 2, gap: 1 }}>
            {children}

        </Stack>
    </Paper>
)

export default RowSetCardLayout