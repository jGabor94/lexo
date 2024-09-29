"use client"

import SA_CreateSet from '@/lib/actions/set/createSet';
import useAction from '@/lib/assets/serverAction/useAction';
import useModalControl from '@/lib/hooks/useModalControl';
import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import SetForm, { SetInput } from "./SetForm";

const CreateSet: FC<ButtonProps> = (props) => {

    const { folderid } = useParams<{ folderid: string }>()
    const router = useRouter()
    const modalControl = useModalControl()

    const { action: createSet } = useAction(SA_CreateSet, {
        200: { severity: "success", content: "Set successfully created 🙂" }
    })

    const submit: SubmitHandler<SetInput> = async (data) => {

        const res = await createSet(data, folderid)

        if (res.statusCode === 200) {
            router.push(`/set/${res.payload._id}`)
        }

    }

    return (
        <Fragment>
            <Button variant="contained" onClick={modalControl.handleOpen} startIcon={<AddIcon sx={{ color: "primary.contrastText" }} />}
                {...props}>
                New Set
            </Button>
            <SetForm
                modalControl={modalControl}
                onSubmit={submit}
                initValues={{ name: "", preferredTermLang: "", preferredDefinitionLang: "" }}
                submitLabel="Create"
                label="Create set" />
        </Fragment >
    )
}

export default CreateSet