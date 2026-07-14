"use client"

import LinearLoading from '@/components/LinearLoading';
import ModalOverlay from '@/components/ui/ModalOverlay';
import useModalControl from '@/hooks/useModalControl';
import useDal from '@/lib/dal/useDal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, Modal, Stack } from "@mui/material";
import { useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createClass as createClassAction } from '../../dal/mutations';
import { ClassInputs } from '../../types';
import { classFormSchema } from '../../zod/schema';
import ClassForm from '../ClassForm';

const CreateClass: FC<{ CTA?: boolean }> = ({ CTA }) => {

    const router = useRouter()
    const modalControl = useModalControl()

    const form = useForm<ClassInputs>({
        mode: "all",
        resolver: zodResolver(classFormSchema)
    });

    const { action: createClass } = useDal(createClassAction, {
        alerts: {
            success: { severity: "success", content: "Osztály sikeresen létrehozva 🙂" },
        },
    })

    const submit: SubmitHandler<ClassInputs> = async (data) => {
        const res = await createClass(data)
        if (res.success) router.push(`/class/class/${res.data.id}`)
    }

    const closeModal = () => {
        modalControl.handleClose()
        form.reset()
    };

    return (
        <Fragment>
            {CTA
                ?
                <Button variant="contained" color="button" sx={{ width: "fit-content", fontSize: 20, fontWeight: 400 }} size="large" onClick={modalControl.handleOpen}>Osztály létrehozása</Button>
                :
                <Button variant="contained" color="primary" sx={{ borderRadius: 3 }}>
                    Letrehozas
                </Button>
            }

            <Modal
                open={modalControl.open}
                onClose={closeModal}
                keepMounted={true}
            >
                <form onSubmit={form.handleSubmit(submit)}>
                    <ModalOverlay width={500} onClose={closeModal}>
                        <LinearLoading {...{ loading: form.formState.isSubmitting }} />
                        <Stack gap={2}>
                            <ClassForm
                                form={form}
                                label="Osztály létrehozása" />
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

export default CreateClass
