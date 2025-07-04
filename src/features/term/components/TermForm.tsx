"use client"

import { Autocomplete, AutocompleteChangeReason, Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, debounce, useTheme } from "@mui/material";
import { ChevronDown, ChevronUp, CircleAlert } from 'lucide-react';
import { ChangeEvent, FC, useCallback, useState } from "react";
import { Controller, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { languages } from '../lib/constants';
import { TermInput } from "../types";
import langDetector from "../utils/langDetector";
import translate from "../utils/translate";


const TermForm: FC<{ form: UseFormReturn<any, any, undefined>, remove?: UseFieldArrayRemove, prefix: string }> = ({ form: { control, getValues, setValue, }, prefix }) => {

    const prefixRaw = prefix.substring(0, prefix.length - 1)

    const theme = useTheme();

    const [options, setOptions] = useState<Array<string>>([]);
    const [definitionInputValue, setDefinitionInputValue] = useState("")
    const [dropDownOpen, setDropDownOpen] = useState(false)

    const wrappedTtranslate = async ({ term, definition }: TermInput) => {
        if (definition.lang && term.lang && term.content && (term.lang !== definition.lang)) {
            const res = await translate(term.lang, definition.lang, term.content)
            setOptions(res.translations);
        }
    }

    const change = async (value: string, section: "term" | "definition") => {
        const state = prefixRaw ? { ...getValues(prefixRaw) } : { ...getValues() };
        const lang = await langDetector(value);
        setValue(`${prefix}${section}.lang`, lang)

        wrappedTtranslate({ ...state, [section]: { lang: lang, content: section === "term" ? value : [value] } })
    }

    const debounceChange = useCallback(
        debounce(async (value, section) => change(value, section), 1000),
        []
    );

    const handleTextFieldChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, onChange: (...event: any[]) => void) => {
        onChange(e)
        if (e.target.value) debounceChange(e.target.value, "term")
    }

    const handleSelectChange = async (e: SelectChangeEvent<any>, onChange: (...event: any[]) => void) => {
        onChange(e)
        const state = prefixRaw ? { ...getValues(prefixRaw) } : { ...getValues() };
        state.definition.lang = e.target.value
        wrappedTtranslate(state)
    }

    const handleAutoCompleteChange = (newValue: Array<string>, reason: AutocompleteChangeReason, onChange: (...event: any[]) => void) => {
        onChange(newValue)
        setDropDownOpen(false)
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
                    ({ field }) => (
                        <TextField
                            {...field}
                            size="small"
                            onChange={(e) => handleTextFieldChange(e, field.onChange)}
                            label="Kifejezés"
                        />

                    )
                } />

                <Controller control={control} name={`${prefix}term.lang`} render={
                    ({ field: { onChange, value } }) => (
                        <FormControl sx={{ width: "fit-content", ml: 1 }}>
                            <Select
                                disableUnderline
                                variant="standard"
                                value={value}
                                onChange={onChange}
                                inputProps={{
                                    IconComponent: () => null,
                                    name: "term",
                                }}
                            >
                                {
                                    languages.map((lang) => (
                                        <MenuItem key={lang.langCode} value={lang.langCode}>{lang.name}</MenuItem>
                                    ))
                                }
                            </Select >
                        </FormControl >
                    )} />

            </Stack >
            <Stack sx={{ gap: 0.5, flexBasis: 1, flexGrow: 1 }}>
                <Controller control={control} rules={{
                    validate: (value) => value.length > 0 || definitionInputValue
                }} name={`${prefix}definition.content`} render={
                    ({ field: { onChange, value } }) => (
                        <Autocomplete
                            size="small"
                            multiple
                            freeSolo
                            open={dropDownOpen}
                            options={options}
                            noOptionsText=""
                            value={[...value]}
                            inputValue={definitionInputValue}
                            getOptionLabel={(option) => option}
                            renderInput={(params) => (<TextField
                                {...params}
                                onBlur={() => setDropDownOpen(false)}
                                onClick={() => setDropDownOpen(!dropDownOpen)}
                                label="Definíció"
                                value={value}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: dropDownOpen ? (
                                        <ChevronUp style={{ position: "absolute", right: 0, margin: 8, cursor: "pointer" }} onClick={() => setDropDownOpen(false)} />
                                    ) : (
                                        <ChevronDown style={{ position: "absolute", right: 0, margin: 8, cursor: "pointer" }} onClick={() => setDropDownOpen(true)} />
                                    )
                                }} fullWidth />
                            )
                            }
                            onChange={(e, newValue, reason) => {
                                handleAutoCompleteChange(newValue, reason, onChange)
                            }}
                            onInputChange={(e, current) => {
                                if (current.endsWith(",")) {
                                    if (current.length > 1) {
                                        onChange([...value, current.slice(0, -1)])
                                    }
                                    setDefinitionInputValue("")
                                } else {
                                    setDefinitionInputValue(current)
                                }
                            }}
                            renderOption={(props, option) => (
                                <Box component="li" {...props} key={option} >
                                    <Typography>{option}</Typography>
                                </Box>
                            )}
                        />
                    )} />
                <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Controller control={control} name={`${prefix}definition.lang`} render={
                        ({ field: { onChange, value } }) => (
                            <FormControl sx={{ width: "fit-content", ml: 1 }}>
                                <Select
                                    disableUnderline
                                    variant="standard"
                                    size="small"
                                    value={value}
                                    inputProps={{
                                        IconComponent: () => null,
                                        name: 'definition',
                                    }}
                                    onChange={(e) => handleSelectChange(e, onChange)}
                                >
                                    {languages.map((lang) => (
                                        <MenuItem key={lang.langCode} value={lang.langCode} >

                                            {lang.name}
                                        </MenuItem>
                                    ))}

                                </Select>
                            </FormControl>
                        )} />
                    {definitionInputValue && (
                        <Stack direction="row" gap={0.5} alignItems="center">
                            <CircleAlert size={20} style={{ color: theme.vars.palette.warning.main }} />
                            <Typography color="warning.main" sx={{ fontSize: 12 }}>Nyomj entert vagy gépelj vesszőt a hozzáadáshoz.</Typography>
                        </Stack>
                    )}


                </Stack>


            </Stack>

        </Stack >


    )
}

export default TermForm