// src/components/analytics/ProblemsSolvedTimeline.jsx
import React from "react";
import {
    ResponsiveContainer,
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    Area,
    AreaChart
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";

const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
        return (
            <Box sx={{ bgcolor: 'background.paper', p: 1.5, borderRadius: 3, boxShadow: '0 10px 40px rgba(0,0,0,0.15)', border: '1px solid', borderColor: 'divider' }}>
                <Typography variant="body2" sx={{ fontWeight: 800, mb: 1 }}>{label}</Typography>
                {payload.map((entry, index) => (
                    <Box key={index} sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5 }}>
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: entry.color }} />
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>{entry.name}: {entry.value}</Typography>
                    </Box>
                ))}
            </Box>
        );
    }
    return null;
};

const ProblemsSolvedTimeline = ({ data = [] }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Box sx={{ width: '100%', height: '100%', minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={data} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                    <defs>
                        <linearGradient id="colorLeetCode" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#f6ad55" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#f6ad55" stopOpacity={0} />
                        </linearGradient>
                        <linearGradient id="colorCodeforces" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="5%" stopColor="#4299e1" stopOpacity={0.2} />
                            <stop offset="95%" stopColor="#4299e1" stopOpacity={0} />
                        </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)'} />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: theme.palette.text.secondary }}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fontSize: 10, fill: theme.palette.text.secondary }}
                    />
                    <Tooltip content={<CustomTooltip />} />
                    <Legend iconType="circle" />
                    <Area
                        type="monotone"
                        dataKey="LeetCode"
                        stroke="#f6ad55"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorLeetCode)"
                        animationDuration={1500}
                    />
                    <Area
                        type="monotone"
                        dataKey="Codeforces"
                        stroke="#4299e1"
                        strokeWidth={3}
                        fillOpacity={1}
                        fill="url(#colorCodeforces)"
                        animationDuration={2000}
                    />
                </AreaChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ProblemsSolvedTimeline;
