"use client"

import ConfirmDialog from '@/components/ConfirmDialog'
import SA_DeleteSet from '@/features/set/actions/deleteSet'
import useConfirmControll from '@/hooks/useConfirmControll'
import useAction from '@/lib/serverAction/useAction'
import { ListItemIcon, ListItemText, MenuItem } from '@mui/material'
import { Trash } from 'lucide-react'
import { useRouter } from 'next/navigation'
import { FC, Fragment } from 'react'
import useSet from '../hooks/useSet'

const DeleteSet: FC<{}> = () => {

    const router = useRouter()
    const { set } = useSet()

    const { action: deleteSet } = useAction(SA_DeleteSet, {
        200: { severity: "success", content: "Szógyűjtemény sikeresen törölve 🙂" },
    })

    const { controll, trigger: triggerDelete } = useConfirmControll(async () => {
        const res = await deleteSet(set.id)
        if (res.statusCode === 200) router.push("/library/all")
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