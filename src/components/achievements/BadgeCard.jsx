// src/components/achievements/BadgeCard.jsx
import React from "react";
import {
    Paper,
    Box,
    Typography,
    Tooltip,
    LinearProgress,
    useTheme
} from "@mui/material";
import {
    Lock,
    CheckCircle2,
    Trophy,
    Zap,
    Flame,
    Target,
    Crown,
    Star
} from "lucide-react";
import { motion } from "framer-motion";

const RarityColors = {
    common: "#a0aec0",
    rare: "#4299e1",
    epic: "#764ba2",
    legendary: "#ecc94b"
};

const BadgeCard = ({ badge }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const isEarned = badge.status === 'earned';
    const isInProgress = badge.status === 'in-progress';
    const isLocked = badge.status === 'locked';

    const rarityColor = RarityColors[badge.rarity] || RarityColors.common;

    return (
        <motion.div
            whileHover={{ y: -8, scale: 1.02 }}
            transition={{ type: 'spring', stiffness: 300 }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 5,
                    textAlign: 'center',
                    position: 'relative',
                    overflow: 'hidden',
                    bgcolor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                    border: '1px solid',
                    borderColor: isEarned ? rarityColor : 'divider',
                    boxShadow: isEarned ? `0 0 20px ${rarityColor}20` : 'none',
                    transition: 'all 0.3s',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    opacity: isLocked ? 0.7 : 1,
                    filter: isLocked ? 'grayscale(0.8)' : 'none'
                }}
            >
                {/* Shine Effect for Earned Badges */}
                {isEarned && (
                    <motion.div
                        animate={{ x: ['100%', '-100%'] }}
                        transition={{ repeat: Infinity, duration: 3, ease: 'linear' }}
                        style={{
                            position: 'absolute',
                            top: 0,
                            left: 0,
                            width: '100%',
                            height: '100%',
                            background: 'linear-gradient(115deg, transparent 40%, rgba(255,255,255,0.4) 50%, transparent 60%)',
                            zIndex: 1,
                            pointerEvents: 'none'
                        }}
                    />
                )}

                {/* Badge Icon */}
                <Box
                    sx={{
                        width: 80,
                        height: 80,
                        borderRadius: '50%',
                        bgcolor: isEarned ? `${rarityColor}15` : 'rgba(0,0,0,0.05)',
                        border: '2px solid',
                        borderColor: isEarned ? rarityColor : 'transparent',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: isEarned ? rarityColor : 'text.disabled',
                        mb: 2,
                        position: 'relative',
                        zIndex: 2
                    }}
                >
                    {isLocked ? <Lock size={32} /> : (badge.icon || <Trophy size={32} />)}

                    {isEarned && (
                        <Box
                            sx={{
                                position: 'absolute',
                                top: -5,
                                right: -5,
                                bgcolor: rarityColor,
                                color: 'white',
                                borderRadius: '50%',
                                p: 0.5,
                                border: '2px solid',
                                borderColor: isDark ? '#1e293b' : '#ffffff'
                            }}
                        >
                            <CheckCircle2 size={14} />
                        </Box>
                    )}
                </Box>

                <Typography variant="subtitle1" sx={{ fontWeight: 800, mb: 0.5, zIndex: 2 }}>
                    {badge.title}
                </Typography>
                <Typography variant="caption" color="text.secondary" sx={{ mb: 2, px: 1, height: 32, overflow: 'hidden', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', zIndex: 2 }}>
                    {badge.description}
                </Typography>

                {/* Progress for In-Progress Badges */}
                {isInProgress && (
                    <Box sx={{ width: '100%', mt: 'auto' }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.5 }}>
                            <Typography variant="caption" sx={{ fontWeight: 700 }}>{badge.progress}%</Typography>
                            <Typography variant="caption" color="text.secondary">{badge.current}/{badge.target}</Typography>
                        </Box>
                        <LinearProgress
                            variant="determinate"
                            value={badge.progress}
                            sx={{
                                height: 6,
                                borderRadius: 3,
                                bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                '& .MuiLinearProgress-bar': { bgcolor: rarityColor, borderRadius: 3 }
                            }}
                        />
                    </Box>
                )}

                {isEarned && (
                    <Chip
                        label={badge.rarity.toUpperCase()}
                        size="small"
                        sx={{
                            mt: 'auto',
                            bgcolor: rarityColor,
                            color: 'white',
                            fontWeight: 800,
                            fontSize: '0.65rem',
                            height: 20
                        }}
                    />
                )}

                {isLocked && (
                    <Typography variant="caption" sx={{ mt: 'auto', fontWeight: 700, opacity: 0.5 }}>
                        Locked
                    </Typography>
                )}
            </Paper>
        </motion.div>
    );
};

export default BadgeCard;
