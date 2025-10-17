import React from 'react'
import { Paper } from '@mui/material'
import type { PaperProps } from '@mui/material'
import { sectionCardStyles } from '../../theme'

interface SectionCardProps extends Omit<PaperProps, 'sx'> {
    sx?: PaperProps['sx']
}

export const SectionCard: React.FC<SectionCardProps> = ({ sx, ...props }) => {
    return (
        <Paper {...props} sx={{ ...(sectionCardStyles as any), ...(sx as any) }} />
    )
}
