// no default React import needed
import { Link, useLocation, useParams } from 'react-router-dom'
import { Stack, Typography, Box, Chip, Alert } from '@mui/material'
import { TaskColumn } from '../components/tasks/TaskColumn'
import { CreateTaskCard } from '../components/tasks/CreateTaskCard'
import { Loading } from '../components/feedback/Loading'
import { ErrorAlert } from '../components/feedback/ErrorAlert'
import { useAuth } from '../context/AuthContext'
import { useProject } from '../hooks/useProjects'
import { useTasks, useCreateTask, useUpdateTask, useDeleteTask } from '../hooks/useTasks'
import type { Task, CreateTaskPayload } from '../types'
import { formatStatus } from '../utils'

export default function TaskBoardPage() {
  const { projectId } = useParams()
  const location = useLocation() as { state?: { projectTitle?: string } }
  const projectTitle = location.state?.projectTitle
  const { user } = useAuth()

  // Fetch project details to get owner info
  const { data: project, isLoading: projectLoading } = useProject(projectId)
  const isOwner = project && user ? project.owner._id === user.id : false

  // Fetch tasks
  const { data: tasks = [], isLoading: tasksLoading, isError: tasksError } = useTasks(projectId)

  // Mutations
  const createMutation = useCreateTask(projectId)
  const updateMutation = useUpdateTask(projectId)
  const deleteMutation = useDeleteTask(projectId)

  const handleCreateTask = (payload: CreateTaskPayload) => {
    createMutation.mutate(payload)
  }

  const handleStatusChange = (taskId: string, status: Task['status']) => {
    updateMutation.mutate({ taskId, updates: { status } })
  }

  const handleDeleteTask = (taskId: string) => {
    deleteMutation.mutate(taskId)
  }

  const statuses: Task['status'][] = ['todo', 'in-progress', 'done']
  const columns = statuses.map((status) => ({
    key: status,
    title: formatStatus(status),
    items: tasks.filter((task) => task.status === status),
  }))

  if (!projectId) {
    return (
      <Stack spacing={3} className="pt-6">
        <Typography variant="h4" className="font-semibold">Task Board</Typography>
        <ErrorAlert message="Project ID not found. Please go back to projects and try again." />
        <Link to="/">Back to Projects</Link>
      </Stack>
    )
  }

  return (
    <Stack spacing={3} className="pt-6">
      <Stack direction="row" alignItems="center" justifyContent="space-between">
        <Typography variant="h4" className="font-semibold">
          {projectTitle ? `${projectTitle} · Task Board` : 'Task Board'}
          {project && (
            <> · <Chip label={`Owner: ${project.owner.name}`} size="small" /> </>
          )}
        </Typography>
        <Link to="/">Back to Projects</Link>
      </Stack>

      {(createMutation.error || updateMutation.error || deleteMutation.error) && (
        <ErrorAlert
          message={
            createMutation.error?.message ||
            updateMutation.error?.message ||
            deleteMutation.error?.message ||
            'An error occurred'
          }
        />
      )}

      {isOwner ? (
        <CreateTaskCard onSubmit={handleCreateTask} />
      ) : (
        <Alert severity="info">Read-only: only the project owner can create or edit tasks.</Alert>
      )}

      {(projectLoading || tasksLoading) && <Loading message="Loading tasks..." />}
      {tasksError && <ErrorAlert message="Failed to load tasks" />}

      {!tasksLoading && !tasksError && (
        <Box sx={{
          display: 'grid',
          gridTemplateColumns: { xs: '1fr', md: 'repeat(3, 1fr)' },
          gap: 2
        }}>
          {columns.map((column) => (
            <TaskColumn
              key={column.key}
              title={column.title}
              tasks={column.items}
              isOwner={isOwner}
              onStatusChange={handleStatusChange}
              onDelete={handleDeleteTask}
            />
          ))}
        </Box>
      )}
    </Stack>
  )
}