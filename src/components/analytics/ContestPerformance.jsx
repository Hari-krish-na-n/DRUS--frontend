// src/components/analytics/ContestPerformance.jsx
import React from "react";
import {
    ScatterChart,
    Scatter,
    XAxis,
    YAxis,
    ZAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Cell
} from "recharts";
import { useTheme, Box } from "@mui/material";

const ContestPerformance = ({ data = [] }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    // Mock data: x is index, y is rank (lower is better)
    const plotData = data.length > 0 ? data : [
        { index: 1, rank: 1200, name: "Weekly 345", platform: "LeetCode" },
        { index: 2, rank: 800, name: "Biweekly 102", platform: "LeetCode" },
        { index: 3, rank: 2500, name: "Div 3 876", platform: "Codeforces" },
        { index: 4, rank: 450, name: "Weekly 346", platform: "LeetCode" },
        { index: 5, rank: 1800, name: "Div 2 878", platform: "Codeforces" },
        { index: 6, rank: 320, name: "Biweekly 103", platform: "LeetCode" },
        { index: 7, rank: 1500, name: "Round 880", platform: "Codeforces" },
        { index: 8, rank: 120, name: "Weekly 347", platform: "LeetCode" },
    ];

    const COLORS = {
        LeetCode: '#f6ad55',
        Codeforces: '#4299e1',
        CodeChef: '#764ba2'
    };

    const CustomTooltip = ({ active, payload }) => {
        if (active && payload && payload.length) {
            const item = payload[0].payload;
            return (
                <Box
                    sx={{
                        bgcolor: isDark ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255,255,255,0.95)',
                        p: 1.5,
                        borderRadius: 3,
                        boxShadow: '0 8px 20px rgba(0,0,0,0.1)',
                        border: '1px solid',
                        borderColor: 'divider'
                    }}
                >
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.name}</Typography>
                    <Typography variant="caption" sx={{ color: COLORS[item.platform], fontWeight: 700, display: 'block' }}>
                        {item.platform}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 900, mt: 0.5 }}>
                        Rank #{item.rank}
                    </Typography>
                </Box>
            );
        }
        return null;
    };

    return (
        <Box sx={{ width: '100%', height: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <ScatterChart margin={{ top: 20, right: 20, bottom: 0, left: 0 }}>
                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke={isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}
                    />
                    <XAxis
                        type="number"
                        dataKey="index"
                        name="Contest #"
                        hide
                    />
                    <YAxis
                        type="number"
                        dataKey="rank"
                        name="Rank"
                        reversed // Lower rank (smaller number) is higher up
                        axisLine={false}
                        tickLine={false}
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 600 }}
                        label={{ value: 'Rank (Lower is Better)', angle: -90, position: 'insideLeft', offset: 15, style: { fontSize: 10, fontWeight: 700, fill: theme.palette.text.disabled } }}
                    />
                    <ZAxis type="number" range={[100, 400]} />
                    <Tooltip content={<CustomTooltip />} />
                    <Scatter name="Contests" data={plotData} fill="#8884d8">
                        {plotData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[entry.platform] || '#a0aec0'} />
                        ))}
                    </Scatter>
                </ScatterChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default ContestPerformance;
