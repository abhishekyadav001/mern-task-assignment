import React, { useState } from 'react'
import { Stack } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import { FormTextField } from '../forms/FormTextField'
import { GradientButton } from '../forms/GradientButton'
import { SectionCard } from '../cards/SectionCard'
import type { CreateProjectPayload } from '../../types'

interface ProjectFormProps {
    onSubmit: (payload: CreateProjectPayload) => void
    isLoading?: boolean
}

export const ProjectForm: React.FC<ProjectFormProps> = ({ onSubmit, isLoading = false }) => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if (!title.trim()) return

        onSubmit({ title: title.trim(), description: description.trim() || undefined })
        setTitle('')
        setDescription('')
    }

    return (
        <SectionCard sx={{ p: 3 }}>
            <Stack component="form" direction={{ xs: 'column', sm: 'row' }} spacing={2} onSubmit={handleSubmit}>
                <FormTextField
                    label="Project Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    required
                    sx={{ flex: 1 }}
                />
                <FormTextField
                    label="Description (Optional)"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    sx={{ flex: 2 }}
                />
                <GradientButton
                    type="submit"
                    disabled={isLoading}
                    startIcon={<AddIcon />}
                    sx={{ px: 3, py: 1.5 }}
                >
                    {isLoading ? 'Creating...' : 'Add Project'}
                </GradientButton>
            </Stack>
        </SectionCard>
    )
}
