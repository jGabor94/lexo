"use client"

import { AlertContext } from "@/app/_providers/Context/context"
import { useContext } from "react"

const useAlert = () => useContext(AlertContext)

export default useAlert