import React from 'react'
import { Autocomplete, Paper, Box } from '@mui/material'
import { FormTextField } from './FormTextField'
import type { User } from '../../types'

interface SearchAutocompleteProps {
  value: string
  onChange: (value: string) => void
  placeholder?: string
  startIcon?: React.ReactNode
  options?: User[]
  onSearch?: (query: string) => void
}

export const SearchAutocomplete: React.FC<SearchAutocompleteProps> = ({
  value,
  onChange,
  placeholder = "Type email...",
  startIcon,
  options = [],
  onSearch
}) => {
  return (
    <Autocomplete
      freeSolo
      options={options}
      getOptionLabel={(option) => typeof option === 'string' ? option : option.email}
      value={value}
      onChange={(_, newValue) => {
        if (typeof newValue === 'string') {
          onChange(newValue)
        } else if (newValue) {
          onChange(newValue.email)
        } else {
          onChange('')
        }
      }}
      onInputChange={(_, newInputValue) => {
        onChange(newInputValue)
        if (onSearch) {
          onSearch(newInputValue)
        }
      }}
      renderInput={(params) => (
        <FormTextField
          {...params}
          placeholder={placeholder}
          size="small"
          InputProps={{
            ...params.InputProps,
            startAdornment: startIcon ? (
              <Box sx={{ mr: 1, display: 'flex', alignItems: 'center' }}>
                {startIcon}
              </Box>
            ) : undefined
          }}
        />
      )}
      renderOption={(props, option) => (
        <li {...props} key={option._id}>
          <Box>
            <Box sx={{ fontWeight: 500 }}>{option.name}</Box>
            <Box sx={{ fontSize: '0.8em', color: '#666' }}>{option.email}</Box>
          </Box>
        </li>
      )}
      PaperComponent={({ children, ...other }) => (
        <Paper
          {...other}
          sx={{
            borderRadius: 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
            backdropFilter: 'blur(10px)',
            background: 'rgba(255, 255, 255, 0.95)'
          }}
        >
          {children}
        </Paper>
      )}
    />
  )
}
