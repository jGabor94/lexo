import { Stack, Typography } from '@mui/material'
import { Gauge, gaugeClasses } from '@mui/x-charts/Gauge'
import { animate } from 'framer-motion'
import { FC, useEffect, useState } from 'react'

const ProgressGauge: FC<{ percentage: number }> = ({ percentage }) => {

    const [value, setValue] = useState(0)

    useEffect(() => {
        animate(0, percentage, {
            duration: 2,
            onUpdate: latest => setValue(Math.round(latest)),
            ease: [0.04, 0.85, 0.44, 0.99]
        })
    }, [])

    return (
        <Stack alignItems="center">
            <Gauge
                width={140}
                height={140}
                startAngle={-110}
                endAngle={110}
                value={value}
                text={`${value}%`}
                sx={({ palette: { error, primary } }) => ({
                    mb: -5,
                    [`& .${gaugeClasses.valueArc}`]: {
                        fill: primary.main,
                    },
                    [`& .${gaugeClasses.referenceArc}`]: {
                        fill: error.main,
                    },
                    [`& .${gaugeClasses.valueText}`]: {
                        fontSize: 20,
                    },
                })}
            />
            <Typography sx={{ fontSize: 12 }}>Előrehaladás</Typography>
        </Stack>
    )
}

export default ProgressGauge