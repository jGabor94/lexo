"use client"

import { default as MuiToggleButton, ToggleButtonProps } from '@mui/material/ToggleButton';
import { FC, MouseEvent, ReactNode, useContext } from 'react';
import { ToggleButtonContext } from './ToggleGroup';

interface Props extends ToggleButtonProps {
    children: ReactNode
    value: string
}

const ToggleButton: FC<Props> = ({ value, children, ...rest }) => {

    const { selected, setSelected, onChange } = useContext(ToggleButtonContext)

    const handleChange = (e: MouseEvent<HTMLElement>, value: any) => {
        if (selected === value) {
            setSelected(null);
            onChange(e, null)
        } else {
            setSelected(value);
            onChange(e, value)
        }
    }

    return (
        <MuiToggleButton
            {...rest}
            value={value}
            selected={selected === value}
            onChange={handleChange}
        >
            {children}
        </MuiToggleButton>


    )
}

export default ToggleButton