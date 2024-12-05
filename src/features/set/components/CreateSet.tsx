"use client"

import SA_CreateSet from '@/features/set/actions/createSet';
import useModalControl from '@/hooks/useModalControl';
import useAction from '@/lib/serverAction/useAction';
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
            router.push(`/sets/${res.payload.id}`)
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
                submitLabel="Create"
                label="Create set" />
        </Fragment >
    )
}

export default CreateSet