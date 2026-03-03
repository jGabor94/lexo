"use client"

import { MenuControl } from '@/hooks/useMenuControl';
import useModalControl from '@/hooks/useModalControl';
import useDal from '@/lib/dal/useDal';
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { Edit2Icon } from 'lucide-react';
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import { updateSet as updateSetAction } from '../dal/mutations';
import useSet from '../hooks/useSet';
import { SetInput } from '../types';
import SetForm from "./SetForm";


const EditSet: FC<{ menuControl: MenuControl }> = ({ menuControl }) => {

    const modalControl = useModalControl()
    const { mutate, set } = useSet()

    const { action: updateSet } = useDal(updateSetAction, {
        "success": { severity: "success", content: "Szógyújtemény sikeresen szerkesztve 🙂" },
        fallbackError: (e) => ({ severity: "error", content: e.error.type })
    })

    const submit: SubmitHandler<SetInput> = async (data) => {

        const error = await updateSet(set.id, data)

        if (!error) {
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