import React, { useState } from 'react'
import { Card, CardContent, Box, Stack, Typography, IconButton, Collapse, Fade } from '@mui/material'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import AssignmentIcon from '@mui/icons-material/Assignment'
import AddIcon from '@mui/icons-material/Add'
import PersonIcon from '@mui/icons-material/Person'
import CalendarTodayIcon from '@mui/icons-material/CalendarToday'
import { FormTextField } from '../forms/FormTextField'
import { GradientButton } from '../forms/GradientButton'
import { OutlinedButton } from '../forms/OutlinedButton'
import { SearchAutocomplete } from '../forms/SearchAutocomplete'
import type { CreateTaskPayload } from '../../types'
import { gradients, shadows, transitions, animations } from '../../theme'

interface CreateTaskCardProps {
  onSubmit: (payload: CreateTaskPayload) => void
}

export const CreateTaskCard: React.FC<CreateTaskCardProps> = ({ onSubmit }) => {
  const [title, setTitle] = useState('')
  const [status, setStatus] = useState<'todo' | 'in-progress' | 'done'>('todo')
  const [assignedTo, setAssignedTo] = useState<string>('')
  const [dueDate, setDueDate] = useState<string>('')
  const [expanded, setExpanded] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!title.trim()) return
    
    onSubmit({ 
      title: title.trim(), 
      status, 
      assignedTo: assignedTo || null, 
      dueDate: dueDate || null 
    })
    
    setTitle('')
    setStatus('todo')
    setAssignedTo('')
    setDueDate('')
    setExpanded(false)
  }

  const handleCancel = () => {
    setTitle('')
    setStatus('todo')
    setAssignedTo('')
    setDueDate('')
    setExpanded(false)
  }

  return (
    <Card
      sx={{
        borderRadius: 3,
        background: gradients.cardHover,
        border: '1px solid rgba(102, 126, 234, 0.2)',
        boxShadow: shadows.cardHover,
        overflow: 'hidden',
        position: 'relative',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          height: '3px',
          background: 'linear-gradient(90deg, #667eea, #764ba2, #667eea)',
          backgroundSize: '200% 100%',
          animation: 'shimmer 3s ease-in-out infinite',
          ...animations.shimmer,
        }
      }}
    >
      <CardContent sx={{ p: 0 }}>
        {/* Header with expand/collapse */}
        <Box
          sx={{
            p: 3,
            background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.1) 0%, rgba(118, 75, 162, 0.1) 100%)',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            transition: transitions.standard,
            '&:hover': {
              background: 'linear-gradient(135deg, rgba(102, 126, 234, 0.15) 0%, rgba(118, 75, 162, 0.15) 100%)',
            }
          }}
          onClick={() => setExpanded(!expanded)}
        >
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <AssignmentIcon sx={{ color: 'primary.main', fontSize: 28 }} />
            <Typography variant="h6" sx={{ fontWeight: 600, color: 'text.primary' }}>
              Create New Task
            </Typography>
            <Typography 
              variant="caption" 
              sx={{ 
                background: 'rgba(102, 126, 234, 0.1)',
                color: 'primary.main',
                px: 1.5,
                py: 0.5,
                borderRadius: 1,
                fontWeight: 500,
                animation: 'pulse 2s infinite',
                ...animations.pulse,
              }}
            >
              Quick Add
            </Typography>
          </Box>
          <IconButton
            sx={{
              transform: expanded ? 'rotate(180deg)' : 'rotate(0deg)',
              transition: transitions.transform,
              color: 'primary.main'
            }}
          >
            <ExpandMoreIcon />
          </IconButton>
        </Box>

        {/* Collapsible Form */}
        <Collapse in={expanded} timeout="auto" unmountOnExit>
          <Box sx={{ p: 3 }}>
            <Fade in={expanded} timeout={600}>
              <Stack component="form" onSubmit={handleSubmit} spacing={3}>
                {/* Main Task Input */}
                <Box sx={{ position: 'relative' }}>
                  <FormTextField
                    fullWidth
                    label="What needs to be done?"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    onFocus={() => setFocusedField('title')}
                    onBlur={() => setFocusedField(null)}
                    placeholder="Enter task title..."
                    InputProps={{
                      startAdornment: (
                        <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                          <AssignmentIcon sx={{ color: 'primary.main', fontSize: 20 }} />
                        </Box>
                      )
                    }}
                    sx={{
                      '& .MuiOutlinedInput-root': {
                        fontSize: '1.1rem',
                      }
                    }}
                    required
                  />
                  {focusedField === 'title' && (
                    <Fade in timeout={300}>
                      <Typography variant="caption" sx={{ 
                        position: 'absolute', 
                        bottom: -20, 
                        left: 0, 
                        color: 'primary.main',
                        fontWeight: 500
                      }}>
                        💡 Tip: Be specific and actionable
                      </Typography>
                    </Fade>
                  )}
                </Box>

                {/* Additional Options Grid */}
                <Box sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(3, 1fr)' }, 
                  gap: 2 
                }}>
                  {/* Status Selector */}
                  <Box sx={{ 
                    p: 2, 
                    background: 'rgba(255, 255, 255, 0.5)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    borderRadius: 2,
                    transition: transitions.standard,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: shadows.inputHover,
                    }
                  }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                      📊 Status
                    </Typography>
                    <FormTextField
                      select
                      fullWidth
                      size="small"
                      value={status}
                      onChange={(e) => setStatus(e.target.value as 'todo' | 'in-progress' | 'done')}
                    >
                      <option value="todo">📝 To Do</option>
                      <option value="in-progress">⚡ In Progress</option>
                      <option value="done">✅ Done</option>
                    </FormTextField>
                  </Box>

                  {/* Assignee Selector */}
                  <Box sx={{ 
                    p: 2, 
                    background: 'rgba(255, 255, 255, 0.5)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    borderRadius: 2,
                    transition: transitions.standard,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: shadows.inputHover,
                    }
                  }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                      👤 Assign To
                    </Typography>
                    <SearchAutocomplete
                      value={assignedTo}
                      onChange={setAssignedTo}
                      placeholder="Type email..."
                      startIcon={<PersonIcon sx={{ color: 'primary.main', fontSize: 16 }} />}
                    />
                  </Box>

                  {/* Due Date Selector */}
                  <Box sx={{ 
                    p: 2, 
                    background: 'rgba(255, 255, 255, 0.5)',
                    border: '1px solid rgba(102, 126, 234, 0.1)',
                    borderRadius: 2,
                    transition: transitions.standard,
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: shadows.inputHover,
                    }
                  }}>
                    <Typography variant="subtitle2" sx={{ mb: 1, fontWeight: 600, color: 'text.secondary' }}>
                      📅 Due Date
                    </Typography>
                    <FormTextField
                      type="date"
                      size="small"
                      fullWidth
                      value={dueDate}
                      onChange={(e) => setDueDate(e.target.value)}
                      InputLabelProps={{ shrink: true }}
                      InputProps={{
                        startAdornment: (
                          <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                            <CalendarTodayIcon sx={{ color: 'primary.main', fontSize: 16 }} />
                          </Box>
                        )
                      }}
                    />
                  </Box>
                </Box>

                {/* Action Buttons */}
                <Box sx={{ 
                  display: 'flex', 
                  gap: 2, 
                  justifyContent: 'flex-end',
                  pt: 2,
                  borderTop: '1px solid rgba(102, 126, 234, 0.1)'
                }}>
                  <OutlinedButton
                    onClick={handleCancel}
                    sx={{ px: 3, py: 1 }}
                  >
                    Cancel
                  </OutlinedButton>
                  <GradientButton
                    type="submit"
                    startIcon={<AddIcon />}
                    disabled={!title.trim()}
                    sx={{ px: 4, py: 1 }}
                  >
                    Create Task
                  </GradientButton>
                </Box>
              </Stack>
            </Fade>
          </Box>
        </Collapse>
      </CardContent>
    </Card>
  )
}
