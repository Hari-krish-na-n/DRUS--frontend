// src/components/achievements/AchievementTimeline.jsx
import React from "react";
import {
    Box,
    Typography,
    Paper,
    Avatar,
    useTheme,
    Divider
} from "@mui/material";
import {
    Trophy,
    Calendar,
    ChevronRight,
    Star,
    Zap,
    Target
} from "lucide-react";
import { format } from "date-fns";
import { motion } from "framer-motion";

const AchievementTimeline = ({ achievements = [] }) => {
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
                height: '100%'
            }}
        >
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', gap: 1.5 }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'secondary.main', color: 'white' }}>
                    <Trophy size={18} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 800 }}>Achievement History</Typography>
            </Box>

            <Box sx={{ position: 'relative', pl: 3 }}>
                {/* Timeline Line */}
                <Box
                    sx={{
                        position: 'absolute',
                        left: 7,
                        top: 10,
                        bottom: 10,
                        width: 2,
                        bgcolor: 'divider',
                        zIndex: 1
                    }}
                />

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
                    {achievements.map((achievement, index) => (
                        <motion.div
                            key={achievement.id}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            viewport={{ once: true }}
                            style={{ position: 'relative', zIndex: 2 }}
                        >
                            <Box sx={{
                                position: 'absolute',
                                left: -28,
                                top: 5,
                                width: 12,
                                height: 12,
                                borderRadius: '50%',
                                bgcolor: achievement.color || 'primary.main',
                                border: '3px solid',
                                borderColor: isDark ? '#1e293b' : '#ffffff'
                            }} />

                            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, color: 'text.primary' }}>
                                        {achievement.title}
                                    </Typography>
                                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block', mb: 1 }}>
                                        {achievement.description}
                                    </Typography>
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Calendar size={12} color={theme.palette.text.secondary} />
                                        <Typography variant="caption" color="text.secondary">
                                            {format(achievement.date, "MMMM dd, yyyy")}
                                        </Typography>
                                    </Box>
                                </Box>
                                <Avatar
                                    sx={{
                                        width: 32,
                                        height: 32,
                                        bgcolor: `${achievement.color}15` || 'rgba(0,0,0,0.05)',
                                        color: achievement.color || 'primary.main'
                                    }}
                                >
                                    {achievement.icon || <Star size={18} />}
                                </Avatar>
                            </Box>
                        </motion.div>
                    ))}
                </Box>
            </Box>
        </Paper>
    );
};

export default AchievementTimeline;
