// Simple mock API server for testing
import express from 'express';
import cors from 'cors';

const app = express();
const PORT = 3000;

app.use(cors());
app.use(express.json());

// Mock user database
const users = [
  {
    id: 1,
    email: 'demo@drus.com',
    password: 'Demo123!',
    name: 'Demo User'
  }
];

// Login endpoint
app.post('/api/auth/login', (req, res) => {
  const { email, password } = req.body;

  console.log('Login attempt:', { email, password });

  const user = users.find(u => u.email === email && u.password === password);

  if (user) {
    res.json({
      token: 'mock-jwt-token-' + Date.now(),
      user: {
        id: user.id,
        email: user.email,
        name: user.name
      }
    });
  } else {
    res.status(401).json({
      error: 'Invalid credentials',
      message: 'Email or password is incorrect'
    });
  }
});

// Platform Stats Endpoint (normalized)
app.get('/api/platforms/:platformId/:username', (req, res) => {
  const { platformId, username } = req.params;
  
  console.log(`Fetching stats for ${platformId} user: ${username}`);

  // In a real app, this would call leetcodeApi.js or hackerrankApi.js
  // For the mock, we generate random data but return the correct shape
  
  const stats = {
    leetcode: {
      total: 450,
      easy: 200,
      medium: 180,
      hard: 70,
      rank: "15,234",
      rating: 1850
    },
    hackerrank: {
      total: 320,
      easy: 150,
      medium: 120,
      hard: 50,
      rank: "8,412",
      rating: 2100
    },
    codeforces: {
      total: 210,
      easy: 80,
      medium: 100,
      hard: 30,
      rank: "Expert",
      rating: 1650
    }
  };

  const platformStats = stats[platformId] || {
    total: Math.floor(Math.random() * 500) + 50,
    easy: Math.floor(Math.random() * 200),
    medium: Math.floor(Math.random() * 200),
    hard: Math.floor(Math.random() * 100),
    rank: `#${Math.floor(Math.random() * 10000)}`,
    rating: Math.floor(Math.random() * 1000) + 1200
  };

  res.json({
    username,
    stats: platformStats
  });
});

// Mock stats for user profile
app.get('/api/profiles/me/stats', (req, res) => {
  res.json({
    totalSolved: 770,
    rank: "Global Top 10%",
    streak: 7,
    points: 2450,
    byTopic: [
      { name: 'Arrays', count: 150 },
      { name: 'DP', count: 80 },
      { name: 'Trees', count: 60 },
      { name: 'Graphs', count: 40 },
    ],
    mostFocusedArea: 'Arrays'
  });
});

// Analytics endpoint
app.get('/api/analytics', (req, res) => {
  res.json({
    totalSolved: 770,
    totalContests: 12,
    streak: 7,
    languages: ['Python', 'JavaScript', 'C++', 'Java'],
    platforms: [
      { name: 'LeetCode', solved: 450, color: '#FFA116' },
      { name: 'HackerRank', solved: 320, color: '#00EA64' }
    ]
  });
});

// Register endpoint
app.post('/api/auth/register', (req, res) => {
  const { email, password, name } = req.body;

  console.log('Register attempt:', { email, password, name });

  // Check if user already exists
  const existingUser = users.find(u => u.email === email);
  if (existingUser) {
    return res.status(400).json({
      error: 'User exists',
      message: 'Email already registered'
    });
  }

  // Create new user
  const newUser = {
    id: users.length + 1,
    email,
    password,
    name
  };

  users.push(newUser);

  res.json({
    token: 'mock-jwt-token-' + Date.now(),
    user: {
      id: newUser.id,
      email: newUser.email,
      name: newUser.name
    }
  });
});

// Google Login endpoint (Mock)
app.post('/api/auth/google', (req, res) => {
  const { idToken } = req.body;

  if (!idToken) {
    return res.status(400).json({ error: 'Missing idToken' });
  }

  console.log('Google Login attempt with idToken length:', idToken.length);

  // Simulate decoding user info from the token
  const googleUser = {
    id: 'google_' + Date.now(),
    email: 'google_user@gmail.com',
    name: 'Google User',
    avatarUrl: 'https://lh3.googleusercontent.com/a/default-user'
  };

  // Check if user exists or create new
  let user = users.find(u => u.email === googleUser.email);
  if (!user) {
    user = {
      ...googleUser,
      password: '', // no password for oauth users
      platforms: {
        leetcode: 'google_coder',
        codeforces: 'gc_master'
      }
    };
    users.push(user);
  }

  res.json({
    token: 'mock-jwt-token-google-' + Date.now(),
    user: {
      id: user.id,
      email: user.email,
      name: user.name,
      avatarUrl: user.avatarUrl,
      platforms: user.platforms
    }
  });
});

// Helper to generate random stats
const generatePlatformStats = (platform) => {
  const rating = Math.floor(Math.random() * (3000 - 1200) + 1200);
  const solved = Math.floor(Math.random() * (2000 - 50) + 50);
  const rank = Math.floor(Math.random() * 100000 + 1);

  return {
    rating,
    solved,
    rank,
    lastActive: new Date().toISOString().split('T')[0]
  };
};

// Get Profile
app.get('/api/profiles/me', (req, res) => {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: 'No token provided' });

  let user = users[0];

  if (!user.platforms) {
    user.platforms = {};
  }

  res.json(user);
});

// Update Platform
app.put('/api/profiles/platform', (req, res) => {
  const { platform, username } = req.body;
  if (!platform || !username) {
    return res.status(400).json({ error: 'Platform and username required' });
  }

  const user = users[0];

  if (!user.platforms) {
    user.platforms = {};
  }

  user.platforms[platform] = {
    username,
    ...generatePlatformStats(platform)
  };

  res.json({
    message: 'Platform updated',
    platforms: user.platforms
  });
});

// Verify Email endpoint
app.post('/api/auth/verify-email', (req, res) => {
  const { token } = req.body;
  if (token === 'valid_token' || token) {
    res.json({ message: 'Email verified successfully.' });
  } else {
    res.status(400).json({ error: 'Invalid or expired token.' });
  }
});

// Test endpoint
app.get('/api/test', (req, res) => {
  res.json({ message: 'Mock API server is running!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Mock API server running on http://localhost:${PORT}`);
  console.log('📋 Available endpoints:');
  console.log('   POST /api/auth/login');
  console.log('   POST /api/auth/register');
  console.log('   GET  /api/platforms/:platformId/:username');
  console.log('   GET  /api/test');
});