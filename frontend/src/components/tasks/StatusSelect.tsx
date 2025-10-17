import React from 'react'
import { MenuItem } from '@mui/material'
import type { Task } from '../../types'
import { FormTextField } from '../forms/FormTextField'

interface StatusSelectProps {
  value: Task['status']
  onChange: (status: Task['status']) => void
  disabled?: boolean
}

export const StatusSelect: React.FC<StatusSelectProps> = ({ value, onChange, disabled = false }) => {
  const statuses: Task['status'][] = ['todo', 'in-progress', 'done']
  
  return (
    <FormTextField
      select
      size="small"
      value={value}
      onChange={(e) => onChange(e.target.value as Task['status'])}
      disabled={disabled}
      sx={{ width: { xs: '100%', sm: 160 } }}
    >
      {statuses.map((status) => (
        <MenuItem key={status} value={status}>
          {status === 'todo' && '📝 To Do'}
          {status === 'in-progress' && '⚡ In Progress'}
          {status === 'done' && '✅ Done'}
        </MenuItem>
      ))}
    </FormTextField>
  )
}
