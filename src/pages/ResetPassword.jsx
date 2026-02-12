// src/pages/ResetPassword.jsx
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
    Alert,
    Fade,
    CircularProgress,
    Stack
} from "@mui/material";
import { Lock, Eye, EyeOff, ChevronRight, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
import PasswordStrengthIndicator from "../components/PasswordStrengthIndicator";

const ResetPassword = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const token = searchParams.get("token");
    const { resetPassword } = useAuth();

    const [showPassword, setShowPassword] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [serverError, setServerError] = useState("");

    const formik = useFormik({
        initialValues: { password: "", confirmPassword: "" },
        validationSchema: Yup.object({
            password: Yup.string()
                .min(8, "Password must be at least 8 characters")
                .matches(/[a-z]/, "Must contain at least one lowercase letter")
                .matches(/[A-Z]/, "Must contain at least one uppercase letter")
                .matches(/[0-9]/, "Must contain at least one number")
                .required("Password is required"),
            confirmPassword: Yup.string()
                .oneOf([Yup.ref('password'), null], 'Passwords must match')
                .required('Please confirm your password'),
        }),
        onSubmit: async (values) => {
            if (!token) {
                setServerError("Invalid or missing reset token.");
                return;
            }
            setServerError("");
            try {
                await resetPassword(token, values.password);
                setIsSuccess(true);
            } catch (err) {
                setServerError(err.message || "Failed to reset password");
            }
        },
    });

    if (!token && !isSuccess) {
        return (
            <Box 
                sx={{ 
                    minHeight: '100vh', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    background: (theme) => theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc' 
                }}
            >
                <Card sx={{ p: 4, borderRadius: 6, textAlign: 'center', maxWidth: 400, border: '1px solid', borderColor: 'divider' }}>
                    <Alert severity="error" sx={{ mb: 3, borderRadius: 3 }}>Invalid password reset link.</Alert>
                    <Button 
                        variant="contained" 
                        onClick={() => navigate("/login")}
                        sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700 }}
                    >
                        Back to Login
                    </Button>
                </Card>
            </Box>
        );
    }

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
                        {!isSuccess ? (
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
                                            <Lock color="white" size={32} />
                                        </Box>
                                    </motion.div>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 1.5, letterSpacing: '-0.02em' }}>
                                        Reset Password
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Create a strong new password for your account.
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
                                            name="password"
                                            placeholder="New Password"
                                            type={showPassword ? "text" : "password"}
                                            value={formik.values.password}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.password && !!formik.errors.password}
                                            helperText={formik.touched.password && formik.errors.password}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock size={20} style={{ color: 'var(--mui-palette-text-disabled)' }} />
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

                                        <TextField
                                            fullWidth
                                            name="confirmPassword"
                                            placeholder="Confirm New Password"
                                            type="password"
                                            value={formik.values.confirmPassword}
                                            onChange={formik.handleChange}
                                            onBlur={formik.handleBlur}
                                            error={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                                            helperText={formik.touched.confirmPassword && formik.errors.confirmPassword}
                                            InputProps={{
                                                startAdornment: (
                                                    <InputAdornment position="start">
                                                        <Lock size={20} style={{ color: 'var(--mui-palette-text-disabled)' }} />
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
                                                transition: 'all 0.2s',
                                                mt: 1
                                            }}
                                        >
                                            Update Password
                                        </Button>
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
                                    Success!
                                </Typography>
                                <Typography variant="body2" color="text.secondary" sx={{ mb: 4, px: 2 }}>
                                    Your password has been successfully updated. You can now sign in with your new password.
                                </Typography>
                                <Button
                                    fullWidth
                                    variant="contained"
                                    onClick={() => navigate("/login")}
                                    sx={{
                                        borderRadius: 3,
                                        py: 1.8,
                                        fontWeight: 700,
                                        textTransform: 'none',
                                        fontSize: '1rem',
                                        boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
                                    }}
                                >
                                    Sign In Now
                                </Button>
                            </Box>
                        )}
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
};

export default ResetPassword;
