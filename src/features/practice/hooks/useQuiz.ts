"use client"

import { useContext } from "react"
import { QuizContext } from "../providers/QuizProvider"

const useQuiz = () => useContext(QuizContext)

export default useQuiz

