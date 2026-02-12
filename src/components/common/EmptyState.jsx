// src/components/common/EmptyState.jsx
import React from "react";
import { Box, Typography, Button, useTheme } from "@mui/material";
import { motion } from "framer-motion";
import { FileSearch } from "lucide-react";

const EmptyState = ({
    title = "No data found",
    message = "Try adjusting your filters or search criteria.",
    icon: Icon = FileSearch,
    actionText,
    onAction
}) => {
    const theme = useTheme();

    return (
        <Box
            sx={{
                py: 8,
                px: 4,
                textAlign: 'center',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 3
            }}
        >
            <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 3, ease: 'easeInOut' }}
            >
                <Box
                    sx={{
                        width: 120,
                        height: 120,
                        borderRadius: '50%',
                        bgcolor: 'background.paper',
                        border: '1px solid',
                        borderColor: 'divider',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        color: 'text.disabled',
                        boxShadow: '0 10px 30px rgba(0,0,0,0.05)'
                    }}
                >
                    <Icon size={48} />
                </Box>
            </motion.div>

            <Box sx={{ maxWidth: 400 }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            </Box>

            {actionText && (
                <Button
                    variant="contained"
                    onClick={onAction}
                    sx={{ borderRadius: 3, px: 4, fontWeight: 700, textTransform: 'none' }}
                >
                    {actionText}
                </Button>
            )}
        </Box>
    );
};

export default EmptyState;
