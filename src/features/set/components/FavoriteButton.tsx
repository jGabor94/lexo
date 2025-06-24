"use client"

import SA_ChangeFavorite from '@/features/set/actions/changeFavorite';
import { Box, Stack, Tooltip } from '@mui/material';
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
        <Stack direction="row" gap={1} onClick={handleClick} sx={{ cursor: "pointer", alignItems: "center" }}>
            {
                isFavorite ? (
                    <Tooltip title="Eltávolítás a kedvencek közül">
                        <Box component="img" src="/star.png" sx={{ width: 30 }} />
                    </Tooltip>
                ) : (
                    <Tooltip title="Hozzáadás a kedvencekhez">
                        <Box component="img" src="/star_outline.png" sx={{ width: 30 }} />

                    </Tooltip>

                )
            }
        </Stack>)
}

export default FavoriteButton