"use client"

import { useSession } from "next-auth/react"
import { useParams } from "next/navigation"
import useSWR from "swr"
import SA_GetSet from "../actions/set/getSet"
import { Set } from "../database/queries/getSet"

const useSet = () => {

    const { setid } = useParams()

    const { data: session } = useSession()

    const { data: set, mutate, isLoading } = useSWR(["set", setid as string], async ([key, setid]) => {
        const res = await SA_GetSet(setid)
        return res.payload
    }, { revalidateOnMount: false })

    const isOwner = set?.user._id === session?.user._id

    return { set: set as Set, mutate, isLoading, isOwner }
}

export default useSet