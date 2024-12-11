"use client"

import { SortState } from '@/hooks/useSort';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { FormControl, MenuItem, Select, Stack } from '@mui/material';
import { FC } from 'react';

const Sort: FC<{ sortState: SortState<any> }> = ({ sortState: { reverse, setReverse, sorts, setSelectedSort } }) => {

    return (
        <Stack direction="row" alignItems="center" gap={1}>
            {reverse ? (
                <ArrowUpwardIcon sx={{ cursor: "pointer" }} onClick={() => setReverse(state => !state)} />
            ) : (
                <ArrowDownwardIcon sx={{ cursor: "pointer" }} onClick={() => setReverse(state => !state)} />
            )}
            <FormControl>
                <Select
                    onChange={(e) => setSelectedSort(Number(e.target.value))}
                    defaultValue={0}
                    size="small"
                    variant="standard"
                    disableUnderline
                    MenuProps={{
                        disableScrollLock: true
                    }}
                >{sorts.map((sort, index) => (
                    <MenuItem value={index} key={index}>{sort.label}</MenuItem>
                ))}
                </Select>
            </FormControl>
        </Stack>
    )
}

export default Sort