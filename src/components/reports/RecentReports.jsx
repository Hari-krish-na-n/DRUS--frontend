// src/components/reports/RecentReports.jsx
import React, { useState, useMemo } from "react";
import {
    Paper,
    Box,
    Typography,
    List,
    ListItem,
    ListItemAvatar,
    ListItemText,
    ListItemIcon,
    Avatar,
    IconButton,
    Chip,
    Tooltip,
    useTheme,
    Divider,
    TextField,
    MenuItem,
    Pagination,
    InputAdornment
} from "@mui/material";
import {
    FileText,
    Download,
    Trash2,
    Eye,
    Calendar,
    FileBadge,
    Search,
    Filter,
    FilePieChart,
    UserCircle,
    ArrowRightLeft,
    History
} from "lucide-react";
import { format } from "date-fns";

const RecentReports = ({ reports = [], onDownload, onDelete }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    const [search, setSearch] = useState("");
    const [typeFilter, setTypeFilter] = useState("all");
    const [page, setPage] = useState(1);
    const itemsPerPage = 5;

    const filteredReports = useMemo(() => {
        return reports.filter(report => {
            const matchesSearch = report.name.toLowerCase().includes(search.toLowerCase());
            const matchesType = typeFilter === "all" || report.type === typeFilter;
            return matchesSearch && matchesType;
        });
    }, [reports, search, typeFilter]);

    const paginatedReports = useMemo(() => {
        const start = (page - 1) * itemsPerPage;
        return filteredReports.slice(start, start + itemsPerPage);
    }, [filteredReports, page]);

    const totalPages = Math.ceil(filteredReports.length / itemsPerPage);

    const getReportIcon = (type) => {
        switch (type) {
            case 'detailed': return <FilePieChart size={20} />;
            case 'resume': return <UserCircle size={20} />;
            case 'comparison': return <ArrowRightLeft size={20} />;
            default: return <FileText size={20} />;
        }
    };

    const getReportColor = (type) => {
        switch (type) {
            case 'detailed': return '#667eea';
            case 'resume': return '#ed64a6';
            case 'comparison': return '#48bb78';
            default: return theme.palette.primary.main;
        }
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 3,
                borderRadius: 5,
                bgcolor: isDark ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                display: 'flex',
                flexDirection: 'column',
                height: '100%'
            }}
        >
            <Box sx={{ mb: 2, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, display: 'flex', alignItems: 'center', gap: 1 }}>
                    <History size={20} /> History
                </Typography>
                <Chip label={`${filteredReports.length} Reports`} size="small" sx={{ fontWeight: 700 }} />
            </Box>

            <Box sx={{ display: 'flex', gap: 1, mb: 2 }}>
                <TextField
                    fullWidth
                    size="small"
                    placeholder="Search..."
                    value={search}
                    onChange={(e) => { setSearch(e.target.value); setPage(1); }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={14} />
                            </InputAdornment>
                        ),
                        sx: { borderRadius: 2, fontSize: '0.875rem' }
                    }}
                />
                <TextField
                    select
                    size="small"
                    value={typeFilter}
                    onChange={(e) => { setTypeFilter(e.target.value); setPage(1); }}
                    sx={{ minWidth: 100, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: '0.875rem' } }}
                >
                    <MenuItem value="all">All</MenuItem>
                    <MenuItem value="summary">Summary</MenuItem>
                    <MenuItem value="detailed">Detailed</MenuItem>
                    <MenuItem value="resume">Resume</MenuItem>
                    <MenuItem value="comparison">Comparison</MenuItem>
                </TextField>
            </Box>

            {filteredReports.length === 0 ? (
                <Box sx={{ py: 6, textAlign: 'center', opacity: 0.6 }}>
                    <FileBadge size={40} style={{ marginBottom: 12 }} />
                    <Typography variant="body2">No matching reports.</Typography>
                </Box>
            ) : (
                <List sx={{ p: 0, flex: 1 }}>
                    {paginatedReports.map((report, index) => (
                        <React.Fragment key={report.id}>
                            <ListItem
                                sx={{
                                    px: 1,
                                    py: 1.5,
                                    borderRadius: 3,
                                    '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.03)' : 'rgba(0,0,0,0.02)' },
                                    transition: 'background 0.2s'
                                }}
                            >
                                <ListItemAvatar sx={{ minWidth: 48 }}>
                                    <Avatar size="small" sx={{ bgcolor: `${getReportColor(report.type)}20`, color: getReportColor(report.type), width: 32, height: 32 }}>
                                        {getReportIcon(report.type)}
                                    </Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={<Typography variant="subtitle2" sx={{ fontWeight: 800, fontSize: '0.8rem', noWrap: true, textOverflow: 'ellipsis', overflow: 'hidden' }}>{report.name}</Typography>}
                                    secondary={
                                        <Typography variant="caption" sx={{ color: 'text.secondary', fontSize: '0.7rem' }}>
                                            {format(report.date, "MMM dd")} • {report.size >= 1024 ? `${(report.size / 1024).toFixed(1)}MB` : `${report.size}KB`}
                                        </Typography>
                                    }
                                />
                                <Box sx={{ display: 'flex' }}>
                                    <Tooltip title="Download">
                                        <IconButton size="small" onClick={() => onDownload(report)}><Download size={14} /></IconButton>
                                    </Tooltip>
                                    <Tooltip title="Delete">
                                        <IconButton size="small" sx={{ color: 'error.main' }} onClick={() => onDelete(report.id)}><Trash2 size={14} /></IconButton>
                                    </Tooltip>
                                </Box>
                            </ListItem>
                            {index < paginatedReports.length - 1 && <Divider sx={{ my: 0.5, opacity: 0.3 }} />}
                        </React.Fragment>
                    ))}
                </List>
            )}

            {totalPages > 1 && (
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 2, pt: 2, borderTop: '1px solid', borderColor: 'divider' }}>
                    <Pagination
                        size="small"
                        count={totalPages}
                        page={page}
                        onChange={(e, v) => setPage(v)}
                        color="primary"
                    />
                </Box>
            )}
        </Paper>
    );
};

export default RecentReports;
