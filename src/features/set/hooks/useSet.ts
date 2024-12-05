"use client"

import useUserData from "@/features/user/hooks/useUserData"
import { useParams } from "next/navigation"
import useSWR from "swr"
import SA_GetSet from "../actions/getSet"
import { Set } from "../types"

const useSet = () => {

    const { setid } = useParams()

    const { data: userData } = useUserData()

    const { data: setData, mutate, isLoading } = useSWR(["setData", setid as string], async ([key, setid]) => {
        const res = await SA_GetSet(setid)
        return res.payload
    }, { revalidateOnMount: false })
    const isOwner = setData?.set?.user.id === userData?.id

    return { set: setData?.set as Set, favorite: setData?.favorite, mutate, isLoading, isOwner }
}

export default useSet