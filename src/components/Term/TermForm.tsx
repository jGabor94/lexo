"use client"

import langDetector from "@/lib/assets/language_tools/langDetector";
import translate from "@/lib/assets/language_tools/translate";
import { languages } from "@/lib/data/languages";
import { ITerm } from "@/lib/database/types";
import { Autocomplete, AutocompleteChangeReason, Box, FormControl, NativeSelect, Stack, TextField, Typography, debounce } from "@mui/material";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { Controller, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";


const TermForm: FC<{ form: UseFormReturn<any, any, undefined>, remove?: UseFieldArrayRemove, prefix: string }> = ({ form: { control, getValues, setValue }, prefix }) => {

    const prefixRaw = prefix.substring(0, prefix.length - 1)

    const [options, setOptions] = useState<Array<string>>([]);

    const wrappedTtranslate = async ({ term, definition }: ITerm) => {
        if (definition.lang && term.lang && term.content && (term.lang !== definition.lang)) {
            const res = await translate(term.lang, definition.lang, term.content)
            setOptions(res.translations);
        }
    }

    const change = async (value: string, section: "term" | "definition") => {
        const state = prefixRaw ? { ...getValues(prefixRaw) } : { ...getValues() };
        const lang = await langDetector(value);
        setValue(`${prefix}${section}.lang`, lang)

        state[section].lang = lang
        state[section].content = value

        wrappedTtranslate(state)


    }

    const debounceChange = useCallback(
        debounce(async (value, section) => change(value, section), 1000),
        []
    );

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, onChange: (...event: any[]) => void) => {
        onChange(e)
        if (e.target.value) debounceChange(e.target.value, "term")
    }

    const handleSelectChange = async (e: ChangeEvent<HTMLSelectElement>, onChange: (...event: any[]) => void) => {
        onChange(e)
        const state = prefixRaw ? { ...getValues(prefixRaw) } : { ...getValues() };
        state.definition.lang = e.target.value
        wrappedTtranslate(state)
    }

    const handleAutoCompleteChange = (newValue: Array<string>, reason: AutocompleteChangeReason, onChange: (...event: any[]) => void) => {
        onChange(newValue)
        if (reason === "createOption" && newValue.length === 1) change(newValue[0], "definition")
    }

    return (
        <Stack sx={{
            width: "100%",
            flexDirection: { xs: "column", sm: "row" },
            gap: { xs: 2, sm: 3 },
        }}>
            <Stack sx={{ gap: 0.5, flexBasis: 1, flexGrow: 1 }}>
                <Controller control={control} rules={{ required: true }} name={`${prefix}term.content`} render={
                    ({ field, fieldState: { error } }) => (
                        <TextField

                            size="small"
                            {...field}
                            inputProps={{ section: "term" }}
                            onChange={(e) => handleTextFieldChange(e, field.onChange)}
                            label="Term"
                            error={error ? true : false} />

                    )
                } />

                <Controller control={control} rules={{ required: true }} name={`${prefix}term.lang`} render={
                    ({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormControl sx={{ width: "fit-content", ml: 1 }}>
                            <NativeSelect
                                disableUnderline
                                error={error ? true : false}
                                size="small"
                                value={value}
                                onChange={onChange}
                                inputProps={{
                                    IconComponent: () => null,
                                    name: "term",
                                }}
                            >
                                {
                                    languages.map((lang) => (
                                        <option key={lang.langCode} value={lang.langCode}>{lang.name}</option>
                                    ))
                                }
                            </NativeSelect >
                        </FormControl >
                    )} />

            </Stack >

            <Stack sx={{ gap: 0.5, flexBasis: 1, flexGrow: 1 }}>
                <Controller control={control} rules={{ required: true }} name={`${prefix}definition.content`} render={
                    ({ field: { onChange, value }, fieldState: { error } }) => (
                        <Autocomplete
                            size="small"
                            multiple
                            freeSolo
                            options={options}
                            noOptionsText=""
                            value={[...value]}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (
                                <TextField {...params} error={error ? true : false} label="Definition" value={value} fullWidth />
                            )}
                            onChange={(e, newValue, reason) => handleAutoCompleteChange(newValue, reason, onChange)}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} key={option}>
                                    <Typography>{option}</Typography>
                                </Box>
                            )}
                        />
                    )} />

                <Controller control={control} rules={{ required: true }} name={`${prefix}definition.lang`} render={
                    ({ field: { onChange, value }, fieldState: { error } }) => (
                        <FormControl sx={{ width: "fit-content", ml: 1 }}>
                            <NativeSelect
                                disableUnderline
                                error={error ? true : false}
                                size="small"
                                value={value}
                                inputProps={{
                                    IconComponent: () => null,
                                    name: 'definition',
                                }}
                                onChange={(e) => handleSelectChange(e, onChange)}
                            >
                                {languages.map((lang) => (
                                    <option key={lang.langCode} value={lang.langCode}>{lang.name}</option>
                                ))}

                            </NativeSelect>
                        </FormControl>
                    )} />

            </Stack>

        </Stack >


    )
}

export default TermForm