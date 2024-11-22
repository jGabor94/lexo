"use client"

import { AlertContext } from "@/providers/AlertProvider"
import { useContext } from "react"

const useAlert = () => useContext(AlertContext)

export default useAlert