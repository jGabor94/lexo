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
