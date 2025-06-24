'use client'

import LinearLoading from "@/components/LinearLoading";
import useSet from "@/features/set/hooks/useSet";
import SA_DeleteTerm from "@/features/term/actions/deleteTerm";
import SA_UpdateTerm from "@/features/term/actions/updateTerm";
import useAlert from "@/hooks/useAlert";
import useAction from "@/lib/serverAction/useAction";
import { Box, Divider, IconButton, Stack, Tooltip } from "@mui/material";
import { SaveIcon, TrashIcon } from "lucide-react";
import { Dispatch, FC, SetStateAction, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Term, TermInput } from "../types";
import TermForm from "./TermForm";

const EditTerm: FC<{
    term: Term,
    setMode: Dispatch<SetStateAction<"read" | "edit">>,
}
> = ({ term: { id: termid, ...term }, setMode }) => {

    const [loading, setLoading] = useState(false)

    const { mutate } = useSet()
    const { setAlert } = useAlert()

    const form = useForm<TermInput>({ defaultValues: term });

    const { action: updateTerm } = useAction(SA_UpdateTerm, {
        200: { severity: "success", content: "Kifejezés sikeresen szerkesztve 🙂" }
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

    return <form onSubmit={form.handleSubmit(submit)}>

        <LinearLoading {...{ loading: loading || form.formState.isSubmitSuccessful }} />
        <Stack direction="row" gap={2} alignItems="center">
            <TermForm {...{ form, prefix: "" }} />
            <Divider flexItem orientation="vertical" />
            <Stack direction="row" sx={{ height: "fit-content" }}>
                <Tooltip title="Törlés">
                    <Box>
                        <IconButton onClick={handleDelete} disabled={!form.formState.isValid || form.formState.isSubmitting || form.formState.isSubmitSuccessful || loading} >
                            <TrashIcon />
                        </IconButton >
                    </Box>
                </Tooltip>
                <Tooltip title="Mentés">
                    <Box>
                        <IconButton type="submit" disabled={!form.formState.isValid || form.formState.isSubmitting || form.formState.isSubmitSuccessful || loading} >
                            <SaveIcon />
                        </IconButton >
                    </Box>
                </Tooltip>
            </Stack>
        </Stack>
    </form>




};

export default EditTerm