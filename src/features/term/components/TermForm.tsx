"use client"

import { languages } from "@/constants/languages";
import langDetector from "@/lib/language_tools/langDetector";
import translate from "@/lib/language_tools/translate";
import ErrorOutlineOutlinedIcon from '@mui/icons-material/ErrorOutlineOutlined';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { Autocomplete, AutocompleteChangeReason, Box, FormControl, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography, debounce } from "@mui/material";
import { ChangeEvent, FC, useCallback, useState } from "react";
import { Controller, UseFieldArrayRemove, UseFormReturn } from "react-hook-form";
import { TermInput } from "../types";


const TermForm: FC<{ form: UseFormReturn<any, any, undefined>, remove?: UseFieldArrayRemove, prefix: string }> = ({ form: { control, getValues, setValue, }, prefix }) => {

    const prefixRaw = prefix.substring(0, prefix.length - 1)

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

        state[section].lang = lang
        state[section].content = [value]

        wrappedTtranslate({ ...state, [section]: { ...state[section], content: value } })


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
                            size="small"
                            {...field}
                            onChange={(e) => handleTextFieldChange(e, field.onChange)}
                            label="Term"
                        />

                    )
                } />

                <Controller control={control} name={`${prefix}term.lang`} render={
                    ({ field: { onChange, value } }) => (
                        <FormControl sx={{ width: "fit-content", ml: 1 }}>
                            <Select
                                disableUnderline
                                variant="standard"
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
                                label="Definition"
                                value={value}
                                InputProps={{
                                    ...params.InputProps,
                                    endAdornment: dropDownOpen ? (
                                        <KeyboardArrowUpIcon sx={{ position: "absolute", right: 0, m: 1, cursor: "pointer" }} onClick={() => setDropDownOpen(false)} />
                                    ) : (
                                        <KeyboardArrowDownIcon sx={{ position: "absolute", right: 0, m: 1, cursor: "pointer" }} onClick={() => setDropDownOpen(true)} />
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
                            <ErrorOutlineOutlinedIcon sx={{ color: "warning.main", width: 20, height: 20 }} />
                            <Typography color="warning.main" sx={{ fontSize: 12 }}>Press enter or type a comma to add.</Typography>
                        </Stack>
                    )}


                </Stack>


            </Stack>

        </Stack >


    )
}

export default TermForm