"use client"

import { TextField, Typography } from "@mui/material"
import { FC, Fragment } from "react"
import { UseFormReturn } from "react-hook-form"
import { ClassInputs } from "../types"




const ClassForm: FC<{
    form: UseFormReturn<ClassInputs, any, any>,
    label: string,
}> = ({ form, label }) => (
    <Fragment>
        <Typography fontSize={23}>{label}</Typography>
        <TextField {...form.register("name")} label="Osztály neve" />
        <TextField {...form.register("description")} multiline rows={4} label="Osztály leírása" />
    </Fragment>

)


export default ClassForm