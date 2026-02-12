// src/components/dashboard/StatCard.jsx
import React from "react";
import {
    Paper,
    Box,
    Typography,
    useTheme,
    IconButton,
    Tooltip,
    Skeleton
} from "@mui/material";
import { TrendingUp, TrendingDown, Info } from "lucide-react";
import { motion } from "framer-motion";

const StatCard = ({
    title,
    value,
    icon: Icon,
    color = "#667eea",
    trend,
    trendValue,
    subtitle,
    loading = false
}) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const isStreak = title.toLowerCase().includes('streak');

    if (loading) {
        return (
            <Paper sx={{ p: 3, borderRadius: 5, height: '100%' }}>
                <Skeleton variant="circular" width={40} height={40} sx={{ mb: 2 }} />
                <Skeleton variant="text" width="60%" sx={{ mb: 1 }} />
                <Skeleton variant="rectangular" height={40} sx={{ mb: 1, borderRadius: 2 }} />
                <Skeleton variant="text" width="40%" />
            </Paper>
        );
    }

    return (
        <motion.div
            whileHover={{ y: -8, transition: { duration: 0.2 } }}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 6,
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                    border: '1px solid',
                    borderColor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(102, 126, 234, 0.1)',
                    boxShadow: isDark ? 'none' : '0 10px 40px rgba(0,0,0,0.03)',
                    height: '100%',
                    backdropFilter: 'blur(10px)',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                        borderColor: color,
                        boxShadow: `0 15px 45px ${color}15`
                    }
                }}
            >
                {/* Background Decoration */}
                <Box
                    sx={{
                        position: 'absolute',
                        top: -20,
                        right: -20,
                        width: 100,
                        height: 100,
                        borderRadius: '50%',
                        background: `radial-gradient(circle, ${color}10 0%, transparent 70%)`,
                        zIndex: 0
                    }}
                />

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3, position: 'relative', zIndex: 1 }}>
                    <motion.div
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 400, damping: 10 }}
                    >
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                width: 52,
                                height: 52,
                                borderRadius: 3.5,
                                background: `linear-gradient(135deg, ${color}20 0%, ${color}05 100%)`,
                                color: color,
                                border: '1px solid',
                                borderColor: `${color}20`
                            }}
                        >
                            {Icon && <Icon size={26} />}
                        </Box>
                    </motion.div>

                    {isStreak && (
                        <motion.div
                            animate={{
                                scale: [1, 1.2, 1],
                                rotate: [0, 5, -5, 0]
                            }}
                            transition={{
                                duration: 1.5,
                                repeat: Infinity,
                                ease: "easeInOut"
                            }}
                            style={{ fontSize: '1.5rem', marginTop: -5 }}
                        >
                            🔥
                        </motion.div>
                    )}
                </Box>

                <Typography variant="body2" color="text.secondary" sx={{ fontWeight: 800, mb: 0.5, letterSpacing: '0.5px', textTransform: 'uppercase', fontSize: '0.7rem' }}>
                    {title}
                </Typography>

                <Typography
                    variant="h3"
                    sx={{
                        fontWeight: 800,
                        mb: 0.5,
                        letterSpacing: '-0.02em',
                        color: 'text.primary',
                        display: 'flex',
                        alignItems: 'baseline',
                        gap: 1
                    }}
                >
                    {value}
                    {isStreak && (
                        <Typography variant="subtitle1" component="span" sx={{ fontWeight: 600, opacity: 0.7 }}>
                            days
                        </Typography>
                    )}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    {trend && (
                        <Box
                            sx={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: 0.5,
                                color: trend === 'up' ? '#48bb78' : '#f56565',
                                bgcolor: trend === 'up' ? 'rgba(72, 187, 120, 0.1)' : 'rgba(245, 101, 101, 0.1)',
                                px: 1,
                                py: 0.25,
                                borderRadius: 1.5
                            }}
                        >
                            {trend === 'up' ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                            <Typography variant="caption" sx={{ fontWeight: 800 }}>
                                {trendValue}
                            </Typography>
                        </Box>
                    )}
                    <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                        {subtitle}
                    </Typography>
                </Box>
            </Paper>
        </motion.div>
    );
};

export default StatCard;
