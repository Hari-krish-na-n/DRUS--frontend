import React from "react";
import { Dialog, DialogTitle, DialogContent, Typography } from "@mui/material";

const PlatformDetailModal = ({ open, onClose, platform }) => {
  if (!platform) return null;

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>{platform.name} details</DialogTitle>
      <DialogContent>
        <Typography variant="body2">
          Stats and details will be shown here.
        </Typography>
      </DialogContent>
    </Dialog>
  );
};

export default PlatformDetailModal;
