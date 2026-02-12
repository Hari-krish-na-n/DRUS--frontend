import React from "react";
import { Box, Typography, Avatar, Paper } from "@mui/material";

const ProfileHeader = ({ user }) => {
  if (!user) return null;

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
        color: "white",
        borderRadius: 3,
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 3 }}>
        <Avatar
          src={user.picture}
          alt={user.name}
          sx={{
            width: 80,
            height: 80,
            border: "3px solid white",
            fontSize: 32,
          }}
        >
          {user.name?.charAt(0).toUpperCase()}
        </Avatar>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: "bold", mb: 0.5 }}>
            {user.name}
          </Typography>
          <Typography variant="body1" sx={{ opacity: 0.9 }}>
            {user.email}
          </Typography>
        </Box>
      </Box>
    </Paper>
  );
};

export default ProfileHeader;
