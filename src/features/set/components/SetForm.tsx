"use client"

import { languages } from "@/features/term/lib/constants"
import { FormControl, InputLabel, MenuItem, Select, Stack, TextField, Typography } from "@mui/material"
import { FC, Fragment } from "react"
import { Controller, UseFormReturn } from "react-hook-form"
import { SetInput } from "../types"

const SetForm: FC<{
    form: UseFormReturn<SetInput, any, any>,
    label: string,
}> = ({ form, label }) => {

    return (

        <Fragment>
            <Typography fontSize={23}>{label}</Typography>

            <TextField {...form.register("name", { required: true })} label="Szógűjtemény neve" />

            <Stack direction="row" gap={3}>
                <Controller control={form.control} rules={{ required: true }} name={`preferredTermLang`} render={
                    ({ field }) => (
                        <FormControl sx={{ width: "50%" }}>
                            <InputLabel id="term-lang-label">Kifejezés nyelve</InputLabel>
                            <Select
                                {...field}
                                value={field.value || ""}
                                labelId="term-lang-labe"
                                label="Term lang"
                            >
                                {languages.map((lang) => (
                                    <MenuItem key={lang.langCode} value={lang.langCode}>{lang.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    )} />
                <Controller control={form.control} rules={{ required: true }} name={`preferredDefinitionLang`} render={
                    ({ field }) => (
                        <FormControl sx={{ width: "50%" }}>
                            <InputLabel id="term-lang-label">Definíció nyelve</InputLabel>
                            <Select
                                {...field}
                                value={field.value || ""}
                                labelId="term-lang-labe"
                                label="Definition lang"
                            >
                                {languages.map((lang) => (
                                    <MenuItem key={lang.langCode} value={lang.langCode}>{lang.name}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>

                    )} />
            </Stack>

        </Fragment>


    )
}

export default SetForm