"use client"

import Sort from "@/components/Sort";
import { RowSetCardContent, RowSetCardLayout } from "@/features/set/components/ui/rowSetCard";
import useSort from "@/hooks/useSort";
import { Stack, Typography } from "@mui/material";
import { FC } from "react";
import { SetListItem } from "../types";

const SetList: FC<{ sets: SetListItem[] }> = ({ sets }) => {
    const sortState = useSort([
        {
            label: "Original",
            sort: (a: SetListItem, b: SetListItem) => 0
        },
        {
            label: "Terms",
            sort: (a: SetListItem, b: SetListItem) => b.termsCount - a.termsCount
        },
        {
            label: "Name",
            sort: (a: SetListItem, b: SetListItem) => a.name.localeCompare(b.name)
        },
        {
            label: "CreatedAt",
            sort: (a: SetListItem, b: SetListItem) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime()
        }
    ])


    return (
        <Stack gap={2}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
                <Typography>Set number {sets.length}</Typography>
                <Sort sortState={sortState} />
            </Stack>
            {
                sortState.sort(sets).map(set => (
                    <RowSetCardLayout key={set.id}>
                        <RowSetCardContent {...{ set, href: `/sets/${set.id}` }} />
                    </RowSetCardLayout>
                ))
            }
        </Stack>


    );
}

export default SetList