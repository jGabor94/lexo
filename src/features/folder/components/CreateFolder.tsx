"use client"

import { SetInput } from "@/features/set/types";
import useModalControl from "@/hooks/useModalControl";
import useAction from "@/lib/dal/useDal";
import { IconButtonGrey } from "@/lib/mui/styled";
import { ButtonProps, Tooltip } from "@mui/material";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import { createFolder as createFolderAction } from "../dal/mutations";
import FolderForm from "./FolderForm";


const CreateFolder: FC<ButtonProps> = (props) => {

    const router = useRouter()
    const modalControl = useModalControl()

    const { action: createFolder } = useAction(createFolderAction, {
        success: { severity: "success", content: "Mappa sikeresen létrehozva 🙂" },
    })

    const submit: SubmitHandler<SetInput> = async ({ name }) => {
        const res = await createFolder(name)
        if (res.success) {
            router.push(`/folders/${res.data.createdFolderId}`)
        }
    }

    return (
        <Fragment>
            <Tooltip title="Új mappa">
                <IconButtonGrey onClick={modalControl.handleOpen} >
                    <PlusIcon />
                </IconButtonGrey>
            </Tooltip>
            <FolderForm
                modalControl={modalControl}
                onSubmit={submit}
                initValues={{ name: "" }}
                submitLabel="Létrehozás"
                label="Mappa létrehozása" />
        </Fragment>
    )
}

export default CreateFolder