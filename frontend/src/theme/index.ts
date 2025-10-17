import type { SxProps, Theme } from '@mui/material'

// Common gradient colors
export const gradients = {
  primary: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
  primaryReverse: 'linear-gradient(135deg, #764ba2 0%, #667eea 100%)',
  primaryButton: 'linear-gradient(45deg, #667eea 30%, #764ba2 90%)',
  card: 'linear-gradient(135deg, rgba(102, 126, 234, 0.05) 0%, rgba(118, 75, 162, 0.05) 100%)',
  cardHover: 'linear-gradient(135deg, rgba(102, 126, 234, 0.08) 0%, rgba(118, 75, 162, 0.08) 100%)',
  navbar: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
}

// Common shadows
export const shadows = {
  card: '0 4px 20px rgba(0,0,0,0.08)',
  cardHover: '0 8px 32px rgba(102, 126, 234, 0.15)',
  inputHover: '0 4px 12px rgba(102, 126, 234, 0.15)',
  inputFocus: '0 4px 12px rgba(102, 126, 234, 0.25)',
  button: '0 4px 15px rgba(102, 126, 234, 0.4)',
  buttonHover: '0 6px 20px rgba(102, 126, 234, 0.6)',
}

// Common transitions
export const transitions = {
  standard: 'all 0.3s ease',
  transform: 'transform 0.3s ease',
  color: 'color 0.3s ease',
}

// Input field styles
export const inputStyles: SxProps<Theme> = {
  '& .MuiOutlinedInput-root': {
    transition: transitions.standard,
    '&:hover': {
      transform: 'translateY(-2px)',
      boxShadow: shadows.inputHover,
    },
    '&.Mui-focused': {
      transform: 'translateY(-2px)',
      boxShadow: shadows.inputFocus,
    },
  },
}

// Button styles
export const gradientButtonStyles: SxProps<Theme> = {
  background: gradients.primaryButton,
  boxShadow: shadows.button,
  transition: transitions.standard,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: shadows.buttonHover,
  },
  '&:disabled': {
    background: 'rgba(0,0,0,0.12)',
    transform: 'none',
  },
}

export const outlinedButtonStyles: SxProps<Theme> = {
  borderColor: 'primary.main',
  color: 'primary.main',
  transition: transitions.standard,
  '&:hover': {
    background: 'rgba(102, 126, 234, 0.1)',
    transform: 'translateY(-1px)',
  },
}

// Card styles
export const sectionCardStyles: SxProps<Theme> = {
  borderRadius: 3,
  background: gradients.card,
  border: '1px solid rgba(102, 126, 234, 0.1)',
  boxShadow: shadows.card,
  transition: transitions.standard,
  '&:hover': {
    background: gradients.cardHover,
    boxShadow: shadows.cardHover,
  },
}

export const taskCardStyles: SxProps<Theme> = {
  borderRadius: 2,
  background: 'rgba(255, 255, 255, 0.5)',
  border: '1px solid rgba(102, 126, 234, 0.1)',
  transition: transitions.standard,
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: shadows.inputHover,
  },
}

// Animation keyframes
export const animations = {
  shimmer: {
    '@keyframes shimmer': {
      '0%': { backgroundPosition: '-200% 0' },
      '100%': { backgroundPosition: '200% 0' },
    },
  },
  pulse: {
    '@keyframes pulse': {
      '0%, 100%': { opacity: 1 },
      '50%': { opacity: 0.7 },
    },
  },
  float: {
    '@keyframes float': {
      '0%, 100%': { transform: 'translateY(0px) rotate(0deg)' },
      '50%': { transform: 'translateY(-20px) rotate(180deg)' },
    },
  },
}
