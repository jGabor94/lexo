"use client"

import { SetInput } from "@/features/set/components/SetForm";
import useModalControl from "@/hooks/useModalControl";
import { IconButtonGrey } from "@/lib/mui/styled";
import useAction from "@/lib/serverAction/useAction";
import { ButtonProps, Tooltip } from "@mui/material";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import SA_CreateFolder from "../actions/createFolder";
import FolderForm from "./FolderForm";


const CreateFolder: FC<ButtonProps> = (props) => {

    const router = useRouter()
    const modalControl = useModalControl()

    const { action: createFolder } = useAction(SA_CreateFolder, {
        200: { severity: "success", content: "Mappa sikeresen létrehozva 🙂" }
    })

    const submit: SubmitHandler<SetInput> = async ({ name }) => {
        const res = await createFolder(name)
        if (res.statusCode === 200) {
            router.push(`/folders/${res.payload.id}`)
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