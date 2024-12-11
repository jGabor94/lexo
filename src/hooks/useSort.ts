"use client";

import { Dispatch, SetStateAction, useState } from "react";

export interface SortOption<T> {
    label: string;
    sort: (a: T, b: T) => number;
}

export interface SortState<T> {
    sort: (array: T[]) => T[];
    sorts: SortOption<T>[];
    reverse: boolean;
    setReverse: Dispatch<SetStateAction<boolean>>;
    selectedSort: number;
    setSelectedSort: Dispatch<SetStateAction<number>>;
}

const useSort = <T>(sorts: SortOption<T>[]): SortState<T> => {
    const [reverse, setReverse] = useState(false);
    const [selectedSort, setSelectedSort] = useState(0);

    const sort = (array: T[]): T[] => {
        const sorted = [...array].sort(sorts[selectedSort].sort);
        return reverse ? sorted.reverse() : sorted;
    };

    return { sort, sorts, reverse, setReverse, selectedSort, setSelectedSort };
};

export default useSort;
