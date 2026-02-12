// src/components/Layout.jsx
import React, { useState } from "react";
import { Box, useMediaQuery, useTheme } from "@mui/material";
import Sidebar from "./Sidebar";
import Header from "./Header";
import { useAuth } from "../hooks/useAuth";

const DRAWER_WIDTH = 260;

const Layout = ({ children }) => {
  const { user } = useAuth();
  const theme = useTheme();

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        bgcolor: theme.palette.mode === 'dark' ? '#0f172a' : '#f8fafc'
      }}
    >
      <Header />

      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: { xs: 2.5, sm: 4, md: 5 },
          mt: "70px", // Header height
          width: "100%",
          maxWidth: "1600px",
          mx: "auto"
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default Layout;
