"use client"

import SA_changeFavorite from '@/lib/actions/user/changeFavorite';
import GradeIcon from '@mui/icons-material/Grade';
import GradeOutlinedIcon from '@mui/icons-material/GradeOutlined';
import { Stack, Typography } from '@mui/material';
import { FC, useState } from 'react';

const FavoriteButtonClient: FC<{ setid: string, favorite: boolean }> = ({ setid, favorite }) => {


    const [isFavorite, setIsFavorite] = useState(favorite)

    const handleClick = () => {
        setIsFavorite(!isFavorite)
        SA_changeFavorite(setid, !isFavorite)
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

export default FavoriteButtonClient