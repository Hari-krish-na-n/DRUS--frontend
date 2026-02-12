import React, { useState } from "react";
import {
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Chip,
  Alert,
} from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const ProfileCard = ({ platform, title, username, onUpdate, color }) => {
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState(username || "");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const isConnected = !!username;

  const handleSave = async () => {
    if (!onUpdate) return;
    setLoading(true);
    setError("");
    try {
      await onUpdate(platform, newUsername.trim());
      setEditMode(false);
    } catch (err) {
      setError(err.message || "Failed to update");
    } finally {
      setLoading(false);
    }
  };

  const handleDisconnect = async () => {
    if (!onUpdate) return;
    setLoading(true);
    setError("");
    try {
      await onUpdate(platform, "");
      setNewUsername("");
    } catch (err) {
      setError(err.message || "Failed to disconnect");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{
        borderLeft: `4px solid ${color}`,
        transition: "transform 0.2s",
        "&:hover": {
          transform: "translateY(-4px)",
          boxShadow: 3,
        },
      }}
    >
      <CardContent>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 2,
          }}
        >
          <Typography variant="h6" sx={{ fontWeight: "bold", color }}>
            {title}
          </Typography>
          {isConnected ? (
            <Chip
              icon={<CheckCircle />}
              label="Connected"
              color="success"
              size="small"
            />
          ) : (
            <Chip
              icon={<Cancel />}
              label="Not connected"
              color="default"
              size="small"
            />
          )}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        {editMode || !isConnected ? (
          <Box>
            <TextField
              fullWidth
              label="Username"
              value={newUsername}
              onChange={(e) => setNewUsername(e.target.value)}
              size="small"
              sx={{ mb: 2 }}
              placeholder={`Enter your ${title} username`}
            />
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="contained"
                onClick={handleSave}
                disabled={loading || !newUsername.trim()}
                sx={{
                  bgcolor: color,
                  "&:hover": { bgcolor: color, opacity: 0.9 },
                }}
              >
                {loading ? "Saving..." : isConnected ? "Update" : "Connect"}
              </Button>
              {isConnected && (
                <Button variant="outlined" onClick={() => setEditMode(false)}>
                  Cancel
                </Button>
              )}
            </Box>
          </Box>
        ) : (
          <Box>
            <Typography variant="body1" sx={{ mb: 2 }}>
              <strong>Username:</strong> {username}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <Button
                variant="outlined"
                size="small"
                onClick={() => setEditMode(true)}
              >
                Edit
              </Button>
              <Button
                variant="outlined"
                size="small"
                color="error"
                onClick={handleDisconnect}
                disabled={loading}
              >
                Disconnect
              </Button>
            </Box>
          </Box>
        )}
      </CardContent>
    </Card>
  );
};

export default ProfileCard;
