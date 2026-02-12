// src/components/PasswordStrengthIndicator.jsx
import React from "react";
import { Box, LinearProgress, Typography } from "@mui/material";
import { CheckCircle, Cancel } from "@mui/icons-material";

const PasswordStrengthIndicator = ({ password }) => {
  const getPasswordStrength = (password) => {
    let strength = 0;
    let feedback = [];

    if (!password) return { strength: 0, feedback: [], label: "None" };

    // Length check
    if (password.length >= 8) {
      strength += 25;
    } else {
      feedback.push("At least 8 characters");
    }

    // Lowercase check
    if (/(?=.*[a-z])/.test(password)) {
      strength += 25;
    } else {
      feedback.push("One lowercase letter");
    }

    // Uppercase check
    if (/(?=.*[A-Z])/.test(password)) {
      strength += 25;
    } else {
      feedback.push("One uppercase letter");
    }

    // Number check
    if (/(?=.*\d)/.test(password)) {
      strength += 25;
    } else {
      feedback.push("One number");
    }

    // Special character check (bonus)
    if (/(?=.*[!@#$%^&*])/.test(password)) {
      strength += 10;
    }

    let label = "Weak";
    let color = "error";

    if (strength >= 80) {
      label = "Strong";
      color = "success";
    } else if (strength >= 50) {
      label = "Medium";
      color = "warning";
    }

    return { strength, feedback, label, color };
  };

  const { strength, feedback, label, color } = getPasswordStrength(password);

  return (
    <Box sx={{ mt: 1, mb: 2 }}>
      <Box sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", mb: 1 }}>
        <Typography variant="caption" color="text.secondary">
          Password Strength:
        </Typography>
        <Typography 
          variant="caption" 
          sx={{ 
            color: color === "error" ? "#f44336" : color === "warning" ? "#ff9800" : "#4caf50",
            fontWeight: 600
          }}
        >
          {label}
        </Typography>
      </Box>
      
      <LinearProgress
        variant="determinate"
        value={strength}
        sx={{
          height: 6,
          borderRadius: 3,
          backgroundColor: "#e0e0e0",
          "& .MuiLinearProgress-bar": {
            backgroundColor: color === "error" ? "#f44336" : color === "warning" ? "#ff9800" : "#4caf50",
            borderRadius: 3,
          },
        }}
      />
      
      {feedback.length > 0 && (
        <Box sx={{ mt: 1 }}>
          {feedback.map((item, index) => (
            <Box key={index} sx={{ display: "flex", alignItems: "center", gap: 0.5 }}>
              <Cancel sx={{ fontSize: 14, color: "#f44336" }} />
              <Typography variant="caption" color="text.secondary">
                {item}
              </Typography>
            </Box>
          ))}
        </Box>
      )}
      
      {strength >= 80 && (
        <Box sx={{ display: "flex", alignItems: "center", gap: 0.5, mt: 1 }}>
          <CheckCircle sx={{ fontSize: 14, color: "#4caf50" }} />
          <Typography variant="caption" color="success.main">
            Excellent password!
          </Typography>
        </Box>
      )}
    </Box>
  );
};

export default PasswordStrengthIndicator;