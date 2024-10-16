"use client"

import Logo from '@/components/ui/logo/Logo'
import { Box, Stack, useTheme } from '@mui/material'
import { FC } from 'react'
import Line from './components/Line'
import { SparklesCore } from './components/Sparkles'

const AnimatedLogo: FC<{}> = () => {

    const theme = useTheme()

    return (
        <Stack alignItems="center" gap={1}>
            <Logo fontSize={75} mb={-3} fontWeight={500} />
            <Line
                width="30%"
                color1="rgb(60, 200, 244)"
                color2="rgb(60, 200, 175)"
            />
            <Box sx={{ position: "relative" }}>
                <SparklesCore
                    background="transparent"
                    minSize={0.4}
                    maxSize={0.7}
                    particleDensity={1200}
                    className="w-full h-full"
                    particleColor={theme.palette.text.primary}
                />

                < Box sx={{
                    position: "absolute",
                    width: "100%",
                    height: "100%",
                    inset: 0,
                    backgroundColor: "background.default",
                    maskImage: "radial-gradient(120px 100px at top, transparent 20%, white)"
                }} />
            </Box>
        </Stack>
    )
}

export default AnimatedLogo
