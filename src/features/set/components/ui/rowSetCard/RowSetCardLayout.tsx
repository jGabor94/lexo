"use client"

import { SetListItem } from '@/features/set/types'
import { getDate } from '@/utils'
import { Avatar, Chip, Divider, Paper, Stack, Typography } from '@mui/material'
import { useRouter } from 'next/navigation'
import { FC, ReactNode } from 'react'

const RowSetCardLayout: FC<{ href: string, set: SetListItem, children?: ReactNode }> = ({ href, set, children }) => {

    const router = useRouter()


    return (
        <Paper direction="row" component={Stack} onClick={() => router.push(href)} sx={{ cursor: "pointer", overflow: "hidden" }}>
            <Stack justifyContent="space-between" alignItems="center">
                <Stack justifyContent="center" p={1} sx={{ color: "white", backgroundColor: "primary.main", height: "50%" }}>
                    <Typography >{set.preferredTermLang}</Typography>
                </Stack>
                <Divider flexItem />
                <Stack justifyContent="center" alignItems="center" p={1} sx={{ height: "50%" }}>
                    <Typography >{set.preferredDefinitionLang}</Typography>
                </Stack>

            </Stack>
            <Divider flexItem orientation='vertical' />

            <Stack
                direction="row"

                sx={{
                    justifyContent: "space-between",
                    gap: 2,
                    p: 2,
                    alignItems: "center",
                    fontWeight: 500,
                    flexWrap: "wrap",
                    width: "100%"
                }}
            >
                <Stack
                    direction="row"
                    gap={1}
                >

                    <Typography sx={{
                        textWrap: "nowrap",
                        overflow: "hidden",
                        textOverflow: "ellipsis",
                        whiteSpace: "nowrap",
                        fontSize: 20,
                        fontWeight: 600
                    }}>{set.name}</Typography>

                </Stack>


                <Stack direction="row" gap={1} alignItems="center" >
                    <Stack direction="row" gap={0.5} alignItems="center">
                        <Avatar src={set.user?.image} sx={{ width: 25, height: 25 }} />
                        <Typography fontSize={12} sx={{ textWrap: "nowrap", fontWeight: 500 }}>{set.user?.name}</Typography>
                    </Stack>
                    <Divider flexItem orientation="vertical" />
                    <Chip
                        label={`${set.termsCount} elem`}
                        sx={{
                            fontSize: 12,
                            fontWeight: "bold",
                            backgroundColor: "#e0f7fa",
                            color: "#00796b",
                        }}
                        size="small"
                    />
                    <Divider flexItem orientation="vertical" />
                    <Typography fontSize={12} sx={{ textWrap: "nowrap", fontWeight: 500 }}>Létrehozva: {getDate(set.createdAt, false)}</Typography>
                    {children}
                </Stack>
            </Stack>

        </Paper >




    )
}

export default RowSetCardLayout