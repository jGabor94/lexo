"use client"

import { languages } from "@/lib/data/languages"
import { ModalControl } from "@/lib/hooks/useModalControl"
import { Autocomplete, Modal, Stack, TextField, Typography } from "@mui/material"
import { FC, Fragment } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import LinearLoading from "../LinearLoading"
import SubmitButton from "../SubmitButton"
import ModalOverlay from "../ui/modal"

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
        <Fragment>
            <LinearLoading {...{ loading: formState.isSubmitting }} />
            <Modal
                open={modalControl.open}
                onClose={closeModal}
                keepMounted={true}
            >
                <ModalOverlay width={500} onClose={closeModal}>
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
                            <SubmitButton variant="contained" formState={formState}>
                                {submitLabel}
                            </SubmitButton>
                        </Stack>
                    </form>
                </ModalOverlay>
            </Modal >
        </Fragment>

    )
}

export default SetForm