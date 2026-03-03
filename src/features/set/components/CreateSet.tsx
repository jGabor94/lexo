"use client"

import useModalControl from '@/hooks/useModalControl';
import useDal from '@/lib/dal/useDal';
import { IconButtonGrey } from '@/lib/mui/styled';
import { Button, Tooltip } from "@mui/material";
import { PlusIcon } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import { createSet as createSetAction } from '../dal/mutations';
import { SetInput } from '../types';
import SetForm from "./SetForm";



const CreateSet: FC<{ variant?: "CTA" | "toolbar" }> = ({ variant = "CTA" }) => {

    const { folderid } = useParams<{ folderid: string }>()
    const router = useRouter()
    const modalControl = useModalControl()

    const { action: createSet } = useDal(createSetAction, {
        success: { severity: "success", content: "Szógyűjtemény sikeresen létrehozva 🙂" },
        fallbackError: (e) => ({ severity: "error", content: e.error.type })
    })

    const submit: SubmitHandler<SetInput> = async (data) => {
        const res = await createSet(data, folderid)
        if (res.success) router.push(`/sets/${res.data.id}`)
    }

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

            <SetForm
                modalControl={modalControl}
                onSubmit={submit}
                submitLabel="Létrehozás"
                label="Szógyűjtemény létrehozása" />
        </Fragment >
    )
}

export default CreateSet