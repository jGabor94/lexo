"use client"

import { useParams } from "next/navigation"
import useSWR from "swr"
import SA_GetSet from "../actions/set/getSet"
import { Set } from "../database/queries/getSet"
import useUserData from "./useuserData"

const useSet = () => {

    const { setid } = useParams()

    const { data: userData } = useUserData()

    const { data: set, mutate, isLoading } = useSWR(["set", setid as string], async ([key, setid]) => {
        const res = await SA_GetSet(setid)
        return res.payload
    }, { revalidateOnMount: false })

    const isOwner = set?.user._id === userData?._id

    return { set: set as Set, mutate, isLoading, isOwner }
}

export default useSet