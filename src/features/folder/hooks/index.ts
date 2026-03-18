"use client"

import { useParams } from "next/navigation"
import useSWR from "swr"
import { Folder } from "../types"

const useFolder = () => {

    const { folderid } = useParams()

    const { data: folder, ...rest } = useSWR(["folder", folderid], async ([key, folderid]) => {
        const res = await fetch(`/api/folder/${folderid}`)
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
        const data: Folder = await res.json()
        return data

    }, { revalidateOnMount: false, revalidateOnFocus: false })


    if (!folder) {
        throw new Error("useFolder must be used within a page where folder data is pre-fetched");
    }

    return { folder, ...rest }
}

export default useFolder