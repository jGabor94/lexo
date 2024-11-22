'use client'

import LinearLoading from "@/components/LinearLoading";
import useSet from "@/features/set/hooks/useSet";
import SA_DeleteTerm from "@/features/term/actions/deleteTerm";
import SA_UpdateTerm from "@/features/term/actions/updateTerm";
import useAlert from "@/hooks/useAlert";
import useAction from "@/lib/serverAction/useAction";
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import SaveIcon from '@mui/icons-material/Save';
import { Box, Divider, IconButton, Stack, Tooltip, useTheme } from "@mui/material";
import { Dispatch, FC, Fragment, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { TermInput } from "../types";
import TermForm from "./TermForm";

const EditTerm: FC<{
    term: TermInput & { _id: string },
    setMode: Dispatch<SetStateAction<"read" | "edit">>,
}
> = ({ term: { _id: termid, ...term }, setMode }) => {

    const [loading, setLoading] = useState(false)

    const { mutate } = useSet()
    const { setAlert } = useAlert()

    const form = useForm<TermInput>({ defaultValues: term });

    const { action: updateTerm } = useAction(SA_UpdateTerm, {
        200: { severity: "success", content: "Update successfull 🙂" }
    })

    const submit: SubmitHandler<TermInput> = async (data) => {
        const res = await updateTerm(termid, data)
        if (res.statusCode === 200) {
            mutate()
            setMode("read")
        }
    }

    const handleDelete = async () => {
        setLoading(true)
        const res = await SA_DeleteTerm(termid)

        if (res.statusCode === 200) {
            mutate()
            setMode("read")
            setAlert({ severity: "success", content: "Update successfull 🙂" })
        } else {
            setAlert({ severity: "error", content: res.error })
        }

        setLoading(false)

    }

    const theme = useTheme()

    return <Fragment>
        <LinearLoading {...{ loading: loading || form.formState.isSubmitSuccessful }} />
        <Stack direction="row" gap={2} alignItems="center">
            <TermForm {...{ form, prefix: "" }} />
            <Divider flexItem orientation="vertical" />
            <Stack direction="row" sx={{ height: "fit-content" }}>
                <Tooltip title="Delete">
                    <Box>
                        <IconButton onClick={handleDelete} disabled={!form.formState.isValid || form.formState.isSubmitting || form.formState.isSubmitSuccessful || loading} >
                            <DeleteForeverIcon />
                        </IconButton >
                    </Box>
                </Tooltip>
                <Tooltip title="Save">
                    <Box>
                        <IconButton type="submit" onClick={form.handleSubmit(submit)} disabled={!form.formState.isValid || form.formState.isSubmitting || form.formState.isSubmitSuccessful || loading} >
                            <SaveIcon />
                        </IconButton >
                    </Box>
                </Tooltip>
            </Stack>
        </Stack>
    </Fragment>




};

export default EditTerm