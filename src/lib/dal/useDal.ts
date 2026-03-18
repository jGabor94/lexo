"use client"

import { SnackbarAlertData } from "@/components/SnackbarAlert"
import useAlert from "@/hooks/useAlert"
import { DalReturn, ExtractError, ExtractErrorType } from "@/lib/dal/types"
import { useEffect, useRef, useState, useTransition } from "react"

/**
 * Hook that wraps a server action with transition tracking, alert handling, and a post-revalidation callback.
 *
 * @template F - Server action function type, must return `Promise<DalReturn>`.
 * @param sa - The server action to invoke.
 * @param config - Configuration options.
 */
const useDal = <F extends (...args: any[]) => Promise<DalReturn>>(
    sa: F,
    config?: {
        /**
         * Alert configurations keyed by result type.
         * - `success` — shown on successful response.
         * - `<ErrorType>` — shown when `res.error.type` matches the key.
         * - `fallbackError` — shown when no specific error key matches; receives the full error response.
         */
        alerts?: Partial<Record<"success" | ExtractErrorType<Awaited<ReturnType<F>>>, SnackbarAlertData> & {
            fallbackError: (error: ExtractError<Awaited<ReturnType<F>>>) => SnackbarAlertData
        }>,
        /**
         * Callback fired after both the server action **and** revalidation have completed.
         *
         * Uses `useTransition` internally — `isPending` only becomes `false` once
         * `revalidatePath` / `revalidateTag` has settled and the client has re-rendered
         * with fresh data.
         *
         * @param res - Resolved return value of the server action.
         */
        onDone?: (res: Awaited<ReturnType<F>>) => void,
    }
) => {
    const [isPending, startTransition] = useTransition()
    const [res, setRes] = useState<null | DalReturn>(null)
    const { setAlert } = useAlert()

    /**
     * Triggers the server action inside a React transition.
     * Handles alert display based on the result, then resolves with the full response.
     *
     * @param params - Arguments forwarded directly to the server action.
     * @returns The resolved server action return value.
     */
    const action = async (...params: Parameters<F>): Promise<Awaited<ReturnType<F>>> => {
        return new Promise<Awaited<ReturnType<F>>>((resolve) => {
            startTransition(async () => {
                const res = await sa(...params)
                setRes(res)

                if (config?.alerts) {
                    const { alerts } = config
                    if (!res || res.success) {
                        if (alerts.success) setAlert(alerts.success)
                    } else {
                        const errorType = res.error.type as ExtractErrorType<Awaited<ReturnType<F>>>

                        if (alerts[errorType]) {
                            setAlert(alerts[errorType])
                        } else if (alerts["fallbackError"]) {
                            setAlert(alerts["fallbackError"](res as any))
                        } else {
                            setAlert({ severity: "error", content: res.error.type })
                        }
                    }
                } else {
                    if (res && !res.success) {
                        setAlert({ severity: "error", content: res.error.type })
                    }
                }

                resolve(res as Awaited<ReturnType<F>>)
            })
        })
    }

    /**
       * A ref that holds the latest `onDone` callback.
       * This allows the `useEffect` to access the most recent version of the callback
       * without needing to include it in the dependency array, preventing 
       * unnecessary re-runs or infinite loops if the caller provides an anonymous function.
       */
    const onDoneRef = useRef(config?.onDone);

    /**
     * Keeps the `onDoneRef` synchronized with the latest `onDone` function 
     * passed from the component props.
     */
    useEffect(() => {
        onDoneRef.current = config?.onDone;
    }, [config?.onDone]);

    /**
     * Invokes `onDone` once the transition ends and a result is available.
     * Depends on `isPending` and `res` — fires after revalidation settles.
     */
    useEffect(() => {
        if (!isPending && (res !== null)) {
            onDoneRef.current && onDoneRef.current(res as Awaited<ReturnType<F>>);
            setRes(null)
        }
    }, [isPending, res])

    return {
        /** Triggers the server action with transition + alert handling. */
        action,
        /** `true` while the server action or revalidation is in progress. */
        progress: isPending
    }
}

export default useDal