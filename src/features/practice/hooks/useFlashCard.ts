"use client"

import { FlashCardContext } from "@/features/practice/providers/FlashCardProvider"
import { useContext } from "react"

const useFlashCard = () => useContext(FlashCardContext)

export default useFlashCard

