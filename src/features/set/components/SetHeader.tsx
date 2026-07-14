"use client"

import CreateCopy from '@/features/set/components/CreateCopy'
import SetMenu from '@/features/set/components/SetMenu'
import SwapTerms from '@/features/term/components/SwapTerms'
import { IconButtonGrey } from '@/lib/mui/styled'
import AddIcon from '@mui/icons-material/Add'
import { Stack, Tooltip, Typography } from '@mui/material'
import Link from 'next/link'
import { FC, Fragment } from 'react'
import useSet from '../hooks/useSet'

const SetHeader: FC<{}> = () => {

    const { set, isOwner } = useSet()

    return (

        <Stack sx={{
            gap: 2,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between"
        }}>
            <Stack direction="row" gap={2} alignItems="center" sx={{ minWidth: 0, }}>
                <Typography variant="h3" sx={{
                    overflow: "hidden",
                    textWrap: "wrap",
                    minWidth: 0,
                }}>
                    {set.name}
                </Typography>

            </Stack>


            <Stack direction="row" alignItems="center" gap={1} >
                {!isOwner ? (
                    <CreateCopy setid={set.id} />
                ) : (
                    <Fragment>
                        <SetMenu />

                        <SwapTerms />
                        <Tooltip title="Szópárok hozzáadása">
                            <IconButtonGrey component={Link} href={`/sets/${set.id}/terms/create`}>
                                <AddIcon />
                            </IconButtonGrey>
                        </Tooltip>
                    </Fragment>

                )}
            </Stack>

        </Stack >


    )
}

export default SetHeader