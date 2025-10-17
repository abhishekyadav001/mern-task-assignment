import React from 'react'
import { Paper, Typography, CircularProgress, Box } from '@mui/material'

interface LoadingProps {
    message?: string
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading...' }) => {
    return (
        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 2 }}>
                <CircularProgress size={24} />
                <Typography>{message}</Typography>
            </Box>
        </Paper>
    )
}
