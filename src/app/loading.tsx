'use client'

import LoadingLogo from '@/components/ui/LoadingLogo'
import { Stack } from '@mui/material'
import { FC, useEffect, useState } from 'react'

const loading: FC<{}> = () => {

    const [show, setShow] = useState(false)

    useEffect(() => {
        const timeout = setTimeout(() => {
            setShow(true)
        }, 300)

        return () => clearTimeout(timeout)
    }, [])

    if (!show) return null

    return (
        <Stack alignItems="center" justifyContent="center" gap={3} sx={{
            height: "100vh",
            width: "100vw",
            background: "linear-gradient(90deg, #3CC8AF 0%, #3CC8F4 100%)",
        }}>
            <LoadingLogo withText={true} />
        </Stack>
    )
}

export default loading