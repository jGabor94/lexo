"use client"

import { SnackbarAlertData } from "@/components/SnackbarAlert"
import useAlert from "@/lib/hooks/useAlert"
import { useState } from "react"
import { StatusCode } from "../response/types"
type UnwrapPromise<T> = T extends Promise<infer U> ? U : T;

const useAction = <T extends (...args: any[]) => any>(
    sa: T,
    alerts?: Partial<Record<StatusCode, SnackbarAlertData>>,
) => {

    const [progress, setProgress] = useState(false)

    const { setAlert } = useAlert()

    const action = async (...params: Parameters<T>) => {

        setProgress(true)
        const res: { statusCode: StatusCode, error: string } = await sa(...params)
        setProgress(false)

        if (alerts && alerts[res.statusCode]) {
            setAlert(alerts[res.statusCode] as SnackbarAlertData)
        } else {
            res.statusCode !== 200 && setAlert({ severity: "error", content: res.error })
        }

        return res as UnwrapPromise<ReturnType<T>>

    }

    return { action, progress }
}

export default useAction
