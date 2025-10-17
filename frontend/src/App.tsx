import React from 'react'
import { Container, CssBaseline, ThemeProvider, createTheme } from '@mui/material'
import { Routes, Route, Navigate } from 'react-router-dom'
import LoginPage from './pages/LoginPage'
import RegisterPage from './pages/RegisterPage'
import ProjectsPage from './pages/ProjectsPage'
import TaskBoardPage from './pages/TaskBoardPage'
import { AuthProvider, useAuth } from './context/AuthContext'
import NavBar from './components/NavBar'

function PrivateRoute({ children }: { children: React.ReactElement }) {
  const { token } = useAuth()
  if (!token) return <Navigate to="/login" replace />
  return children
}

export default function App() {
  const theme = createTheme({
    palette: {
      mode: 'light',
      primary: { main: '#2563eb' }, // tailwind blue-600
      secondary: { main: '#0ea5e9' }, // sky-500
      background: { default: '#f8fafc' },
    },
    shape: { borderRadius: 10 },
    components: {
      MuiPaper: { styleOverrides: { root: { borderRadius: 10 } } },
    },
  })
  return (
    <AuthProvider>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <NavGate>
          <NavBar />
        </NavGate>
        <Container maxWidth="md" sx={{ py: 3 }}>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/register" element={<RegisterPage />} />
            <Route
              path="/"
              element={
                <PrivateRoute>
                  <ProjectsPage />
                </PrivateRoute>
              }
            />
            <Route
              path="/projects/:projectId"
              element={
                <PrivateRoute>
                  <TaskBoardPage />
                </PrivateRoute>
              }
            />
          </Routes>
        </Container>
      </ThemeProvider>
    </AuthProvider>
  )
}

function NavGate({ children }: { children: React.ReactElement }) {
  const { token } = useAuth()
  if (!token) return null
  return children
}


