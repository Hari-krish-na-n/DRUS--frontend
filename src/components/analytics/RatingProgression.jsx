// src/components/analytics/RatingProgression.jsx
import React from "react";
import {
    LineChart,
    Line,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
    ReferenceArea
} from "recharts";
import { useTheme, Box } from "@mui/material";

const RatingProgression = ({ data = [] }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // Mock data if none provided
    const plotData = data.length > 0 ? data : [
        { name: 'Jan', LeetCode: 1600, Codeforces: 1200 },
        { name: 'Feb', LeetCode: 1650, Codeforces: 1250 },
        { name: 'Mar', LeetCode: 1720, Codeforces: 1380 },
        { name: 'Apr', LeetCode: 1810, Codeforces: 1420 },
        { name: 'May', LeetCode: 1890, Codeforces: 1510 },
        { name: 'Jun', LeetCode: 1942, Codeforces: 1620 },
    ];

    return (
        <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <LineChart data={plotData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <defs>
                        <filter id="shadow" height="200%">
                            <feGaussianBlur in="SourceAlpha" stdDeviation="3" />
                            <feOffset dx="0" dy="4" result="offsetblur" />
                            <feComponentTransfer>
                                <feFuncA type="linear" slope="0.3" />
                            </feComponentTransfer>
                            <feMerge>
                                <feMergeNode />
                                <feMergeNode in="SourceGraphic" />
                            </feMerge>
                        </filter>
                    </defs>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
                        dx={-10}
                        domain={['dataMin - 100', 'dataMax + 100']}
                    />
                    <Tooltip
                        contentStyle={{
                            backgroundColor: isDark ? '#1e293b' : '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                            padding: '12px'
                        }}
                        itemStyle={{ fontWeight: 800, fontSize: '13px' }}
                    />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ paddingBottom: '20px', fontWeight: 700, fontSize: '12px' }}
                    />
                    <Line
                        type="monotone"
                        dataKey="LeetCode"
                        stroke="#f6ad55"
                        strokeWidth={4}
                        dot={{ r: 4, fill: "#f6ad55", strokeWidth: 2, stroke: isDark ? "#1e293b" : "#fff" }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                        filter="url(#shadow)"
                    />
                    <Line
                        type="monotone"
                        dataKey="Codeforces"
                        stroke="#4299e1"
                        strokeWidth={4}
                        dot={{ r: 4, fill: "#4299e1", strokeWidth: 2, stroke: isDark ? "#1e293b" : "#fff" }}
                        activeDot={{ r: 8, strokeWidth: 0 }}
                        filter="url(#shadow)"
                    />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default RatingProgression;
