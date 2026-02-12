// src/components/dashboard/GoalsProgress.jsx
import React from "react";
import {
    Box,
    Typography,
    LinearProgress,
    Paper,
    useTheme,
    Button
} from "@mui/material";
import { Target, TrendingUp, Calendar, Zap, Plus } from "lucide-react";
import { motion } from "framer-motion";

const GoalItem = ({ goal }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const progress = (goal.current / goal.target) * 100;

    return (
        <Box sx={{ mb: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box
                        sx={{
                            p: 1,
                            borderRadius: 2,
                            bgcolor: `${goal.color || '#667eea'}15`,
                            color: goal.color || '#667eea'
                        }}
                    >
                        {goal.icon || <Target size={18} />}
                    </Box>
                    <Box>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{goal.title}</Typography>
                        <Typography variant="caption" color="text.secondary">{goal.period}</Typography>
                    </Box>
                </Box>
                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                    {goal.current}/{goal.target}
                </Typography>
            </Box>

            <Box sx={{ position: 'relative' }}>
                <LinearProgress
                    variant="determinate"
                    value={progress}
                    sx={{
                        height: 10,
                        borderRadius: 5,
                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                        '& .MuiLinearProgress-bar': {
                            borderRadius: 5,
                            background: `linear-gradient(90deg, ${goal.color || '#667eea'}, ${goal.color || '#764ba2'}dd)`
                        }
                    }}
                />
                {progress >= 100 && (
                    <Box
                        sx={{
                            position: 'absolute',
                            right: 0,
                            top: -24,
                            display: 'flex',
                            alignItems: 'center',
                            gap: 0.5,
                            color: '#48bb78'
                        }}
                    >
                        <Zap size={14} fill="#48bb78" />
                        <Typography variant="caption" sx={{ fontWeight: 800 }}>Goal Met!</Typography>
                    </Box>
                )}
            </Box>
        </Box>
    );
};

const GoalsProgress = ({ goals = [] }) => {
    return (
        <Box>
            <Box sx={{ mb: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Goals Progress</Typography>
                <Button
                    size="small"
                    startIcon={<Plus size={16} />}
                    sx={{ fontWeight: 700, textTransform: 'none' }}
                >
                    New Goal
                </Button>
            </Box>

            <Box>
                {goals.map((goal, index) => (
                    <GoalItem key={index} goal={goal} />
                ))}
            </Box>

            {goals.length > 0 && (
                <Paper
                    elevation={0}
                    sx={{
                        p: 2,
                        mt: 2,
                        borderRadius: 3,
                        bgcolor: 'primary.main',
                        background: 'linear-gradient(45deg, #667eea, #764ba2)',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        gap: 2,
                        boxShadow: '0 10px 20px rgba(102, 126, 234, 0.2)'
                    }}
                >
                    <TrendingUp size={24} />
                    <Box>
                        <Typography variant="caption" sx={{ opacity: 0.9, fontWeight: 600 }}>WEEKLY INSIGHT</Typography>
                        <Typography variant="body2" sx={{ fontWeight: 800 }}>
                            You're on track to beat your weekly goal by 20%! Keep it up.
                        </Typography>
                    </Box>
                </Paper>
            )}
        </Box>
    );
};

export default GoalsProgress;
