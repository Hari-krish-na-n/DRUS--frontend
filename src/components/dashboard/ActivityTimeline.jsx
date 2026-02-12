// src/components/dashboard/ActivityTimeline.jsx
import React from "react";
import {
    Box,
    Typography,
    Paper,
    Avatar,
    Chip,
    useTheme,
    CircularProgress,
    Divider
} from "@mui/material";
import {
    CheckCircle2,
    Terminal,
    Zap,
    Clock,
    Award,
    Circle
} from "lucide-react";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";

const ActivityItem = ({ activity, index, isLast }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';
    const isEven = index % 2 === 0;

    const getDifficultyColor = (diff) => {
        switch (diff?.toLowerCase()) {
            case 'easy': return '#48bb78';
            case 'medium': return '#ecc94b';
            case 'hard': return '#f56565';
            default: return '#667eea';
        }
    };

    const getActivityIcon = (type) => {
        switch (type) {
            case 'problem': return <CheckCircle2 size={12} />;
            case 'contest': return <Award size={12} />;
            case 'badge': return <Zap size={12} />;
            case 'course': return <BookOpen size={12} />;
            case 'streak': return <Flame size={12} />;
            default: return <Circle size={12} />;
        }
    };

    return (
        <Box sx={{
            position: 'relative',
            pl: { xs: 4, md: isEven ? 0 : 4 },
            pr: { xs: 0, md: isEven ? 4 : 0 },
            pb: 4,
            display: 'flex',
            justifyContent: { xs: 'flex-start', md: isEven ? 'flex-end' : 'flex-start' },
            width: '100%'
        }}>
            {/* Timeline Line */}
            <Box
                sx={{
                    position: 'absolute',
                    left: { xs: 7, md: '50%' },
                    ml: { xs: 0, md: -1 },
                    top: 0,
                    bottom: 0,
                    width: 2,
                    bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                    zIndex: 0
                }}
            />

            {/* Timeline Dot */}
            <Box
                sx={{
                    position: 'absolute',
                    left: { xs: 0, md: '50%' },
                    ml: { xs: 0, md: -1.75 },
                    top: 10,
                    zIndex: 2,
                    bgcolor: isDark ? '#1e293b' : '#ffffff',
                    borderRadius: '50%',
                    p: 0.5,
                    border: '2px solid',
                    borderColor: theme.palette.primary.main
                }}
            >
                <Box sx={{ width: 12, height: 12, borderRadius: '50%', bgcolor: theme.palette.primary.main }} />
            </Box>

            {/* Content Card */}
            <motion.div
                initial={{ opacity: 0, x: isEven ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                style={{ width: '45%' }}
                className="activity-card-container"
            >
                <Paper
                    elevation={0}
                    sx={{
                        p: 2.5,
                        borderRadius: 5,
                        bgcolor: isDark ? 'rgba(255,255,255,0.02)' : '#ffffff',
                        border: '1px solid',
                        borderColor: 'divider',
                        transition: 'all 0.3s ease',
                        '&:hover': {
                            borderColor: theme.palette.primary.main,
                            transform: 'translateY(-2px)',
                            boxShadow: '0 10px 20px rgba(0,0,0,0.05)'
                        }
                    }}
                >
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1.5 }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Box sx={{ color: 'primary.main' }}>
                                {getActivityIcon(activity.type)}
                            </Box>
                            <Typography variant="caption" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                                {activity.type}
                            </Typography>
                        </Box>
                        <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                            <Clock size={12} />
                            {activity.timestamp ? formatDistanceToNow(new Date(activity.timestamp), { addSuffix: true }) : 'Just now'}
                        </Typography>
                    </Box>

                    <Typography variant="subtitle2" sx={{ fontWeight: 900, mb: 1, lineHeight: 1.3 }}>
                        {activity.title}
                    </Typography>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        <Avatar sx={{ width: 20, height: 20, fontSize: '0.6rem', bgcolor: 'divider', color: 'text.primary', fontWeight: 700 }}>
                            {activity.platform[0]}
                        </Avatar>
                        <Typography variant="caption" sx={{ fontWeight: 700, color: 'text.secondary' }}>
                            {activity.platform}
                        </Typography>
                        {activity.difficulty && (
                            <Chip
                                label={activity.difficulty}
                                size="small"
                                sx={{
                                    height: 18,
                                    fontSize: '0.6rem',
                                    fontWeight: 900,
                                    color: 'white',
                                    bgcolor: getDifficultyColor(activity.difficulty)
                                }}
                            />
                        )}
                    </Box>
                </Paper>
            </motion.div>
        </Box>
    );
};

const ActivityTimeline = ({ activities = [], loading = false }) => {
    const theme = useTheme();

    if (loading) {
        return (
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, p: 2 }}>
                {[1, 2, 3].map(i => <Box key={i} sx={{ height: 100, borderRadius: 4, bgcolor: 'action.hover' }} />)}
            </Box>
        );
    }

    const mockActivities = activities.length > 0 ? activities : [
        { id: 1, type: 'problem', platform: 'LeetCode', title: 'Two Sum II - Input Array Is Sorted', difficulty: 'Medium', timestamp: new Date(Date.now() - 1000 * 60 * 15) },
        { id: 2, type: 'contest', platform: 'Codeforces', title: 'Educational Round 142 (Div. 2)', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 3) },
        { id: 3, type: 'badge', platform: 'HackerRank', title: 'Gold Badge in Problem Solving', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 24) },
        { id: 4, type: 'streak', platform: 'DRUS', title: '15 Day Solve Streak Reached!', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 48) },
        { id: 5, type: 'course', platform: 'Coursera', title: 'Deep Learning Specialization - Module 1', timestamp: new Date(Date.now() - 1000 * 60 * 60 * 72) },
    ];

    return (
        <Box sx={{ py: 2 }}>
            <Box sx={{ mb: 6, textAlign: 'center' }}>
                <Typography variant="h5" sx={{ fontWeight: 900, mb: 1 }}>Recent Activity</Typography>
                <Typography variant="body2" color="text.secondary">Stay updated with your latest progress.</Typography>
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
                {mockActivities.map((activity, index) => (
                    <ActivityItem
                        key={activity.id || index}
                        activity={activity}
                        index={index}
                        isLast={index === mockActivities.length - 1}
                    />
                ))}
            </Box>

            <Box sx={{ mt: 4, display: 'flex', justifyContent: 'center' }}>
                <Typography
                    variant="button"
                    sx={{
                        fontWeight: 800,
                        color: 'primary.main',
                        cursor: 'pointer',
                        '&:hover': { textDecoration: 'underline' }
                    }}
                >
                    View All Activity
                </Typography>
            </Box>
        </Box>
    );
};

export default ActivityTimeline;
