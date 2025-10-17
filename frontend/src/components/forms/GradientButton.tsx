import React from 'react'
import { Button } from '@mui/material'
import type { ButtonProps } from '@mui/material'
import { gradientButtonStyles } from '../../theme'

interface GradientButtonProps extends Omit<ButtonProps, 'sx'> {
    sx?: ButtonProps['sx']
}

export const GradientButton: React.FC<GradientButtonProps> = ({ sx, ...props }) => {
    return (
        <Button {...props} sx={{ ...(gradientButtonStyles as any), borderRadius: 2, ...(sx as any) }} />
    )
}
