import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'

const layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box >
            {children}
        </Box>
    )
}

export default layout