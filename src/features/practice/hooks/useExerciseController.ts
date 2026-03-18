"use client"

import { ExerciseControllerContext } from "@/features/practice/providers/ExerciseController"
import { useContext } from "react"

const useExerciseController = () => useContext(ExerciseControllerContext)

export default useExerciseController

