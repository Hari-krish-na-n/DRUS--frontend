// src/components/analytics/PerformanceOverview.jsx
import React from "react";
import { Grid, Paper, Box, Typography, useTheme, Avatar } from "@mui/material";
import {
    CheckCircle2,
    Target,
    TrendingUp,
    Zap,
    Trophy,
    BarChart2,
    Clock
} from "lucide-react";
import { motion } from "framer-motion";

const MetricCard = ({ title, value, icon: Icon, color, index, extra }) => {
    const theme = useTheme();

    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ delay: index * 0.05 }}
            viewport={{ once: true }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 2.5,
                    borderRadius: 5,
                    bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'center'
                }}
            >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: extra ? 2 : 0 }}>
                    <Box
                        sx={{
                            width: 50,
                            height: 50,
                            borderRadius: 3,
                            bgcolor: `${color}15`,
                            color: color,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            flexShrink: 0
                        }}
                    >
                        <Icon size={26} />
                    </Box>
                    <Box>
                        <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 800, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                            {title}
                        </Typography>
                        <Typography variant="h5" sx={{ fontWeight: 900 }}>
                            {value}
                        </Typography>
                    </Box>
                </Box>

                {extra && (
                    <Box sx={{ mt: 1 }}>
                        {extra}
                    </Box>
                )}
            </Paper>
        </motion.div>
    );
};

const PerformanceOverview = ({ stats = {} }) => {
    const theme = useTheme();

    const metrics = [
        {
            title: "Total Problems",
            value: stats.totalSolved || "842",
            icon: CheckCircle2,
            color: "#667eea",
            extra: (
                <Box sx={{ display: 'flex', gap: 1 }}>
                    <Typography variant="caption" sx={{ color: '#48bb78', fontWeight: 800 }}>E: 450</Typography>
                    <Typography variant="caption" sx={{ color: '#f6ad55', fontWeight: 800 }}>M: 320</Typography>
                    <Typography variant="caption" sx={{ color: '#f56565', fontWeight: 800 }}>H: 72</Typography>
                </Box>
            )
        },
        {
            title: "Acceptance Rate",
            value: (stats.acceptanceRate || "78.4") + "%",
            icon: Target,
            color: "#48bb78",
            extra: (
                <Box sx={{ width: '100%', mt: 0.5 }}>
                    <Box sx={{ height: 4, width: '100%', bgcolor: 'rgba(0,0,0,0.05)', borderRadius: 2, overflow: 'hidden' }}>
                        <Box sx={{ height: '100%', width: '78.4%', bgcolor: '#48bb78' }} />
                    </Box>
                </Box>
            )
        },
        { title: "Average Time", value: stats.avgTime || "24m", icon: Clock, color: "#4299e1" },
        { title: "Best Platform", value: stats.bestPlatform || "LeetCode", icon: Zap, color: "#f6ad55" },
        { title: "Total Contests", value: stats.contests || "56", icon: BarChart2, color: "#ed64a6" },
        { title: "Average Rank", value: stats.avgRank || "#1,240", icon: Trophy, color: "#764ba2" },
    ];

    return (
        <Grid container spacing={3} sx={{ mb: 4 }}>
            {metrics.map((metric, index) => (
                <Grid item xs={12} sm={6} md={4} lg={2} key={index}>
                    <MetricCard {...metric} index={index} />
                </Grid>
            ))}
        </Grid>
    );
};

export default PerformanceOverview;
