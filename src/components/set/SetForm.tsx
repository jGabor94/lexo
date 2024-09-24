"use client"

import { languages } from "@/lib/data/languages"
import { ModalControl } from "@/lib/hooks/useModalControl"
import { Autocomplete, Box, Button, Modal, Paper, Stack, TextField, Typography } from "@mui/material"
import { FC } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"

export type SetInput = {
    name: string,
    preferredTermLang: { langCode: string, name: string } | null,
    preferredDefinitionLang: { langCode: string, name: string } | null
}

interface props {
    modalControl: ModalControl,
    initValues: SetInput,
    onSubmit: SubmitHandler<any>,
    submitLabel: string,
    label: string
}

const SetForm: FC<props> = ({ modalControl, initValues, onSubmit, submitLabel, label }) => {

    const { handleSubmit, formState, reset, control } = useForm<SetInput>({ mode: "all", defaultValues: initValues });

    const closeModal = () => {
        modalControl.handleClose()
        reset()
    };

    return (
        <Modal
            open={modalControl.open}
            onClose={closeModal}
            keepMounted={true}
        >
            <Box component={Paper} sx={{
                boxShadow: 10,
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 500,
                maxWidth: "95%",
                outline: "none",
                p: 3
            }}>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <Stack gap={2}>
                        <Typography fontSize={23}>{label}</Typography>
                        <Controller control={control} rules={{ required: true }} name={`name`} render={
                            ({ field }) => (
                                <TextField {...field} label="Set name" />
                            )} />

                        <Stack direction="row" gap={3}>
                            <Controller control={control} rules={{ required: true }} name={`preferredTermLang`} render={
                                ({ field }) => (
                                    <Autocomplete
                                        value={field.value}
                                        disablePortal
                                        options={languages}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => option.langCode === value.langCode}
                                        onChange={(event: any, newValue: { langCode: string, name: string } | null) => {
                                            field.onChange(newValue)
                                        }}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Term language" />}
                                    />
                                )} />
                            <Controller control={control} rules={{ required: true }} name={`preferredDefinitionLang`} render={
                                ({ field }) => (
                                    <Autocomplete
                                        value={field.value}
                                        disablePortal
                                        options={languages}
                                        getOptionLabel={(option) => option.name}
                                        isOptionEqualToValue={(option, value) => option.langCode === value.langCode}
                                        onChange={(event: any, newValue: { langCode: string, name: string } | null) => {
                                            field.onChange(newValue)
                                        }}
                                        sx={{ width: 300 }}
                                        renderInput={(params) => <TextField {...params} label="Definition language" />}
                                    />
                                )} />
                        </Stack>

                        <Button variant="contained" type="submit" disabled={!formState.isValid ? true : false}>{submitLabel}</Button>
                    </Stack>
                </form>
            </Box>
        </Modal >
    )
}

export default SetForm