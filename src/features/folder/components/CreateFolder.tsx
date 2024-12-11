"use client"

import { SetInput } from "@/features/set/components/SetForm";
import useModalControl from "@/hooks/useModalControl";
import useAction from "@/lib/serverAction/useAction";
import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import SA_CreateFolder from "../actions/createFolder";
import FolderForm from "./FolderForm";


const CreateFolder: FC<ButtonProps> = (props) => {

    const router = useRouter()
    const modalControl = useModalControl()

    const { action: createFolder } = useAction(SA_CreateFolder, {
        200: { severity: "success", content: "Folder successfully created 🙂" }
    })

    const submit: SubmitHandler<SetInput> = async ({ name }) => {
        const res = await createFolder(name)
        if (res.statusCode === 200) {
            router.push(`/folders/${res.payload.id}`)
        }
    }

    return (
        <Fragment>
            <Button variant="contained" onClick={modalControl.handleOpen} startIcon={<AddIcon sx={{
                color: "primary.contrastText"
            }} />}
                {...props}
            >
                New Folder
            </Button>
            <FolderForm
                modalControl={modalControl}
                onSubmit={submit}
                initValues={{ name: "" }}
                submitLabel="Create"
                label="Create folder" />
        </Fragment>
    )
}

export default CreateFolder