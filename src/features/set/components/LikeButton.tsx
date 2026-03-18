"use client"

import ActionChip from '@/components/ui/ActionChip';
import { formatCount } from '@/utils';
import FavoriteIcon from '@mui/icons-material/Favorite';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { Box } from '@mui/material';
import { FC, use, useEffect, useRef, useState } from 'react';
import { switchLike } from '../dal/mutations';
import { LikeResult } from '../types';


const LikeButton: FC<{ setid: string, getLikeResult: Promise<LikeResult> }> = ({ setid, getLikeResult }) => {
    const likeResult = use(getLikeResult);

    const [isLiked, setIsLiked] = useState(likeResult?.isLiked || false);
    const [likeCount, setLikeCount] = useState(likeResult?.count || 0);

    const initialLikeRef = useRef(likeResult?.isLiked);

    const handleClick = () => {
        const nextState = !isLiked;
        setIsLiked(nextState);
        setLikeCount(prev => nextState ? prev + 1 : prev - 1);
    };

    useEffect(() => {
        if (isLiked === initialLikeRef.current) return;

        const handler = setTimeout(async () => {
            try {
                await switchLike(setid, isLiked);
                initialLikeRef.current = isLiked;
            } catch (error) {
                console.error("Like error:", error);
            }
        }, 500);

        return () => clearTimeout(handler);
    }, [isLiked, setid]);

    return (
        <Box sx={{ cursor: "pointer" }} onClick={handleClick}>
            <ActionChip
                label={formatCount(likeCount)}
                Icon={isLiked ? FavoriteIcon : FavoriteBorderIcon}
                color={isLiked ? "red" : undefined}
                sx={{ minWidth: 50 }}
            />
        </Box>
    );
}

export default LikeButton;