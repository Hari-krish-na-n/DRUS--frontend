// src/components/Card.jsx
import React from "react";
import { Card, CardContent, Typography, Box } from "@mui/material";

const MetricCard = ({ label, value, helper }) => (
  <Card
    sx={{
      borderRadius: 2,
      boxShadow: "0 2px 10px rgba(0,0,0,0.06)",
      transition: "transform 0.2s",
      "&:hover": { transform: "translateY(-3px)" }
    }}
  >
    <CardContent>
      <Typography variant="body2" color="text.secondary">
        {label}
      </Typography>
      <Typography variant="h4" sx={{ mt: 1 }}>
        {value}
      </Typography>
      {helper && (
        <Box sx={{ mt: 0.5 }}>
          <Typography variant="caption" color="text.secondary">
            {helper}
          </Typography>
        </Box>
      )}
    </CardContent>
  </Card>
);

export default MetricCard;
