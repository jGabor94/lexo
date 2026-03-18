"use client"

import LinearLoading from "@/components/LinearLoading";
import SubmitButton from "@/components/SubmitButton";
import ModalOverlay from "@/components/ui/ModalOverlay";
import useModalControl from "@/hooks/useModalControl";
import useDal from "@/lib/dal/useDal";
import { IconButtonGrey } from "@/lib/mui/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { IconButtonProps, Modal, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { PlusIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { createFolder as createFolderAction } from "../dal/mutations";
import { FolderInput } from "../types";
import { folderFormSchema } from "../zod";


const CreateFolder: FC<IconButtonProps> = (props) => {

    const router = useRouter()
    const modalControl = useModalControl()

    const { action: createFolder } = useDal(createFolderAction, {
        alerts: {
            success: { severity: "success", content: "Mappa sikeresen létrehozva 🙂" },
        }
    })

    const { handleSubmit, formState, reset, register } = useForm<FolderInput>({
        mode: "all",
        resolver: zodResolver(folderFormSchema)
    });

    const closeModal = () => {
        modalControl.handleClose()
        reset()
    };

    const submit: SubmitHandler<FolderInput> = async ({ name }) => {
        const res = await createFolder(name)
        if (res.success) {
            router.push(`/folders/${res.data.createdFolderId}`)
        }
    }

    return (
        <Fragment>
            <Tooltip title="Új mappa">
                <IconButtonGrey onClick={modalControl.handleOpen} {...props} >
                    <PlusIcon />
                </IconButtonGrey>
            </Tooltip>
            <LinearLoading loading={formState.isSubmitting} />
            <Modal
                open={modalControl.open}
                onClose={closeModal}
                keepMounted={true}
            >
                <ModalOverlay width={500} onClose={closeModal}>
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack gap={2}>
                            <Typography fontSize={23}>Mappa létrehozása</Typography>
                            <TextField {...register("name")} label="Mappa neve" />
                            <SubmitButton variant="contained" formState={formState}>
                                Létrehozás
                            </SubmitButton>
                        </Stack>
                    </form>
                </ModalOverlay>
            </Modal >
        </Fragment>
    )
}

export default CreateFolder