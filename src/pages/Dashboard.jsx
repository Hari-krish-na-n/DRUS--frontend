// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { 
  Box, 
  Container, 
  Typography, 
  Grid, 
  Card, 
  CircularProgress, 
  Alert,
  Button,
  Stack,
  useTheme,
  IconButton,
  Fade,
  Chip
} from "@mui/material";
import Layout from "../components/Layout";
import { 
  TrendingUp, 
  Code, 
  CheckCircle, 
  Trophy, 
  ArrowRight,
  RefreshCw,
  Calendar,
  Zap,
  Star
} from "lucide-react";
import { apiFetch } from "../api/client";
import StatCard from "../components/dashboard/StatCard";
import { motion } from "framer-motion";
import { 
  ResponsiveContainer, 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as ChartTooltip,
  BarChart,
  Bar,
  Cell
} from 'recharts';
import { useAuth } from "../hooks/useAuth";

const Dashboard = () => {
  const { user } = useAuth();
  const theme = useTheme();
  const [stats, setStats] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const mockWeeklyData = [
    { day: 'Mon', solved: 4 },
    { day: 'Tue', solved: 7 },
    { day: 'Wed', solved: 5 },
    { day: 'Thu', solved: 9 },
    { day: 'Fri', solved: 12 },
    { day: 'Sat', solved: 8 },
    { day: 'Sun', solved: 6 },
  ];

  const mockLanguageData = [
    { name: 'Python', value: 45, color: '#3776ab' },
    { name: 'JavaScript', value: 30, color: '#f7df1e' },
    { name: 'C++', value: 15, color: '#00599c' },
    { name: 'Java', value: 10, color: '#007396' },
  ];

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setLoading(true);
      const data = await apiFetch("/api/analytics");
      setStats(data);
    } catch (err) {
      console.error("Failed to load dashboard:", err);
      setError(err.message);
      // Fallback stats
      setStats({
        totalSolved: 124,
        totalContests: 12,
        streak: 7,
        languages: mockLanguageData
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
        {/* Welcome Section */}
        <Box sx={{ mb: 6 }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={8}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Stack direction="row" spacing={1} alignItems="center" sx={{ mb: 2 }}>
                  <Chip 
                    label="PRO ACCOUNT" 
                    size="small" 
                    color="primary" 
                    sx={{ fontWeight: 800, borderRadius: 1.5, height: 24 }} 
                  />
                  <Typography variant="caption" color="text.secondary" sx={{ fontWeight: 600, letterSpacing: '0.05em' }}>
                    LAST SYNC: 2 HOURS AGO
                  </Typography>
                </Stack>
                <Typography variant="h3" fontWeight={800} sx={{ mb: 1, letterSpacing: '-0.03em' }}>
                  Welcome back, {user?.name?.split(' ')[0] || 'Developer'}! 👋
                </Typography>
                <Typography variant="h6" color="text.secondary" fontWeight={500} sx={{ mb: 3, maxWidth: 600 }}>
                  You've solved <Box component="span" sx={{ color: 'primary.main', fontWeight: 700 }}>12 new problems</Box> this week. Keep up the momentum!
                </Typography>
                <Stack direction="row" spacing={2}>
                  <Button 
                    variant="contained" 
                    startIcon={<Code size={18} />}
                    sx={{ 
                      px: 3, 
                      py: 1.5, 
                      borderRadius: 3, 
                      fontWeight: 700,
                      textTransform: 'none',
                      boxShadow: '0 10px 15px -3px rgba(37, 99, 235, 0.25)',
                      '&:hover': {
                        transform: 'translateY(-2px)',
                        boxShadow: '0 20px 25px -5px rgba(37, 99, 235, 0.3)',
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    Start Practicing
                  </Button>
                  <Button 
                    variant="outlined" 
                    startIcon={<RefreshCw size={18} />}
                    onClick={loadDashboardData}
                    sx={{ 
                      px: 3, 
                      py: 1.5, 
                      borderRadius: 3, 
                      fontWeight: 700,
                      textTransform: 'none',
                      borderWidth: 2,
                      '&:hover': {
                        borderWidth: 2,
                        transform: 'translateY(-2px)',
                        bgcolor: 'action.hover'
                      },
                      transition: 'all 0.2s'
                    }}
                  >
                    Sync Data
                  </Button>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={4} sx={{ display: { xs: 'none', md: 'block' } }}>
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card 
                  elevation={0}
                  sx={{ 
                    p: 3.5, 
                    borderRadius: 6, 
                    background: (theme) => theme.palette.mode === 'dark' 
                      ? 'linear-gradient(135deg, #1e293b 0%, #0f172a 100%)' 
                      : 'linear-gradient(135deg, #6366f1 0%, #4338ca 100%)',
                    color: 'white',
                    position: 'relative',
                    overflow: 'hidden',
                    boxShadow: (theme) => theme.palette.mode === 'dark' 
                      ? '0 20px 40px rgba(0,0,0,0.3)' 
                      : '0 20px 40px rgba(99, 102, 241, 0.25)',
                    border: '1px solid',
                    borderColor: 'rgba(255,255,255,0.1)'
                  }}
                >
                  <Box sx={{ position: 'relative', zIndex: 1 }}>
                    <Stack direction="row" justifyContent="space-between" alignItems="flex-start" sx={{ mb: 3 }}>
                      <Box>
                        <Typography variant="h6" fontWeight={700} sx={{ mb: 0.5 }}>Next Contest</Typography>
                        <Typography variant="body2" sx={{ opacity: 0.8, fontWeight: 500 }}>Weekly Contest 436</Typography>
                      </Box>
                      <Box 
                        sx={{ 
                          p: 1, 
                          borderRadius: 2, 
                          bgcolor: 'rgba(255,255,255,0.2)',
                          display: 'flex'
                        }}
                      >
                        <Calendar size={20} />
                      </Box>
                    </Stack>
                    
                    <Box sx={{ mb: 3 }}>
                      <Typography variant="caption" sx={{ opacity: 0.7, fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                        Starts In
                      </Typography>
                      <Typography variant="h3" fontWeight={800} sx={{ letterSpacing: '-0.02em' }}>14:24:05</Typography>
                    </Box>

                    <Button 
                      fullWidth 
                      variant="contained" 
                      sx={{ 
                        py: 1.5,
                        borderRadius: 3,
                        fontWeight: 700,
                        textTransform: 'none',
                        bgcolor: 'white',
                        color: 'primary.main',
                        '&:hover': { 
                          bgcolor: 'rgba(255,255,255,0.9)',
                          transform: 'translateY(-2px)'
                        },
                        transition: 'all 0.2s'
                      }}
                      endIcon={<ArrowRight size={18} />}
                    >
                      Register Now
                    </Button>
                  </Box>
                  <Trophy 
                    size={160} 
                    style={{ 
                      position: 'absolute', 
                      bottom: -30, 
                      right: -30, 
                      opacity: 0.1,
                      transform: 'rotate(-15deg)'
                    }} 
                  />
                </Card>
              </motion.div>
            </Grid>
          </Grid>
        </Box>

        {error && (
          <Fade in>
            <Alert 
              severity="info" 
              icon={<Zap size={20} />}
              sx={{ 
                mb: 4, 
                borderRadius: 4, 
                border: '1px solid', 
                borderColor: 'info.light',
                bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(2, 132, 199, 0.1)' : 'rgba(2, 132, 199, 0.05)',
                '& .MuiAlert-message': { fontWeight: 500 }
              }}
              action={
                <Button color="info" size="small" variant="text" sx={{ fontWeight: 700 }} endIcon={<ArrowRight size={16} />}>
                  Connect Now
                </Button>
              }
            >
              Your coding profiles are not fully connected. Sync now to see accurate statistics!
            </Alert>
          </Fade>
        )}

        {/* Stats Grid */}
        <Grid container spacing={3} sx={{ mb: 6 }}>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Problems Solved" 
              value={stats?.totalSolved || 0} 
              icon={CheckCircle} 
              color="#6366f1"
              trend="up"
              trendValue="12%"
              subtitle="vs last month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Contests" 
              value={stats?.totalContests || 0} 
              icon={Trophy} 
              color="#f59e0b"
              trend="up"
              trendValue="+2"
              subtitle="new this month"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Current Streak" 
              value={stats?.streak || 0} 
              icon={TrendingUp} 
              color="#ef4444"
              trend="up"
              trendValue="Active"
              subtitle="Keep it going!"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <StatCard 
              title="Global Rank" 
              value="Top 5%" 
              icon={Star} 
              color="#10b981"
              trend="up"
              trendValue="0.5%"
              subtitle="Improved rank"
            />
          </Grid>
        </Grid>

        {/* Charts Section */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={8}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Card 
                elevation={0}
                sx={{ 
                  p: 4, 
                  borderRadius: 6, 
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'white',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
                  <Stack direction="row" spacing={2} alignItems="center">
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'primary.main', display: 'flex' }}>
                      <TrendingUp size={20} color="white" />
                    </Box>
                    <Typography variant="h6" fontWeight={700}>Solving Progress</Typography>
                  </Stack>
                  <Stack direction="row" spacing={1} sx={{ bgcolor: 'action.hover', p: 0.5, borderRadius: 2.5 }}>
                    <Button 
                      size="small" 
                      sx={{ 
                        borderRadius: 2, 
                        px: 2,
                        fontWeight: 700,
                        bgcolor: 'background.paper',
                        boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                        color: 'text.primary',
                        '&:hover': { bgcolor: 'background.paper' }
                      }}
                    >
                      Week
                    </Button>
                    <Button 
                      size="small" 
                      sx={{ 
                        borderRadius: 2, 
                        px: 2,
                        fontWeight: 600,
                        color: 'text.secondary'
                      }}
                    >
                      Month
                    </Button>
                  </Stack>
                </Box>
                <Box sx={{ height: 320, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={mockWeeklyData}>
                      <defs>
                        <linearGradient id="colorSolved" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={theme.palette.primary.main} stopOpacity={0.3}/>
                          <stop offset="95%" stopColor={theme.palette.primary.main} stopOpacity={0}/>
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={theme.palette.divider} />
                      <XAxis 
                        dataKey="day" 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 500 }} 
                        dy={10}
                      />
                      <YAxis 
                        axisLine={false} 
                        tickLine={false} 
                        tick={{ fill: theme.palette.text.secondary, fontSize: 12, fontWeight: 500 }} 
                        dx={-10}
                      />
                      <ChartTooltip 
                        contentStyle={{ 
                          borderRadius: 16, 
                          border: '1px solid',
                          borderColor: theme.palette.divider, 
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                          backgroundColor: theme.palette.background.paper,
                          padding: '12px 16px'
                        }} 
                        itemStyle={{ fontWeight: 700 }}
                        labelStyle={{ fontWeight: 600, marginBottom: 4 }}
                      />
                      <Area 
                        type="monotone" 
                        dataKey="solved" 
                        stroke={theme.palette.primary.main} 
                        strokeWidth={4}
                        fillOpacity={1} 
                        fill="url(#colorSolved)" 
                        animationDuration={2000}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </Box>
              </Card>
            </motion.div>
          </Grid>

          <Grid item xs={12} md={4}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
            >
              <Card 
                elevation={0}
                sx={{ 
                  p: 4, 
                  borderRadius: 6, 
                  height: '100%',
                  border: '1px solid',
                  borderColor: 'divider',
                  bgcolor: (theme) => theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.5)' : 'white',
                  backdropFilter: 'blur(10px)'
                }}
              >
                <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                  <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'secondary.main', display: 'flex' }}>
                    <Code size={20} color="white" />
                  </Box>
                  <Typography variant="h6" fontWeight={700}>Language Usage</Typography>
                </Stack>
                <Box sx={{ height: 320, width: '100%' }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={mockLanguageData} layout="vertical" margin={{ left: -20, right: 20 }}>
                      <XAxis type="number" hide />
                      <YAxis 
                        dataKey="name" 
                        type="category" 
                        axisLine={false} 
                        tickLine={false} 
                        width={100}
                        tick={{ fill: theme.palette.text.primary, fontWeight: 700, fontSize: 13 }}
                      />
                      <ChartTooltip 
                        cursor={{ fill: theme.palette.action.hover, radius: 8 }}
                        contentStyle={{ 
                          borderRadius: 16, 
                          border: '1px solid',
                          borderColor: theme.palette.divider,
                          boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                          backgroundColor: theme.palette.background.paper
                        }}
                      />
                      <Bar dataKey="value" radius={[0, 8, 8, 0]} barSize={24} animationDuration={2000}>
                        {mockLanguageData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={entry.color} />
                        ))}
                      </Bar>
                    </BarChart>
                  </ResponsiveContainer>
                </Box>
                <Stack spacing={2} sx={{ mt: 2 }}>
                  {mockLanguageData.slice(0, 3).map((lang) => (
                    <Box key={lang.name} sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Stack direction="row" spacing={1.5} alignItems="center">
                        <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: lang.color }} />
                        <Typography variant="body2" fontWeight={600}>{lang.name}</Typography>
                      </Stack>
                      <Typography variant="body2" color="text.secondary" fontWeight={700}>{lang.value}%</Typography>
                    </Box>
                  ))}
                </Stack>
              </Card>
            </motion.div>
          </Grid>
        </Grid>
      </Container>
    </Layout>
  );
};

export default Dashboard;
