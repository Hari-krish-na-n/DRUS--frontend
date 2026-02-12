// src/components/common/Modal.jsx
import React from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Typography,
    Box,
    Fade,
    useTheme
} from "@mui/material";
import { X } from "lucide-react";

const Modal = ({
    open,
    onClose,
    title,
    children,
    actions,
    maxWidth = "sm",
    fullWidth = true,
    noPadding = false
}) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onClose}
            fullWidth={fullWidth}
            maxWidth={maxWidth}
            TransitionComponent={Fade}
            PaperProps={{
                sx: {
                    borderRadius: 6,
                    bgcolor: 'background.paper',
                    backgroundImage: 'none',
                    boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{ m: 0, p: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>{title}</Typography>
                <IconButton onClick={onClose} size="small" sx={{ color: 'text.secondary' }}>
                    <X size={20} />
                </IconButton>
            </DialogTitle>

            <DialogContent
                sx={{
                    p: noPadding ? 0 : 3,
                    pt: 1,
                    '&::-webkit-scrollbar': { width: 6 },
                    '&::-webkit-scrollbar-thumb': { bgcolor: 'divider', borderRadius: 3 }
                }}
            >
                {children}
            </DialogContent>

            {actions && (
                <DialogActions sx={{ p: 3, pt: 1 }}>
                    {actions}
                </DialogActions>
            )}
        </Dialog>
    );
};

export default Modal;
