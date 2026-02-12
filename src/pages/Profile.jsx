// src/pages/Profile.jsx
import React, { useState } from "react";
import {
  Typography,
  Grid,
  Card,
  CardContent,
  Chip,
  Box,
  Container,
  Avatar,
  IconButton,
  Tooltip,
  Button,
  Paper
} from "@mui/material";
import {
  RefreshCw,
  ExternalLink,
  CheckCircle2,
  XCircle,
  Clock,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import Layout from "../components/Layout";
import ProfileConnect from "../components/forms/ProfileConnect";
import { usePlatformData } from "../context/PlatformContext";
import { PLATFORM_LABELS } from "../utils/constants";

const PlatformConnectionCard = ({ platform, onConnect, delay }) => {
  return (
    <Grid item xs={12} sm={6} md={3}>
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ delay }}
      >
        <Card
          sx={{
            borderRadius: 4,
            height: '100%',
            position: 'relative',
            overflow: 'visible',
            border: '1px solid',
            borderColor: platform.connected ? 'primary.main' : 'divider',
            bgcolor: platform.connected ? 'rgba(102, 126, 234, 0.02)' : 'background.paper',
            transition: '0.3s',
            '&:hover': {
              boxShadow: '0 8px 30px rgba(0,0,0,0.08)',
              transform: 'translateY(-4px)'
            }
          }}
        >
          <CardContent sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
              <Avatar
                sx={{
                  width: 50,
                  height: 50,
                  bgcolor: platform.connected ? 'primary.main' : 'grey.200',
                  color: platform.connected ? 'white' : 'grey.400'
                }}
              >
                {platform.name.charAt(0)}
              </Avatar>
              <Box>
                {platform.connected ? (
                  <CheckCircle2 color="#00EA64" size={24} />
                ) : (
                  <XCircle color="#ccc" size={24} />
                )}
              </Box>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 700 }}>{platform.name}</Typography>
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2, minHeight: 40 }}>
              {platform.connected ? `@${platform.username}` : "Not connected yet"}
            </Typography>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 3 }}>
              <Clock size={14} color="#666" />
              <Typography variant="caption" color="text.secondary">
                {platform.connected ? `Synced ${platform.lastSynced}` : "Never synced"}
              </Typography>
            </Box>

            <Button
              fullWidth
              variant={platform.connected ? "outlined" : "contained"}
              size="small"
              onClick={() => onConnect(platform.id)}
              sx={{
                borderRadius: 2,
                textTransform: 'none',
                fontWeight: 600
              }}
            >
              {platform.connected ? "Update Connection" : "Connect"}
            </Button>
          </CardContent>
        </Card>
      </motion.div>
    </Grid>
  );
};

const Profile = () => {
  const { platforms, connectPlatform, syncPlatform, syncStatus } = usePlatformData();
  const [selectedPlatform, setSelectedPlatform] = useState(null);

  const handleConnectClick = (platformId) => {
    setSelectedPlatform(platformId);
    // Scroll to form or open modal
  };

  return (
    <Layout>
      <Container maxWidth="xl" sx={{ py: 2 }}>
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" sx={{ fontWeight: 800, mb: 1 }}>
            Platform Profiles
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Connect your coding and learning platforms to sync your progress automatically.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ mb: 6 }}>
          {platforms.map((platform, index) => (
            <PlatformConnectionCard
              key={platform.id}
              platform={platform}
              onConnect={handleConnectClick}
              delay={index * 0.1}
            />
          ))}

          {/* Add New Platform Placeholder */}
          <Grid item xs={12} sm={6} md={3}>
            <Card
              sx={{
                borderRadius: 4,
                height: '100%',
                border: '2px dashed',
                borderColor: 'divider',
                bgcolor: 'transparent',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                minHeight: 220,
                '&:hover': { bgcolor: 'rgba(0,0,0,0.01)', borderColor: 'primary.main' }
              }}
            >
              <Box sx={{ textAlign: 'center' }}>
                <Plus size={40} color="#999" sx={{ mb: 1 }} />
                <Typography variant="body2" color="text.secondary">Request New Platform</Typography>
              </Box>
            </Card>
          </Grid>
        </Grid>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          <Paper
            sx={{
              p: { xs: 3, md: 5 },
              borderRadius: 6,
              boxShadow: '0 10px 40px rgba(0,0,0,0.04)',
              background: 'linear-gradient(to bottom right, #ffffff, #fafafa)'
            }}
          >
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" sx={{ fontWeight: 800, mb: 1 }}>
                Update Connectivity
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Select a platform and enter your username to establish a new link.
              </Typography>
            </Box>

            <ProfileConnect
              initialPlatform={selectedPlatform}
              onSuccess={() => setSelectedPlatform(null)}
            />
          </Paper>
        </motion.div>
      </Container>
    </Layout>
  );
};

export default Profile;

