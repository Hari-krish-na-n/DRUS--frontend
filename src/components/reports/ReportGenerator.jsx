// src/components/reports/ReportGenerator.jsx
import React from "react";
import {
    Paper,
    Box,
    Typography,
    Grid,
    TextField,
    MenuItem,
    Button,
    FormControlLabel,
    Checkbox,
    Fade,
    useTheme,
    Alert,
    CircularProgress,
    Select,
    FormControl,
    InputLabel,
    OutlinedInput,
    Chip,
    FormGroup
} from "@mui/material";
import {
    FileText,
    Download,
    Calendar,
    FileSearch,
    CheckCircle2,
    Settings2
} from "lucide-react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { CODING_PLATFORMS, LEARNING_PLATFORMS } from "../../utils/constants";

const ALL_PLATFORMS = [...CODING_PLATFORMS, ...LEARNING_PLATFORMS];

const ReportGenerator = ({ onGenerate }) => {
    const theme = useTheme();

    const formik = useFormik({
        initialValues: {
            reportType: 'summary',
            dateRange: 'month',
            platforms: ['leetcode'],
            includeCharts: true,
            includeDetailedTables: true,
            includeAchievements: true,
            includeRecommendations: true,
            exportFormat: 'pdf'
        },
        validationSchema: Yup.object({
            reportType: Yup.string().required("Required"),
            dateRange: Yup.string().required("Required"),
            platforms: Yup.array().min(1, "Select at least one platform"),
        }),
        onSubmit: async (values) => {
            await onGenerate(values);
        },
    });

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                borderRadius: 5,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                mb: 4
            }}
        >
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 4 }}>
                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'primary.main', color: 'white' }}>
                    <FileText size={24} />
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Report Configuration</Typography>
                    <Typography variant="body2" color="text.secondary">Select your metrics and export preferences.</Typography>
                </Box>
            </Box>

            <form onSubmit={formik.handleSubmit}>
                <Grid container spacing={3}>
                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            select
                            name="reportType"
                            label="Report Scope"
                            value={formik.values.reportType}
                            onChange={formik.handleChange}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        >
                            <MenuItem value="summary">Weekly Summary</MenuItem>
                            <MenuItem value="monthly">Monthly Summary</MenuItem>
                            <MenuItem value="yearly">Yearly Deep Dive</MenuItem>
                            <MenuItem value="custom">Custom Range Report</MenuItem>
                            <MenuItem value="platform_comp">Platform Comparison</MenuItem>
                            <MenuItem value="contest">Contest History Analysis</MenuItem>
                            <MenuItem value="learning">Learning Progress Report</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            select
                            name="dateRange"
                            label="Time Period"
                            value={formik.values.dateRange}
                            onChange={formik.handleChange}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        >
                            <MenuItem value="week">Past 7 Days</MenuItem>
                            <MenuItem value="month">Past 30 Days</MenuItem>
                            <MenuItem value="quarter">Past 90 Days</MenuItem>
                            <MenuItem value="year">Past Year</MenuItem>
                            <MenuItem value="all">All Time</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <FormControl fullWidth sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}>
                            <InputLabel id="platform-select-label">Target Platforms</InputLabel>
                            <Select
                                labelId="platform-select-label"
                                multiple
                                name="platforms"
                                value={formik.values.platforms}
                                onChange={formik.handleChange}
                                input={<OutlinedInput label="Target Platforms" />}
                                renderValue={(selected) => (
                                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                        {selected.map((value) => (
                                            <Chip
                                                key={value}
                                                label={ALL_PLATFORMS.find(p => p.id === value)?.name || value}
                                                size="small"
                                                sx={{ fontWeight: 600 }}
                                            />
                                        ))}
                                    </Box>
                                )}
                            >
                                {ALL_PLATFORMS.map((platform) => (
                                    <MenuItem key={platform.id} value={platform.id}>
                                        {platform.name}
                                    </MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                        {formik.errors.platforms && formik.touched.platforms && (
                            <Typography variant="caption" color="error" sx={{ mt: 1, ml: 2 }}>{formik.errors.platforms}</Typography>
                        )}
                    </Grid>

                    <Grid item xs={12}>
                        <Typography variant="subtitle2" sx={{ fontWeight: 800, mb: 1, display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Settings2 size={16} /> Content Options
                        </Typography>
                        <FormGroup sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', gap: 2 }}>
                            <FormControlLabel
                                control={<Checkbox name="includeCharts" checked={formik.values.includeCharts} onChange={formik.handleChange} />}
                                label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Visual Charts</Typography>}
                            />
                            <FormControlLabel
                                control={<Checkbox name="includeDetailedTables" checked={formik.values.includeDetailedTables} onChange={formik.handleChange} />}
                                label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Detailed Tables</Typography>}
                            />
                            <FormControlLabel
                                control={<Checkbox name="includeAchievements" checked={formik.values.includeAchievements} onChange={formik.handleChange} />}
                                label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Achievements</Typography>}
                            />
                            <FormControlLabel
                                control={<Checkbox name="includeRecommendations" checked={formik.values.includeRecommendations} onChange={formik.handleChange} />}
                                label={<Typography variant="body2" sx={{ fontWeight: 600 }}>Smart Insights & Tips</Typography>}
                            />
                        </FormGroup>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <TextField
                            fullWidth
                            select
                            name="exportFormat"
                            label="Export Format"
                            value={formik.values.exportFormat}
                            onChange={formik.handleChange}
                            sx={{ '& .MuiOutlinedInput-root': { borderRadius: 3 } }}
                        >
                            <MenuItem value="pdf">Portable Document Format (PDF)</MenuItem>
                            <MenuItem value="excel">Microsoft Excel (XLSX)</MenuItem>
                            <MenuItem value="csv">Comma Separated Values (CSV)</MenuItem>
                            <MenuItem value="json">Machine Readable (JSON)</MenuItem>
                        </TextField>
                    </Grid>

                    <Grid item xs={12}>
                        <Box sx={{ display: 'flex', gap: 2, pt: 2 }}>
                            <Button
                                variant="contained"
                                size="large"
                                type="submit"
                                disabled={formik.isSubmitting}
                                startIcon={formik.isSubmitting ? <CircularProgress size={20} color="inherit" /> : <FileSearch size={20} />}
                                sx={{
                                    borderRadius: 3,
                                    px: 4,
                                    py: 1.5,
                                    textTransform: 'none',
                                    fontWeight: 700,
                                    background: 'linear-gradient(45deg, #667eea, #764ba2)',
                                    boxShadow: '0 8px 20px rgba(102, 126, 234, 0.3)',
                                    '&:hover': {
                                        background: 'linear-gradient(45deg, #764ba2, #667eea)',
                                    }
                                }}
                            >
                                {formik.isSubmitting ? "Processing..." : "Generate High-Fidelity Report"}
                            </Button>
                        </Box>
                    </Grid>
                </Grid>
            </form>

            {formik.isSubmitting && (
                <Fade in={true}>
                    <Alert icon={<CheckCircle2 size={20} />} severity="info" sx={{ mt: 4, borderRadius: 3 }}>
                        Processing multi-platform data... Preparing your {formik.values.exportFormat.toUpperCase()} report.
                    </Alert>
                </Fade>
            )}
        </Paper>
    );
};

export default ReportGenerator;
