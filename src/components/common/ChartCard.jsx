// src/components/common/ChartCard.jsx
import React from "react";
import {
    Paper,
    Box,
    Typography,
    IconButton,
    Tooltip,
    Skeleton,
    useTheme
} from "@mui/material";
import {
    Download,
    Maximize2,
    MoreHorizontal,
    Info,
    Calendar
} from "lucide-react";
import { motion } from "framer-motion";

const ChartCard = ({
    title,
    subtitle,
    children,
    loading = false,
    height = 350,
    onDownload,
    onExpand,
    icon: Icon
}) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
        >
            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 5,
                    bgcolor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                    border: '1px solid',
                    borderColor: 'divider',
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    position: 'relative',
                    overflow: 'hidden'
                }}
            >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 3 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                        {Icon && (
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.main', color: 'white', display: 'flex' }}>
                                <Icon size={18} />
                            </Box>
                        )}
                        <Box>
                            <Typography variant="h6" sx={{ fontWeight: 800 }}>{title}</Typography>
                            {subtitle && (
                                <Typography variant="caption" color="text.secondary" sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    <Calendar size={12} />
                                    {subtitle}
                                </Typography>
                            )}
                        </Box>
                    </Box>
                    <Box sx={{ display: 'flex', gap: 0.5 }}>
                        <Tooltip title="Download Data">
                            <IconButton size="small" onClick={onDownload} sx={{ opacity: 0.7 }}>
                                <Download size={18} />
                            </IconButton>
                        </Tooltip>
                        {onExpand && (
                            <Tooltip title="Fullscreen">
                                <IconButton size="small" onClick={onExpand} sx={{ opacity: 0.7 }}>
                                    <Maximize2 size={18} />
                                </IconButton>
                            </Tooltip>
                        )}
                        <IconButton size="small" sx={{ opacity: 0.7 }}>
                            <MoreHorizontal size={18} />
                        </IconButton>
                    </Box>
                </Box>

                <Box sx={{ flexGrow: 1, minHeight: height, position: 'relative' }}>
                    {loading ? (
                        <Skeleton variant="rectangular" height="100%" sx={{ borderRadius: 3 }} />
                    ) : (
                        children
                    )}
                </Box>
            </Paper>
        </motion.div>
    );
};

export default ChartCard;
