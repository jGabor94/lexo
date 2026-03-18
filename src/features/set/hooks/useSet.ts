"use client"

import { useSession } from "@toolpad/core/useSession"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { Set } from "../types"

const useSet = () => {

    const { setid } = useParams()
    const session = useSession()

    const { data: setData, ...rest } = useSWR(["set", setid as string], async ([key, setid]) => {
        const res = await fetch(`/api/set/${setid}`)
        if (!res.ok) {
            const text = await res.text()
            let errorData;
            try {
                errorData = JSON.parse(text);
            } catch {
                errorData = { message: text || `HTTP error: ${res.status}` };
            }
            throw errorData;
        }
        return await res.json() as Set

    }, { revalidateOnMount: false, revalidateOnFocus: false, })
    const isOwner = setData?.user.id === session?.user?.id

    if (!setData) {
        throw new Error("useSet must be used within a page where set data is pre-fetched");
    }

    return { set: setData, isOwner, ...rest }
}

export default useSet