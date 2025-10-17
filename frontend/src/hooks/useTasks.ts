import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import api from '../api/client'
import type { Task, CreateTaskPayload, UpdateTaskPayload, User } from '../types'
import { queryKeys } from '../utils'

export const useTasks = (projectId: string | undefined) => {
  return useQuery({
    queryKey: projectId ? queryKeys.tasks(projectId) : [],
    queryFn: async () => (await api.get(`/projects/${projectId}/tasks`)).data as Task[],
    enabled: !!projectId,
  })
}

export const useCreateTask = (projectId: string | undefined) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (payload: CreateTaskPayload) =>
      (await api.post(`/projects/${projectId}/tasks`, payload)).data as Task,
    onSuccess: () => {
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks(projectId) })
      }
    },
  })
}

export const useUpdateTask = (projectId: string | undefined) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async ({ taskId, updates }: { taskId: string; updates: UpdateTaskPayload }) =>
      (await api.patch(`/projects/${projectId}/tasks/${taskId}`, updates)).data as Task,
    onSuccess: () => {
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks(projectId) })
      }
    },
  })
}

export const useDeleteTask = (projectId: string | undefined) => {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: async (taskId: string) => (await api.delete(`/projects/${projectId}/tasks/${taskId}`)).data,
    onSuccess: () => {
      if (projectId) {
        queryClient.invalidateQueries({ queryKey: queryKeys.tasks(projectId) })
      }
    },
  })
}

export const useUserSearch = (query: string) => {
  return useQuery({
    queryKey: queryKeys.users(query),
    queryFn: async () => (await api.get(`/auth/users/search?q=${encodeURIComponent(query)}`)).data as User[],
    enabled: query.length >= 2,
  })
}
