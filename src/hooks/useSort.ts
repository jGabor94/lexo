"use client"

import { Dispatch, SetStateAction, useState } from "react";

export interface SortState {
    sort: (array: any[]) => any[],
    sorts: { label: string, sort: ((a: any, b: any) => number) | undefined }[]
    reverse: boolean,
    setReverse: Dispatch<SetStateAction<boolean>>,
    selectedSort: number,
    setSelectedSort: Dispatch<SetStateAction<number>>
}

const useSort = (sorts: any): SortState => {


    const [reverse, setReverse] = useState(false)
    const [selectedSort, setSelectedSort] = useState(0)

    const sort = (array: any[]) => {
        const sorted = array.sort(sorts[selectedSort].sort);
        return reverse ? sorted.reverse() : sorted;
    };

    return { sort, sorts, reverse, setReverse, selectedSort, setSelectedSort }


}

export default useSort