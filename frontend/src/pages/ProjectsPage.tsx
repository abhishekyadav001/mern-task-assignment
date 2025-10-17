import { useState } from 'react'
import { Stack, Typography, Box, Slide } from '@mui/material'
import { ProjectForm } from '../components/projects/ProjectForm'
import { ProjectList } from '../components/projects/ProjectList'
import { Loading } from '../components/feedback/Loading'
import { ErrorAlert } from '../components/feedback/ErrorAlert'
import { useAuth } from '../context/AuthContext'
import { useProjects, useCreateProject, useDeleteProject } from '../hooks/useProjects'
import type { CreateProjectPayload } from '../types'

export default function ProjectsPage() {
  const { user } = useAuth()
  const [page, setPage] = useState(1)
  const [limit] = useState(10)

  const { data, isLoading, isError } = useProjects(page, limit)
  const createMutation = useCreateProject()
  const deleteMutation = useDeleteProject()

  const handleCreateProject = (payload: CreateProjectPayload) => {
    createMutation.mutate(payload)
  }

  const handleDeleteProject = (projectId: string) => {
    deleteMutation.mutate(projectId)
  }

  return (
    <Stack spacing={3} className="pt-6">
      <Slide direction="down" in timeout={800} mountOnEnter unmountOnExit>
        <Box>
          <Typography variant="h4" className="font-semibold">Projects</Typography>
          <Typography variant="body1" sx={{ color: 'text.secondary', mt: 1 }}>
            Manage your projects and collaborate with your team
          </Typography>
        </Box>
      </Slide>

      <Slide direction="up" in timeout={1000} mountOnEnter unmountOnExit>
        <Box>
          <ProjectForm
            onSubmit={handleCreateProject}
            isLoading={createMutation.isPending}
          />
        </Box>
      </Slide>

      {isLoading && <Loading message="Loading projects..." />}
      {isError && <ErrorAlert message="Failed to load projects" />}

      {!isLoading && !isError && (
        <ProjectList
          data={data}
          currentUser={user}
          onDelete={handleDeleteProject}
          onPageChange={setPage}
          isLoading={isLoading}
        />
      )}
    </Stack>
  )
}