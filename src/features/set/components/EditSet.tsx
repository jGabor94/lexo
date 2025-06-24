"use client"

import SA_UpdateSet from '@/features/set/actions/updateSet';
import { MenuControl } from '@/hooks/useMenuControl';
import useModalControl from '@/hooks/useModalControl';
import useAction from '@/lib/serverAction/useAction';
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Edit2Icon } from 'lucide-react';
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import useSet from '../hooks/useSet';
import SetForm, { SetInput } from "./SetForm";


const EditSet: FC<{ menuControl: MenuControl }> = ({ menuControl }) => {

    const modalControl = useModalControl()
    const { mutate, set } = useSet()

    const { action: updateSet } = useAction(SA_UpdateSet, {
        200: { severity: "success", content: "Szógyújtemény sikeresen szerkesztve 🙂" }
    })

    const submit: SubmitHandler<SetInput> = async (data) => {

        const res = await updateSet(set.id, data)

        if (res.statusCode === 200) {
            mutate()
            modalControl.handleClose()
            menuControl.handleClose()
        }
    }

    return (
        <Fragment>
            <MenuItem onClick={modalControl.handleOpen}>
                <ListItemIcon>
                    <Edit2Icon size={20} />
                </ListItemIcon>
                <ListItemText>Szerkesztés</ListItemText>
            </MenuItem>
            <SetForm
                modalControl={modalControl}
                onSubmit={submit}
                initValues={{
                    name: set.name,
                    preferredTermLang: set.preferredTermLang,
                    preferredDefinitionLang: set.preferredDefinitionLang
                }}
                submitLabel="Edit"
                label="Edit set" />
        </Fragment >
    )
}

export default EditSet