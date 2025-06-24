"use client"

import { SetListItem } from '@/features/set/types'
import { getDate } from '@/utils'
import { Avatar, Chip, Divider, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC } from 'react'
import LangPair from '../LangPair'



const RowSetCardContent: FC<{ set: SetListItem, href: string }> = ({ set, href }) => {

    const router = useRouter()

    return (
        <Stack sx={{ gap: 2, flexGrow: 1, minWidth: 0, cursor: "pointer" }} onClick={() => router.push(href)}>
            <Stack
                direction="row"
                sx={{
                    textDecoration: "none",
                    justifyContent: "space-between",
                    gap: 2,
                    alignItems: "center",

                }}
            >

                <Typography sx={{
                    textWrap: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    whiteSpace: "nowrap"
                }}>{set.name}</Typography>

                <Typography fontSize={12} sx={{ textWrap: "nowrap" }}>Created: {getDate(set.createdAt, false)}</Typography>
            </Stack>
            <Stack
                direction="row"
                sx={{
                    textDecoration: "none",
                    justifyContent: "space-between",
                    cursor: "pointer",
                    flexGrow: 1,
                }}

            >
                <LangPair
                    termLangCode={set.preferredTermLang}
                    definitionLangCode={set.preferredDefinitionLang}
                />

                <Stack direction="row" gap={1} alignItems="center" sx={{ height: "fit-content", alignSelf: "flex-end" }}>
                    <Stack direction="row" gap={0.5} alignItems="center">
                        <Avatar src={set.user?.image} sx={{ width: 25, height: 25 }} />
                        <Typography fontSize={12} sx={{ textWrap: "nowrap" }}>{set.user?.name}</Typography>
                    </Stack>
                    <Divider flexItem orientation="vertical" />
                    <Chip
                        label={`${set.termsCount} items`}
                        sx={{ width: "fit-content" }}
                        size="small"
                        color="primary"
                    />
                </Stack>
            </Stack>

        </Stack>

    )
}


export default RowSetCardContent