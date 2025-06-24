"use client"

import SA_CreateSet from '@/features/set/actions/createSet';
import useModalControl from '@/hooks/useModalControl';
import { IconButtonGrey } from '@/lib/mui/styled';
import useAction from '@/lib/serverAction/useAction';
import { Button, Tooltip } from "@mui/material";
import { PlusIcon } from 'lucide-react';
import { useParams, useRouter } from "next/navigation";
import { FC, Fragment } from "react";
import { SubmitHandler } from "react-hook-form";
import SetForm, { SetInput } from "./SetForm";



const CreateSet: FC<{ variant?: "CTA" | "toolbar" }> = ({ variant = "CTA" }) => {

    const { folderid } = useParams<{ folderid: string }>()
    const router = useRouter()
    const modalControl = useModalControl()

    const { action: createSet } = useAction(SA_CreateSet, {
        200: { severity: "success", content: "Szógyűjtemény sikeresen létrehozva 🙂" }
    })

    const submit: SubmitHandler<SetInput> = async (data) => {


        const res = await createSet(data, folderid)

        if (res.statusCode === 200) {
            router.push(`/sets/${res.payload.id}`)
        }

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