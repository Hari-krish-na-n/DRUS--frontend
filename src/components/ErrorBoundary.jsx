// src/components/ErrorBoundary.jsx
import React from "react";
import { Box, Typography, Button, Paper } from "@mui/material";
import { AlertCircle, RotateCcw, Home } from "lucide-react";

class ErrorBoundary extends React.Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("ErrorBoundary caught an error", error, errorInfo);
    }

    render() {
        if (this.state.hasError) {
            return (
                <Box
                    sx={{
                        height: '100vh',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        p: 3,
                        bgcolor: 'background.default'
                    }}
                >
                    <Paper
                        sx={{
                            p: 6,
                            borderRadius: 6,
                            textAlign: 'center',
                            maxWidth: 500,
                            border: '1px solid',
                            borderColor: 'divider'
                        }}
                    >
                        <Box sx={{ color: 'error.main', mb: 3 }}>
                            <AlertCircle size={64} />
                        </Box>
                        <Typography variant="h4" sx={{ fontWeight: 900, mb: 2 }}>Oops! Something went wrong.</Typography>
                        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
                            An unexpected error occurred. Don't worry, we've logged the issue and it's being looked into.
                        </Typography>

                        <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                            <Button
                                variant="contained"
                                startIcon={<RotateCcw size={18} />}
                                onClick={() => window.location.reload()}
                                sx={{ borderRadius: 3, px: 4, fontWeight: 700, textTransform: 'none' }}
                            >
                                Reload Page
                            </Button>
                            <Button
                                variant="outlined"
                                startIcon={<Home size={18} />}
                                onClick={() => window.location.href = '/'}
                                sx={{ borderRadius: 3, px: 4, fontWeight: 700, textTransform: 'none' }}
                            >
                                Go Home
                            </Button>
                        </Box>

                        {process.env.NODE_ENV === 'development' && (
                            <Box sx={{ mt: 4, p: 2, bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 2, textAlign: 'left' }}>
                                <Typography variant="caption" sx={{ fontFamily: 'monospace', color: 'error.main' }}>
                                    {this.state.error?.toString()}
                                </Typography>
                            </Box>
                        )}
                    </Paper>
                </Box>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
