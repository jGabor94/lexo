"use client"

import Sort from "@/components/Sort";
import { RowSetCardLayout } from "@/features/set/components/ui/rowSetCard";
import useSort from "@/hooks/useSort";
import { Box, Stack } from "@mui/material";
import { FC } from "react";
import { SetListItem } from "../types";

const SetList: FC<{ sets: SetListItem[] }> = ({ sets }) => {
    const sortState = useSort([
        {
            label: "Eredeti",
            sort: (a: SetListItem, b: SetListItem) => 0
        },
        {
            label: "Kifekezések száma",
            sort: (a: SetListItem, b: SetListItem) => b.termsCount - a.termsCount
        },
        {
            label: "Név",
            sort: (a: SetListItem, b: SetListItem) => a.name.localeCompare(b.name)
        },
        {
            label: "Létrehozva",
            sort: (a: SetListItem, b: SetListItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
    ])


    return (
        <Stack gap={2} fontWeight={500}>
            <Box sx={{ alignSelf: "flex-end" }}>
                <Sort sortState={sortState} />
            </Box>
            <Box sx={{ display: "grid", gap: 3, gridTemplateColumns: { sm: "repeat(2, minmax(0, 1fr))" }, xl: "repeat(3, minmax(0, 1fr))" }}>
                {
                    sortState.sort(sets).map(set => (
                        <RowSetCardLayout key={set.id} {...{ set, href: `/sets/${set.id}` }} />
                    ))
                }
            </Box>


        </Stack>


    );
}

export default SetList