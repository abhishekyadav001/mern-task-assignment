import React from 'react'
import { List, Paper } from '@mui/material'
import { ProjectListItem } from './ProjectListItem'
import { ProjectsPagination } from './ProjectsPagination'
import { EmptyState } from '../feedback/EmptyState'
import type { Project, AuthUser, Paginated } from '../../types'

interface ProjectListProps {
    data: Paginated<Project> | undefined
    currentUser: AuthUser | null
    onDelete: (projectId: string) => void
    onPageChange: (page: number) => void
    isLoading: boolean
}

export const ProjectList: React.FC<ProjectListProps> = ({
    data,
    currentUser,
    onDelete,
    onPageChange,
    isLoading,
}) => {
    if (isLoading) return null

    return (
        <Paper
            sx={{
                borderRadius: 3,
                overflow: 'hidden',
                boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
                border: '1px solid rgba(0,0,0,0.05)',
            }}
        >
            <List sx={{ p: 0 }}>
                {data?.items?.map((project) => (
                    <ProjectListItem
                        key={project._id}
                        project={project}
                        currentUser={currentUser}
                        onDelete={onDelete}
                    />
                ))}
            </List>

            {!isLoading && data && data.items.length === 0 && (
                <EmptyState message="No projects found. Create your first project above!" />
            )}

            <ProjectsPagination data={data} onPageChange={onPageChange} />
        </Paper>
    )
}
