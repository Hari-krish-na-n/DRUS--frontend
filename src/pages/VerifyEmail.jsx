// src/pages/VerifyEmail.jsx
import React, { useState, useEffect } from "react";
import { Box, Card, Typography, Button, Fade, CircularProgress, Container } from "@mui/material";
import { CheckCircle2, AlertCircle, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useNavigate, useSearchParams } from "react-router-dom";

const VerifyEmail = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const [status, setStatus] = useState("verifying"); // verifying, success, error

    useEffect(() => {
        // Simulate verification delay
        const timer = setTimeout(() => {
            setStatus("success");
        }, 2000);
        return () => clearTimeout(timer);
    }, []);

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
                            p: { xs: 4, sm: 6 },
                            borderRadius: 8,
                            textAlign: 'center',
                            overflow: "hidden",
                            border: '1px solid',
                            borderColor: 'divider',
                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : 'rgba(255, 255, 255, 0.8)',
                            backdropFilter: 'blur(20px)',
                            boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.1)'
                        }}
                    >
                        {status === 'verifying' && (
                            <Fade in={true}>
                                <Box>
                                    <CircularProgress size={64} thickness={4} sx={{ mb: 4 }} />
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.02em' }}>
                                        Verifying Email
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary">
                                        Please wait while we confirm your email address...
                                    </Typography>
                                </Box>
                            </Fade>
                        )}

                        {status === 'success' && (
                            <Fade in={true}>
                                <Box>
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            bgcolor: 'success.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 32px',
                                            boxShadow: '0 10px 15px -3px rgba(34, 197, 94, 0.4)'
                                        }}
                                    >
                                        <CheckCircle2 size={48} color="white" />
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.02em' }}>
                                        Email Verified!
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                        Your account has been successfully verified. You can now access all features of DRUS.
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant="contained"
                                        size="large"
                                        endIcon={<ArrowRight size={20} />}
                                        onClick={() => navigate('/login')}
                                        sx={{
                                            borderRadius: 3,
                                            py: 1.8,
                                            fontWeight: 700,
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.3)',
                                            '&:hover': {
                                                boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.4)',
                                                transform: 'translateY(-1px)'
                                            },
                                            transition: 'all 0.2s'
                                        }}
                                    >
                                        Go to Login
                                    </Button>
                                </Box>
                            </Fade>
                        )}

                        {status === 'error' && (
                            <Fade in={true}>
                                <Box>
                                    <Box
                                        sx={{
                                            width: 80,
                                            height: 80,
                                            borderRadius: '50%',
                                            bgcolor: 'error.main',
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            margin: '0 auto 32px',
                                            boxShadow: '0 10px 15px -3px rgba(239, 68, 68, 0.4)'
                                        }}
                                    >
                                        <AlertCircle size={48} color="white" />
                                    </Box>
                                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2, letterSpacing: '-0.02em' }}>
                                        Verification Failed
                                    </Typography>
                                    <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                        The verification link is invalid or has expired. Please request a new one.
                                    </Typography>
                                    <Button
                                        fullWidth
                                        variant="outlined"
                                        size="large"
                                        onClick={() => navigate('/login')}
                                        sx={{ 
                                            borderRadius: 3, 
                                            py: 1.8, 
                                            fontWeight: 700, 
                                            textTransform: 'none',
                                            fontSize: '1rem',
                                            borderWidth: 2,
                                            '&:hover': { borderWidth: 2 }
                                        }}
                                    >
                                        Back to Login
                                    </Button>
                                </Box>
                            </Fade>
                        )}
                    </Card>
                </motion.div>
            </Container>
        </Box>
    );
};

export default VerifyEmail;
