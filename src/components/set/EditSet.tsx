"use client"

import SA_UpdateSet from '@/lib/actions/set/updateSet';
import useAction from '@/lib/assets/serverAction/useAction';
import { MenuControl } from '@/lib/hooks/useMenuControl';
import useModalControl from '@/lib/hooks/useModalControl';
import useSet from '@/lib/hooks/useSet';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import SetForm, { SetInput } from "./SetForm";


const EditSet: FC<{ menuControl: MenuControl }> = ({ menuControl }) => {

    const modalControl = useModalControl()
    const { mutate, set } = useSet()

    const { action: updateSet } = useAction(SA_UpdateSet, {
        200: { severity: "success", content: "Set successfully edited 🙂" }
    })

    const submit: SubmitHandler<SetInput> = async (data) => {

        const res = await updateSet(set._id, data)

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
                    <EditOutlinedIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText>Edit</ListItemText>
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