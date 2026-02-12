// src/pages/Analytics.jsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Grid,
  Card,
  CircularProgress,
  Alert,
  Stack,
  useTheme,
  Chip,
  LinearProgress,
  IconButton
} from "@mui/material";
import Layout from "../components/Layout";
import { apiFetch } from "../api/client";
import { 
  TrendingUp, 
  Code, 
  CheckCircle, 
  Trophy, 
  ArrowRight,
  Zap,
  Activity,
  BarChart3,
  PieChart as PieChartIcon,
  Filter
} from "lucide-react";
import { motion } from "framer-motion";
import StatCard from "../components/dashboard/StatCard";

const Analytics = () => {
  const theme = useTheme();
  const [analytics, setAnalytics] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    loadAnalytics();
  }, []);

  const loadAnalytics = async () => {
    try {
      setLoading(true);
      setError("");
      
      const data = await apiFetch("/api/analytics");
      setAnalytics(data);
    } catch (err) {
      console.error("Analytics load failed:", err);
      setError(err.message);
      // Fallback data for demonstration
      setAnalytics({
        totalSolved: 770,
        totalContests: 12,
        streak: 7,
        languages: ['Python', 'JavaScript', 'C++', 'Java'],
        platforms: [
          { name: 'LeetCode', solved: 450, color: '#FFA116' },
          { name: 'HackerRank', solved: 320, color: '#00EA64' }
        ]
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Layout>
        <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
          <CircularProgress thickness={4} size={50} />
        </Box>
      </Layout>
    );
  }

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
            <Box>
              <Typography variant="h4" sx={{ fontWeight: 800, letterSpacing: '-0.02em', mb: 1 }}>
                Coding Analytics
              </Typography>
              <Typography variant="body1" color="text.secondary">
                Deep dive into your performance across different platforms and languages.
              </Typography>
            </Box>
            <Stack direction="row" spacing={1}>
              <IconButton sx={{ bgcolor: 'action.hover', borderRadius: 2 }}>
                <Filter size={20} />
              </IconButton>
              <Chip 
                label="Last 30 Days" 
                onDelete={() => {}} 
                sx={{ 
                  borderRadius: 2, 
                  fontWeight: 700, 
                  bgcolor: 'primary.main', 
                  color: 'white',
                  '& .MuiChip-deleteIcon': { color: 'white' }
                }} 
              />
            </Stack>
          </Box>
        </motion.div>

        {error && (
          <Alert severity="error" sx={{ mb: 4, borderRadius: 4 }}>
            {error}
          </Alert>
        )}

        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Total Solved" 
              value={analytics?.totalSolved || 0} 
              icon={CheckCircle} 
              color="#6366f1"
              trend="up"
              trendValue="8%"
              subtitle="Overall progress"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Contests" 
              value={analytics?.totalContests || 0} 
              icon={Trophy} 
              color="#f59e0b"
              trend="up"
              trendValue="+1"
              subtitle="Competitive performance"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Current Streak" 
              value={analytics?.streak || 0} 
              icon={TrendingUp} 
              color="#ef4444"
              trend="up"
              trendValue="Active"
              subtitle="Daily consistency"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Activity Score" 
              value="842" 
              icon={Activity} 
              color="#10b981"
              trend="up"
              trendValue="12"
              subtitle="Higher than 80% users"
            />
          </Grid>
        </Grid>

        <Grid container spacing={4}>
          {/* Platform Performance */}
          <Grid item xs={12} lg={8}>
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
            >
              <Card 
                elevation={0}
                sx={{ 
                  p: 4, 
                  borderRadius: 6, 
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'white',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.main', display: 'flex' }}>
                    <BarChart3 size={20} color="white" />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>Platform Distribution</Typography>
                </Stack>

                <Stack spacing={4}>
                  {analytics?.platforms?.map((platform, index) => {
                    const percentage = Math.round((platform.solved / (analytics.totalSolved || 1)) * 100);
                    return (
                      <Box key={platform.name}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', mb: 1.5 }}>
                          <Stack direction="row" spacing={1.5} alignItems="center">
                            <Box 
                              sx={{ 
                                width: 32, 
                                height: 32, 
                                borderRadius: 1.5, 
                                bgcolor: `${platform.color}15`,
                                display: 'flex',
                                alignItems: 'center',
                                justifyContent: 'center',
                                border: '1px solid',
                                borderColor: `${platform.color}30`
                              }}
                            >
                              <Zap size={16} color={platform.color} />
                            </Box>
                            <Box>
                              <Typography variant="body1" fontWeight={700}>{platform.name}</Typography>
                              <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600 }}>
                                {platform.solved} problems solved
                              </Typography>
                            </Box>
                          </Stack>
                          <Typography variant="body2" fontWeight={800} color="primary.main">
                            {percentage}%
                          </Typography>
                        </Box>
                        <LinearProgress 
                          variant="determinate" 
                          value={percentage} 
                          sx={{ 
                            height: 8, 
                            borderRadius: 4,
                            bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                            '& .MuiLinearProgress-bar': {
                              borderRadius: 4,
                              bgcolor: platform.color,
                              backgroundImage: 'linear-gradient(45deg, rgba(255,255,255,0.15) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.15) 50%, rgba(255,255,255,0.15) 75%, transparent 75%, transparent)',
                              backgroundSize: '1rem 1rem'
                            }
                          }}
                        />
                      </Box>
                    );
                  })}
                </Stack>
              </Card>
            </motion.div>
          </Grid>

          {/* Languages & Skills */}
          <Grid item xs={12} lg={4}>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card 
                elevation={0}
                sx={{ 
                  p: 4, 
                  borderRadius: 6, 
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'white',
                  backdropFilter: 'blur(10px)',
                  height: '100%'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'secondary.main', display: 'flex' }}>
                    <PieChartIcon size={20} color="white" />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>Top Languages</Typography>
                </Stack>

                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                  {analytics?.languages?.map((lang, index) => (
                    <Chip 
                      key={lang}
                      label={lang}
                      sx={{ 
                        px: 1,
                        py: 2.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        fontSize: '0.9rem',
                        bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.03)',
                        border: '1px solid',
                        borderColor: 'divider',
                        '&:hover': {
                          bgcolor: 'primary.main',
                          color: 'white',
                          borderColor: 'primary.main',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.2s'
                      }}
                    />
                  ))}
                </Box>

                <Box sx={{ mt: 6, p: 3, borderRadius: 4, bgcolor: 'primary.main', color: 'white', position: 'relative', overflow: 'hidden' }}>
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Typography variant="h6" fontWeight={800} sx={{ mb: 1 }}>Skill Level: Expert</Typography>
                    <Typography variant="body2" sx={{ opacity: 0.9, mb: 3 }}>You are in the top 10% of competitive programmers in your region.</Typography>
                    <Button 
                      variant="contained" 
                      fullWidth 
                      sx={{ 
                        bgcolor: 'white', 
                        color: 'primary.main', 
                        fontWeight: 700,
                        borderRadius: 2,
                        '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
                      }}
                    >
                      View Certifications
                    </Button>
                  </Box>
                  <Trophy 
                    size={100} 
                    style={{ 
                      position: 'absolute', 
                      bottom: -20, 
                      right: -10, 
                      opacity: 0.2,
                      transform: 'rotate(-15deg)'
                    }} 
                  />
                </Box>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Analytics;
