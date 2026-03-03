"use client"

import { SetInput } from "@/features/set/types";
import useModalControl from "@/hooks/useModalControl";
import useAction from "@/lib/dal/useDal";
import { IconButtonGrey } from "@/lib/mui/styled";
import { Tooltip } from "@mui/material";
import { Edit2Icon } from "lucide-react";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import { updateFolder as updateFolderAction } from "../dal/mutations";
import { Folder } from "../types";
import FolderForm from "./FolderForm";


const EditFolder: FC<{ folder: Folder }> = ({ folder }) => {

    const { action: updateFolder } = useAction(updateFolderAction, {
        success: { severity: "success", content: "Mappa sikeresen szerkesztve 🙂" },
    })

    const modalControl = useModalControl()

    const submit: SubmitHandler<SetInput> = async (data) => {
        await updateFolder(folder.id, data)
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