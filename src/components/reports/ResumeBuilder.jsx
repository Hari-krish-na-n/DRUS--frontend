// src/components/reports/ResumeBuilder.jsx
import React, { useState } from "react";
import {
    Paper,
    Box,
    Typography,
    Button,
    Grid,
    Chip,
    Tooltip,
    useTheme,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    IconButton,
    Divider
} from "@mui/material";
import {
    FileBadge,
    Copy,
    ExternalLink,
    Sparkles,
    CheckCircle2,
    Eye,
    FileJson,
    X,
    Zap
} from "lucide-react";
import { useNotification } from "../../hooks/useNotification";

const ResumeBuilder = ({ data = {} }) => {
    const theme = useTheme();
    const { showSuccess } = useNotification();
    const [copied, setCopied] = useState(false);
    const [previewOpen, setPreviewOpen] = useState(false);

    const codingProfileText = `
--------------------------------------------------
CODING PROFILE SUMMARY (via DRUS Analytics)
Generated on: ${new Date().toLocaleDateString()}
--------------------------------------------------
Total Problems Solved: ${data.totalSolved || 842}
Global Proficiency: ${data.globalRank || 'Top 3%'}

PLATFORM STANDINGS:
- LeetCode: 1950 Rating (Top 1.5%)
- Codeforces: 1620 Rating (Expert candidate)
- HackerRank: 5-Star Problem Solver

KEY TECHNICAL DOMAINS:
- Dynamic Programming, Graph Theory, System Design
- Mastering: React, Node.js, Python, C++

Verified Stats Link: drus.app/u/dev_user
--------------------------------------------------
    `.trim();

    const handleCopy = () => {
        navigator.clipboard.writeText(codingProfileText);
        setCopied(true);
        showSuccess("Coding profile copied to clipboard!");
        setTimeout(() => setCopied(false), 3000);
    };

    const handleExportJSON = () => {
        const jsonData = {
            metadata: {
                source: "DRUS_Analytics",
                timestamp: new Date().toISOString(),
                version: "1.2.0"
            },
            profile: {
                total_solved: data.totalSolved || 842,
                global_rank: data.globalRank || 'Top 3%',
                platforms: [
                    { id: "leetcode", solved: 450, rating: 1950, percentile: "98.5%" },
                    { id: "codeforces", solved: 120, rating: 1620, rank: "Expert" }
                ],
                mastered_topics: ["DP", "Graphs", "Trees", "Sorting"],
                preferred_languages: ["JavaScript", "Python", "Go"]
            }
        };

        const blob = new Blob([JSON.stringify(jsonData, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `DRUS_Stats_${new Date().getTime()}.json`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        showSuccess("JSON Metadata exported for API use!");
    };

    return (
        <Paper
            elevation={0}
            sx={{
                p: 4,
                borderRadius: 5,
                bgcolor: theme.palette.mode === 'dark' ? 'rgba(30, 41, 59, 0.7)' : '#ffffff',
                border: '1px solid',
                borderColor: 'divider',
                position: 'relative',
                overflow: 'hidden'
            }}
        >
            <Box sx={{ position: 'absolute', top: -10, right: -10, color: 'primary.main', opacity: 0.1 }}>
                <Sparkles size={120} />
            </Box>

            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 3 }}>
                <Box sx={{ p: 1.5, borderRadius: 3, bgcolor: 'secondary.main', color: 'white' }}>
                    <FileBadge size={24} />
                </Box>
                <Box>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Resume-Ready Profile</Typography>
                    <Typography variant="caption" color="text.secondary">Professional summary for external platforms.</Typography>
                </Box>
            </Box>

            <Box sx={{ p: 2, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'rgba(0,0,0,0.1)' : 'grey.50', border: '1px dashed', borderColor: 'divider', mb: 3 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 2 }}>
                    <Typography variant="caption" sx={{ fontWeight: 800, color: 'text.secondary', display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <Zap size={12} color="#f6ad55" /> QUICK STATS
                    </Typography>
                    <Chip label="ASCII Ready" size="small" sx={{ height: 20, fontSize: '10px', fontWeight: 800 }} />
                </Box>
                <Grid container spacing={2}>
                    <Grid item xs={6}>
                        <Typography variant="h5" sx={{ fontWeight: 950 }}>{data.totalSolved || 842}</Typography>
                        <Typography variant="caption" color="text.secondary">Total Solved</Typography>
                    </Grid>
                    <Grid item xs={6}>
                        <Typography variant="h5" sx={{ fontWeight: 950, color: 'secondary.main' }}>{data.globalRank || 'Top 3%'}</Typography>
                        <Typography variant="caption" color="text.secondary">Global Standing</Typography>
                    </Grid>
                </Grid>
            </Box>

            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <Button
                        fullWidth
                        variant="contained"
                        startIcon={copied ? <CheckCircle2 size={18} /> : <Copy size={18} />}
                        onClick={handleCopy}
                        sx={{
                            borderRadius: 3,
                            py: 1.5,
                            fontWeight: 800,
                            textTransform: 'none',
                            background: copied ? '#48bb78' : 'linear-gradient(45deg, #764ba2, #667eea)',
                            boxShadow: '0 4px 15px rgba(118, 75, 162, 0.2)'
                        }}
                    >
                        {copied ? "Copied!" : "Copy Profile Snippet"}
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<Eye size={18} />}
                        onClick={() => setPreviewOpen(true)}
                        sx={{ borderRadius: 3, py: 1.2, fontWeight: 700, textTransform: 'none', fontSize: '0.85rem' }}
                    >
                        Preview
                    </Button>
                </Grid>
                <Grid item xs={6}>
                    <Button
                        fullWidth
                        variant="outlined"
                        startIcon={<FileJson size={18} />}
                        onClick={handleExportJSON}
                        sx={{ borderRadius: 3, py: 1.2, fontWeight: 700, textTransform: 'none', fontSize: '0.85rem' }}
                    >
                        Save JSON
                    </Button>
                </Grid>
            </Grid>

            {/* Preview Dialog */}
            <Dialog
                open={previewOpen}
                onClose={() => setPreviewOpen(false)}
                maxWidth="xs"
                fullWidth
                PaperProps={{ sx: { borderRadius: 4 } }}
            >
                <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Typography variant="h6" sx={{ fontWeight: 900 }}>Profile Summary</Typography>
                    <IconButton onClick={() => setPreviewOpen(false)} size="small"><X size={20} /></IconButton>
                </DialogTitle>
                <DialogContent>
                    <Box sx={{
                        p: 2,
                        bgcolor: 'background.default',
                        borderRadius: 3,
                        border: '1px solid',
                        borderColor: 'divider',
                        fontFamily: 'monospace',
                        whiteSpace: 'pre-wrap',
                        fontSize: '0.75rem',
                        lineHeight: 1.4,
                        color: theme.palette.text.primary
                    }}>
                        {codingProfileText}
                    </Box>
                </DialogContent>
                <DialogActions sx={{ p: 2.5, pt: 0 }}>
                    <Button
                        fullWidth
                        onClick={handleCopy}
                        variant="contained"
                        color="secondary"
                        sx={{ borderRadius: 2, fontWeight: 700, textTransform: 'none' }}
                    >
                        Copy to Clipboard
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
};

export default ResumeBuilder;
