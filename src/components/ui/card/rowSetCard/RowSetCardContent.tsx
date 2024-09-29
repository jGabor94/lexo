"use client"

import { getDate } from '@/lib/assets/general'
import { SetListItem } from '@/lib/database/queries/getSets'
import { Avatar, Chip, Divider, Stack, Typography } from '@mui/material'
import Link, { LinkProps } from 'next/link'
import { FC } from 'react'
import LangPair from '../LangPair'

interface props extends LinkProps {
    set: SetListItem
}

const RowSetCardContent: FC<props> = ({ set, ...linkProps }) => (
    <Link {...linkProps} legacyBehavior>
        <Stack
            direction="row"
            sx={{
                textDecoration: "none",
                justifyContent: "space-between",
                cursor: "pointer",
                flexGrow: 1,
            }}

        >

            <Stack gap={1} justifyContent="center">
                <Typography >{set.name}</Typography>

                <Stack direction="row" gap={0.5} alignItems="center">
                    <LangPair
                        termLangCode={set.preferredTermLang}
                        definitionLangCode={set.preferredDefinitionLang}
                    />
                </Stack>
            </Stack>

            <Stack gap={1} alignItems="flex-end" justifyContent="space-between">
                <Typography fontSize={12}>Created at: {getDate(set.createdAt as string)}</Typography>
                <Stack direction="row" gap={1} alignItems="center" sx={{ height: "fit-content", alignSelf: "flex-end" }}>
                    <Stack direction="row" gap={0.5} alignItems="center">
                        <Avatar src={set.user.image} sx={{ width: 25, height: 25 }} />
                        <Typography fontSize={12}>{set.user.name}</Typography>
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
    </Link>

)


export default RowSetCardContent