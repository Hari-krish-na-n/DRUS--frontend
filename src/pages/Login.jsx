// src/pages/Login.jsx
import React, { useState } from "react";
import {
  Box,
  Card,
  CardContent,
  TextField,
  Button,
  Typography,
  Alert,
  InputAdornment,
  IconButton,
  Divider,
} from "@mui/material";
import { 
  Visibility, 
  VisibilityOff, 
  Code as CodeIcon, 
  Lock as LockIcon, 
  Email as EmailIcon 
} from "@mui/icons-material";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { GoogleLogin } from "@react-oauth/google";
import { apiFetch } from "../api/client";
import { useAuth } from "../hooks/useAuth";
import { motion } from "framer-motion";

const Login = () => {
  const navigate = useNavigate();
  const { setUser, setToken, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      setLoading(true);
      await loginWithGoogle(credentialResponse.credential);
      navigate("/dashboard");
    } catch (err) {
      setError("Google login failed");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const data = await apiFetch("/api/auth/login", {
        method: "POST",
        body: JSON.stringify({ email, password }),
      });
      setToken(data.token);
      setUser(data.user);
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Login failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: (theme) => theme.palette.mode === 'dark' 
          ? 'radial-gradient(circle at 2% 10%, rgba(99, 102, 241, 0.15) 0%, transparent 40%), radial-gradient(circle at 98% 90%, rgba(168, 85, 247, 0.15) 0%, transparent 40%), #0f172a'
          : 'radial-gradient(circle at 2% 10%, rgba(99, 102, 241, 0.08) 0%, transparent 40%), radial-gradient(circle at 98% 90%, rgba(168, 85, 247, 0.08) 0%, transparent 40%), #f8fafc',
        p: 2,
        position: 'relative',
        overflow: 'hidden'
      }}
    >
      {/* Background shapes */}
      <Box sx={{ position: 'absolute', top: '10%', left: '5%', width: 300, height: 300, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.1) 0%, transparent 100%)', filter: 'blur(60px)', zIndex: 0 }} />
      <Box sx={{ position: 'absolute', bottom: '10%', right: '5%', width: 300, height: 300, borderRadius: '50%', background: 'linear-gradient(135deg, rgba(168, 85, 247, 0.1) 0%, transparent 100%)', filter: 'blur(60px)', zIndex: 0 }} />

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        style={{ width: '100%', maxWidth: 450, position: 'relative', zIndex: 1 }}
      >
        <Card
          elevation={0}
          sx={{
            borderRadius: 8,
            overflow: "hidden",
            border: '1px solid',
            borderColor: 'divider',
            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(20px)',
            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Box
            sx={{
              p: 4,
              textAlign: 'center',
              borderBottom: '1px solid',
              borderColor: 'divider'
            }}
          >
            <Box 
              sx={{ 
                width: 48, 
                height: 48, 
                borderRadius: 3, 
                bgcolor: 'primary.main', 
                display: 'flex', 
                alignItems: 'center', 
                justifyContent: 'center',
                mx: 'auto',
                mb: 2.5,
                boxShadow: '0 8px 16px rgba(99, 102, 241, 0.3)'
              }}
            >
              <CodeIcon sx={{ color: 'white', fontSize: 28 }} />
            </Box>
            <Typography variant="h4" fontWeight={900} sx={{ letterSpacing: '-0.03em', mb: 1 }}>
              Welcome Back
            </Typography>
            <Typography variant="body1" color="text.secondary" fontWeight={500}>
              Elevate your coding journey with DRUS
            </Typography>
          </Box>

          <CardContent sx={{ p: 4 }}>
            {error && (
              <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>
                {error}
              </Alert>
            )}

            <form onSubmit={handleSubmit}>
              <Box sx={{ mb: 2.5 }}>
                <Typography variant="body2" fontWeight={700} sx={{ mb: 1, ml: 0.5, color: 'text.secondary' }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  variant="outlined"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <EmailIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)' }
                  }}
                />
              </Box>

              <Box sx={{ mb: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                  <Typography variant="body2" fontWeight={700} sx={{ ml: 0.5, color: 'text.secondary' }}>
                    Password
                  </Typography>
                  <Typography 
                    variant="caption" 
                    component={RouterLink} 
                    to="/forgot-password" 
                    sx={{ color: 'primary.main', fontWeight: 700, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}
                  >
                    Forgot Password?
                  </Typography>
                </Box>
                <TextField
                  fullWidth
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <LockIcon sx={{ color: 'text.disabled', fontSize: 20 }} />
                      </InputAdornment>
                    ),
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                          {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                        </IconButton>
                      </InputAdornment>
                    ),
                    sx: { borderRadius: 3, bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)' }
                  }}
                />
              </Box>

              <Button
                fullWidth
                type="submit"
                variant="contained"
                size="large"
                disabled={loading}
                sx={{
                  mt: 4,
                  py: 1.5,
                  borderRadius: 3,
                  fontWeight: 800,
                  fontSize: '1rem',
                  textTransform: 'none',
                  boxShadow: '0 10px 20px -5px rgba(99, 102, 241, 0.4)',
                  '&:hover': {
                    boxShadow: '0 15px 25px -5px rgba(99, 102, 241, 0.5)',
                  }
                }}
              >
                {loading ? "Signing in..." : "Sign In"}
              </Button>
            </form>

            <Box sx={{ my: 3.5, display: 'flex', alignItems: 'center' }}>
              <Divider sx={{ flexGrow: 1 }} />
              <Typography variant="body2" color="text.disabled" sx={{ px: 2, fontWeight: 700 }}>
                OR
              </Typography>
              <Divider sx={{ flexGrow: 1 }} />
            </Box>

            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <GoogleLogin
                onSuccess={handleGoogleSuccess}
                onError={() => setError("Google login failed")}
                useOneTap
                theme="filled_blue"
                shape="pill"
                text="signin_with"
                width="100%"
              />
            </Box>

            <Box sx={{ mt: 4, textAlign: 'center' }}>
              <Typography variant="body2" color="text.secondary" fontWeight={500}>
                Don't have an account?{" "}
                <Typography
                  component={RouterLink}
                  to="/register"
                  sx={{ 
                    color: 'primary.main', 
                    fontWeight: 800, 
                    textDecoration: 'none',
                    '&:hover': { textDecoration: 'underline' }
                  }}
                >
                  Create Account
                </Typography>
              </Typography>
            </Box>
          </CardContent>
        </Card>
      </motion.div>
    </Box>
  );
};

export default Login;
