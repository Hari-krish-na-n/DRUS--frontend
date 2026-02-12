// src/components/common/ConfirmDialog.jsx
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography,
    Box,
    useTheme,
    CircularProgress
} from "@mui/material";
import { AlertTriangle, Info, CheckCircle2 } from "lucide-react";

const ConfirmDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Are you sure?",
    message,
    confirmText = "Confirm",
    cancelText = "Cancel",
    severity = "warning",
    loading = false
}) => {
    const theme = useTheme();

    const colors = {
        warning: { main: theme.palette.warning.main, bg: theme.palette.warning.main + '10', icon: AlertTriangle },
        error: { main: theme.palette.error.main, bg: theme.palette.error.main + '10', icon: AlertTriangle },
        info: { main: theme.palette.info.main, bg: theme.palette.info.main + '10', icon: Info },
        success: { main: theme.palette.success.main, bg: theme.palette.success.main + '10', icon: CheckCircle2 },
    };

    const current = colors[severity] || colors.warning;
    const Icon = current.icon;

    return (
        <Dialog
            open={open}
            onClose={onClose}
            PaperProps={{
                sx: { borderRadius: 5, p: 1, maxWidth: 400 }
            }}
        >
            <DialogContent sx={{ textAlign: 'center', pt: 4 }}>
                <Box
                    sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: current.bg,
                        color: current.main,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3
                    }}
                >
                    <Icon size={32} />
                </Box>
                <Typography variant="h6" sx={{ fontWeight: 900, mb: 1.5 }}>{title}</Typography>
                <Typography variant="body2" color="text.secondary">
                    {message}
                </Typography>
            </DialogContent>
            <DialogActions sx={{ p: 3, pt: 0, justifyContent: 'center', gap: 1.5 }}>
                <Button
                    fullWidth
                    variant="outlined"
                    onClick={onClose}
                    disabled={loading}
                    sx={{ borderRadius: 3, textTransform: 'none', fontWeight: 700, py: 1 }}
                >
                    {cancelText}
                </Button>
                <Button
                    fullWidth
                    variant="contained"
                    disabled={loading}
                    onClick={onConfirm}
                    sx={{
                        borderRadius: 3,
                        textTransform: 'none',
                        fontWeight: 700,
                        py: 1,
                        bgcolor: severity === 'error' ? 'error.main' : 'primary.main',
                        '&:hover': { bgcolor: severity === 'error' ? 'error.dark' : 'primary.dark' }
                    }}
                >
                    {loading ? <CircularProgress size={20} color="inherit" /> : confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmDialog;
