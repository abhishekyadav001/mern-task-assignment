import React from 'react'
import { Chip } from '@mui/material'
import { formatDateShort } from '../../utils'

interface DueDateBadgeProps {
  dueDate: string
}

export const DueDateBadge: React.FC<DueDateBadgeProps> = ({ dueDate }) => {
  const isOverdue = new Date(dueDate) < new Date()
  
  return (
    <Chip
      label={formatDateShort(dueDate)}
      size="small"
      color={isOverdue ? 'error' : 'default'}
      sx={{ 
        ml: { sm: 1 }, 
        maxWidth: { xs: '100%', sm: 'auto' },
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'scale(1.05)',
        },
      }}
    />
  )
}
