"use client"

import LinearLoading from '@/components/LinearLoading'
import useConfirmControll from '@/hooks/useConfirmControll'
import { IconButtonGrey } from '@/lib/mui/styled'
import useAction from '@/lib/serverAction/useAction'
import { Button, Dialog, DialogActions, DialogTitle, Tooltip, Typography } from '@mui/material'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import SA_DeleteFolder from '../actions/deleteFolder'
import { Folder } from '../types'

const DeleteFolder: FC<{ folder: Folder }> = ({ folder }) => {

    const router = useRouter()

    const { action: deleteFolder } = useAction(SA_DeleteFolder, {
        200: { severity: "success", content: "Mappa sikeresen törölve 🙂" },
    })

    const { controll: { open, promise, loading }, trigger: triggerDelete } = useConfirmControll(async () => {
        const res = await deleteFolder(folder.id)
        if (res.statusCode === 200) router.push("/folders")
    })

    return (
        <Fragment>
            <Dialog {...{ open }}>
                <LinearLoading {...{ loading }} />
                <DialogTitle>
                    Biztos törölni szeretnéd az alábbi mappát?
                    <Typography fontSize={15}>{folder.name}</Typography>
                </DialogTitle>
                <DialogActions>
                    <Button variant="outlined" onClick={promise?.reject}>Nem</Button>
                    <Button variant="contained" onClick={promise?.resolve} disabled={loading}>Igen</Button>
                </DialogActions>
            </Dialog>
            <Tooltip title="Törlés">
                <IconButtonGrey onClick={triggerDelete}>
                    <TrashIcon />
                </IconButtonGrey>
            </Tooltip>
        </Fragment>

    )
}

export default DeleteFolder