import React from 'react'
import { Box, Stack, Pagination } from '@mui/material'
import type { Paginated } from '../../types'

interface ProjectsPaginationProps {
    data: Paginated<any> | undefined
    onPageChange: (page: number) => void
}

export const ProjectsPagination: React.FC<ProjectsPaginationProps> = ({ data, onPageChange }) => {
    if (!data || data.items.length === 0) return null

    return (
        <Box sx={{ p: 2, borderTop: '1px solid rgba(0,0,0,0.05)' }}>
            <Stack alignItems="center">
                <Pagination
                    count={data.pages || 1}
                    page={data.page || 1}
                    onChange={(_, value) => onPageChange(value)}
                    color="primary"
                    sx={{
                        '& .MuiPaginationItem-root': {
                            borderRadius: 2,
                            transition: 'all 0.3s ease',
                            '&:hover': {
                                transform: 'scale(1.1)',
                            },
                        },
                    }}
                />
            </Stack>
        </Box>
    )
}
