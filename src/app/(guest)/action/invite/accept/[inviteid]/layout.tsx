import { Logo } from '@/components/ui/logo'
import { Stack } from '@mui/material'
import { FC, ReactNode } from 'react'

const layout: FC<{ children: ReactNode }> = async ({ children }) => {
    return (
        <Stack alignItems="center" justifyContent="center" gap={3} sx={{
            height: "100vh",
            width: "100vw",
            position: "relative",
        }}>
            <Logo fontSize={60} href="/" />
            {children}
        </Stack>
    )
}

export default layout