"use client"

import { MenuControl } from "@/hooks/useMenuControl";
import useModalControl from "@/hooks/useModalControl";
import useAction from "@/lib/serverAction/useAction";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import { SetInput } from "../../set/components/SetForm";
import FolderForm from "./FolderForm";
import SA_UpdateFolder from "../actions/updateFolder";
import { Folder } from "../types";


const EditFolder: FC<{ folder: Folder, menuControl: MenuControl }> = ({ folder, menuControl }) => {

    const { action: editFolder } = useAction(SA_UpdateFolder, {
        200: { severity: "success", content: "Folder successfully edited 🙂" }
    })

    const modalControl = useModalControl()

    const submit: SubmitHandler<SetInput> = async (data) => {
        const res = await editFolder(folder._id, data)
        if (res.statusCode === 200) {
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
            <FolderForm
                modalControl={modalControl}
                onSubmit={submit}
                initValues={{ name: folder.name }}
                submitLabel="Edit"
                label="Edit folder"
            />
        </Fragment>

    )
}

export default EditFolder