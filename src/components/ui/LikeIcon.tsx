"use client"

import tailwindColors from '@/lib/mui/tailwindColors';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { SvgIconProps, useColorScheme } from '@mui/material';
import { FC } from 'react';

const LikeIcon: FC<SvgIconProps> = (props) => {

    const { mode: selectedMode, systemMode } = useColorScheme();
    const mode = selectedMode === "system" ? systemMode : selectedMode;

    return <FavoriteIcon {...props} sx={{
        color: mode === "dark" ? tailwindColors["red"][500] : tailwindColors["red"][400],
        ...props.sx
    }} />

}

export default LikeIcon