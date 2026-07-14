"use client"

import { useSession } from "@toolpad/core/useSession"
import { useParams } from "next/navigation"
import useSWR from "swr"
import { Set } from "../types"

const useSet = () => {

    const { setid, rest } = useParams()
    const taskid = rest ? rest[1] : undefined
    const session = useSession()


    const { data: setData, ...restData } = useSWR(["set", setid as string, taskid as (string | undefined)], async ([key, setid, taskid]) => {
        const res = await fetch(`/api/set/${setid}${taskid ? `?taskid=${taskid}` : ""}`)
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

    return { set: setData, isOwner, ...restData }
}

export default useSet