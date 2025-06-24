"use client"

import { useSession } from "@toolpad/core/useSession"
import { useParams } from "next/navigation"
import useSWR from "swr"
import SA_GetSet from "../actions/getSet"
import { Set } from "../types"

const useSet = () => {

    const { setid } = useParams()

    const session = useSession()

    const { data: setData, mutate, isLoading } = useSWR(["setData", setid as string], async ([key, setid]) => {
        const res = await SA_GetSet(setid)
        return res.payload
    }, { revalidateOnMount: false })
    const isOwner = setData?.set?.user.id === session?.user?.id

    return { set: setData?.set as Set, favorite: setData?.favorite, mutate, isLoading, isOwner }
}

export default useSet