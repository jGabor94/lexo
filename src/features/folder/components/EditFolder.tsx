"use client"

import useModalControl from "@/hooks/useModalControl";
import { IconButtonGrey } from "@/lib/mui/styled";
import useAction from "@/lib/serverAction/useAction";
import { Tooltip } from "@mui/material";
import { Edit2Icon } from "lucide-react";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import { SetInput } from "../../set/components/SetForm";
import SA_UpdateFolder from "../actions/updateFolder";
import { Folder } from "../types";
import FolderForm from "./FolderForm";


const EditFolder: FC<{ folder: Folder }> = ({ folder }) => {

    const { action: editFolder } = useAction(SA_UpdateFolder, {
        200: { severity: "success", content: "Mappa sikeresen szerkesztve 🙂" }
    })

    const modalControl = useModalControl()

    const submit: SubmitHandler<SetInput> = async (data) => {
        await editFolder(folder.id, data)
    }

    return (
        <Fragment>
            <Tooltip title="Szerkesztés">
                <IconButtonGrey onClick={modalControl.handleOpen}>
                    <Edit2Icon />
                </IconButtonGrey>
            </Tooltip>

            <FolderForm
                modalControl={modalControl}
                onSubmit={submit}
                initValues={{ name: folder.name }}
                submitLabel="Szerkesztés"
                label="Mappa szerkesztése"
            />
        </Fragment>

    )
}

export default EditFolder