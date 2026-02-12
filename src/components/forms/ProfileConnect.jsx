import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Button,
} from "@mui/material";

const ProfileConnect = ({ platform, onClose, onSubmit }) => {
  const [username, setUsername] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit({ username });
  };

  return (
    <Dialog open={!!platform} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle>Connect {platform?.name}</DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <TextField
            fullWidth
            label="Username / Profile URL"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            autoFocus
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={onClose}>Cancel</Button>
          <Button type="submit" variant="contained" disabled={!username.trim()}>
            Connect
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
};

export default ProfileConnect;
