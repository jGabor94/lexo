"use client"

import SA_CreateFolder from "@/lib/actions/folder/createFolder";
import useAction from "@/lib/assets/serverAction/useAction";
import useModalControl from "@/lib/hooks/useModalControl";
import AddIcon from '@mui/icons-material/Add';
import { Button } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import FolderForm from "./FolderForm";

type Input = { name: string }

const CreateFolder: FC<{}> = () => {

    const router = useRouter()
    const modalControl = useModalControl()

    const { action: createFolder } = useAction(SA_CreateFolder, {
        200: { severity: "success", content: "Folder successfully created 🙂" }
    })

    const submit: SubmitHandler<Input> = async ({ name }) => {
        const res = await createFolder(name)
        if (res.statusCode === 200) {
            router.push(`/folders/${res.payload._id}`)
        }
    }

    return (
        <Fragment>
            <Button variant="contained" onClick={modalControl.handleOpen} startIcon={<AddIcon />} >
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