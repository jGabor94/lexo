"use client"

import tailwindColors from '@/lib/mui/tailwindColors'
import { SvgIconComponent } from '@mui/icons-material'
import { Chip, ChipProps, useColorScheme } from '@mui/material'
import { FC } from 'react'

interface ActionChipProps extends ChipProps {
    Icon: SvgIconComponent,
    color?: keyof typeof tailwindColors,
    label?: string,
}

const ActionChip: FC<ActionChipProps> = ({ Icon, color, label, ...ChipProps }) => {

    const { mode: selectedMode, systemMode } = useColorScheme();
    const mode = selectedMode === "system" ? systemMode : selectedMode;

    return color ? (
        <Chip {...ChipProps} label={label || ""} icon={<Icon color="primary" sx={{ color: mode === "dark" ? tailwindColors[color][50] : tailwindColors[color][400], width: 18 }} />} size="small" sx={{
            ...ChipProps.sx,
            cursor: "pointer",
            p: 0.5,
            fontWeight: 500,
            bgcolor: mode === "dark" ? tailwindColors[color][500] : tailwindColors[color][100],
            color: mode === "dark" ? tailwindColors[color][50] : tailwindColors[color][400],
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            py: 2,
            '& .MuiChip-label': {
                fontVariantNumeric: 'tabular-nums',
                fontFeatureSettings: '"tnum"'
            },
            "&:hover": {
                bgcolor: mode === "dark" ? tailwindColors[color][500] : tailwindColors[color][100],
            }
        }} />
    ) : (
        <Chip label={label || ""} icon={<Icon color="primary" sx={{ color: "text.secondary", width: 18 }} />} size="small" sx={{
            cursor: "pointer",
            p: 0.5,
            py: 2,
            fontWeight: 500,
            color: "text.secondary",
            '& .MuiChip-label': {
                fontVariantNumeric: 'tabular-nums',
                fontFeatureSettings: '"tnum"'
            },
        }} />
    )



}

export default ActionChip