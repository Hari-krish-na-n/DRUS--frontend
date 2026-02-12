// src/components/analytics/StudyTimeAnalysis.jsx
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell,
    ReferenceLine
} from "recharts";
import { useTheme, Box, Typography } from "@mui/material";

const StudyTimeAnalysis = ({ data = [] }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const plotData = data.length > 0 ? data : [
        { day: 'Mon', hours: 4.5 },
        { day: 'Tue', hours: 6.2 },
        { day: 'Wed', hours: 3.8 },
        { day: 'Thu', hours: 5.5 },
        { day: 'Fri', hours: 7.0 },
        { day: 'Sat', hours: 8.5 },
        { day: 'Sun', hours: 4.0 },
    ];

    const avgHours = plotData.reduce((acc, curr) => acc + curr.hours, 0) / plotData.length;

    return (
        <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={plotData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                    />
                    <XAxis
                        dataKey="day"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 700 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
                        label={{ value: 'Hours', angle: -90, position: 'insideLeft', style: { fontSize: 10, fontWeight: 700, fill: theme.palette.text.disabled } }}
                    />
                    <Tooltip
                        cursor={{ fill: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)' }}
                        contentStyle={{
                            backgroundColor: isDark ? '#1e293b' : '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        }}
                    />
                    <ReferenceLine y={avgHours} stroke="#ff0000" strokeDasharray="3 3" label={{ position: 'right', value: 'Avg', fill: '#ff0000', fontSize: 10, fontWeight: 800 }} />
                    <Bar
                        dataKey="hours"
                        radius={[6, 6, 0, 0]}
                        barSize={32}
                    >
                        {plotData.map((entry, index) => (
                            <Cell
                                key={`cell-${index}`}
                                fill={entry.hours >= avgHours ? 'rgba(102, 126, 234, 1)' : 'rgba(102, 126, 234, 0.4)'}
                            />
                        ))}
                    </Bar>
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default StudyTimeAnalysis;
