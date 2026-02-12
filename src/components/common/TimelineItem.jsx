// src/components/common/TimelineItem.jsx
import React from "react";
import { Box, Typography, Avatar, useTheme, Chip } from "@mui/material";
import { formatDistanceToNow } from "date-fns";
import { motion } from "framer-motion";

const TimelineItem = ({
    title,
    subtitle,
    timestamp,
    icon: Icon,
    color,
    chipLabel,
    chipColor,
    isLast = false
}) => {
    const theme = useTheme();

    return (
        <Box sx={{ display: 'flex', gap: 2.5, position: 'relative', pb: isLast ? 0 : 4 }}>
            {/* Connector Line */}
            {!isLast && (
                <Box
                    sx={{
                        position: 'absolute',
                        left: 20,
                        top: 40,
                        bottom: 0,
                        width: 2,
                        bgcolor: 'divider'
                    }}
                />
            )}

            {/* Avatar/Icon */}
            <motion.div whileHover={{ scale: 1.1 }}>
                <Avatar
                    sx={{
                        width: 42,
                        height: 42,
                        bgcolor: color ? `${color}15` : 'primary.main' + '15',
                        color: color || 'primary.main',
                        border: '2px solid',
                        borderColor: color || 'primary.main'
                    }}
                >
                    {Icon && <Icon size={20} />}
                </Avatar>
            </motion.div>

            {/* Content */}
            <Box sx={{ flexGrow: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 0.5 }}>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>
                        {title}
                    </Typography>
                    {timestamp && (
                        <Typography variant="caption" color="text.secondary">
                            {formatDistanceToNow(new Date(timestamp), { addSuffix: true })}
                        </Typography>
                    )}
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                    {subtitle}
                </Typography>
                {chipLabel && (
                    <Chip
                        label={chipLabel}
                        size="small"
                        sx={{
                            borderRadius: 1.5,
                            fontWeight: 800,
                            fontSize: '0.65rem',
                            height: 20,
                            bgcolor: chipColor ? `${chipColor}15` : 'divider',
                            color: chipColor || 'text.secondary',
                            border: 'none'
                        }}
                    />
                )}
            </Box>
        </Box>
    );
};

export default TimelineItem;
