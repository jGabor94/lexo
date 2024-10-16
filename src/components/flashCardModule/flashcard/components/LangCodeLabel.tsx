import { Stack, Typography } from '@mui/material'
import { FC, ReactNode } from 'react'

const LangCodeLabel: FC<{ children: ReactNode }> = ({ children }) => {
    return (
        <Stack sx={{
            zIndex: 1,
            position: "absolute",
            opacity: 0.1,
            top: 0,
            alignItems: "center",
            justifyContent: "center",
            p: 1,
            width: "100%",
        }}>
            <Typography sx={{
                fontWeight: 600,
                fontSize: 35,
            }}>{children}</Typography>
        </Stack>
    )
}

export default LangCodeLabel