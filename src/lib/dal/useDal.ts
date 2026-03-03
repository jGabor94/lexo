"use client"

import { SnackbarAlertData } from "@/components/SnackbarAlert"
import useAlert from "@/hooks/useAlert"
import { DalReturn, ExtractError, ExtractErrorType } from "@/lib/dal/types"
import { useState } from "react"

const useDal = <F extends (...args: any[]) => Promise<DalReturn>>(
    sa: F,
    alerts?: Partial<Record<"success" | ExtractErrorType<Awaited<ReturnType<F>>>, SnackbarAlertData> & { "fallbackError": (error: ExtractError<Awaited<ReturnType<F>>>) => SnackbarAlertData }>,
) => {

    const [progress, setProgress] = useState(false)
    const { setAlert } = useAlert()
    const action = async (...params: Parameters<F>): Promise<Awaited<ReturnType<F>>> => {
        setProgress(true)

        const res = await sa(...params)

        setProgress(false)

        if (alerts) {
            if (!res || res.success) {
                if (alerts.success) setAlert(alerts.success)
            } else {

                const errorType = res.error.type as ExtractErrorType<Awaited<ReturnType<F>>>

                if (alerts[errorType]) {
                    setAlert(alerts[errorType])
                } else if (alerts["fallbackError"]) {
                    setAlert(alerts["fallbackError"](res as any))
                }

            }
        } else {
            if (res && !res.success) {
                setAlert({ severity: "error", content: res.error.type })
            }
        }

        return res as Awaited<ReturnType<F>>
    }

    return { action, progress }
}

export default useDal