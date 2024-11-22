"use client"

import { FlashCardContext } from "@/features/flashcard/providers/FlashCardProvider"
import { useContext } from "react"

const useFlashCard = () => useContext(FlashCardContext)

export default useFlashCard

