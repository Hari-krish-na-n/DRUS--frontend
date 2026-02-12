// src/components/analytics/TopicAnalysisTable.jsx
import React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Box,
    Typography,
    Chip,
    IconButton,
    Tooltip,
    LinearProgress,
    useTheme
} from "@mui/material";
import { ArrowUpRight, ArrowDownRight, ExternalLink } from "lucide-react";

const TopicAnalysisTable = ({ data = [] }) => {
    const theme = useTheme();
    const isDark = theme.palette.mode === 'dark';

    return (
        <TableContainer component={Box} sx={{ mt: 2 }}>
            <Table sx={{ minWidth: 650 }}>
                <TableHead>
                    <TableRow>
                        <TableCell sx={{ fontWeight: 800, borderBottom: '2px solid', borderColor: 'divider' }}>Topic</TableCell>
                        <TableCell sx={{ fontWeight: 800, borderBottom: '2px solid', borderColor: 'divider' }}>Solved</TableCell>
                        <TableCell sx={{ fontWeight: 800, borderBottom: '2px solid', borderColor: 'divider' }}>Accuracy</TableCell>
                        <TableCell sx={{ fontWeight: 800, borderBottom: '2px solid', borderColor: 'divider' }}>Strength</TableCell>
                        <TableCell sx={{ fontWeight: 800, borderBottom: '2px solid', borderColor: 'divider' }} align="right">Action</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data.map((row) => (
                        <TableRow
                            key={row.topic}
                            sx={{
                                '&:last-child td, &:last-child th': { border: 0 },
                                '&:hover': { bgcolor: isDark ? 'rgba(255,255,255,0.02)' : 'rgba(0,0,0,0.01)' },
                                transition: 'background 0.2s'
                            }}
                        >
                            <TableCell component="th" scope="row">
                                <Typography variant="subtitle2" sx={{ fontWeight: 700 }}>{row.topic}</Typography>
                            </TableCell>
                            <TableCell>
                                <Typography variant="body2" sx={{ fontWeight: 600 }}>{row.solved}</Typography>
                            </TableCell>
                            <TableCell>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                    <Typography variant="body2" sx={{ fontWeight: 700, color: row.accuracy >= 70 ? 'success.main' : 'warning.main' }}>
                                        {row.accuracy}%
                                    </Typography>
                                    {row.trend === 'up' ? <ArrowUpRight size={14} color="#48bb78" /> : <ArrowDownRight size={14} color="#f56565" />}
                                </Box>
                            </TableCell>
                            <TableCell sx={{ width: 140 }}>
                                <LinearProgress
                                    variant="determinate"
                                    value={row.strength}
                                    sx={{
                                        height: 6,
                                        borderRadius: 3,
                                        bgcolor: isDark ? 'rgba(255,255,255,0.05)' : 'rgba(0,0,0,0.05)',
                                        '& .MuiLinearProgress-bar': {
                                            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
                                            borderRadius: 3
                                        }
                                    }}
                                />
                            </TableCell>
                            <TableCell align="right">
                                <Tooltip title="Practice Problems">
                                    <IconButton size="small" color="primary">
                                        <ExternalLink size={18} />
                                    </IconButton>
                                </Tooltip>
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

export default TopicAnalysisTable;
