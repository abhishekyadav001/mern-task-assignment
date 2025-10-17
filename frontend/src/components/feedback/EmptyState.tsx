import React from 'react'
import { Box, Typography } from '@mui/material'

interface EmptyStateProps {
    message: string
    icon?: React.ReactNode
}

export const EmptyState: React.FC<EmptyStateProps> = ({ message, icon }) => {
    return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
            {icon && (
                <Box sx={{ mb: 2, display: 'flex', justifyContent: 'center' }}>
                    {icon}
                </Box>
            )}
            <Typography sx={{ color: 'text.secondary', fontStyle: 'italic' }}>
                {message}
            </Typography>
        </Box>
    )
}
