import useFlashCard from '@/features/flashcard/hooks/useFlashCard'
import { Box } from '@mui/material'
import { FC } from 'react'
import AnimatedFlashCards from './components/AnimatedFlashCards'
import FlashCardContent from './FlashCardContent'
import FlashCardDrag from './FlashCardDrag'

const FlashCard: FC<{}> = () => {

    const { setIsFlipped } = useFlashCard()

    return (
        <Box sx={{
            width: 700,
            maxWidth: "100%",
            aspectRatio: "1 / 0.7",
            position: "relative",
            cursor: "pointer",
        }} onClick={() => setIsFlipped(state => !state)}
        >
            <FlashCardContent />
            <AnimatedFlashCards />
            <FlashCardDrag />
        </Box>
    )
}

export default FlashCard
