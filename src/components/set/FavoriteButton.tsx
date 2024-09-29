"use client"

import SA_changeFavorite from '@/lib/actions/user/changeFavorite';
import useSet from '@/lib/hooks/useSet';
import useUserData from '@/lib/hooks/useuserData';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import { Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';

const FavoriteButton: FC<{}> = () => {

    const { data: userData } = useUserData()
    const { set } = useSet()

    const [isFavorite, setIsFavorite] = useState(userData?.favoriteSets.includes(set._id) ? true : false)

    const handleClick = () => {
        setIsFavorite(!isFavorite)
        SA_changeFavorite(set._id, !isFavorite)
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