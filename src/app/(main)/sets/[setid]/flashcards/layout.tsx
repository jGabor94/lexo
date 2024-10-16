import { Box } from '@mui/material'
import { FC, ReactNode } from 'react'

const layout: FC<{ children: ReactNode }> = ({ children }) => {



    return (
        <Box sx={{ margin: "0 auto", maxWidth: "95%" }}>
            {children}
        </Box>

    )
}

export default layout