"use client"

import LinearLoading from '@/components/LinearLoading';
import ModalOverlay from '@/components/ui/ModalOverlay';
import { MenuControl } from '@/hooks/useMenuControl';
import useModalControl from '@/hooks/useModalControl';
import useDal from '@/lib/dal/useDal';
import { zodResolver } from '@hookform/resolvers/zod';
import { Button, ListItemIcon, ListItemText, MenuItem, Modal, Stack } from "@mui/material";
import { Edit2Icon } from 'lucide-react';
import { FC, Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateSet as updateSetAction } from '../dal/mutations';
import useSet from '../hooks/useSet';
import { SetInput } from '../types';
import { setFormSchema } from '../zod/schema';
import SetForm from "./SetForm";


const EditSet: FC<{ menuControl: MenuControl }> = ({ menuControl }) => {

    const modalControl = useModalControl()
    const { set, mutate } = useSet()

    const form = useForm<SetInput>({
        mode: "all",
        defaultValues: {
            name: set.name,
            preferredTermLang: set.preferredTermLang,
            preferredDefinitionLang: set.preferredDefinitionLang
        },
        resolver: zodResolver(setFormSchema)
    });

    const { action: updateSet, progress } = useDal(updateSetAction, {
        alerts: {
            success: { severity: "success", content: "Szógyújtemény sikeresen szerkesztve 🙂" }
        },
    })


    const submit: SubmitHandler<SetInput> = async (data) => {
        const error = await updateSet(set.id, data)
        if (!error) {
            mutate({ ...set, ...data })
            modalControl.handleClose()
            menuControl.handleClose()
        }
    }

    const closeModal = () => {
        modalControl.handleClose()
        form.reset()
    };



    return (
        <Fragment>
            <MenuItem onClick={modalControl.handleOpen}>
                <ListItemIcon>
                    <Edit2Icon size={20} />
                </ListItemIcon>
                <ListItemText>Szerkesztés</ListItemText>
            </MenuItem>
            <LinearLoading {...{ loading: form.formState.isSubmitting }} />
            <Modal
                open={modalControl.open}
                onClose={closeModal}
                keepMounted={true}
            >
                <ModalOverlay width={500} onClose={closeModal}>
                    <form onSubmit={form.handleSubmit(submit)}>

                        <Stack gap={2}>

                            <SetForm
                                form={form}
                                label="Edit set" />
                            <Button type="submit" variant="contained" disabled={!form.formState.isValid || progress} >
                                Szerkesztés
                            </Button>
                        </Stack>
                    </form >

                </ModalOverlay>
            </Modal >
        </Fragment>

    )
}

export default EditSet