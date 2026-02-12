// src/components/settings/PrivacyTab.jsx
import React from "react";
import { Box, Paper, Typography, Switch, Divider, useTheme, Button } from "@mui/material";
import { Shield, Eye, Lock, Globe, FileShield } from "lucide-react";

const PrivacyTab = () => {
    return (
        <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
            <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Privacy & Visibility</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                Control who can see your statistics and activity.
            </Typography>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                {[
                    { title: "Public Profile", desc: "Allow anyone to view your profile and achievements", icon: Globe, checked: true },
                    { title: "Show Real Name", desc: "Display your full name instead of your username", icon: Eye, checked: false },
                    { title: "Share Progress", desc: "Allow friends to see your daily coding activity", icon: Lock, checked: true },
                    { title: "Search Engine Indexing", desc: "Allow Google to index your public profile", icon: Shield, checked: false },
                ].map((item, i) => (
                    <React.Fragment key={i}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                                <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.03)', color: 'secondary.main' }}>
                                    <item.icon size={20} />
                                </Box>
                                <Box>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{item.title}</Typography>
                                    <Typography variant="caption" color="text.secondary">{item.desc}</Typography>
                                </Box>
                            </Box>
                            <Switch defaultChecked={item.checked} />
                        </Box>
                        {i < 3 && <Divider />}
                    </React.Fragment>
                ))}
            </Box>

            <Box sx={{ mt: 5, p: 3, borderRadius: 4, bgcolor: 'rgba(102, 126, 234, 0.05)', border: '1px solid', borderColor: 'primary.main' + '20', display: 'flex', gap: 2, alignItems: 'center' }}>
                <FileShield size={32} color="#667eea" />
                <Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>GDPR & Data Rights</Typography>
                    <Typography variant="caption" color="text.secondary" sx={{ display: 'block' }}>
                        You have the right to request a full copy of your data or its permanent deletion at any time.
                    </Typography>
                    <Button size="small" sx={{ mt: 1, textTransform: 'none', fontWeight: 700, p: 0 }}>Learn more about your rights</Button>
                </Box>
            </Box>
        </Paper>
    );
};

export default PrivacyTab;
