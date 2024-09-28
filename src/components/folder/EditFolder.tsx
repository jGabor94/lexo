"use client"

import SA_UpdateFolder from "@/lib/actions/folder/updateFolder";
import useAction from "@/lib/assets/serverAction/useAction";
import { Folder } from "@/lib/database/queries/getFolder";
import { MenuControl } from "@/lib/hooks/useMenuControl";
import useModalControl from "@/lib/hooks/useModalControl";
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import { ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import { SetInput } from "../set/SetForm";
import FolderForm from "./FolderForm";


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