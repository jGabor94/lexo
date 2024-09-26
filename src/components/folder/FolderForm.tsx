"use client"

import { ModalControl } from "@/lib/hooks/useModalControl";
import { Box, Modal, Paper, Stack, TextField, Typography } from "@mui/material";
import { FC, Fragment } from "react";
import { Controller, SubmitHandler, useForm } from "react-hook-form";
import LinearLoading from "../LinearLoading";
import SubmitButton from "../SubmitButton";

interface props {
    modalControl: ModalControl,
    initValues: { name: string },
    onSubmit: SubmitHandler<any>,
    submitLabel: string,
    label: string
}

const FolderForm: FC<props> = ({ modalControl, initValues, onSubmit, submitLabel, label }) => {

    const { handleSubmit, formState, reset, control } = useForm<typeof initValues>({ mode: "all", defaultValues: initValues });

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
                                    <TextField {...field} label="Folder name" />
                                )} />
                            <SubmitButton variant="contained" formState={formState}>
                                {submitLabel}
                            </SubmitButton>
                        </Stack>
                    </form>
                </Box>
            </Modal >
        </Fragment>

    )
}

export default FolderForm