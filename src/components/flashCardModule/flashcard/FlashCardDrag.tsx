"use client"

import { isTouchDevice } from '@/lib/assets/general';
import useFlashCard from '@/lib/hooks/useFlashCard';
import { Typography, useTheme } from '@mui/material';
import { animate, motion, PanInfo, useAnimationControls, useMotionValue, useTransform } from 'framer-motion';
import { FC, useState } from 'react';
import useKeyFrames from './useKeyFrames';

const changeThreshold = 120
const opacityThreshold = 50

const FlashCardDrag: FC<{}> = () => {

    const animationControls = useAnimationControls();
    const { wrongSlide: wrongKeyframes, successSlide: successKeyframes } = useKeyFrames()

    const { palette: { primary, warning, background } } = useTheme()
    const { handleSuccess, handleWrong } = useFlashCard()
    const [label, setLabel] = useState("")

    const x = useMotionValue(0)

    const backgroundColor = useTransform(x, [-1, 0, 1], [warning.main, background.default, primary.main]);
    const rotate = useTransform(x, [-200, 0, 200], [-6, 0, 6], { clamp: false });
    const opacity = useTransform(x, [-opacityThreshold, 0, opacityThreshold], [1, 0, 1]);


    const handleDragEnd = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const { offset: { x } } = info

        if (Math.abs(x) > changeThreshold) {

            if (x > changeThreshold) {
                handleSuccess()
                animate("#successCard", successKeyframes(x), { duration: 0.4 })
            } else {
                handleWrong()
                animate("#wrongCard", wrongKeyframes(x), { duration: 0.4 })
            }
            animationControls.set({ x: 0 })
        } else {
            animationControls.start({ x: 0, transition: { duration: 0.2 } })
        }
    }

    const handleDrag = (event: MouseEvent | TouchEvent | PointerEvent, info: PanInfo) => {
        const newLabel = info.offset.x > 0 ? "Know" : "Still learning"
        if (newLabel !== label) setLabel(newLabel)
    }

    return isTouchDevice() && (
        <motion.div
            animate={animationControls}
            drag={"x"}
            onDragEnd={handleDragEnd}
            dragMomentum={false}
            onDrag={handleDrag}
            style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                x: x,
                backgroundColor: backgroundColor,
                rotate: rotate,
                opacity: opacity,
                position: "absolute",
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                willChange: "transform",
            }}
        >
            <Typography fontSize={25} fontWeight={500}>{label}</Typography>
        </motion.div>
    )
}

export default FlashCardDrag