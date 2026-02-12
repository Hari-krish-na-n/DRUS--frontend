// src/components/analytics/AnalyticsFilters.jsx
import React from "react";
import {
    Box,
    Paper,
    Grid,
    TextField,
    MenuItem,
    Button,
    IconButton,
    Tooltip,
    useTheme,
    Chip,
    Select,
    FormControl,
    InputLabel,
    OutlinedInput
} from "@mui/material";
import { Filter, RotateCcw, Calendar, Check } from "lucide-react";

const AnalyticsFilters = ({ filters, onFilterChange, onReset }) => {
    const theme = useTheme();

    return (
        <Paper
            elevation={0}
            sx={{
                p: 2.5,
                borderRadius: 5,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                mb: 4
            }}
        >
            <Grid container spacing={2} alignItems="center">
                <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Time Range</InputLabel>
                        <Select
                            value={filters.dateRange}
                            label="Time Range"
                            onChange={(e) => onFilterChange('dateRange', e.target.value)}
                            sx={{ borderRadius: 3 }}
                        >
                            <MenuItem value="7d">Last 7 Days</MenuItem>
                            <MenuItem value="30d">Last 30 Days</MenuItem>
                            <MenuItem value="90d">Last 90 Days</MenuItem>
                            <MenuItem value="all">All Time</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Platform</InputLabel>
                        <Select
                            multiple
                            value={filters.platforms}
                            label="Platform"
                            onChange={(e) => onFilterChange('platforms', e.target.value)}
                            input={<OutlinedInput label="Platform" />}
                            renderValue={(selected) => (
                                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                    {selected.map((value) => (
                                        <Chip key={value} label={value} size="small" sx={{ borderRadius: 1 }} />
                                    ))}
                                </Box>
                            )}
                            sx={{ borderRadius: 3 }}
                        >
                            {['LeetCode', 'HackerRank', 'Codeforces', 'CodeChef'].map((name) => (
                                <MenuItem key={name} value={name}>{name}</MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                    <FormControl fullWidth size="small">
                        <InputLabel>Difficulty</InputLabel>
                        <Select
                            value={filters.difficulty}
                            label="Difficulty"
                            onChange={(e) => onFilterChange('difficulty', e.target.value)}
                            sx={{ borderRadius: 3 }}
                        >
                            <MenuItem value="all">All Difficulties</MenuItem>
                            <MenuItem value="easy">Easy</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="hard">Hard</MenuItem>
                        </Select>
                    </FormControl>
                </Grid>

                <Grid item xs={12} md={3}>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                        <Button
                            fullWidth
                            variant="contained"
                            startIcon={<Filter size={18} />}
                            sx={{
                                borderRadius: 3,
                                textTransform: 'none',
                                fontWeight: 700,
                                background: 'linear-gradient(45deg, #667eea, #764ba2)'
                            }}
                        >
                            Apply Filters
                        </Button>
                        <Tooltip title="Reset Filters">
                            <IconButton
                                onClick={onReset}
                                sx={{ borderRadius: 3, border: '1px solid', borderColor: 'divider' }}
                            >
                                <RotateCcw size={20} />
                            </IconButton>
                        </Tooltip>
                    </Box>
                </Grid>
            </Grid>
        </Paper>
    );
};

export default AnalyticsFilters;
