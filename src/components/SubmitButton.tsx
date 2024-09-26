import { Button, ButtonProps } from '@mui/material'
import { FC, ReactNode } from 'react'
import { FormState } from 'react-hook-form'

interface props extends ButtonProps {
    formState: FormState<any>,
    children: ReactNode
}

const SubmitButton: FC<props> = ({ formState, children, ...muiButtonProps }) => (
    <Button
        type="submit"
        disabled={!formState.isValid || formState.isSubmitting || formState.isSubmitSuccessful}
        {...muiButtonProps}
    >
        {children}
    </Button>
)


export default SubmitButton