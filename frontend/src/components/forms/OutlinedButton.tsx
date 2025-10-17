import React from 'react'
import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'
import { outlinedButtonStyles } from '../../theme'

interface OutlinedButtonProps extends Omit<ButtonProps, 'sx'> {
    sx?: ButtonProps['sx']
}

export const OutlinedButton: React.FC<OutlinedButtonProps> = ({ sx, ...props }) => {
    return (
        <Button {...props} variant="outlined" sx={{ ...(outlinedButtonStyles as any), borderRadius: 2, ...(sx as any) }} />
    )
}
