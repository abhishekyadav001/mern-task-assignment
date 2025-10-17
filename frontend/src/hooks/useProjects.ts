import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api/client'
import type { Project, CreateProjectPayload, Paginated } from '../types'
import { queryKeys } from '../utils'

export const useProjects = (page: number = 1, limit: number = 10) => {
  return useQuery({
    queryKey: [...queryKeys.projects, page, limit],
    queryFn: async () => (await api.get(`/projects?page=${page}&limit=${limit}`)).data as Paginated<Project>,
    placeholderData: (prev) => prev as any,
  })
}

export const useProject = (projectId: string | undefined) => {
  return useQuery({
    queryKey: projectId ? queryKeys.project(projectId) : [],
    queryFn: async () => (await api.get(`/projects/${projectId}`)).data as Project,
    enabled: !!projectId,
  })
}

export const useCreateProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateProjectPayload) =>
      (await api.post('/projects', payload)).data as Project,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects })
    },
  })
}

export const useDeleteProject = () => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (projectId: string) => (await api.delete(`/projects/${projectId}`)).data,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects })
    },
  })
}
