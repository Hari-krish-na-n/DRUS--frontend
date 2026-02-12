// src/components/dashboard/PlatformDistributionChart.jsx
import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";
import { Box, Typography, useTheme } from "@mui/material";

const COLORS = ["#667eea", "#764ba2", "#ed64a6", "#ecc94b", "#48bb78", "#a0aec0"];

const PlatformDistributionChart = ({ data = [] }) => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', height: 300, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        paddingAngle={5}
                        dataKey="value"
                        animationBegin={0}
                        animationDuration={1500}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={entry.color || COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{
                            borderRadius: '12px',
                            border: 'none',
                            boxShadow: '0 10px 40px rgba(0,0,0,0.1)',
                            fontWeight: 700
                        }}
                    />
                    <Legend
                        verticalAlign="bottom"
                        height={36}
                        iconType="circle"
                        formatter={(value) => (
                            <span style={{ color: theme.palette.text.primary, fontWeight: 600, fontSize: '12px' }}>
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default PlatformDistributionChart;
