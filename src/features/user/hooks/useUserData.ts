"use client"

import useSWR from "swr"
import SA_GetUserData from "../actions/getUserData"

const useUserData = () => {

    const swrResponse = useSWR("userData", async () => {
        const res = await SA_GetUserData()
        return res.payload
    }, { revalidateOnMount: false })

    return swrResponse
}

export default useUserData