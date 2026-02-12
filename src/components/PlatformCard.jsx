import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Alert,
  Chip,
  IconButton,
  Tooltip,
} from "@mui/material";
import { Save, Sync, OpenInNew, LinkOff } from "@mui/icons-material";

const PlatformCard = ({
  platform,       // { id, name, icon, description, username?, stats? }
  onConnect,
  onDisconnect,
  onSync,
  onViewDetails,
}) => {
  const [currentUsername, setCurrentUsername] = useState(platform?.username || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const isConnected = !!platform?.username;

  const handleSave = async () => {
    if (!onConnect) return;
    setLoading(true);
    setError("");
    setSuccess(false);
    try {
      await onConnect({
        id: platform.id,
        name: platform.name,
        username: currentUsername.trim(),
      });
      setSuccess(true);
      setTimeout(() => setSuccess(false), 2500);
    } catch (err) {
      setError(err.message || "Failed to save");
    } finally {
      setLoading(false);
    }
  };

  const handleSyncClick = async () => {
    if (!onSync) return;
    setLoading(true);
    setError("");
    try {
      await onSync(platform.id);
    } catch (err) {
      setError(err.message || "Failed to sync");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnectClick = async () => {
    if (!onDisconnect) return;
    setLoading(true);
    setError("");
    try {
      await onDisconnect(platform.id);
      setCurrentUsername("");
    } catch (err) {
      setError(err.message || "Failed to disconnect");
    } finally {
      setLoading(false);
    }
  };

  const handleViewDetailsClick = () => {
    if (onViewDetails) onViewDetails(platform);
  };

  return (
    <Card
      elevation={3}
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
        borderRadius: 3,
      }}
    >
      <CardContent sx={{ flexGrow: 1 }}>
        {/* Header */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 1.5,
          }}
        >
          <Box sx={{ display: "flex", alignItems: "center", gap: 1.2 }}>
            {platform.icon && (
              <Box sx={{ fontSize: 28, lineHeight: 1 }}>{platform.icon}</Box>
            )}
            <Box>
              <Typography variant="subtitle1" fontWeight={700}>
                {platform.name}
              </Typography>
              {platform.description && (
                <Typography variant="caption" color="text.secondary">
                  {platform.description}
                </Typography>
              )}
            </Box>
          </Box>

          {isConnected ? (
            <Chip
              label="Connected"
              size="small"
              color="success"
              variant="outlined"
            />
          ) : (
            <Chip
              label="Not connected"
              size="small"
              variant="outlined"
              color="default"
            />
          )}
        </Box>

        {/* Stats summary (if any) */}
        {platform.stats && isConnected && (
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 1,
              mb: 1.5,
              mt: 0.5,
            }}
          >
            {"total" in platform.stats && (
              <Chip
                size="small"
                label={`Solved: ${platform.stats.total}`}
                color="primary"
                variant="outlined"
              />
            )}
            {"rating" in platform.stats && platform.stats.rating > 0 && (
              <Chip
                size="small"
                label={`Rating: ${platform.stats.rating}`}
                variant="outlined"
              />
            )}
            {"rank" in platform.stats && (
              <Chip
                size="small"
                label={`Rank: ${platform.stats.rank}`}
                variant="outlined"
              />
            )}
          </Box>
        )}

        {/* Username input */}
        <TextField
          label="Username / Profile URL"
          variant="outlined"
          size="small"
          fullWidth
          value={currentUsername}
          onChange={(e) => setCurrentUsername(e.target.value)}
          sx={{ mb: 1.5, mt: 0.5 }}
          placeholder={`Enter your ${platform.name} username`}
        />

        {/* Error / success */}
        {error && (
          <Alert severity="error" sx={{ mb: 1 }}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert severity="success" sx={{ mb: 1 }}>
            Saved!
          </Alert>
        )}

        {/* Actions */}
        <Box
          sx={{
            display: "flex",
            gap: 1,
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Button
            variant="contained"
            startIcon={<Save />}
            fullWidth
            onClick={handleSave}
            disabled={loading || !currentUsername.trim()}
          >
            {loading ? "Saving..." : isConnected ? "Update" : "Connect"}
          </Button>

          {isConnected && (
            <Box sx={{ display: "flex", gap: 0.5 }}>
              <Tooltip title="Sync latest stats">
                <span>
                  <IconButton
                    size="small"
                    color="primary"
                    onClick={handleSyncClick}
                    disabled={loading}
                  >
                    <Sync fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="View details">
                <span>
                  <IconButton
                    size="small"
                    color="secondary"
                    onClick={handleViewDetailsClick}
                  >
                    <OpenInNew fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>

              <Tooltip title="Disconnect">
                <span>
                  <IconButton
                    size="small"
                    color="error"
                    onClick={handleDisconnectClick}
                    disabled={loading}
                  >
                    <LinkOff fontSize="small" />
                  </IconButton>
                </span>
              </Tooltip>
            </Box>
          )}
        </Box>
      </CardContent>
    </Card>
  );
};

export default PlatformCard;
