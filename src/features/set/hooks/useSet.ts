"use client"

import { useSession } from "@toolpad/core/useSession"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { getSet } from "../dal/queries"
import { Set } from "../types"

const useSet = () => {

    const { setid } = useParams()

    const session = useSession()

    const { data: setData, mutate, isLoading } = useSWR(["setData", setid as string], async ([key, setid]) => {

        const res = await getSet(setid)

        if (!res.success) throw new Error(res.error.type)
        if (!res.data) throw new Error("Set not found")

        return res.data

    }, { revalidateOnMount: false })
    const isOwner = setData?.user.id === session?.user?.id

    return { set: setData as Set, mutate, isLoading, isOwner }
}

export default useSet