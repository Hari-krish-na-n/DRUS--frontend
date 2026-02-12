// src/pages/ForgotPassword.jsx
import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Card,
    TextField,
    Button,
    InputAdornment,
    Link as MuiLink,
    IconButton,
    Alert,
    Fade,
    CircularProgress,
    Stack
} from "@mui/material";
import { Mail, ChevronRight, ArrowLeft, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

const ForgotPassword = () => {
    const navigate = useNavigate();
    const { forgotPassword } = useAuth();
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [serverError, setServerError] = useState("");

    const formik = useFormik({
        initialValues: { email: "" },
        validationSchema: Yup.object({
            email: Yup.string().email("Invalid email address").required("Email is required"),
        }),
        onSubmit: async (values) => {
            setServerError("");
            try {
                await forgotPassword(values.email);
                setIsSubmitted(true);
            } catch (err) {
                setServerError(err.message || "Failed to send reset link");
            }
        },
    });

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
                position: 'relative',
                overflow: 'hidden'
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
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)',
                            textAlign: 'center'
                        }}
                    >
                        {!isSubmitted ? (
                            <>
                                <Box sx={{ mb: 4 }}>
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                                    >
                                        <Box
                                            sx={{
                                                width: 64,
                                                height: 64,
                                                borderRadius: 4,
                                                bgcolor: 'primary.main',
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                margin: '0 auto 20px',
                                                boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.4)'
                                            }}
                                        >
                                            <Mail color="white" size={32} />
                                        </Box>
                                    </motion.div>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.02em' }}>
                                        Forgot Password?
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Enter your email address and we'll send you a link to reset your password.
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
                                    <Stack spacing={3}>
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
                                                        <Mail size={20} style={{ color: 'var(--mui-palette-text-disabled)' }} />
                                                    </InputAdornment>
                                                ),
                                                sx: { 
                                                    borderRadius: 3,
                                                    bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'rgba(0,0,0,0.02)'
                                                }
                                            }}
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
                                            Send Reset Link
                                        </Button>

                                        <MuiLink
                                            component={RouterLink}
                                            to="/login"
                                            sx={{
                                                display: 'flex',
                                                alignItems: 'center',
                                                justifyContent: 'center',
                                                gap: 1,
                                                fontWeight: 700,
                                                color: 'text.secondary',
                                                textDecoration: 'none',
                                                '&:hover': { color: 'primary.main' },
                                                transition: 'color 0.2s'
                                            }}
                                        >
                                            <ArrowLeft size={18} />
                                            Back to Sign In
                                        </MuiLink>
                                    </Stack>
                                </form>
                            </>
                        ) : (
                            <Box sx={{ py: 2 }}>
                                <motion.div
                                    initial={{ scale: 0 }}
                                    animate={{ scale: 1 }}
                                    transition={{ type: 'spring', stiffness: 200, damping: 10 }}
                                >
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            bgcolor: 'success.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 24px',
                                            boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.4)'
                                        }}
                                    >
                                        <CheckCircle2 size={48} color="white" />
                                    </Box>
                                </motion.div>
                                <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
                                    Check Your Email
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, px: 2 }}>
                                    We have sent a password reset link to <br />
                                    <Typography component="span" variant="body2" sx={{ fontWeight: 700, color: 'text.primary' }}>
                                        {formik.values.email}
                                    </Typography>
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="outlined"
                                    onClick={() => navigate("/login")}
                                    sx={{ 
                                        borderRadius: 3, 
                                        py: 1.5, 
                                        fontWeight: 700, 
                                        textTransform: 'none',
                                        borderWidth: 2,
                                        '&:hover': { borderWidth: 2 }
                                    }}
                                >
                                    Return to Login
                                </Button>
                                <Typography variant="body2" color="text.secondary" sx={{ mt: 4 }}>
                                    Didn't receive the email? Check your spam folder or{' '}
                                    <MuiLink 
                                        component="button" 
                                        variant="body2" 
                                        onClick={() => setIsSubmitted(false)} 
                                        sx={{ 
                                            fontWeight: 700, 
                                            color: 'primary.main',
                                            textDecoration: 'none',
                                            '&:hover': { textDecoration: 'underline' }
                                        }}
                                    >
                                        try again
                                    </MuiLink>
                                </Typography>
                            </Box>
                        )}
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ForgotPassword;
