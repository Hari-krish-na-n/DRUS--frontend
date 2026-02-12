// src/pages/NotFound.jsx
import React from "react";
import { Box, Typography, Button, Container } from "@mui/material";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Home, ArrowLeft } from "lucide-react";

const NotFound = () => {
    const navigate = useNavigate();

    return (
        <Container maxWidth="md">
            <Box
                sx={{
                    height: '100vh',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    textAlign: 'center'
                }}
            >
                <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                >
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: { xs: '8rem', md: '12rem' },
                            fontWeight: 900,
                            lineHeight: 1,
                            background: 'linear-gradient(45deg, #667eea, #764ba2)',
                            WebkitBackgroundClip: 'text',
                            WebkitTextFillColor: 'transparent',
                            mb: 2
                        }}
                    >
                        404
                    </Typography>
                </motion.div>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                >
                    <Typography variant="h4" sx={{ fontWeight: 800, mb: 2 }}>
                        Page Not Found
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mb: 6, maxWidth: 500, mx: 'auto' }}>
                        The page you're looking for doesn't exist or has been moved.
                        Check the URL or return to the dashboard.
                    </Typography>

                    <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                        <Button
                            variant="contained"
                            size="large"
                            startIcon={<Home size={20} />}
                            onClick={() => navigate('/dashboard')}
                            sx={{
                                borderRadius: 4,
                                px: 4,
                                py: 1.5,
                                fontWeight: 700,
                                textTransform: 'none',
                                background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)'
                            }}
                        >
                            Go to Dashboard
                        </Button>
                        <Button
                            variant="outlined"
                            size="large"
                            startIcon={<ArrowLeft size={20} />}
                            onClick={() => navigate(-1)}
                            sx={{ borderRadius: 4, px: 4, fontWeight: 700, textTransform: 'none' }}
                        >
                            Go Back
                        </Button>
                    </Box>
                </motion.div>
            </Box>
        </Container>
    );
};

export default NotFound;
