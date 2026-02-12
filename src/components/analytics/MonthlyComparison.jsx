// src/components/analytics/MonthlyComparison.jsx
import React from "react";
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend
} from "recharts";
import { useTheme, Box } from "@mui/material";

const MonthlyComparison = ({ data = [] }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const plotData = data.length > 0 ? data : [
        { name: 'Week 1', current: 45, previous: 38 },
        { name: 'Week 2', current: 52, previous: 48 },
        { name: 'Week 3', current: 38, previous: 42 },
        { name: 'Week 4', current: 64, previous: 55 },
    ];

    return (
        <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <BarChart data={plotData} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barGap={8}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                    />
                    <XAxis
                        dataKey="name"
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 700 }}
                        dy={10}
                    />
                    <YAxis
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
                    />
                    <Tooltip
                        cursor={{ fill: 'transparent' }}
                        contentStyle={{
                            backgroundColor: isDark ? '#1e293b' : '#fff',
                            border: 'none',
                            borderRadius: '12px',
                            boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                        }}
                    />
                    <Legend
                        verticalAlign="top"
                        align="right"
                        height={36}
                        iconType="circle"
                        wrapperStyle={{ paddingBottom: '20px', fontWeight: 700, fontSize: '12px' }}
                    />
                    <Bar
                        name="Current Month"
                        dataKey="current"
                        fill="#667eea"
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                    />
                    <Bar
                        name="Previous Month"
                        dataKey="previous"
                        fill={isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.1)"}
                        radius={[4, 4, 0, 0]}
                        barSize={20}
                    />
                </BarChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default MonthlyComparison;
