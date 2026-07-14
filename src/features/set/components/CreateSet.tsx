"use client"

import LinearLoading from '@/components/LinearLoading';
import ModalOverlay from '@/components/ui/ModalOverlay';
import useModalControl from '@/hooks/useModalControl';
import useDal from '@/lib/dal/useDal';
import { IconButtonGrey } from '@/lib/mui/styled';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, Stack, Tooltip } from "@mui/material";
import { PlusIcon } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createSet as createSetAction } from '../dal/mutations';
import { SetInput } from '../types';
import { setFormSchema } from '../zod/schema';
import SetForm from "./SetForm";



const CreateSet: FC<{ variant?: "CTA" | "toolbar" }> = ({ variant = "CTA" }) => {

    const { folderid } = useParams<{ folderid: string }>()
    const router = useRouter()
    const modalControl = useModalControl()


    const form = useForm<SetInput>({
        mode: "all",
        resolver: zodResolver(setFormSchema)
    });

    const { action: createSet } = useDal(createSetAction, {
        alerts: {
            success: { severity: "success", content: "Szógyűjtemény sikeresen létrehozva 🙂" },
        },
    })

    const submit: SubmitHandler<SetInput> = async (data) => {
        const res = await createSet(data, folderid)

        if (res.success) router.push(`/sets/${res.data.id}`)
    }

    const closeModal = () => {
        modalControl.handleClose()
        form.reset()
    };

    return (
        <Fragment>
            {variant === "CTA" ? (
                <Button variant="contained" color="button" onClick={modalControl.handleOpen} sx={{ p: 0, height: "max", alignSelf: "stretch" }} >
                    <PlusIcon />
                </Button>
            ) : (
                <Tooltip title="Új szógyűjtemény"  >
                    <IconButtonGrey onClick={modalControl.handleOpen} >
                        <PlusIcon />
                    </IconButtonGrey>
                </Tooltip>
            )}
            <LinearLoading {...{ loading: form.formState.isSubmitting }} />
            <Modal
                open={modalControl.open}
                onClose={closeModal}
                keepMounted={true}
            >
                <form onSubmit={form.handleSubmit(submit)}>

                    <ModalOverlay width={500} onClose={closeModal}>
                        <Stack gap={2}>
                            <SetForm
                                form={form}
                                label="Szógyűjtemény létrehozása" />
                            <Button type="submit" variant="contained" disabled={!form.formState.isValid || form.formState.isSubmitting}>
                                Létrehozás
                            </Button>
                        </Stack>
                    </ModalOverlay>
                </form >

            </Modal >
        </Fragment>

    )
}

export default CreateSet