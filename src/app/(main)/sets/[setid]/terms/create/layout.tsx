import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'

const layout: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Box sx={{ mt: -4 }}>
            {children}
        </Box>
    )
}

export default layout