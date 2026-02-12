// src/components/Badge.jsx
import React from "react";
import { Chip } from "@mui/material";

const Badge = ({ label, color = "primary" }) => (
  <Chip
    label={label}
    color={color}
    size="small"
    sx={{ mr: 1, mb: 1, fontWeight: 500 }}
  />
);

export default Badge;
