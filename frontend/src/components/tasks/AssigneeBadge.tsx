import React from 'react'
import { Chip } from '@mui/material'

interface AssigneeBadgeProps {
  assignedTo: string
  assignedToName?: string | null
}

export const AssigneeBadge: React.FC<AssigneeBadgeProps> = ({ assignedTo, assignedToName }) => {
  return (
    <Chip
      label={assignedToName || assignedTo}
      size="small"
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
