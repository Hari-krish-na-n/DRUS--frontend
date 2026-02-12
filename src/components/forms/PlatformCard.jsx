// src/components/profile/PlatformCard.jsx
import React from "react";
import {
    Paper,
    Box,
    Typography,
    Button,
    Chip,
    IconButton,
    Tooltip,
    LinearProgress,
    useTheme,
    Grid
} from "@mui/material";

import {
    Plus,
    Check,
    RefreshCw,
    Unlink
} from "lucide-react";
import { motion } from "framer-motion";

const PlatformCard = ({ platform, onConnect, onDisconnect, onSync, onViewDetails }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const isConnected = !!platform.username;

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 400, damping: 25 }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 3.5,
                    borderRadius: 6,
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                    border: '1px solid',
                    borderColor: isConnected ? `${platform.color}40` : 'divider',
                    transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    boxShadow: isConnected 
                        ? `0 10px 30px -10px ${platform.color}20` 
                        : '0 10px 40px rgba(0,0,0,0.03)',
                    '&:hover': {
                        borderColor: platform.color,
                        boxShadow: `0 20px 40px -12px ${platform.color}30`,
                    }
                }}
            >
                {/* Header Section */}
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2.5 }}>
                        <Box
                            sx={{
                                width: 56,
                                height: 56,
                                borderRadius: 4,
                                bgcolor: isConnected ? `${platform.color}15` : 'rgba(0,0,0,0.03)',
                                color: isConnected ? platform.color : 'text.disabled',
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                transition: 'all 0.3s',
                                border: '1px solid',
                                borderColor: isConnected ? `${platform.color}30` : 'transparent'
                            }}
                        >
                            {platform.icon && <platform.icon size={28} strokeWidth={2.5} />}
                        </Box>
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800, fontSize: '1.2rem', letterSpacing: '-0.02em' }}>
                                {platform.name}
                            </Typography>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
                                {platform.category || 'Coding Platform'}
                            </Typography>
                        </Box>
                    </Box>
                    {isConnected && (
                        <Chip
                            icon={<Check size={14} color="#10b981" />}
                            label="Connected"
                            size="small"
                            sx={{
                                bgcolor: 'rgba(16, 185, 129, 0.1)',
                                color: '#10b981',
                                fontWeight: 800,
                                fontSize: '0.7rem',
                                border: '1px solid rgba(16, 185, 129, 0.2)',
                                height: 24,
                                '& .MuiChip-icon': { ml: 1 }
                            }}
                        />
                    )}
                </Box>

                {/* Content Section */}
                {isConnected ? (
                    <Box sx={{ flexGrow: 1 }}>
                        <Box sx={{ mb: 3.5, p: 2, borderRadius: 3, bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)', border: '1px solid', borderColor: 'divider' }}>
                            <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', mb: 0.5, opacity: 0.7 }}>
                                USERNAME
                            </Typography>
                            <Typography variant="subtitle1" sx={{ fontWeight: 800, color: 'text.primary', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                                {platform.username}
                            </Typography>
                        </Box>

                        <Box sx={{ mb: 3.5 }}>
                            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>PERFORMANCE SCORE</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 900, color: platform.color }}>
                                    {platform.stats?.rating ? `${Math.min(100, Math.floor(platform.stats.rating / 25))}%` : '84%'}
                                </Typography>
                            </Box>
                            <LinearProgress
                                variant="determinate"
                                value={platform.stats?.rating ? Math.min(100, Math.floor(platform.stats.rating / 25)) : 84}
                                sx={{
                                    height: 8,
                                    borderRadius: 4,
                                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                    '& .MuiLinearProgress-bar': { 
                                        bgcolor: platform.color, 
                                        borderRadius: 4,
                                        boxShadow: `0 0 12px ${platform.color}40`
                                    }
                                }}
                            />
                        </Box>

                        <Grid container spacing={2} sx={{ mb: 4 }}>
                            <Grid item xs={6}>
                                <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.03em' }}>{platform.stats?.total || 0}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Problems Solved</Typography>
                            </Grid>
                            <Grid item xs={6}>
                                <Typography variant="h5" sx={{ fontWeight: 900, letterSpacing: '-0.03em', color: platform.color }}>{platform.stats?.rating || 'N/A'}</Typography>
                                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>Rating</Typography>
                            </Grid>
                        </Grid>
                    </Box>
                ) : (
                    <Box sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', py: 5, textAlign: 'center' }}>
                        <Box sx={{ mb: 2, opacity: 0.2 }}>
                            {platform.icon && <platform.icon size={48} />}
                        </Box>
                        <Typography variant="body2" color="text.secondary" sx={{ maxWidth: 220, fontWeight: 500, lineHeight: 1.6 }}>
                            Sync your {platform.name} profile to showcase your achievements here.
                        </Typography>
                    </Box>
                )}

                {/* Footer Section */}
                <Box sx={{ display: 'flex', gap: 1.5, mt: 'auto' }}>
                    {isConnected ? (
                        <>
                            <Button
                                fullWidth
                                variant="contained"
                                onClick={() => onViewDetails(platform)}
                                sx={{
                                    borderRadius: 3,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    bgcolor: platform.color,
                                    boxShadow: `0 8px 20px -6px ${platform.color}60`,
                                    '&:hover': { bgcolor: platform.color, filter: 'brightness(0.9)', boxShadow: `0 12px 24px -6px ${platform.color}80` }
                                }}
                            >
                                View Analytics
                            </Button>
                            <Tooltip title="Refresh Stats">
                                <IconButton
                                    onClick={() => onSync(platform.id)}
                                    sx={{ 
                                        borderRadius: 3, 
                                        border: '1.5px solid', 
                                        borderColor: 'divider',
                                        '&:hover': { bgcolor: 'action.hover' }
                                    }}
                                >
                                    <RefreshCw size={18} />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Disconnect">
                                <IconButton
                                    onClick={() => onDisconnect(platform.id)}
                                    sx={{ 
                                        borderRadius: 3, 
                                        border: '1.5px solid', 
                                        borderColor: 'divider', 
                                        color: 'error.main',
                                        '&:hover': { bgcolor: 'error.lighter', borderColor: 'error.main' }
                                    }}
                                >
                                    <Unlink size={18} />
                                </IconButton>
                            </Tooltip>
                        </>
                    ) : (
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => onConnect(platform)}
                            startIcon={<Plus size={18} />}
                            sx={{
                                borderRadius: 3,
                                py: 1.2,
                                textTransform: 'none',
                                fontWeight: 700,
                                border: '1.5px solid',
                                '&:hover': { border: '1.5px solid', bgcolor: 'primary.lighter' }
                            }}
                        >
                            Connect Account
                        </Button>
                    )}
                </Box>
            </Paper>
        </motion.div>
    );
};

export default PlatformCard;
