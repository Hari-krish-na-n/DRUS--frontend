// src/components/achievements/NextAchievements.jsx
import React from "react";
import {
    Box,
    Typography,
    Paper,
    LinearProgress,
    Avatar,
    useTheme,
    Button
} from "@mui/material";
import {
    Target,
    ChevronRight,
    Flame,
    Trophy,
    Zap
} from "lucide-react";

const AchievementProgressItem = ({ achievement }) => {
    const theme = useTheme();
    return (
        <Box sx={{ mb: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1.5 }}>
                <Avatar sx={{ bgcolor: 'rgba(0,0,0,0.05)', color: achievement.color, width: 40, height: 40 }}>
                    {achievement.icon}
                </Avatar>
                <Box sx={{ flexGrow: 1 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{achievement.title}</Typography>
                    <Typography variant="caption" color="text.secondary">{achievement.requirement}</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 0.8 }}>
                <Typography variant="caption" sx={{ fontWeight: 800, color: 'primary.main' }}>{achievement.progress}% Complete</Typography>
                <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>{achievement.current}/{achievement.target}</Typography>
            </Box>
            <LinearProgress
                variant="determinate"
                value={achievement.progress}
                sx={{
                    height: 8,
                    borderRadius: 4,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    '& .MuiLinearProgress-bar': { bgcolor: achievement.color, borderRadius: 4 },
                    mb: 2
                }}
            />
            {achievement.tips && (
                <Box sx={{
                    p: 1.5,
                    borderRadius: 2.5,
                    bgcolor: `${achievement.color}10`,
                    border: '1px solid',
                    borderColor: `${achievement.color}20`,
                    display: 'flex',
                    gap: 1.5
                }}>
                    <Zap size={14} color={achievement.color} style={{ marginTop: 2, flexShrink: 0 }} />
                    <Typography variant="caption" sx={{ fontStyle: 'italic', color: 'text.secondary', lineHeight: 1.4 }}>
                        <span style={{ fontWeight: 800, color: achievement.color, marginRight: 4 }}>PRO TIP:</span>
                        {achievement.tips}
                    </Typography>
                </Box>
            )}
        </Box>
    );
};

const NextAchievements = ({ nextList = [] }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 5,
                bgcolor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                gap: 2
            }}
        >
            <Box sx={{ mb: 2, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                    <Target size={18} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Up Next</Typography>
            </Box>

            {nextList.map((item, index) => (
                <AchievementProgressItem key={index} achievement={item} />
            ))}

            <Button
                fullWidth
                variant="outlined"
                endIcon={<ChevronRight size={18} />}
                sx={{
                    borderRadius: 3,
                    mt: 1,
                    textTransform: 'none',
                    fontWeight: 700,
                    py: 1.2,
                    border: '1.5px solid',
                    '&:hover': { border: '1.5px solid' }
                }}
            >
                View All Goals
            </Button>
        </Paper>
    );
};

export default NextAchievements;
