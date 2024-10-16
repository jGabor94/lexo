"use client"

import { FlashCardContext } from "@/components/flashCardModule/components/FlashCardProvider"
import { useContext } from "react"

const useFlashCard = () => useContext(FlashCardContext)

export default useFlashCard

