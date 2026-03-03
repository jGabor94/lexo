'use client'

import { Stack } from '@mui/material'
import { motion } from 'framer-motion'
import { FC, useEffect, useState } from 'react'
import { LogoWhite } from './logo/Logo'

const LoadingLogo: FC<{ withText?: boolean }> = ({ withText }) => {

    const [init, setInit] = useState(false)

    useEffect(() => { setInit(true) }, [])

    if (!init) return null

    return (
        <Stack gap={3} alignItems="center" justifyContent="center" >
            {withText && <LogoWhite fontSize={70} />}
            <motion.img
                src="/thinking.png"
                width={100}

                animate={{
                    rotate: [0, -10, 10, -10, 0],
                }}
                transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    ease: 'easeInOut',
                }}
            />
        </Stack>

    )
}

export default LoadingLogo