"use client"

import { ModalControl } from "@/lib/hooks/useModalControl";
import { Modal, Stack, TextField, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LinearLoading from "../LinearLoading";
import SubmitButton from "../SubmitButton";
import ModalOverlay from "../ui/modal";

export type FolderInput = {
    name: string
}

interface props {
    modalControl: ModalControl,
    initValues: FolderInput,
    onSubmit: SubmitHandler<any>,
    submitLabel: string,
    label: string
}

const FolderForm: FC<props> = ({ modalControl, initValues, onSubmit, submitLabel, label }) => {

    const { handleSubmit, formState, reset, control } = useForm<FolderInput>({ mode: "all", defaultValues: initValues });

    const closeModal = () => {
        modalControl.handleClose()
        reset()
    };


    return (
        <Fragment>
            <LinearLoading loading={formState.isSubmitting} />
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
                                    <TextField {...field} label="Folder name" />
                                )} />
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

export default FolderForm