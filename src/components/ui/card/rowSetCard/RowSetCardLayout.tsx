"use client"

import { Card, Stack } from '@mui/material'
import { FC, ReactNode } from 'react'

const RowSetCardLayout: FC<{ children: ReactNode }> = ({ children }) => (
    <Card component={Stack} direction="row" sx={{ p: 2, gap: 1 }} >
        {children}
    </Card>
)

export default RowSetCardLayout