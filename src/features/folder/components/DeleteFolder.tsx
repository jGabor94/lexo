"use client"

import LinearLoading from '@/components/LinearLoading'
import useConfirmControll from '@/hooks/useConfirmControll'
import useDal from '@/lib/dal/useDal'
import { IconButtonGrey } from '@/lib/mui/styled'
import { Button, Dialog, DialogActions, DialogTitle, Tooltip, Typography } from '@mui/material'
import { TrashIcon } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import { deleteFolder as deleteFolderAction } from '../dal/mutations'
import { Folder } from '../types'

const DeleteFolder: FC<{ folder: Folder }> = ({ folder }) => {

    const router = useRouter()

    const { action: deleteFolder } = useDal(deleteFolderAction, {
        alerts: {
            success: { severity: "success", content: "Mappa sikeresen törölve 🙂" },
        }
    })

    const { controll: { open, promise, loading }, trigger: triggerDelete } = useConfirmControll(async () => {
        const error = await deleteFolder(folder.id)
        if (!error) router.push("/folders")
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