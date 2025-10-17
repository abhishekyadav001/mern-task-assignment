import { useState } from 'react'
import { AppBar, Box, Button, Container, Divider, IconButton, Menu, MenuItem, Toolbar, Typography, Avatar, Chip, Slide } from '@mui/material'
import MenuIcon from '@mui/icons-material/Menu'
import LogoutIcon from '@mui/icons-material/Logout'
import AssignmentIcon from '@mui/icons-material/Assignment'
import DashboardIcon from '@mui/icons-material/Dashboard'
import PersonIcon from '@mui/icons-material/Person'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function NavBar() {
  const { setToken, user } = useAuth()
  const location = useLocation()
  const navigate = useNavigate()
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }
  const handleClose = () => setAnchorEl(null)

  const navItems = [
    { to: '/', label: 'Projects', icon: <DashboardIcon fontSize="small" /> },
  ]

  return (
    <AppBar
      position="sticky"
      elevation={0}
      sx={{
        background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
        transition: 'all 0.3s ease',
        borderRadius: 0
      }}
    >
      <Container maxWidth="lg">
        <Toolbar disableGutters sx={{ gap: 1, py: 0.5 }}>
          <Slide direction="right" in timeout={800}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AssignmentIcon
                sx={{
                  fontSize: 28,
                  color: 'white',
                  filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.2))',
                  transition: 'transform 0.3s ease',
                  '&:hover': { transform: 'rotate(10deg) scale(1.1)' }
                }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  color: 'white',
                  textShadow: '0 2px 4px rgba(0,0,0,0.2)',
                  letterSpacing: '0.5px'
                }}
              >
                Task Board
              </Typography>
            </Box>
          </Slide>

          {/* Desktop nav */}
          <Box sx={{
            display: { xs: 'none', md: 'flex' },
            alignItems: 'center',
            gap: 1,
            ml: 'auto'
          }}>
            {navItems.map((item, index) => (
              <Slide direction="down" in timeout={1000 + index * 200} key={item.to}>
                <Button
                  color="inherit"
                  component={Link}
                  to={item.to}
                  startIcon={item.icon}
                  sx={{
                    color: 'white',
                    fontWeight: location.pathname === item.to ? 600 : 400,
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    transition: 'all 0.3s ease',
                    background: location.pathname === item.to
                      ? 'rgba(255, 255, 255, 0.2)'
                      : 'transparent',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  {item.label}
                </Button>
              </Slide>
            ))}

            <Divider
              orientation="vertical"
              flexItem
              sx={{
                mx: 2,
                opacity: 0.3,
                height: '24px',
                alignSelf: 'center'
              }}
            />

            <Slide direction="down" in timeout={1400}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                {user && (
                  <Chip
                    avatar={
                      <Avatar sx={{ bgcolor: 'rgba(255,255,255,0.2)', color: 'white' }}>
                        {user.name.charAt(0).toUpperCase()}
                      </Avatar>
                    }
                    label={user.name}
                    variant="outlined"
                    sx={{
                      color: 'white',
                      borderColor: 'rgba(255,255,255,0.3)',
                      '&:hover': {
                        background: 'rgba(255,255,255,0.1)',
                        borderColor: 'rgba(255,255,255,0.5)'
                      }
                    }}
                    onClick={() => { }}
                  />
                )}
                <Button
                  color="inherit"
                  startIcon={<LogoutIcon />}
                  onClick={() => {
                    setToken(null)
                    navigate('/login')
                  }}
                  sx={{
                    color: 'white',
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(255, 255, 255, 0.15)',
                      transform: 'translateY(-2px)',
                      boxShadow: '0 4px 12px rgba(0,0,0,0.2)'
                    }
                  }}
                >
                  Logout
                </Button>
              </Box>
            </Slide>
          </Box>

          {/* Mobile menu */}
          <Box sx={{ display: { xs: 'flex', md: 'none' }, ml: 'auto' }}>
            <Slide direction="left" in timeout={1000}>
              <IconButton
                color="inherit"
                onClick={handleMenu}
                aria-label="menu"
                sx={{
                  color: 'white',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(255, 255, 255, 0.15)',
                    transform: 'scale(1.1)'
                  }
                }}
              >
                <MenuIcon />
              </IconButton>
            </Slide>

            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              keepMounted
              TransitionProps={{ onExited: () => setAnchorEl(null) }}
              PaperProps={{
                sx: {
                  mt: 1,
                  borderRadius: 2,
                  minWidth: 200,
                  boxShadow: '0 8px 32px rgba(0,0,0,0.2)',
                  backdropFilter: 'blur(10px)',
                  background: 'rgba(255, 255, 255, 0.95)'
                }
              }}
              transformOrigin={{ horizontal: 'right', vertical: 'top' }}
              anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
              {navItems.map((item) => (
                <MenuItem
                  key={item.to}
                  component={Link}
                  to={item.to}
                  onClick={handleClose}
                  selected={location.pathname === item.to}
                  sx={{
                    borderRadius: 1,
                    mx: 1,
                    my: 0.5,
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      background: 'rgba(102, 126, 234, 0.1)',
                      transform: 'translateX(4px)'
                    },
                    '&.Mui-selected': {
                      background: 'rgba(102, 126, 234, 0.2)',
                      '&:hover': { background: 'rgba(102, 126, 234, 0.3)' }
                    }
                  }}
                >
                  {item.icon}
                  <Typography sx={{ ml: 1, fontWeight: location.pathname === item.to ? 600 : 400 }}>
                    {item.label}
                  </Typography>
                </MenuItem>
              ))}

              {user && [
                <Divider sx={{ my: 1 }} key="divider-user" />,
                <MenuItem key="user" disabled sx={{ opacity: 0.7 }}>
                  <PersonIcon fontSize="small" />
                  <Typography sx={{ ml: 1, fontSize: '0.875rem' }}>
                    {user.name}
                  </Typography>
                </MenuItem>
              ]}

              <Divider sx={{ my: 1 }} />
              <MenuItem
                onClick={() => {
                  handleClose()
                  setToken(null)
                  navigate('/login')
                }}
                sx={{
                  borderRadius: 1,
                  mx: 1,
                  my: 0.5,
                  color: 'error.main',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(244, 67, 54, 0.1)',
                    transform: 'translateX(4px)'
                  }
                }}
              >
                <LogoutIcon fontSize="small" />
                <Typography sx={{ ml: 1 }}>Logout</Typography>
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  )
}


