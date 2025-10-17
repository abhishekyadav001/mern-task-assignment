import React from 'react'
import { ListItem, ListItemAvatar, ListItemText, Avatar, Stack, Chip, IconButton, Typography } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'
import { Link } from 'react-router-dom'
import type { Project, AuthUser } from '../../types'

interface ProjectListItemProps {
    project: Project
    currentUser: AuthUser | null
    onDelete: (projectId: string) => void
}

export const ProjectListItem: React.FC<ProjectListItemProps> = ({ project, currentUser, onDelete }) => {
    const isOwner = currentUser?.id === project.owner._id

    return (
        <ListItem
            sx={{
                py: 2,
                px: 3,
                borderBottom: '1px solid rgba(0,0,0,0.05)',
                transition: 'all 0.3s ease',
                '&:hover': {
                    background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
                    transform: 'translateX(4px)',
                },
                '&:last-child': {
                    borderBottom: 'none',
                },
            }}
            secondaryAction={
                isOwner ? (
                    <IconButton
                        edge="end"
                        aria-label="delete"
                        onClick={() => onDelete(project._id)}
                        sx={{
                            color: 'error.main',
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                background: 'rgba(244, 67, 54, 0.1)',
                                transform: 'scale(1.1)',
                            },
                        }}
                    >
                        <DeleteIcon />
                    </IconButton>
                ) : null
            }
        >
            <ListItemAvatar>
                <Avatar
                    sx={{
                        background: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
                        fontWeight: 600,
                        boxShadow: '0 2px 8px rgba(102, 126, 234, 0.3)',
                    }}
                >
                    {project.title.slice(0, 1).toUpperCase()}
                </Avatar>
            </ListItemAvatar>
            <ListItemText
                primary={
                    <Stack direction="row" alignItems="center" spacing={1} flexWrap="wrap">
                        <Link
                            to={`/projects/${project._id}`}
                            state={{ projectTitle: project.title }}
                            style={{
                                textDecoration: 'none',
                                color: 'inherit',
                                fontWeight: 600,
                                transition: 'all 0.3s ease',
                            }}
                            onMouseEnter={(e) => {
                                e.currentTarget.style.color = '#667eea'
                                e.currentTarget.style.transform = 'translateY(-1px)'
                            }}
                            onMouseLeave={(e) => {
                                e.currentTarget.style.color = 'inherit'
                                e.currentTarget.style.transform = 'translateY(0)'
                            }}
                        >
                            {project.title}
                        </Link>
                        <Chip
                            label={`by ${project.owner.name}`}
                            size="small"
                            variant="outlined"
                            color={isOwner ? 'primary' : 'default'}
                            sx={{
                                transition: 'all 0.3s ease',
                                '&:hover': {
                                    transform: 'scale(1.05)',
                                },
                            }}
                        />
                    </Stack>
                }
                secondary={
                    <Typography
                        variant="body2"
                        sx={{
                            color: 'text.secondary',
                            mt: 0.5,
                            fontStyle: project.description ? 'normal' : 'italic',
                        }}
                    >
                        {project.description || 'No description provided'}
                    </Typography>
                }
            />
        </ListItem>
    )
}
