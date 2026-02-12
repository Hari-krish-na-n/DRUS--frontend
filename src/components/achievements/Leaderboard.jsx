// src/components/achievements/Leaderboard.jsx
import React, { useState } from "react";
import {
    Paper,
    Box,
    Typography,
    Tabs,
    Tab,
    List,
    ListItem,
    ListItemAvatar,
    Avatar,
    ListItemText,
    Chip,
    useTheme,
    Fade
} from "@mui/material";
import {
    TrendingUp,
    TrendingDown,
    Minus,
    Crown,
    Trophy,
    Users,
    Globe
} from "lucide-react";
import { motion } from "framer-motion";

const Leaderboard = () => {
    const theme = useTheme();
    const [tab, setTab] = useState(0);

    const friendsData = [
        { rank: 1, name: "Harikrishnan", score: 15420, change: "up", changeVal: 1, avatar: null, isMe: true },
        { rank: 2, name: "Alex Chen", score: 14200, change: "down", changeVal: 1, avatar: null },
        { rank: 3, name: "Sarah Miller", score: 13850, change: "up", changeVal: 2, avatar: null },
        { rank: 4, name: "DataWizard", score: 12100, change: "stable", changeVal: 0, avatar: null },
        { rank: 5, name: "CodeNinja", score: 11950, change: "up", changeVal: 1, avatar: null },
    ];

    const globalData = [
        { rank: 1, name: "Tourists", score: 45200, change: "stable", changeVal: 0, avatar: null },
        { rank: 2, name: "Gennady7", score: 44150, change: "up", changeVal: 1, avatar: null },
        { rank: 3, name: "Um_nik", score: 42800, change: "stable", changeVal: 0, avatar: null },
        { rank: 142, name: "Harikrishnan", score: 15420, change: "up", changeVal: 15, avatar: null, isMe: true },
        { rank: 143, name: "DevMaster", score: 15380, change: "down", changeVal: 3, avatar: null },
    ];

    const data = tab === 0 ? friendsData : globalData;

    const getChangeIcon = (change) => {
        if (change === "up") return <TrendingUp size={14} color="#48bb78" />;
        if (change === "down") return <TrendingDown size={14} color="#f56565" />;
        return <Minus size={14} color="#a0aec0" />;
    };

    const getRankColor = (rank) => {
        if (rank === 1) return "#fbbf24"; // Gold
        if (rank === 2) return "#94a3b8"; // Silver
        if (rank === 3) return "#d97706"; // Bronze
        return "transparent";
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 5,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ mb: 3, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.main', color: 'white' }}>
                        <Crown size={20} />
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Leaderboard</Typography>
                </Box>
                <Tabs
                    value={tab}
                    onChange={(e, v) => setTab(v)}
                    sx={{
                        minHeight: 36,
                        '& .MuiTab-root': { py: 0.5, px: 2, minHeight: 36, fontWeight: 700, textTransform: 'none', fontSize: '0.8rem' }
                    }}
                >
                    <Tab label="Friends" icon={<Users size={14} />} iconPosition="start" />
                    <Tab label="Global" icon={<Globe size={14} />} iconPosition="start" />
                </Tabs>
            </Box>

            <List sx={{ p: 0 }}>
                {data.map((user, index) => (
                    <Fade in={true} timeout={300 + index * 100} key={user.rank}>
                        <ListItem
                            sx={{
                                px: 1.5,
                                py: 1.5,
                                borderRadius: 3,
                                mb: 1,
                                bgcolor: user.isMe ? 'primary.main' : 'transparent',
                                color: user.isMe ? 'white' : 'inherit',
                                border: user.isMe ? 'none' : '1px solid transparent',
                                '&:hover': {
                                    bgcolor: user.isMe ? 'primary.dark' : 'action.hover',
                                    borderColor: user.isMe ? 'none' : 'divider'
                                }
                            }}
                        >
                            <Box sx={{ minWidth: 24, fontWeight: 900, fontSize: '0.9rem', opacity: user.isMe ? 0.9 : 0.6 }}>
                                {user.rank}
                            </Box>

                            <ListItemAvatar sx={{ minWidth: 48 }}>
                                <Avatar sx={{
                                    width: 36,
                                    height: 36,
                                    border: user.rank <= 3 ? `2px solid ${getRankColor(user.rank)}` : 'none',
                                    bgcolor: user.isMe ? 'rgba(255,255,255,0.2)' : 'primary.light'
                                }}>
                                    {user.name.charAt(0)}
                                </Avatar>
                            </ListItemAvatar>

                            <ListItemText
                                primary={
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{user.name}</Typography>
                                        {user.rank <= 3 && <Trophy size={14} color={getRankColor(user.rank)} />}
                                    </Box>
                                }
                                secondary={
                                    <Typography variant="caption" sx={{ color: user.isMe ? 'rgba(255,255,255,0.7)' : 'text.secondary', fontWeight: 600 }}>
                                        {user.score.toLocaleString()} Points
                                    </Typography>
                                }
                            />

                            <Box sx={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                                    {getChangeIcon(user.change)}
                                    <Typography variant="caption" sx={{ fontWeight: 800, color: user.isMe ? 'white' : 'inherit' }}>
                                        {user.changeVal === 0 ? '' : user.changeVal}
                                    </Typography>
                                </Box>
                                <Typography variant="caption" sx={{ opacity: 0.5, fontSize: '0.65rem' }}>RANK CHG</Typography>
                            </Box>
                        </ListItem>
                    </Fade>
                ))}
            </List>

            <Button
                fullWidth
                variant="outlined"
                sx={{ mt: 2, borderRadius: 3, textTransform: 'none', fontWeight: 700, borderColor: 'divider' }}
            >
                View Full Ranking
            </Button>
        </Paper>
    );
};

export default Leaderboard;
