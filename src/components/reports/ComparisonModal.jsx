// src/components/reports/ComparisonModal.jsx
import React, { useState } from "react";
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Box,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Divider,
    Paper,
    useTheme,
    IconButton
} from "@mui/material";
import {
    X,
    ArrowRight,
    TrendingUp,
    TrendingDown,
    Award,
    CheckCircle2,
    Calendar,
    BarChart3
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const ComparisonItem = ({ label, before, after, unit = "", icon: Icon, color }) => {
    const diff = after - before;
    const percent = before === 0 ? 100 : Math.round((diff / before) * 100);
    const isPositive = diff >= 0;

    return (
        <Paper sx={{ p: 2, borderRadius: 3, border: '1px solid', borderColor: 'divider', mb: 2 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 1 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
                    <Box sx={{ p: 1, borderRadius: 2, bgcolor: `${color}15`, color: color }}>
                        <Icon size={18} />
                    </Box>
                    <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{label}</Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, color: isPositive ? '#48bb78' : '#f56565' }}>
                    {isPositive ? <TrendingUp size={14} /> : <TrendingDown size={14} />}
                    <Typography variant="caption" sx={{ fontWeight: 800 }}>{isPositive ? '+' : ''}{percent}%</Typography>
                </Box>
            </Box>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">Before</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>{before}{unit}</Typography>
                </Box>
                <ArrowRight size={16} color="#cbd5e0" />
                <Box sx={{ flex: 1, textAlign: 'center' }}>
                    <Typography variant="caption" color="text.secondary">After</Typography>
                    <Typography variant="h6" sx={{ fontWeight: 800, color: 'primary.main' }}>{after}{unit}</Typography>
                </Box>
            </Box>
        </Paper>
    );
};

const ComparisonModal = ({ open, onClose }) => {
    const theme = useTheme();
    const [step, setStep] = useState(1);
    const [loading, setLoading] = useState(false);

    const handleCompare = () => {
        setLoading(true);
        setTimeout(() => {
            setLoading(false);
            setStep(2);
        }, 1500);
    };

    return (
        <Dialog
            open={open}
            onClose={onClose}
            maxWidth="sm"
            fullWidth
            PaperProps={{
                sx: { borderRadius: 5, p: 1 }
            }}
        >
            <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', pb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 900 }}>Comparison Report</Typography>
                <IconButton onClick={onClose} size="small"><X size={20} /></IconButton>
            </DialogTitle>

            <DialogContent>
                <AnimatePresence mode="wait">
                    {step === 1 ? (
                        <motion.div
                            key="config"
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                        >
                            <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                                Select two different time periods to visualize your progress and growth metrics.
                            </Typography>

                            <Grid container spacing={3}>
                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <Calendar size={16} /> Period A (Baseline)
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        select
                                        defaultValue="last_month"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                    >
                                        <MenuItem value="last_month">Last Month (January 2026)</MenuItem>
                                        <MenuItem value="prev_quarter">Previous Quarter (Q4 2025)</MenuItem>
                                        <MenuItem value="last_year">Last Year (2025)</MenuItem>
                                    </TextField>
                                </Grid>

                                <Grid item xs={12}>
                                    <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1.5, display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <BarChart3 size={16} /> Period B (Comparison)
                                    </Typography>
                                    <TextField
                                        fullWidth
                                        select
                                        defaultValue="current_month"
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                                    >
                                        <MenuItem value="current_month">Current Month (February 2026)</MenuItem>
                                        <MenuItem value="current_week">Current Week</MenuItem>
                                        <MenuItem value="this_quarter">This Quarter (Q1 2026)</MenuItem>
                                    </TextField>
                                </Grid>
                            </Grid>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="results"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                        >
                            <Box sx={{ mb: 3, textAlign: 'center', p: 2, borderRadius: 4, bgcolor: 'rgba(72, 187, 120, 0.1)', color: '#48bb78' }}>
                                <Typography variant="h4" sx={{ fontWeight: 900 }}>+24%</Typography>
                                <Typography variant="caption" sx={{ fontWeight: 700 }}>Overall Growth Index</Typography>
                            </Box>

                            <ComparisonItem
                                label="Problems Solved"
                                before={124}
                                after={158}
                                icon={CheckCircle2}
                                color="#667eea"
                            />
                            <ComparisonItem
                                label="Avg. Rating"
                                before={1820}
                                after={1950}
                                unit=" pts"
                                icon={TrendingUp}
                                color="#ecc94b"
                            />
                            <ComparisonItem
                                label="Achievements Unlocked"
                                before={8}
                                after={12}
                                icon={Award}
                                color="#ed64a6"
                            />

                            <Paper sx={{ p: 2, borderRadius: 4, bgcolor: 'background.default', border: '1px dashed', borderColor: 'divider', mt: 2 }}>
                                <Typography variant="caption" sx={{ fontWeight: 800, display: 'block', mb: 1 }}>AI INSIGHT</Typography>
                                <Typography variant="body2" color="text.secondary">
                                    Your consistency in Dynamic Programming has improved by 15% this period. Focus on Graph problems next to maintain momentum.
                                </Typography>
                            </Paper>
                        </motion.div>
                    )}
                </AnimatePresence>
            </DialogContent>

            <DialogActions sx={{ p: 3, pt: 0 }}>
                {step === 1 ? (
                    <Button
                        fullWidth
                        variant="contained"
                        onClick={handleCompare}
                        disabled={loading}
                        sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, textTransform: 'none' }}
                    >
                        {loading ? <CircularProgress size={24} color="inherit" /> : "Run Comparison Analysis"}
                    </Button>
                ) : (
                    <Box sx={{ display: 'flex', gap: 2, width: '100%' }}>
                        <Button
                            fullWidth
                            variant="outlined"
                            onClick={() => setStep(1)}
                            sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, textTransform: 'none' }}
                        >
                            Reset
                        </Button>
                        <Button
                            fullWidth
                            variant="contained"
                            onClick={onClose}
                            sx={{ borderRadius: 3, py: 1.5, fontWeight: 700, textTransform: 'none' }}
                        >
                            Download PDF Diff
                        </Button>
                    </Box>
                )}
            </DialogActions>
        </Dialog>
    );
};

export default ComparisonModal;
