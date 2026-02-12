// src/pages/Register.jsx
import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    TextField,
    Button,
    InputAdornment,
    IconButton,
    Divider,
    Link as MuiLink,
    useTheme,
    Alert,
    Fade,
    CircularProgress,
    Checkbox,
    FormControlLabel,
    Stack
} from "@mui/material";
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    ChevronRight
} from "lucide-react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import { registerSchema } from "../utils/validationSchema";
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicator";

const Register = () => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { register, loginWithGoogle } = useAuth();
    const [showPassword, setShowPassword] = useState(false);
    const [serverError, setServerError] = useState("");

    const formik = useFormik({
        initialValues: {
            name: "",
            email: "",
            password: "",
            terms: true
        },
        validationSchema: registerSchema,
        onSubmit: async (values) => {
            setServerError("");
            try {
                await register({ name: values.name, email: values.email, password: values.password });
                navigate("/dashboard");
            } catch (err) {
                setServerError(err.message || "Registration failed");
            }
        }
    });

    const handleGoogleSuccess = async (credentialResponse) => {
        try {
            await loginWithGoogle(credentialResponse.credential);
            navigate("/dashboard");
        } catch (err) {
            setServerError("Google login failed");
        }
    };

    return (
        <Box
            sx={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: (theme) => theme.palette.mode === 'dark' 
                    ? 'radial-gradient(circle at 2% 10%, rgba(37, 99, 235, 0.1) 0%, transparent 25%), radial-gradient(circle at 98% 90%, rgba(124, 58, 237, 0.1) 0%, transparent 25%), #0f172a'
                    : 'radial-gradient(circle at 2% 10%, rgba(37, 99, 235, 0.05) 0%, transparent 25%), radial-gradient(circle at 98% 90%, rgba(124, 58, 237, 0.05) 0%, transparent 25%), #f8fafc',
                overflow: 'hidden',
                position: 'relative',
                py: 4
            }}
        >
            {/* Animated Background Elements */}
            <Box
                component={motion.div}
                animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.3, 0.5, 0.3],
                }}
                transition={{ duration: 8, repeat: Infinity }}
                sx={{
                    position: 'absolute',
                    top: '10%',
                    left: '10%',
                    width: '300px',
                    height: '300px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(37, 99, 235, 0.15) 0%, transparent 70%)',
                    filter: 'blur(60px)',
                    zIndex: 0
                }}
            />
            <Box
                component={motion.div}
                animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 10, repeat: Infinity, delay: 1 }}
                sx={{
                    position: 'absolute',
                    bottom: '10%',
                    right: '10%',
                    width: '400px',
                    height: '400px',
                    borderRadius: '50%',
                    background: 'radial-gradient(circle, rgba(124, 58, 237, 0.15) 0%, transparent 70%)',
                    filter: 'blur(80px)',
                    zIndex: 0
                }}
            />

            <Container maxWidth="xs" sx={{ position: 'relative', zIndex: 1 }}>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    style={{ width: '100%', maxWidth: 450, margin: '0 auto' }}
                >
                    <Card
                        elevation={0}
                        sx={{
                            p: { xs: 3, sm: 4 },
                            borderRadius: 8,
                            overflow: "hidden",
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        <Box sx={{ textAlign: 'center', mb: 4 }}>
                            <Box
                                sx={{
                                    width: 60,
                                    height: 60,
                                    borderRadius: 4,
                                    bgcolor: 'primary.main',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    margin: '0 auto 16px',
                                    boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)'
                                }}
                            >
                                <User color="white" size={32} />
                            </Box>
                            <Typography variant="h4" sx={{ fontWeight: 800, mb: 1, letterSpacing: '-0.02em' }}>
                                Create Account
                            </Typography>
                            <Typography variant="body2" color="text.secondary">
                                Join our developer community today
                            </Typography>
                        </Box>

                        {serverError && (
                            <Fade in={!!serverError}>
                                <Alert 
                                    severity="error" 
                                    sx={{ 
                                        mb: 3, 
                                        borderRadius: 4,
                                        border: '1px solid',
                                        borderColor: 'error.light',
                                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(239, 68, 68, 0.1)' : 'rgba(239, 68, 68, 0.05)'
                                    }}
                                >
                                    {serverError}
                                </Alert>
                            </Fade>
                        )}

                        <form onSubmit={formik.handleSubmit}>
                            <Stack spacing={2.5}>
                                <TextField
                                    fullWidth
                                    name="name"
                                    placeholder="Full Name"
                                    value={formik.values.name}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.name && !!formik.errors.name}
                                    helperText={formik.touched.name && formik.errors.name}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <User size={20} style={{ color: theme.palette.text.disabled }} />
                                            </InputAdornment>
                                        ),
                                        sx: { 
                                            borderRadius: 3,
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)'
                                        }
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    name="email"
                                    placeholder="Email Address"
                                    value={formik.values.email}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.email && !!formik.errors.email}
                                    helperText={formik.touched.email && formik.errors.email}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Mail size={20} style={{ color: theme.palette.text.disabled }} />
                                            </InputAdornment>
                                        ),
                                        sx: { 
                                            borderRadius: 3,
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)'
                                        }
                                    }}
                                />

                                <TextField
                                    fullWidth
                                    name="password"
                                    placeholder="Password"
                                    type={showPassword ? "text" : "password"}
                                    value={formik.values.password}
                                    onChange={formik.handleChange}
                                    onBlur={formik.handleBlur}
                                    error={formik.touched.password && !!formik.errors.password}
                                    helperText={formik.touched.password && formik.errors.password}
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <Lock size={20} style={{ color: theme.palette.text.disabled }} />
                                            </InputAdornment>
                                        ),
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton onClick={() => setShowPassword(!showPassword)} edge="end" size="small">
                                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                        sx: { 
                                            borderRadius: 3,
                                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)'
                                        }
                                    }}
                                />

                                <PasswordStrengthIndicator password={formik.values.password} />

                                <FormControlLabel
                                    control={
                                        <Checkbox
                                            size="small"
                                            name="terms"
                                            checked={formik.values.terms}
                                            onChange={formik.handleChange}
                                            sx={{ 
                                                color: 'primary.main', 
                                                '&.Mui-checked': { color: 'primary.main' },
                                                borderRadius: 1
                                            }}
                                        />
                                    }
                                    label={
                                        <Typography variant="caption" color="text.secondary">
                                            I agree to the <MuiLink component={RouterLink} to="/terms" sx={{ fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}>Terms of Service</MuiLink> and <MuiLink component={RouterLink} to="/privacy" sx={{ fontWeight: 700, color: 'primary.main', textDecoration: 'none' }}>Privacy Policy</MuiLink>
                                        </Typography>
                                    }
                                    sx={{ mt: 0, alignItems: 'center' }}
                                />

                                <Button
                                    fullWidth
                                    size="large"
                                    type="submit"
                                    variant="contained"
                                    disabled={formik.isSubmitting}
                                    endIcon={formik.isSubmitting ? <CircularProgress size={20} color="inherit" /> : <ChevronRight size={20} />}
                                    sx={{
                                        py: 1.8,
                                        borderRadius: 3,
                                        fontWeight: 700,
                                        fontSize: '1rem',
                                        textTransform: 'none',
                                        boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
                                        '&:hover': {
                                            boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.4)',
                                            transform: 'translateY(-1px)'
                                        },
                                        transition: 'all 0.2s'
                                    }}
                                >
                                    Create Account
                                </Button>

                                <Divider sx={{ my: 1 }}>
                                    <Typography variant="caption" color="text.disabled" sx={{ px: 1, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                        OR
                                    </Typography>
                                </Divider>

                                <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                    <GoogleLogin
                                        onSuccess={handleGoogleSuccess}
                                        onError={() => setServerError("Google Registration Failed")}
                                        theme="outline"
                                        shape="pill"
                                        width="100%"
                                        text="signup_with"
                                    />
                                </Box>

                                <Box sx={{ mt: 2, textAlign: 'center' }}>
                                    <Typography variant="body2" color="text.secondary">
                                        Already have an account?{' '}
                                        <MuiLink
                                            component={RouterLink}
                                            to="/login"
                                            sx={{ 
                                                fontWeight: 700, 
                                                color: 'primary.main', 
                                                textDecoration: 'none',
                                                '&:hover': { textDecoration: 'underline' }
                                            }}
                                        >
                                            Sign In
                                        </MuiLink>
                                    </Typography>
                                </Box>
                            </Stack>
                        </form>
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
};

export default Register;
