// src/components/settings/AccountTab.jsx
import React, { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Grid,
    TextField,
    Button,
    Avatar,
    IconButton,
    Tooltip,
    Divider,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from "@mui/material";
import { Camera, Mail, User, Shield, Key, AlertTriangle } from "lucide-react";
import { useAuth } from "../../hooks/useAuth";
import { useFormik } from "formik";
import * as Yup from "yup";

const AccountTab = () => {
    const theme = useTheme();
    const { user } = useAuth();
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState("");

    const formik = useFormik({
        initialValues: {
            name: user?.name || "",
            email: user?.email || "",
            username: "dev_user_99"
        },
        validationSchema: Yup.object({
            name: Yup.string().required("Required"),
            email: Yup.string().email("Invalid email").required("Required"),
        }),
        onSubmit: (values) => {
            console.log("Update Profile", values);
        },
    });

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Profile Info */}
            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Public Profile</Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 4, mb: 4 }}>
                    <Box sx={{ position: 'relative' }}>
                        <Avatar src={user?.picture} sx={{ width: 100, height: 100, boxShadow: '0 8px 20px rgba(0,0,0,0.1)' }} />
                        <IconButton
                            sx={{
                                position: 'absolute',
                                bottom: 0,
                                right: 0,
                                bgcolor: 'primary.main',
                                color: 'white',
                                '&:hover': { bgcolor: 'primary.dark' },
                                border: '4px solid',
                                borderColor: 'background.paper'
                            }}
                            size="small"
                        >
                            <Camera size={16} />
                        </IconButton>
                    </Box>
                    <Box>
                        <Typography variant="subtitle1" sx={{ fontWeight: 800 }}>Profile Picture</Typography>
                        <Typography variant="body2" color="text.secondary" sx={{ mb: 1.5 }}>
                            PNG, JPG or GIF. Max 800K.
                        </Typography>
                        <Box sx={{ display: 'flex', gap: 1.5 }}>
                            <Button variant="contained" size="small" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}>Upload New</Button>
                            <Button variant="outlined" size="small" color="error" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}>Remove</Button>
                        </Box>
                    </Box>
                </Box>

                <form onSubmit={formik.handleSubmit}>
                    <Grid container spacing={3}>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="name"
                                label="Full Name"
                                value={formik.values.name}
                                onChange={formik.handleChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid item xs={12} md={6}>
                            <TextField
                                fullWidth
                                name="email"
                                label="Email Address"
                                value={formik.values.email}
                                onChange={formik.handleChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                fullWidth
                                name="username"
                                label="Public Username"
                                value={formik.values.username}
                                onChange={formik.handleChange}
                                sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                            />
                        </Grid>
                    </Grid>
                    <Button
                        variant="contained"
                        sx={{ mt: 3, borderRadius: 3, px: 4, fontWeight: 700, textTransform: 'none' }}
                        type="submit"
                    >
                        Save Profile Changes
                    </Button>
                </form>
            </Paper>

            {/* Security */}
            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Security & Password</Typography>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(102, 126, 234, 0.1)', color: '#667eea' }}>
                                <Key size={20} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Change Password</Typography>
                                <Typography variant="caption" color="text.secondary">Last changed 3 months ago</Typography>
                            </Box>
                        </Box>
                        <Button variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}>Update</Button>
                    </Box>

                    <Divider />

                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                            <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(72, 187, 120, 0.1)', color: '#48bb78' }}>
                                <Shield size={20} />
                            </Box>
                            <Box>
                                <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Two-Factor Authentication</Typography>
                                <Typography variant="caption" color="text.secondary">Secure your account with 2FA</Typography>
                            </Box>
                        </Box>
                        <Button variant="outlined" sx={{ borderRadius: 2, textTransform: 'none', fontWeight: 700 }}>Enable</Button>
                    </Box>
                </Box>
            </Paper>

            {/* Danger Zone */}
            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'error.main', bgcolor: 'rgba(245, 101, 101, 0.05)', boxShadow: 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1, color: 'error.main' }}>Danger Zone</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 3 }}>
                    Once you delete your account, there is no going back. All your synced data, achievements, and reports will be permanently removed.
                </Typography>
                <Button
                    variant="contained"
                    color="error"
                    sx={{ borderRadius: 3, px: 4, fontWeight: 700, textTransform: 'none' }}
                    onClick={() => setDeleteDialogOpen(true)}
                >
                    Delete Account
                </Button>
            </Paper>

            {/* Delete Confirmation Dialog */}
            <Dialog
                open={deleteDialogOpen}
                onClose={() => setDeleteDialogOpen(false)}
                PaperProps={{ sx: { borderRadius: 4, p: 1 } }}
            >
                <DialogTitle>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, color: 'error.main' }}>
                        <AlertTriangle size={24} />
                        <Typography variant="h6" sx={{ fontWeight: 900 }}>Delete Account?</Typography>
                    </Box>
                </DialogTitle>
                <DialogContent>
                    <Typography variant="body2" sx={{ mb: 3 }}>
                        This action is <strong>irreversible</strong>. To confirm, please type <strong>DELETE</strong> in the box below.
                    </Typography>
                    <TextField
                        fullWidth
                        placeholder="Type DELETE here"
                        value={deleteConfirm}
                        onChange={(e) => setDeleteConfirm(e.target.value)}
                        error={deleteConfirm !== "" && deleteConfirm !== "DELETE"}
                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                    />
                </DialogContent>
                <DialogActions sx={{ p: 3, pt: 0 }}>
                    <Button
                        onClick={() => setDeleteDialogOpen(false)}
                        sx={{ fontWeight: 700, textTransform: 'none', color: 'text.secondary' }}
                    >
                        Cancel
                    </Button>
                    <Button
                        variant="contained"
                        color="error"
                        disabled={deleteConfirm !== "DELETE"}
                        sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none', px: 3 }}
                        onClick={() => {
                            console.log("Account Deleted");
                            setDeleteDialogOpen(false);
                        }}
                    >
                        Permanently Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
};

export default AccountTab;
