// src/components/Header.jsx
import React from "react";
import {
  AppBar,
  Toolbar,
  Typography,
  IconButton,
  Box,
  Avatar,
  Menu,
  MenuItem,
  Badge,
  Tooltip,
  useTheme as useMuiTheme,
  Button,
  Divider,
  Fade
} from "@mui/material";
import {
  Bell,
  Settings,
  User,
  LogOut,
  Sun,
  Moon,
  Menu as MenuIcon,
  Search,
  LayoutDashboard,
  BarChart3,
  Trophy,
  FileText,
  UserCircle
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../context/ThemeContext";

const NAV_ITEMS = [
  { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
  { label: 'Profile', path: '/profile', icon: UserCircle },
  { label: 'Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Reports', path: '/reports', icon: FileText },
  { label: 'Achievements', path: '/achievements', icon: Trophy },
];

const Header = ({ onDrawerToggle, drawerWidth = 260 }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const muiTheme = useMuiTheme();
  const { user, logout } = useAuth();
  const { mode, toggleTheme } = useTheme();

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notificationEl, setNotificationEl] = React.useState(null);

  const handleProfileMenuOpen = (event) => setAnchorEl(event.currentTarget);
  const handleNotificationMenuOpen = (event) => setNotificationEl(event.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    setNotificationEl(null);
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
    handleMenuClose();
  };

  const handleSettings = () => {
    navigate("/settings");
    handleMenuClose();
  };

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        width: '100%',
        background: mode === 'dark'
          ? 'rgba(17, 24, 39, 0.8)'
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: "blur(12px) saturate(180%)",
        borderBottom: "1px solid",
        borderColor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(0,0,0,0.06)',
        color: "text.primary",
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Toolbar sx={{ justifyContent: "space-between", px: { xs: 2, sm: 4 }, height: 70 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
          {/* Logo */}
          <Typography
            variant="h5"
            sx={{
              fontWeight: 900,
              background: 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              cursor: 'pointer',
              letterSpacing: '-0.02em'
            }}
            onClick={() => navigate('/dashboard')}
          >
            DRUS
          </Typography>

          {/* Desktop Navigation */}
          <Box sx={{ display: { xs: 'none', md: 'flex' }, alignItems: 'center', gap: 1 }}>
            {NAV_ITEMS.map((item) => {
              const isActive = location.pathname === item.path;
              const Icon = item.icon;
              return (
                <Button
                  key={item.path}
                  onClick={() => navigate(item.path)}
                  startIcon={<Icon size={18} />}
                  sx={{
                    px: 2,
                    py: 1,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: isActive ? 700 : 500,
                    color: isActive ? 'primary.main' : 'text.secondary',
                    bgcolor: isActive ? 'primary.main' + '10' : 'transparent',
                    '&:hover': {
                      bgcolor: isActive ? 'primary.main' + '15' : 'action.hover',
                      color: isActive ? 'primary.main' : 'text.primary',
                    },
                    transition: 'all 0.2s'
                  }}
                >
                  {item.label}
                </Button>
              );
            })}
          </Box>
        </Box>

        {/* Right Actions */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: { xs: 1, sm: 2 } }}>
          <Box sx={{ display: { xs: 'none', lg: 'flex' }, mr: 1 }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                px: 2,
                py: 0.8,
                borderRadius: 3,
                width: 200,
                border: '1px solid',
                borderColor: 'transparent',
                transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                '&:focus-within': {
                  bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.08)' : 'rgba(255,255,255,1)',
                  borderColor: 'primary.main',
                  width: 240,
                },
              }}
            >
              <Search size={16} color={muiTheme.palette.text.secondary} />
              <input
                placeholder="Search..."
                style={{
                  background: 'none',
                  border: 'none',
                  outline: 'none',
                  width: '100%',
                  color: muiTheme.palette.text.primary,
                  fontSize: '0.85rem',
                  fontWeight: 500,
                }}
              />
            </Box>
          </Box>
          <Tooltip title={`Switch to ${mode === 'dark' ? 'light' : 'dark'} mode`}>
            <IconButton 
              onClick={toggleTheme} 
              sx={{ 
                bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                '&:hover': { bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
              }}
            >
              {mode === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
            </IconButton>
          </Tooltip>

          <IconButton 
            onClick={handleNotificationMenuOpen}
            sx={{ 
              bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
              '&:hover': { bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.1)' : 'rgba(0,0,0,0.05)' }
            }}
          >
            <Badge badgeContent={4} color="error" overlap="circular" sx={{ '& .MuiBadge-badge': { fontSize: '0.65rem', height: 16, minWidth: 16 } }}>
              <Bell size={20} />
            </Badge>
          </IconButton>

          <Divider orientation="vertical" flexItem sx={{ mx: 1, height: 24, alignSelf: 'center', borderColor: 'divider' }} />

          <Button
            onClick={handleProfileMenuOpen}
            sx={{
              p: 0.5,
              pr: 1.5,
              borderRadius: 3,
              color: 'text.primary',
              '&:hover': { bgcolor: mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }
            }}
          >
            <Avatar
              sx={{
                width: 32,
                height: 32,
                mr: 1.5,
                bgcolor: 'primary.main',
                fontSize: '0.9rem',
                fontWeight: 700,
                boxShadow: '0 2px 8px rgba(99, 102, 241, 0.3)'
              }}
            >
              {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
            </Avatar>
            <Box sx={{ display: { xs: 'none', sm: 'block' }, textAlign: 'left' }}>
              <Typography variant="subtitle2" fontWeight={700} sx={{ lineHeight: 1.2 }}>
                {user?.name || "Developer"}
              </Typography>
              <Typography variant="caption" color="text.secondary" sx={{ display: 'block', lineHeight: 1 }}>
                Pro
              </Typography>
            </Box>
          </Button>
        </Box>

        {/* Profile Menu */}
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
          TransitionComponent={Fade}
          anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
          transformOrigin={{ vertical: "top", horizontal: "right" }}
          PaperProps={{
            sx: {
              mt: 2,
              minWidth: 240,
              borderRadius: 4,
              boxShadow: "0 20px 50px rgba(0,0,0,0.15)",
              p: 1,
              background: mode === 'dark' ? 'rgba(31, 41, 55, 0.95)' : 'rgba(255, 255, 255, 0.95)',
              backdropFilter: 'blur(10px)'
            }
          }}
        >
          <Box sx={{ px: 2, py: 2 }}>
            <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>{user?.name}</Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>{user?.email}</Typography>
            <Box sx={{ px: 1, py: 0.5, bgcolor: 'primary.main', color: 'white', borderRadius: 2, width: 'fit-content' }}>
              <Typography variant="caption" sx={{ fontWeight: 700 }}>PREMIUM PLAN</Typography>
            </Box>
          </Box>
          <Divider sx={{ my: 1, opacity: 0.5 }} />
          <MenuItem onClick={() => { navigate('/profile'); handleMenuClose(); }} sx={{ borderRadius: 2, py: 1.5 }}>
            <User size={18} style={{ marginRight: '16px' }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>My Profile</Typography>
          </MenuItem>
          <MenuItem onClick={handleSettings} sx={{ borderRadius: 2, py: 1.5 }}>
            <Settings size={18} style={{ marginRight: '16px' }} />
            <Typography variant="body2" sx={{ fontWeight: 600 }}>Account Settings</Typography>
          </MenuItem>
          <Divider sx={{ my: 1, opacity: 0.5 }} />
          <MenuItem onClick={handleLogout} sx={{ borderRadius: 2, py: 1.5, color: 'error.main' }}>
            <LogOut size={18} style={{ marginRight: '16px' }} />
            <Typography variant="body2" sx={{ fontWeight: 700 }}>Sign Out</Typography>
          </MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  );
};

export default Header;