import React from 'react'
import { Paper, Stack, Typography, IconButton } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import type { Task } from '../../types'
import { StatusSelect } from './StatusSelect'
import { AssigneeBadge } from './AssigneeBadge'
import { DueDateBadge } from './DueDateBadge'
import { taskCardStyles } from '../../theme'

interface TaskCardProps {
  task: Task
  isOwner: boolean
  onStatusChange: (taskId: string, status: Task['status']) => void
  onDelete: (taskId: string) => void
}

export const TaskCard: React.FC<TaskCardProps> = ({ 
  task, 
  isOwner, 
  onStatusChange, 
  onDelete 
}) => {
  return (
    <Paper sx={taskCardStyles}>
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        spacing={1.2}
        alignItems={{ xs: 'stretch', sm: 'center' }}
        useFlexGap
        flexWrap="wrap"
      >
        <Typography sx={{ flex: 1, minWidth: 160 }}>{task.title}</Typography>
        
        <StatusSelect
          value={task.status}
          onChange={(status) => onStatusChange(task._id, status)}
          disabled={!isOwner}
        />
        
        {task.assignedTo && (
          <AssigneeBadge 
            assignedTo={task.assignedTo} 
            assignedToName={task.assignedToName} 
          />
        )}
        
        {task.dueDate && (
          <DueDateBadge dueDate={task.dueDate} />
        )}
        
        {isOwner && (
          <IconButton 
            aria-label="delete task" 
            color="error" 
            onClick={() => onDelete(task._id)} 
            sx={{ ml: 'auto' }}
          >
            <DeleteIcon />
          </IconButton>
        )}
      </Stack>
    </Paper>
  )
}
