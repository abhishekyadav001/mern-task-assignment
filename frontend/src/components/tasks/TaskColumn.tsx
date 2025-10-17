import React from 'react'
import { Paper, Typography, Chip, Divider, Stack } from '@mui/material'
import type { Task } from '../../types'
import { TaskCard } from './TaskCard'
import { EmptyState } from '../feedback/EmptyState'

interface TaskColumnProps {
  title: string
  tasks: Task[]
  isOwner: boolean
  onStatusChange: (taskId: string, status: Task['status']) => void
  onDelete: (taskId: string) => void
}

export const TaskColumn: React.FC<TaskColumnProps> = ({ 
  title, 
  tasks, 
  isOwner, 
  onStatusChange, 
  onDelete 
}) => {
  return (
    <Paper sx={{ p: 2, minHeight: { md: 300 }, overflow: 'hidden' }} className="bg-white">
      <Typography variant="h6" gutterBottom>
        {title} <Chip label={tasks.length} size="small" sx={{ ml: 1 }} />
      </Typography>
      <Divider sx={{ mb: 2 }} />
      <Stack spacing={1}>
        {tasks.map((task) => (
          <TaskCard
            key={task._id}
            task={task}
            isOwner={isOwner}
            onStatusChange={onStatusChange}
            onDelete={onDelete}
          />
        ))}
        {tasks.length === 0 && (
          <EmptyState message="No tasks in this column" />
        )}
      </Stack>
    </Paper>
  )
}
