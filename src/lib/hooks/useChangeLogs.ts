"use client"

import useSWR from "swr"
import SA_GetChangeLogs from "../actions/getChangeLogs"

export default function useChangeLogs() {

    const { data: changeLogs, mutate, isLoading } = useSWR("changeLogs", async () => {
        const res = await SA_GetChangeLogs()
        return res.payload
    })

    return { changeLogs, mutate, isLoading }

}