// src/pages/Settings.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Card,
  TextField,
  Button,
  Switch,
  FormControlLabel,
  Divider,
  Stack,
  IconButton,
  Avatar,
  useTheme,
  Grid
} from "@mui/material";
import { 
  User, 
  Bell, 
  Shield, 
  LogOut, 
  Save, 
  Mail, 
  Camera,
  Trash2,
  Lock
} from "lucide-react";
import Layout from "../components/Layout";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const Settings = () => {
  const theme = useTheme();
  const { user, logout } = useAuth();
  const [notifications, setNotifications] = useState(true);
  const [marketing, setMarketing] = useState(false);

  const handleSave = () => {
    // In a real app, this would call an API
    alert("Settings saved successfully!");
  };

  return (
    <Layout>
      <Box sx={{ py: { xs: 3, md: 5 } }}>
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>
                Account Settings
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Manage your profile, notifications, and security preferences.
              </Typography>
            </Box>

            <Grid container spacing={4}>
              {/* Profile Section */}
              <Grid item xs={12}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    borderRadius: 6, 
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'white',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.main', display: 'flex' }}>
                      <User size={24} color="white" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Profile Information
                    </Typography>
                  </Stack>

                  <Box sx={{ display: 'flex', alignItems: 'center', mb: 4, gap: 3 }}>
                    <Box sx={{ position: 'relative' }}>
                      <Avatar 
                        src={user?.avatar} 
                        sx={{ width: 100, height: 100, borderRadius: 4, fontSize: '2.5rem' }}
                      >
                        {user?.name?.charAt(0)}
                      </Avatar>
                      <IconButton 
                        sx={{ 
                          position: 'absolute', 
                          bottom: -10, 
                          right: -10, 
                          bgcolor: 'primary.main',
                          color: 'white',
                          '&:hover': { bgcolor: 'primary.dark' },
                          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.1)'
                        }}
                        size="small"
                      >
                        <Camera size={16} />
                      </IconButton>
                    </Box>
                    <Box>
                      <Typography variant="subtitle1" sx={{ fontWeight: 700 }}>Profile Photo</Typography>
                      <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                        Recommended: Square image, at least 400x400px.
                      </Typography>
                      <Stack direction="row" spacing={1}>
                        <Button size="small" variant="outlined" sx={{ borderRadius: 2 }}>Upload</Button>
                        <Button size="small" color="error" sx={{ borderRadius: 2 }}>Remove</Button>
                      </Stack>
                    </Box>
                  </Box>

                  <Grid container spacing={3}>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Full Name"
                        defaultValue={user?.name}
                        InputProps={{
                          sx: { borderRadius: 3 }
                        }}
                      />
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <TextField
                        fullWidth
                        label="Email Address"
                        defaultValue={user?.email}
                        disabled
                        InputProps={{
                          sx: { borderRadius: 3 },
                          startAdornment: <Mail size={18} style={{ marginRight: 8, opacity: 0.5 }} />
                        }}
                        helperText="Email cannot be changed"
                      />
                    </Grid>
                    <Grid item xs={12}>
                      <TextField
                        fullWidth
                        multiline
                        rows={3}
                        label="Bio"
                        placeholder="Tell us about yourself..."
                        InputProps={{
                          sx: { borderRadius: 3 }
                        }}
                      />
                    </Grid>
                  </Grid>

                  <Box sx={{ mt: 4, display: 'flex', justifyContent: 'flex-end' }}>
                    <Button 
                      variant="contained" 
                      startIcon={<Save size={20} />}
                      onClick={handleSave}
                      sx={{ 
                        borderRadius: 3, 
                        px: 4, 
                        py: 1.2,
                        fontWeight: 700,
                        textTransform: 'none',
                        boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)'
                      }}
                    >
                      Save Changes
                    </Button>
                  </Box>
                </Card>
              </Grid>

              {/* Notifications Section */}
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 6, 
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'white',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'secondary.main', display: 'flex' }}>
                      <Bell size={24} color="white" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Notifications
                    </Typography>
                  </Stack>

                  <Stack spacing={2}>
                    <FormControlLabel
                      control={
                        <Switch
                          checked={notifications}
                          onChange={(e) => setNotifications(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>Email Notifications</Typography>
                          <Typography variant="body2" color="text.secondary">Receive updates about your account activity.</Typography>
                        </Box>
                      }
                      sx={{ m: 0, justifyContent: 'space-between', flexDirection: 'row-reverse', width: '100%' }}
                    />
                    <Divider />
                    <FormControlLabel
                      control={
                        <Switch
                          checked={marketing}
                          onChange={(e) => setMarketing(e.target.checked)}
                          color="primary"
                        />
                      }
                      label={
                        <Box>
                          <Typography variant="body1" sx={{ fontWeight: 600 }}>Marketing Emails</Typography>
                          <Typography variant="body2" color="text.secondary">Receive news about products and features.</Typography>
                        </Box>
                      }
                      sx={{ m: 0, justifyContent: 'space-between', flexDirection: 'row-reverse', width: '100%' }}
                    />
                  </Stack>
                </Card>
              </Grid>

              {/* Security Section */}
              <Grid item xs={12} sm={6}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    height: '100%',
                    borderRadius: 6, 
                    border: '1px solid',
                    borderColor: 'divider',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'white',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'warning.main', display: 'flex' }}>
                      <Shield size={24} color="white" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Security
                    </Typography>
                  </Stack>

                  <Stack spacing={3}>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>Password</Typography>
                      <Button 
                        variant="outlined" 
                        startIcon={<Lock size={18} />}
                        fullWidth
                        sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600 }}
                      >
                        Change Password
                      </Button>
                    </Box>
                    <Box>
                      <Typography variant="body1" sx={{ fontWeight: 600, mb: 1 }}>Two-Factor Authentication</Typography>
                      <Button 
                        variant="outlined" 
                        color="primary"
                        fullWidth
                        sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 600 }}
                      >
                        Enable 2FA
                      </Button>
                    </Box>
                  </Stack>
                </Card>
              </Grid>

              {/* Danger Zone */}
              <Grid item xs={12}>
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 4, 
                    borderRadius: 6, 
                    border: '1px solid',
                    borderColor: 'error.light',
                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.05)' : 'rgba(239, 68, 68, 0.02)',
                  }}
                >
                  <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 3 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'error.main', display: 'flex' }}>
                      <Trash2 size={24} color="white" />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: 'error.main' }}>
                      Danger Zone
                    </Typography>
                  </Stack>
                  
                  <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Once you delete your account, there is no going back. Please be certain.
                  </Typography>

                  <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2}>
                    <Button 
                      variant="contained" 
                      color="error"
                      onClick={logout}
                      startIcon={<LogOut size={20} />}
                      sx={{ borderRadius: 3, px: 4, fontWeight: 700, textTransform: 'none' }}
                    >
                      Logout Session
                    </Button>
                    <Button 
                      variant="outlined" 
                      color="error"
                      sx={{ borderRadius: 3, px: 4, fontWeight: 700, textTransform: 'none' }}
                    >
                      Delete Account
                    </Button>
                  </Stack>
                </Card>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Layout>
  );
};

export default Settings;
