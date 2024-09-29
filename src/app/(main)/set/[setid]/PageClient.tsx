"use client"

import FavoriteButton from '@/components/set/FavoriteButton'
import SetMenu from '@/components/set/SetMenu'
import CreateTerms from '@/components/Term/CreateTerms'
import TermList from '@/components/Term/TermList'
import TextLine from '@/components/ui/TextLine'
import { getDate } from '@/lib/assets/general'
import useSet from '@/lib/hooks/useSet'
import { Avatar, Divider, Paper, Stack, Typography } from '@mui/material'
import { FC } from 'react'

const PageClient: FC<{}> = () => {

    const { set, isOwner } = useSet()

    return (
        <Stack gap={3} component={Paper} p={2} variant="elevation">
            <Stack gap={3} >
                <Stack sx={{
                    gap: 2,
                    flexDirection: { xs: "column", sm: "row" },
                    alignItems: { xs: "flex-start", sm: "center" }
                }}>
                    <TextLine>
                        <Stack direction="row" gap={2} alignItems="center">
                            <Typography sx={{ textWrap: "nowrap", fontSize: 35 }}>
                                {set.name}
                            </Typography>
                            <Divider orientation="vertical" flexItem />
                            <FavoriteButton />
                        </Stack>
                    </TextLine>

                    {isOwner && (
                        <Stack direction="row" gap={2}>
                            <SetMenu />
                            <CreateTerms />
                        </Stack>
                    )}
                </Stack>
                <Stack direction="row" justifyContent="space-between" alignItems="flex-end">
                    <Stack direction="row" gap={1} >
                        <Avatar src={set.user.image} sx={{ width: 40, height: 40 }} />
                        <Stack>
                            <Typography fontSize={12}>Created by</Typography>
                            <Typography fontSize={15} fontWeight={500}>{set.user.name}</Typography>
                            <Typography fontSize={12}>{getDate(set.createdAt as string)}</Typography>
                        </Stack>
                    </Stack>
                    <Typography>Term number: {set.terms.length}</Typography>
                </Stack>
            </Stack>
            <TermList />
        </Stack>
    )
}

export default PageClient