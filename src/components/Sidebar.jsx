// src/components/Sidebar.jsx
import React from "react";
import {
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Box,
  Typography,
  IconButton,
  Divider,
  Avatar,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import {
  LayoutDashboard,
  User,
  LineChart,
  FileText,
  Trophy,
  Settings,
  LogOut,
  Code as CodeIcon,
  X,
  ChevronRight,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const DRAWER_WIDTH = 260;

const Sidebar = ({ drawerOpen, onToggle }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  const menuItems = [
    { text: "Dashboard", icon: <LayoutDashboard size={20} />, path: "/dashboard", color: "#667eea" },
    { text: "Profiles", icon: <User size={20} />, path: "/profile", color: "#764ba2" },
    { text: "Analytics", icon: <LineChart size={20} />, path: "/analytics", color: "#ed64a6" },
    { text: "Reports", icon: <FileText size={20} />, path: "/reports", color: "#ecc94b" },
    { text: "Achievements", icon: <Trophy size={20} />, path: "/achievements", color: "#48bb78" },
    { text: "Settings", icon: <Settings size={20} />, path: "/settings", color: "#a0aec0" },
  ];

  const handleNavigation = (path) => {
    navigate(path);
    if (isMobile && onToggle) onToggle();
  };

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  const drawerContent = (
    <Box sx={{ height: "100%", display: "flex", flexDirection: "column", bgcolor: 'background.paper' }}>
      {/* Brand Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          px: 3,
          py: 3,
        }}
      >
        <Box sx={{ display: "flex", alignItems: "center", gap: 1.5 }}>
          <Box 
            sx={{ 
              width: 32, 
              height: 32, 
              borderRadius: 2, 
              bgcolor: 'primary.main', 
              display: 'flex', 
              alignItems: 'center', 
              justifyContent: 'center',
              boxShadow: '0 4px 12px rgba(99, 102, 241, 0.3)'
            }}
          >
            <CodeIcon size={20} color="#ffffff" />
          </Box>
          <Typography variant="h6" fontWeight={800} sx={{ letterSpacing: '-0.02em', color: 'text.primary' }}>
            DRUS
          </Typography>
        </Box>
        {isMobile && (
          <IconButton onClick={onToggle} size="small" sx={{ color: 'text.secondary' }}>
            <X size={18} />
          </IconButton>
        )}
      </Box>

      {/* User Section */}
      <Box sx={{ px: 3, py: 2, mb: 2 }}>
        <Box 
          sx={{ 
            p: 2, 
            borderRadius: 4, 
            bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
            display: "flex", 
            alignItems: "center", 
            gap: 2 
          }}
        >
          <Avatar 
            sx={{ 
              width: 40, 
              height: 40, 
              bgcolor: "primary.main",
              boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
            }}
          >
            {(user?.name || user?.email || "U").charAt(0).toUpperCase()}
          </Avatar>
          <Box sx={{ overflow: 'hidden' }}>
            <Typography variant="subtitle2" fontWeight={700} noWrap sx={{ color: 'text.primary' }}>
              {user?.name || "Developer"}
            </Typography>
            <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
              Pro Member
            </Typography>
          </Box>
        </Box>
      </Box>

      {/* Navigation */}
      <Box sx={{ flexGrow: 1, overflowY: "auto", px: 2 }}>
        <Typography 
          variant="caption" 
          sx={{ 
            px: 2, 
            mb: 1, 
            display: 'block', 
            textTransform: 'uppercase', 
            fontWeight: 700, 
            color: 'text.secondary',
            letterSpacing: '0.1em',
            fontSize: '0.65rem'
          }}
        >
          Main Menu
        </Typography>
        <List sx={{ p: 0 }}>
          {menuItems.map((item) => {
            const isActive = location.pathname === item.path;
            return (
              <ListItemButton
                key={item.text}
                onClick={() => handleNavigation(item.path)}
                sx={{
                  borderRadius: 3,
                  mb: 1,
                  px: 2,
                  py: 1.2,
                  position: "relative",
                  transition: 'all 0.2s ease',
                  bgcolor: isActive ? 'primary.main' : 'transparent',
                  color: isActive ? '#ffffff' : 'text.secondary',
                  boxShadow: isActive ? '0 8px 16px -4px rgba(99, 102, 241, 0.4)' : 'none',
                  "&:hover": {
                    bgcolor: isActive ? 'primary.main' : theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                    transform: isActive ? 'none' : "translateX(4px)",
                  },
                }}
              >
                <ListItemIcon
                  sx={{
                    minWidth: 32,
                    color: isActive ? '#ffffff' : 'text.secondary',
                    transition: 'all 0.2s ease',
                  }}
                >
                  {React.cloneElement(item.icon, { size: 18 })}
                </ListItemIcon>
                <ListItemText
                  primary={item.text}
                  primaryTypographyProps={{ 
                    fontSize: 14, 
                    fontWeight: isActive ? 700 : 500,
                    letterSpacing: '-0.01em'
                  }}
                />
                {isActive && (
                  <Box 
                    sx={{ 
                      width: 6, 
                      height: 6, 
                      borderRadius: '50%', 
                      bgcolor: '#ffffff',
                      ml: 1
                    }} 
                  />
                )}
              </ListItemButton>
            );
          })}
        </List>
      </Box>

      {/* Footer / Logout */}
      <Box sx={{ p: 2, mt: 'auto' }}>
        <ListItemButton
          onClick={handleLogout}
          sx={{
            borderRadius: 3,
            py: 1.2,
            color: "error.main",
            "&:hover": { 
              bgcolor: "error.lighter",
              transform: 'translateX(4px)'
            },
          }}
        >
          <ListItemIcon sx={{ minWidth: 32, color: "error.main" }}>
            <LogOut size={18} />
          </ListItemIcon>
          <ListItemText
            primary="Logout"
            primaryTypographyProps={{ fontSize: 14, fontWeight: 600 }}
          />
        </ListItemButton>
      </Box>
    </Box>
  );

  return isMobile ? (
    <Drawer
      variant="temporary"
      open={drawerOpen}
      onClose={onToggle}
      ModalProps={{ keepMounted: true }}
      sx={{
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  ) : (
    <Drawer
      variant="permanent"
      open
      sx={{
        width: DRAWER_WIDTH,
        flexShrink: 0,
        "& .MuiDrawer-paper": {
          width: DRAWER_WIDTH,
          boxSizing: "border-box",
        },
      }}
    >
      {drawerContent}
    </Drawer>
  );
};

export default Sidebar;
