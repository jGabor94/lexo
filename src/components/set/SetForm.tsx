"use client"

import { languages } from "@/lib/data/languages"
import { ModalControl } from "@/lib/hooks/useModalControl"
import { FormControl, InputLabel, MenuItem, Modal, Select, Stack, TextField, Typography } from "@mui/material"
import { FC, Fragment } from "react"
import { Controller, SubmitHandler, useForm } from "react-hook-form"
import LinearLoading from "../LinearLoading"
import SubmitButton from "../SubmitButton"
import ModalOverlay from "../ui/modal"

export type SetInput = {
    name: string,
    preferredTermLang: string,
    preferredDefinitionLang: string
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
                                        <FormControl sx={{ width: "50%" }}>
                                            <InputLabel id="term-lang-label">Term lang</InputLabel>
                                            <Select
                                                {...field}
                                                labelId="term-lang-labe"
                                                label="Term lang"
                                            >
                                                {languages.map((lang) => (
                                                    <MenuItem key={lang.langCode} value={lang.langCode}>{lang.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

                                    )} />
                                <Controller control={control} rules={{ required: true }} name={`preferredDefinitionLang`} render={
                                    ({ field }) => (
                                        <FormControl sx={{ width: "50%" }}>
                                            <InputLabel id="term-lang-label">Definition lang</InputLabel>
                                            <Select
                                                {...field}
                                                labelId="term-lang-labe"
                                                label="Definition lang"
                                            >
                                                {languages.map((lang) => (
                                                    <MenuItem key={lang.langCode} value={lang.langCode}>{lang.name}</MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>

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