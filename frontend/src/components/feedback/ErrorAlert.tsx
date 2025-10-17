import React from 'react'
import { Paper, Alert } from '@mui/material'

interface ErrorAlertProps {
    message: string
    onClose?: () => void
}

export const ErrorAlert: React.FC<ErrorAlertProps> = ({ message, onClose }) => {
    return (
        <Paper sx={{ p: 3, textAlign: 'center', borderRadius: 3, border: '1px solid', borderColor: 'error.main' }}>
            <Alert severity="error" onClose={onClose}>
                {message}
            </Alert>
        </Paper>
    )
}
