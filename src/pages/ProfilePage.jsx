import React, { useState } from "react";
import {
  Box,
  Grid,
  Typography,
  Tab,
  Tabs,
  Fade,
  Paper,
  useTheme,
  Container,
} from "@mui/material";
import { useAuth } from "../hooks/useAuth";
import ProfileHeader from "../components/forms/ProfileHeader";
import PlatformCard from "../components/forms/PlatformCard";
import PlatformDetailModal from "../components/forms/PlatformDetailModal";
import ProfileConnect from "../components/forms/ProfileConnect";
import { CODING_PLATFORMS, LEARNING_PLATFORMS } from "../utils/constants";
import { useNotification } from "../hooks/useNotification";
import { apiFetch } from "../api/client";
import Layout from "../components/Layout";
import { motion, AnimatePresence } from "framer-motion";

const ProfilePage = () => {
  const theme = useTheme();
  const { user } = useAuth();
  const { showSuccess, showError } = useNotification(); 

  const [activeTab, setActiveTab] = useState(0);
  const [selectedPlatform, setSelectedPlatform] = useState(null);
  const [modalType, setModalType] = useState(null); // 'connect' | 'details'

  // Initial state empty, user must connect manually
  const [connectedPlatforms, setConnectedPlatforms] = useState({});

  const extractPlatformUsername = (input, platformId) => {
    const trimmed = input.trim();
    if (platformId === 'leetcode') {
      if (!trimmed.includes("leetcode.com")) return trimmed;
      try {
        const url = new URL(
          trimmed.startsWith("http") ? trimmed : `https://${trimmed}`
        );
        const parts = url.pathname.split("/").filter(Boolean);
        // LeetCode URLs are usually /u/username or /username
        return parts[parts.length - 1];
      } catch {
        return trimmed;
      }
    }
    return trimmed;
  };

  const handleConnect = (platform) => {
    setSelectedPlatform(platform);
    setModalType("connect");
    if (platform.connectUrl) {
      window.open(platform.connectUrl, "_blank", "noopener,noreferrer");
    }
  };

  const handleViewDetails = (platform) => {
    setSelectedPlatform({
      ...platform,
      ...(connectedPlatforms[platform.id] || {}),
    });
    setModalType("details");
  };

  const handleSync = async (platformId) => {
    try {
      const username = connectedPlatforms[platformId]?.username;
      if (!username) return;

      showSuccess(`Syncing ${platformId} data...`);
      
      const data = await apiFetch(`/api/platforms/${platformId}/${username}`);

      setConnectedPlatforms(prev => ({
        ...prev,
        [platformId]: {
          ...prev[platformId],
          ...data
        }
      }));

      showSuccess(`${platformId} data synced successfully!`);
    } catch (err) {
      showError(err.message || `Failed to sync ${platformId}`);
    }
  };

  const handleDisconnect = (platformId) => {
    if (
      window.confirm(`Are you sure you want to disconnect ${platformId}?`)
    ) {
      const newConnected = { ...connectedPlatforms };
      delete newConnected[platformId];
      setConnectedPlatforms(newConnected);
      showSuccess(`Successfully disconnected from ${platformId}`);
    }
  };

  const handleConnectSubmit = async (values) => {
    try {
      const normalizedUsername = extractPlatformUsername(values.username, selectedPlatform.id);
      showSuccess(`Connecting to ${selectedPlatform.name}...`);
      
      const data = await apiFetch(`/api/platforms/${selectedPlatform.id}/${normalizedUsername}`);

      setConnectedPlatforms(prev => ({
        ...prev,
        [selectedPlatform.id]: {
          username: normalizedUsername,
          ...data
        }
      }));

      showSuccess(`Connected to ${selectedPlatform.name} successfully!`);
      setModalType(null);
    } catch (err) {
      showError(err.message || `Failed to connect to ${selectedPlatform.name}`);
    }
  };

  const isDark = theme.palette.mode === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  return (
    <Layout>
      <Box 
        sx={{ 
          minHeight: '100vh',
          background: isDark 
            ? 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)'
        }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 2, md: 4 } }}>
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <motion.div variants={itemVariants}>
              <ProfileHeader user={user} />
            </motion.div>

            <Box sx={{ mb: 5, mt: 4 }}>
              <motion.div variants={itemVariants}>
                <Tabs
                  value={activeTab}
                  onChange={(e, v) => setActiveTab(v)}
                  sx={{
                    mb: 4,
                    borderBottom: '1px solid',
                    borderColor: 'divider',
                    '& .MuiTab-root': {
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: '1rem',
                      minWidth: { xs: '50%', sm: 160 },
                      pb: 2,
                      color: 'text.secondary',
                      transition: 'all 0.3s',
                      '&.Mui-selected': { 
                        color: 'primary.main',
                        fontSize: '1.05rem'
                      }
                    },
                    '& .MuiTabs-indicator': {
                      height: 3,
                      borderRadius: '3px 3px 0 0',
                      boxShadow: '0 -2px 10px rgba(99, 102, 241, 0.3)'
                    }
                  }}
                >
                  <Tab label="Coding Platforms" />
                  <Tab label="Learning Resources" />
                </Tabs>
              </motion.div>

              <AnimatePresence mode="wait">
                <motion.div
                  key={activeTab}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                  transition={{ duration: 0.3 }}
                >
                  <Grid container spacing={3.5}>
                    {(activeTab === 0 ? CODING_PLATFORMS : LEARNING_PLATFORMS).map((platform, index) => (
                      <Grid item xs={12} sm={6} lg={4} key={platform.id}>
                        <motion.div
                          initial={{ opacity: 0, y: 20 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.4, delay: index * 0.1 }}
                        >
                          <PlatformCard
                            platform={{
                              ...platform,
                              ...(connectedPlatforms[platform.id] || {}),
                            }}
                            onConnect={() => handleConnect(platform)}
                            onDisconnect={() => handleDisconnect(platform.id)}
                            onSync={() => handleSync(platform.id)}
                            onViewDetails={() => handleViewDetails(platform)}
                          />
                        </motion.div>
                      </Grid>
                    ))}
                  </Grid>
                </motion.div>
              </AnimatePresence>
            </Box>
          </motion.div>
        </Container>

        {/* Modals */}
        {modalType === "connect" && (
          <ProfileConnect
            platform={selectedPlatform}
            onClose={() => setModalType(null)}
            onSubmit={handleConnectSubmit}
          />
        )}

        {modalType === "details" && (
          <PlatformDetailModal
            platform={selectedPlatform}
            open={true}
            onClose={() => setModalType(null)}
          />
        )}
      </Box>
    </Layout>
  );
};

export default ProfilePage;