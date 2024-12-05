"use client"

import SA_ChangeFavorite from '@/features/set/actions/changeFavorite';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import { Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';
import useSet from '../hooks/useSet';

const FavoriteButton: FC<{}> = () => {

    const { set, favorite } = useSet()

    const [isFavorite, setIsFavorite] = useState(favorite)

    const handleClick = () => {
        setIsFavorite(!isFavorite)
        SA_ChangeFavorite(set?.id as string, !isFavorite)
    }

    return (
        <Stack direction="row" gap={1} onClick={handleClick} sx={{ cursor: "pointer" }}>
            <Typography sx={{ textWrap: "nowrap" }}>Rate it</Typography>
            {
                isFavorite ? (
                    <GradeIcon sx={{ color: "#fbc02d", width: 20, height: 20 }} />
                ) : (
                    <GradeOutlinedIcon sx={{ width: 20, height: 20 }} />
                )
            }
        </Stack>)
}

export default FavoriteButton