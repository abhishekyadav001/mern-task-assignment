import React from 'react'
import { TextField } from '@mui/material'
import type { TextFieldProps } from '@mui/material'
import { inputStyles } from '../../theme'

interface FormTextFieldProps extends Omit<TextFieldProps, 'sx'> {
    sx?: TextFieldProps['sx']
}

export const FormTextField: React.FC<FormTextFieldProps> = ({ sx, ...props }) => {
    return (
        <TextField {...props} sx={{ ...(inputStyles as any), ...(sx as any) }} />
    )
}
