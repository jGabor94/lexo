"use client"

import ActionChip from '@/components/ui/ActionChip';
import { formatCount } from '@/utils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box } from '@mui/material';
import { FC, use, useState } from 'react';
import { switchLike } from '../dal/mutations';
import { LikeResult } from '../types';

const LiekButton: FC<{ setid: string, getLikeResult: Promise<LikeResult> }> = ({ setid, getLikeResult }) => {

    const likeResult = use(getLikeResult)

    const [isLiked, setIsLiked] = useState(likeResult?.isLiked || false)
    const [likeCount, setLikeCount] = useState(likeResult?.count || 0)

    const handleClick = () => {
        switchLike(setid, !isLiked)
        setIsLiked(!isLiked)
        setLikeCount(prev => isLiked ? prev - 1 : prev + 1)
    }

    return (
        <Box sx={{ cursor: "pointer" }} onClick={handleClick}>
            {
                isLiked ? (
                    <ActionChip label={formatCount(likeCount)} Icon={FavoriteIcon} color="red" sx={{ minWidth: 50 }} />
                ) : (
                    <ActionChip label={formatCount(likeCount)} Icon={FavoriteBorderIcon} sx={{ minWidth: 50 }} />
                )
            }
        </Box>
    )

}

export default LiekButton