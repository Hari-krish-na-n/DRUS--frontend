// src/components/settings/SyncDataTab.jsx
import React from "react";
import { Box, Paper, Typography, Button, Divider, LinearProgress, useTheme } from "@mui/material";
import { RefreshCw, Clock, Database, Download, Trash2 } from "lucide-react";
import { useNotification } from "../../hooks/useNotification";

const SyncDataTab = () => {
    const theme = useTheme();
    const { showSuccess } = useNotification();

    const handleExportAll = () => {
        const userData = {
            profile: {
                id: "drus_842a",
                name: "Harikrishnan",
                joined: "2024-05-12"
            },
            platforms: [
                { name: "LeetCode", username: "dev_user", solved: 450 },
                { name: "Codeforces", username: "gennady_fan", rating: 1620 }
            ],
            achievements: [
                { id: 1, title: "Problem Solver I", earned: "2025-10-12" },
                { id: 2, title: "Streak Master", earned: "2026-01-05" }
            ],
            settings: {
                theme: "dark",
                notifications: "enabled",
                privacy: "public"
            },
            exportMetadata: {
                version: "1.0",
                timestamp: new Date().toISOString()
            }
        };

        const blob = new Blob([JSON.stringify(userData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `drus_full_data_export_${new Date().getTime()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showSuccess("Your complete data archive has been generated and downloaded.");
    };
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Auto-Sync Settings</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Configure how often we fetch new data from your connected platforms.
                </Typography>

                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Background Sync</Typography>
                            <Typography variant="caption" color="text.secondary">Fetch data every 4 hours automatically</Typography>
                        </Box>
                        <Button variant="outlined" size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}>Configure</Button>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Force Global Sync</Typography>
                            <Typography variant="caption" color="text.secondary">Trigger immediate refresh of all platforms</Typography>
                        </Box>
                        <Button variant="contained" startIcon={<RefreshCw size={16} />} sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}>Sync Now</Button>
                    </Box>
                </Box>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Storage & Data</Typography>
                <Box sx={{ mb: 4 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                        <Typography variant="caption" sx={{ fontWeight: 700 }}>DATA CACHE USAGE</Typography>
                        <Typography variant="caption" sx={{ fontWeight: 800 }}>12.4 MB / 50 MB</Typography>
                    </Box>
                    <LinearProgress variant="determinate" value={25} sx={{ height: 6, borderRadius: 3 }} />
                </Box>

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <Button
                        variant="outlined"
                        startIcon={<Download size={18} />}
                        sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700 }}
                        onClick={handleExportAll}
                    >
                        Export All Data (JSON)
                    </Button>
                    <Button variant="outlined" color="error" startIcon={<Trash2 size={18} />} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700 }}>Clear Cache</Button>
                </Box>
            </Paper>
        </Box>
    );
};

export default SyncDataTab;
