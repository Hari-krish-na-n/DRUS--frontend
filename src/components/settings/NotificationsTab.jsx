// src/components/settings/NotificationsTab.jsx
import React from "react";
import { Box, Paper, Typography, Switch, FormControlLabel, Divider, useTheme } from "@mui/material";
import { Bell, Mail, MessageSquare, Globe, Zap } from "lucide-react";

const NotificationItem = ({ title, description, icon: Icon, defaultChecked = false }) => {
    const theme = useTheme();
    return (
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', py: 2 }}>
            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.03)', color: 'primary.main' }}>
                    <Icon size={20} />
                </Box>
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{title}</Typography>
                    <Typography variant="caption" color="text.secondary">{description}</Typography>
                </Box>
            </Box>
            <Switch defaultChecked={defaultChecked} />
        </Box>
    );
};

const NotificationsTab = () => {
    return (
        <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4 }}>Email Notifications</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <NotificationItem
                    title="New Achievement"
                    description="Get notified when you unlock a new badge or milestone."
                    icon={Zap}
                    defaultChecked
                />
                <Divider />
                <NotificationItem
                    title="Weekly Summary"
                    description="Receive a weekly PDF report of your coding progress."
                    icon={Mail}
                    defaultChecked
                />
                <Divider />
                <NotificationItem
                    title="Contest Reminders"
                    description="Never miss a contest from your connected platforms."
                    icon={Bell}
                />
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 800, mb: 4, mt: 5 }}>Platform Alerts</Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
                <NotificationItem
                    title="Sync Status"
                    description="Alerts when a platform sync fails or requires attention."
                    icon={Globe}
                    defaultChecked
                />
                <Divider />
                <NotificationItem
                    title="Friend Activity"
                    description="Updates on your followed developers' progress."
                    icon={MessageSquare}
                />
            </Box>
        </Paper>
    );
};

export default NotificationsTab;
