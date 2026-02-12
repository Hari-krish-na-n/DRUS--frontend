// src/components/settings/AboutTab.jsx
import React from "react";
import { Box, Paper, Typography, Button, Divider, Link, Avatar } from "@mui/material";
import { Github, Globe, Heart, ShieldCheck, Mail } from "lucide-react";

const AboutTab = () => {
    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none', textAlign: 'center' }}>
                <Avatar
                    src="/logo.png"
                    sx={{
                        width: 80,
                        height: 80,
                        mx: 'auto',
                        mb: 2,
                        background: 'linear-gradient(135deg, #667eea, #764ba2)',
                        boxShadow: '0 8px 30px rgba(102, 126, 234, 0.3)'
                    }}
                />
                <Typography variant="h5" sx={{ fontWeight: 900 }}>DRUS</Typography>
                <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, letterSpacing: '2px' }}>VERSION 1.2.0-STABLE</Typography>

                <Typography variant="body2" sx={{ mt: 3, mb: 4, maxWidth: 400, mx: 'auto', color: 'text.secondary' }}>
                    Empowering developers to visualize their journey across the global coding ecosystem.
                </Typography>

                <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2 }}>
                    <Button variant="outlined" startIcon={<Github size={18} />} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700 }}>Github</Button>
                    <Button variant="outlined" startIcon={<Globe size={18} />} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700 }}>Website</Button>
                    <Button variant="outlined" startIcon={<Mail size={18} />} sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700 }}>Support</Button>
                </Box>
            </Paper>

            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Credits & Legal</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <ShieldCheck size={20} color="#48bb78" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Privacy Policy</Typography>
                        </Box>
                        <Link href="#" variant="caption" sx={{ fontWeight: 800, textDecoration: 'none' }}>READ MORE</Link>
                    </Box>
                    <Divider />
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Heart size={20} color="#f56565" />
                            <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>Open Source Licenses</Typography>
                        </Box>
                        <Link href="#" variant="caption" sx={{ fontWeight: 800, textDecoration: 'none' }}>VIEW LIST</Link>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default AboutTab;
