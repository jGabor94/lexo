import useExerciseController from '@/features/practice/hooks/useExerciseController'
import { Box } from '@mui/material'
import { FC, useEffect, useState } from 'react'
import AnimatedFlashCards from './components/AnimatedFlashCards'
import FlashCardContent from './FlashCardContent'
import FlashCardDrag from './FlashCardDrag'

const FlashCard: FC<{}> = () => {

    const [isFlipped, setIsFlipped] = useState(false)
    const { index } = useExerciseController()

    useEffect(() => {
        setIsFlipped(false)
    }, [index])

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === "ArrowUp") {
                e.preventDefault();
                setIsFlipped((state) => !state);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);


    return (
        <Box sx={{
            width: 700,
            maxWidth: "100%",
            aspectRatio: "1 / 0.7",
            position: "relative",
            cursor: "pointer",
        }} onClick={() => setIsFlipped(!isFlipped)}
        >
            <FlashCardContent {...{ isFlipped, setIsFlipped }} />
            <AnimatedFlashCards />
            <FlashCardDrag />
        </Box>
    )
}

export default FlashCard
