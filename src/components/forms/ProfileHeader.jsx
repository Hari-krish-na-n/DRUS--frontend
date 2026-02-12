// src/components/profile/ProfileHeader.jsx
import React from "react";
import {
    Box,
    Paper,
    Avatar,
    Typography,
    Button,
    IconButton,
    Tooltip,
    useTheme,
    Chip
} from "@mui/material";
import {
    Camera,
    MapPin,
    Link as LinkIcon,
    Mail,
    Calendar,
    Share2,
    ExternalLink,
    Edit2
} from "lucide-react";
import { motion } from "framer-motion";

const ProfileHeader = ({ user }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <Paper
            elevation={0}
            sx={{
                borderRadius: 8,
                overflow: 'hidden',
                bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                mb: 6,
                position: 'relative',
                boxShadow: isDark ? 'none' : '0 10px 40px rgba(0,0,0,0.03)'
            }}
        >
            {/* Banner */}
            <Box
                sx={{
                    height: 200,
                    background: isDark 
                        ? 'linear-gradient(135deg, #4f46e5 0%, #7e22ce 100%)' 
                        : 'linear-gradient(135deg, #6366f1 0%, #a855f7 100%)',
                    position: 'relative'
                }}
            >
                <Box
                    sx={{
                        position: 'absolute',
                        bottom: 20,
                        right: 24,
                        display: 'flex',
                        gap: 1.5
                    }}
                >
                    <Button
                        variant="contained"
                        size="small"
                        startIcon={<Camera size={16} />}
                        sx={{
                            borderRadius: 3,
                            bgcolor: 'rgba(255,255,255,0.2)',
                            backdropFilter: 'blur(12px)',
                            border: '1px solid rgba(255,255,255,0.3)',
                            '&:hover': { bgcolor: 'rgba(255,255,255,0.3)' },
                            textTransform: 'none',
                            fontWeight: 700,
                            px: 2
                        }}
                    >
                        Change Cover
                    </Button>
                </Box>
            </Box>

            {/* Profile Info Section */}
            <Box sx={{ px: { xs: 3, md: 5 }, pb: 5, position: 'relative' }}>
                <Box
                    sx={{
                        display: 'flex',
                        flexDirection: { xs: 'column', md: 'row' },
                        alignItems: { xs: 'center', md: 'flex-end' },
                        gap: 4,
                        mt: -10
                    }}
                >
                    {/* Avatar Area */}
                    <Box sx={{ position: 'relative' }}>
                        <motion.div whileHover={{ scale: 1.05 }} transition={{ type: 'spring', stiffness: 300 }}>
                            <Avatar
                                src={user?.picture}
                                sx={{
                                    width: 160,
                                    height: 160,
                                    border: '8px solid',
                                    borderColor: 'background.paper',
                                    boxShadow: '0 20px 40px rgba(0,0,0,0.15)',
                                    background: 'linear-gradient(135deg, #6366f1, #a855f7)',
                                    fontSize: '3rem',
                                    fontWeight: 800
                                }}
                            >
                                {user?.name?.charAt(0) || 'U'}
                            </Avatar>
                        </motion.div>
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: 10,
                                right: 10,
                                bgcolor: 'primary.main',
                                color: 'white',
                                boxShadow: '0 4px 12px rgba(99, 102, 241, 0.4)',
                                border: '4px solid',
                                borderColor: 'background.paper',
                                '&:hover': { bgcolor: 'primary.dark' }
                            }}
                        >
                            <Camera size={18} />
                        </IconButton>
                    </Box>

                    {/* Basic Info */}
                    <Box sx={{ flexGrow: 1, mb: 1, textAlign: { xs: 'center', md: 'left' } }}>
                        <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 2, mb: 1 }}>
                            <Typography variant="h4" fontWeight={800} sx={{ letterSpacing: '-0.03em' }}>
                                {user?.name || 'Developer'}
                            </Typography>
                            <Chip 
                                label="Pro Member" 
                                color="primary" 
                                size="small" 
                                sx={{ fontWeight: 700, borderRadius: 1.5, height: 24 }} 
                            />
                        </Box>
                        <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 3, color: 'text.secondary' }}>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                <Mail size={16} />
                                <Typography variant="body2" fontWeight={500}>{user?.email}</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                <MapPin size={16} />
                                <Typography variant="body2" fontWeight={500}>Bangalore, India</Typography>
                            </Box>
                            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.8 }}>
                                <Calendar size={16} />
                                <Typography variant="body2" fontWeight={500}>Joined Feb 2026</Typography>
                            </Box>
                        </Box>
                    </Box>

                    {/* Actions */}
                    <Box sx={{ display: 'flex', gap: 1.5, mb: 1 }}>
                        <Button
                            variant="outlined"
                            startIcon={<Share2 size={18} />}
                            sx={{ borderRadius: 3, px: 3 }}
                        >
                            Share
                        </Button>
                        <Button
                            variant="contained"
                            startIcon={<Edit2 size={18} />}
                            sx={{ borderRadius: 3, px: 3, boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)' }}
                        >
                            Edit Profile
                        </Button>
                    </Box>
                </Box>

                {/* Bio Section */}
                <Box sx={{ mt: 4 }}>
                    <Typography variant="body1" sx={{ maxWidth: 800, mb: 3, textAlign: { xs: 'center', md: 'left' }, color: 'text.secondary', lineHeight: 1.7 }}>
                        Passionate full-stack developer focusing on algorithm efficiency and clean code.
                        Currently conquering competitive programming challenges and building modern web experiences.
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: { xs: 'center', md: 'flex-start' }, gap: 1.5 }}>
                        {['Competitive Programming', 'React.js', 'Node.js', 'System Design', 'UI/UX'].map(tag => (
                            <Chip
                                key={tag}
                                label={tag}
                                variant="outlined"
                                size="small"
                                sx={{ 
                                    borderRadius: 2, 
                                    fontWeight: 600, 
                                    px: 1,
                                    borderColor: 'divider',
                                    bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)',
                                    '&:hover': { bgcolor: 'primary.main', color: 'white', borderColor: 'primary.main' }
                                }}
                            />
                        ))}
                    </Box>
                </Box>
            </Box>
        </Paper>
    );
};

export default ProfileHeader;
