// src/pages/Achievements.jsx
import React, { useState, useMemo } from "react";
import {
  Box,
  Grid,
  Typography,
  Fade,
  useTheme,
  Button,
  Chip,
  Card,
  Stack,
  Container,
  IconButton
} from "@mui/material";
import {
  Trophy,
  Star,
  Zap,
  Flame,
  Target,
  Crown,
  Medal,
  Award,
  BookOpen,
  Code2,
  Filter,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import BadgeGrid from "../components/achievements/BadgeGrid";
import AchievementTimeline from "../components/achievements/AchievementTimeline";
import NextAchievements from "../components/achievements/NextAchievements";
import Leaderboard from "../components/achievements/Leaderboard";
import Layout from "../components/Layout";

const Achievements = () => {
  const theme = useTheme();
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('rarity');

  // Mock Data
  const [badges] = useState([
    { id: 1, title: 'Problem Solver I', description: 'Solve your first 50 problems.', status: 'earned', rarity: 'common', category: 'milestone', icon: <Target size={32} />, color: '#a0aec0', earnedDate: '2025-10-12' },
    { id: 2, title: 'Streak Master', description: 'Maintain a 15-day coding streak.', status: 'earned', rarity: 'rare', category: 'milestone', icon: <Flame size={32} />, color: '#4299e1', earnedDate: '2026-01-05' },
    { id: 3, title: 'Algorithm Expert', description: 'Solve 100 Hard problems.', status: 'in-progress', rarity: 'epic', category: 'competitive', icon: <Medal size={32} />, color: '#764ba2', progress: 65, current: 65, target: 100 },
    { id: 5, title: 'Grandmaster', description: 'Reach a rating of 2400 on Codeforces.', status: 'locked', rarity: 'legendary', category: 'competitive', icon: <Crown size={32} />, color: '#ecc94b' },
    { id: 6, title: 'Contest Champ', description: 'Place in the top 1% of a contest.', status: 'locked', rarity: 'epic', category: 'competitive', icon: <Award size={32} />, color: '#764ba2' },
    { id: 7, title: 'Fastest Finger', description: 'Solve a problem in under 5 minutes.', status: 'earned', rarity: 'common', category: 'milestone', icon: <Zap size={32} />, color: '#a0aec0', earnedDate: '2025-12-20' },
    { id: 9, title: 'Python Architect', description: 'Complete the Python Mastery course.', status: 'earned', rarity: 'rare', category: 'learning', icon: <BookOpen size={32} />, color: '#48bb78', earnedDate: '2026-02-01' },
    { id: 10, title: 'DP Guru', description: 'Solve 50 Dynamic Programming problems.', status: 'in-progress', rarity: 'epic', category: 'learning', icon: <Code2 size={32} />, color: '#667eea', progress: 40, current: 20, target: 50 },
  ]);

  const timeline = [
    { id: 1, title: 'Problem Solver I', description: 'Reached 50 problems milestone', date: new Date(2025, 9, 12), color: '#a0aec0', icon: <Target size={18} /> },
    { id: 2, title: 'Python Architect', description: 'Completed Python Mastery', date: new Date(2026, 1, 1), color: '#48bb78', icon: <BookOpen size={18} /> },
    { id: 3, title: 'Streak Master', description: 'Unlocked 15 day streak', date: new Date(2026, 0, 5), color: '#4299e1', icon: <Flame size={18} /> },
  ];

  const nextList = [
    { title: 'Algorithm Expert', requirement: 'Solve 100 Hard problems', progress: 65, current: 65, target: 100, color: '#764ba2', icon: <Trophy size={20} />, tips: "Focus on sliding window and segment tree problems to bridge the gap faster." },
    { title: 'DP Guru', requirement: 'Solve 50 DP problems', progress: 40, current: 20, target: 50, color: '#667eea', icon: <Zap size={20} />, tips: "Practice recursive patterns before moving to iterative tabulation." },
  ];

  const filteredAndSortedBadges = useMemo(() => {
    let result = badges.filter(badge => {
      const matchesSearch = badge.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        badge.description.toLowerCase().includes(searchQuery.toLowerCase());

      let matchesCategory = true;
      if (activeCategory === 'earned') matchesCategory = badge.status === 'earned';
      else if (activeCategory === 'progress') matchesCategory = badge.status === 'in-progress';
      else if (activeCategory === 'milestone') matchesCategory = badge.category === 'milestone';
      else if (activeCategory === 'competitive') matchesCategory = badge.category === 'competitive';
      else if (activeCategory === 'learning') matchesCategory = badge.category === 'learning';
      else if (activeCategory === 'rare') matchesCategory = badge.rarity === 'epic' || badge.rarity === 'legendary';

      return matchesSearch && matchesCategory;
    });

    return [...result].sort((a, b) => {
      const rarityScore = { legendary: 4, epic: 3, rare: 2, common: 1 };
      if (sortBy === 'rarity') return rarityScore[b.rarity] - rarityScore[a.rarity];
      if (sortBy === 'date') return new Date(b.earnedDate || 0) - new Date(a.earnedDate || 0);
      if (sortBy === 'name') return a.title.localeCompare(b.title);
      return 0;
    });
  }, [badges, activeCategory, searchQuery, sortBy]);

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        {/* Header Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 3 }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>
                Achievements & Badges
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Collect badges, track milestones, and conquer new coding challenges.
              </Typography>
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Card
                elevation={0}
                sx={{
                  px: 2.5,
                  py: 1.5,
                  borderRadius: 4,
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'white',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Box 
                  sx={{ 
                    p: 1, 
                    borderRadius: 2, 
                    bgcolor: '#ecc94b15', 
                    color: '#ecc94b',
                    display: 'flex'
                  }}
                >
                  <Trophy size={20} />
                </Box>
                <Box>
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 700, display: 'block', lineHeight: 1, letterSpacing: '0.05em', mb: 0.5 }}>
                    CURRENT LEVEL
                  </Typography>
                  <Typography variant="h6" sx={{ fontWeight: 900, lineHeight: 1 }}>LVL 14</Typography>
                </Box>
              </Card>
              <Button 
                variant="contained" 
                startIcon={<Plus size={18} />}
                sx={{ 
                  borderRadius: 3, 
                  px: 3, 
                  py: 1.5,
                  fontWeight: 700,
                  textTransform: 'none',
                  boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.25)'
                }}
              >
                New Goal
              </Button>
            </Box>
          </Box>
        </motion.div>

        <Grid container spacing={4}>
          {/* Main Badge Grid Area */}
          <Grid item xs={12} lg={8}>
            <Stack spacing={4}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <BadgeGrid
                  badges={filteredAndSortedBadges || []}
                  activeCategory={activeCategory || 'all'}
                  onCategoryChange={setActiveCategory}
                  searchQuery={searchQuery || ''}
                  onSearchChange={setSearchQuery}
                  sortBy={sortBy || 'rarity'}
                  onSortChange={setSortBy}
                />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                <Leaderboard />
              </motion.div>
            </Stack>
          </Grid>

          {/* Sidebar Progress & History */}
          <Grid item xs={12} lg={4}>
            <Stack spacing={4}>
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                <NextAchievements nextList={nextList} />
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
              >
                <AchievementTimeline achievements={timeline} />
              </motion.div>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Achievements;
