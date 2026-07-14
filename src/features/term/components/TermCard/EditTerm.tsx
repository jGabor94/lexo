'use client'

import useSet from "@/features/set/hooks/useSet";
import useDal from "@/lib/dal/useDal";
import { zodResolver } from "@hookform/resolvers/zod";
import { Close } from "@mui/icons-material";
import EditIcon from '@mui/icons-material/Edit';
import SaveIcon from '@mui/icons-material/Save';
import { Button, Chip, Stack } from "@mui/material";
import { Dispatch, FC, SetStateAction } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateTerm as updateTermAction } from "../../dal/mutations";
import { Term, TermInput } from "../../types";
import { termFormSchema } from "../../zod/schema";
import TermForm from "./TermForm";

const EditTerm: FC<{
    term: Term,
    setMode: Dispatch<SetStateAction<"read" | "edit">>,
    statusColor: string,
}
> = ({ term: { id: termid, ...term }, setMode, statusColor }) => {


    const { set, mutate } = useSet()

    const form = useForm<TermInput>({
        defaultValues: term,
        resolver: zodResolver(termFormSchema)
    });

    const { action: updateTerm } = useDal(updateTermAction, {
        alerts: {
            success: { severity: "success", content: "Kifejezés sikeresen szerkesztve 🙂" }
        }
    })


    const submit: SubmitHandler<TermInput> = async (data) => {
        const error = await updateTerm(termid, data)
        if (!error) {
            mutate({ ...set, terms: set.terms.map(term => term.id !== termid ? term : { ...term, ...data }) })
            setMode("read")
        }

    }

    const handleCancel = () => {
        setMode("read")
    }

    return <form onSubmit={form.handleSubmit(submit)}>

        <Stack gap={2} >
            <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                mb={2}
            >
                <Chip icon={<EditIcon sx={{ fontSize: 16 }} />} variant="filled" size="small" label="Szerkesztés" sx={{
                    background: statusColor,
                    color: "white",
                    fontWeight: 600,
                    "& .MuiChip-icon": { color: "white" },
                }} />
            </Stack>

            <TermForm {...{ form, prefix: "" }} />
            <Stack direction="row" sx={{ height: "fit-content", alignSelf: "end" }} gap={1}>

                <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="flex-end"
                >
                    <Button
                        variant="outlined"
                        size="small"
                        startIcon={<Close />}
                        onClick={handleCancel}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                        }}
                    >
                        Mégse
                    </Button>
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<SaveIcon />}
                        type="submit"
                        disabled={form.formState.isSubmitting || !form.formState.isValid}
                        sx={{
                            textTransform: "none",
                            borderRadius: 2,
                            background: statusColor,

                        }}
                    >
                        Mentés
                    </Button>
                </Stack>
            </Stack>
        </Stack>
    </form >




};

export default EditTerm