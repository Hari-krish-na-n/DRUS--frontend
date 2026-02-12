// src/pages/NotFound.jsx
import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';

const NotFound = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'linear-gradient(225deg, #667eea 0%, #764ba2 100%)',
      }}
    >
      <Container maxWidth="sm" sx={{ textAlign: 'center' }}>
        <Typography variant="h1" sx={{ fontSize: '8rem', fontWeight: 800, color: 'white', mb: 2 }}>
          404
        </Typography>
        <Typography variant="h4" sx={{ color: 'white', mb: 3 }}>
          Page Not Found
        </Typography>
        <Typography variant="body1" sx={{ color: 'rgba(255,255,255,0.8)', mb: 4 }}>
          The page you're looking for doesn't exist or has been moved.
        </Typography>
        <Button
          variant="contained"
          size="large"
          startIcon={<Home />}
          onClick={() => navigate('/dashboard')}
          sx={{
            bgcolor: 'white',
            color: '#667eea',
            '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
          }}
        >
          Go to Dashboard
        </Button>
      </Container>
    </Box>
  );
};

export default NotFound;