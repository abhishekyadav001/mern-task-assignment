export interface User {
  _id: string
  name: string
  email: string
}

export interface Project {
  _id: string
  title: string
  description: string
  owner: User
  createdAt?: string
  updatedAt?: string
}

export interface Task {
  _id: string
  title: string
  status: 'todo' | 'in-progress' | 'done'
  assignedTo?: string | null
  assignedToName?: string | null
  dueDate?: string | null
  project: string
  createdAt?: string
  updatedAt?: string
}

export interface Paginated<T> {
  items: T[]
  total: number
  page: number
  limit: number
  pages: number
}

export interface AuthUser {
  id: string
  name: string
  email: string
}

export interface CreateProjectPayload {
  title: string
  description?: string
}

export interface CreateTaskPayload {
  title: string
  status?: Task['status']
  assignedTo?: string | null
  dueDate?: string | null
}

export interface UpdateTaskPayload {
  title?: string
  status?: Task['status']
  assignedTo?: string | null
  assignedToName?: string | null
  dueDate?: string | null
}
