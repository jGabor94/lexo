"use client"

import LinearLoading from "@/components/LinearLoading";
import ModalOverlay from "@/components/ui/ModalOverlay";
import useModalControl from "@/hooks/useModalControl";
import useDal from "@/lib/dal/useDal";
import { IconButtonGrey } from "@/lib/mui/styled";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button, Modal, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { Edit2Icon } from "lucide-react";
import { FC, Fragment } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { updateFolder as updateFolderAction } from "../dal/mutations";
import useFolder from "../hooks";
import { FolderInput } from "../types";
import { folderFormSchema } from "../zod";


const UpdateFolder: FC = () => {

    const { action: updateFolder } = useDal(updateFolderAction, {
        alerts: {
            success: { severity: "success", content: "Mappa sikeresen szerkesztve 🙂" },
        }
    })

    const { folder, mutate } = useFolder()

    const modalControl = useModalControl()

    const { handleSubmit, formState, reset, register } = useForm<FolderInput>({
        mode: "all",
        defaultValues: folder,
        resolver: zodResolver(folderFormSchema)
    });


    const submit: SubmitHandler<FolderInput> = async (data) => {
        await updateFolder(folder.id, data)
        mutate({ ...folder, ...data })
        reset(data)
        modalControl.handleClose()
    }

    return (
        <Fragment>
            <Tooltip title="Szerkesztés">
                <IconButtonGrey onClick={modalControl.handleOpen}>
                    <Edit2Icon />
                </IconButtonGrey>
            </Tooltip>

            <LinearLoading loading={formState.isSubmitting} />
            <Modal
                open={modalControl.open}
                onClose={modalControl.handleClose}
                keepMounted={true}
            >
                <ModalOverlay width={500} onClose={modalControl.handleClose}>
                    <form onSubmit={handleSubmit(submit)}>
                        <Stack gap={2}>
                            <Typography fontSize={23}>Mappa szerkesztése</Typography>
                            <TextField {...register("name")} label="Mappa neve" />
                            <Button type="submit" variant="contained" disabled={formState.isSubmitting || !formState.isValid}>
                                Szerkesztés
                            </Button>
                        </Stack>
                    </form>
                </ModalOverlay>
            </Modal >
        </Fragment>

    )
}

export default UpdateFolder