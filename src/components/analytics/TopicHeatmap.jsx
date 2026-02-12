// src/components/analytics/TopicHeatmap.jsx
import React from "react";
import { Box, Typography, Tooltip, useTheme } from "@mui/material";
import { motion } from "framer-motion";

const TopicHeatmap = ({ data = [] }) => {
    const theme = useTheme();

    // Custom mock data if none provided
    const topics = data.length > 0 ? data : [
        { name: "Arrays", count: 85 }, { name: "Strings", count: 62 }, { name: "DP", count: 45 },
        { name: "Graphs", count: 38 }, { name: "Trees", count: 54 }, { name: "Math", count: 30 },
        { name: "Sorting", count: 72 }, { name: "Searching", count: 58 }, { name: "Hashing", count: 91 },
        { name: "Greedy", count: 28 }, { name: "Recursion", count: 33 }, { name: "Bit Mask", count: 12 },
        { name: "Backtracking", count: 25 }, { name: "Sliding Window", count: 40 }, { name: "Linked List", count: 31 },
        { name: "Stacks/Queues", count: 48 }, { name: "Heaps", count: 22 }, { name: "Tries", count: 15 }
    ];

    const maxCount = Math.max(...topics.map(t => t.count));

    const getColor = (count) => {
        const intensity = count / maxCount;
        // Gradient from transparent/light primary to deep primary
        return theme.palette.mode === 'dark'
            ? `rgba(102, 126, 234, ${0.1 + intensity * 0.9})`
            : `rgba(102, 126, 234, ${0.1 + intensity * 0.9})`;
    };

    return (
        <Box sx={{ p: 1 }}>
            <Box
                sx={{
                    display: 'grid',
                    gridTemplateColumns: { xs: 'repeat(3, 1fr)', sm: 'repeat(4, 1fr)', md: 'repeat(6, 1fr)' },
                    gap: 1.5
                }}
            >
                {topics.map((topic, index) => (
                    <Tooltip
                        key={index}
                        title={`${topic.name}: ${topic.count} problems`}
                        arrow
                        placement="top"
                    >
                        <motion.div
                            initial={{ scale: 0, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            transition={{ delay: index * 0.03 }}
                            whileHover={{ scale: 1.05, zIndex: 10 }}
                        >
                            <Box
                                sx={{
                                    aspectRatio: '1/1',
                                    borderRadius: 2,
                                    bgcolor: getColor(topic.count),
                                    display: 'flex',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    p: 1,
                                    cursor: 'pointer',
                                    border: '1px solid',
                                    borderColor: 'divider',
                                    transition: 'border-color 0.2s',
                                    '&:hover': {
                                        borderColor: 'primary.main',
                                    }
                                }}
                            >
                                <Typography
                                    variant="caption"
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: '0.65rem',
                                        color: topic.count / maxCount > 0.5 ? '#fff' : 'text.primary',
                                        textAlign: 'center',
                                        lineHeight: 1.1
                                    }}
                                >
                                    {topic.name}
                                </Typography>
                                <Typography
                                    variant="h6"
                                    sx={{
                                        fontWeight: 900,
                                        fontSize: '0.9rem',
                                        color: topic.count / maxCount > 0.5 ? '#fff' : 'text.primary'
                                    }}
                                >
                                    {topic.count}
                                </Typography>
                            </Box>
                        </motion.div>
                    </Tooltip>
                ))}
            </Box>

            {/* Legend */}
            <Box sx={{ mt: 3, display: 'flex', alignItems: 'center', gap: 1, justifyContent: 'flex-end' }}>
                <Typography variant="caption" color="text.secondary">Less</Typography>
                {[0.1, 0.3, 0.5, 0.7, 0.9].map((lvl, i) => (
                    <Box key={i} sx={{ width: 12, height: 12, borderRadius: '2px', bgcolor: `rgba(102, 126, 234, ${lvl})` }} />
                ))}
                <Typography variant="caption" color="text.secondary">More</Typography>
            </Box>
        </Box>
    );
};

export default TopicHeatmap;
