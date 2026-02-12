// src/components/analytics/LanguageUsage.jsx
import React from "react";
import {
    PieChart,
    Pie,
    Cell,
    ResponsiveContainer,
    Tooltip,
    Legend
} from "recharts";
import { Box, useTheme } from "@mui/material";

const COLORS = ["#667eea", "#48bb78", "#4299e1", "#ed64a6", "#ecc94b", "#764ba2"];

const LanguageUsage = ({ data = [] }) => {
    const theme = useTheme();

    return (
        <Box sx={{ width: '100%', height: '100%', minHeight: 300 }}>
            <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        innerRadius={70}
                        outerRadius={90}
                        paddingAngle={5}
                        dataKey="value"
                        animationDuration={1500}
                    >
                        {data.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip
                        contentStyle={{ borderRadius: 12, border: 'none', boxShadow: '0 10px 40px rgba(0,0,0,0.1)' }}
                    />
                    <Legend
                        verticalAlign="middle"
                        align="right"
                        layout="vertical"
                        iconType="circle"
                        formatter={(value) => (
                            <span style={{ color: theme.palette.text.primary, fontWeight: 700, fontSize: '13px' }}>
                                {value}
                            </span>
                        )}
                    />
                </PieChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default LanguageUsage;
