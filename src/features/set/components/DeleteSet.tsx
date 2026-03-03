"use client"

import ConfirmDialog from '@/components/ConfirmDialog'
import useConfirmControll from '@/hooks/useConfirmControll'
import useDal from '@/lib/dal/useDal'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import { deleteSet as deleteSetAction } from '../dal/mutations'
import useSet from '../hooks/useSet'

const DeleteSet: FC<{}> = () => {

    const router = useRouter()
    const { set } = useSet()

    const { action: deleteSet } = useDal(deleteSetAction, {
        "success": { severity: "success", content: "Szógyűjtemény sikeresen törölve 🙂" },
        fallbackError: (e) => ({ severity: "error", content: e.error.type })
    })

    const { controll, trigger: triggerDelete } = useConfirmControll(async () => {
        const error = await deleteSet(set.id)
        if (!error) router.push("/library/all")
    })

    return (
        <Fragment>
            <ConfirmDialog {...{ controll, dialogText: `Biztosan törölni szretnéd a következő szógyűjteményt: ${set.name}?` }} />
            <MenuItem onClick={triggerDelete}>
                <ListItemIcon>
                    <Trash size={20} />
                </ListItemIcon>
                <ListItemText>Törlés</ListItemText>
            </MenuItem>
        </Fragment>

    )
}

export default DeleteSet