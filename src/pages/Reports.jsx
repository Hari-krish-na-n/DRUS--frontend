// src/pages/Reports.jsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Grid,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
  Card,
  Stack,
  useTheme,
  IconButton,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  ListItemSecondaryAction,
  Tooltip,
} from "@mui/material";
import Layout from "../components/Layout";
import { 
  Download, 
  FileText, 
  FileJson, 
  FileSpreadsheet, 
  Calendar, 
  Clock, 
  MoreVertical,
  Trash2,
  ExternalLink,
  ChevronRight,
  Filter,
  BarChart2
} from "lucide-react";
import { motion } from "framer-motion";

const Reports = () => {
  const theme = useTheme();
  const [reportType, setReportType] = useState("weekly");
  const [format, setFormat] = useState("pdf");

  const recentReports = [
    { id: 1, name: "Weekly Performance Summary", date: "2026-02-10", type: "weekly", format: "pdf", size: "1.2 MB" },
    { id: 2, name: "January Progress Analysis", date: "2026-01-31", type: "monthly", format: "excel", size: "2.5 MB" },
    { id: 3, name: "Code Quality Report", date: "2026-01-15", type: "custom", format: "pdf", size: "0.8 MB" },
    { id: 4, name: "Annual Review 2025", date: "2026-01-01", type: "yearly", format: "pdf", size: "4.1 MB" },
  ];

  const handleGenerate = () => {
    alert("Report generation feature coming soon!");
  };

  const isDark = theme.palette.mode === 'dark';

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  };

  const getFormatIcon = (format) => {
    switch (format) {
      case 'pdf': return <FileText size={20} color="#ef4444" />;
      case 'excel': return <FileSpreadsheet size={20} color="#10b981" />;
      case 'csv': return <FileJson size={20} color="#6366f1" />;
      default: return <FileText size={20} />;
    }
  };

  return (
    <Layout>
      <Box 
        sx={{ 
          py: 4,
          minHeight: '100vh',
          background: isDark 
            ? 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.08) 0%, transparent 50%)'
            : 'radial-gradient(circle at 50% 0%, rgba(99, 102, 241, 0.03) 0%, transparent 50%)'
        }}
      >
        <Container maxWidth="lg">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            {/* Header */}
            <motion.div variants={itemVariants}>
              <Box sx={{ mb: 6, display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                <Box>
                  <Typography 
                    variant="h3" 
                    sx={{ 
                      fontWeight: 800, 
                      letterSpacing: '-0.02em', 
                      mb: 1,
                      background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Reports
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    Generate and manage your progress reports and data exports.
                  </Typography>
                </Box>
                <IconButton 
                  sx={{ 
                    bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.02)',
                    borderRadius: 3,
                    p: 1.5
                  }}
                >
                  <Filter size={20} />
                </IconButton>
              </Box>
            </motion.div>

            <Grid container spacing={4}>
              {/* Generate Section */}
              <Grid item xs={12} md={5}>
                <motion.div variants={itemVariants}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 6,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'white',
                      backdropFilter: 'blur(10px)',
                      height: '100%'
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                      <Box 
                        sx={{ 
                          p: 1.5, 
                          borderRadius: 3, 
                          bgcolor: 'primary.main', 
                          display: 'flex',
                          boxShadow: '0 8px 16px -4px rgba(99, 102, 241, 0.4)'
                        }}
                      >
                        <BarChart2 size={24} color="white" />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>
                        Generate New
                      </Typography>
                    </Stack>

                    <Stack spacing={3}>
                      <FormControl fullWidth>
                        <InputLabel>Report Type</InputLabel>
                        <Select
                          value={reportType}
                          label="Report Type"
                          onChange={(e) => setReportType(e.target.value)}
                          sx={{ borderRadius: 3 }}
                        >
                          <MenuItem value="weekly">Weekly Summary</MenuItem>
                          <MenuItem value="monthly">Monthly Summary</MenuItem>
                          <MenuItem value="yearly">Yearly Summary</MenuItem>
                          <MenuItem value="custom">Custom Range</MenuItem>
                        </Select>
                      </FormControl>

                      <FormControl fullWidth>
                        <InputLabel>Format</InputLabel>
                        <Select
                          value={format}
                          label="Format"
                          onChange={(e) => setFormat(e.target.value)}
                          sx={{ borderRadius: 3 }}
                        >
                          <MenuItem value="pdf">PDF Document</MenuItem>
                          <MenuItem value="excel">Excel Spreadsheet</MenuItem>
                          <MenuItem value="csv">CSV File</MenuItem>
                        </Select>
                      </FormControl>

                      <Box sx={{ mt: 2 }}>
                        <Button
                          fullWidth
                          variant="contained"
                          size="large"
                          startIcon={<Download size={20} />}
                          onClick={handleGenerate}
                          sx={{
                            py: 2,
                            borderRadius: 3,
                            fontSize: '1rem',
                            fontWeight: 700,
                            textTransform: 'none',
                            background: 'linear-gradient(45deg, #6366f1, #a855f7)',
                            boxShadow: '0 8px 20px -6px rgba(99, 102, 241, 0.5)',
                            transition: 'all 0.3s',
                            '&:hover': {
                              transform: 'translateY(-2px)',
                              boxShadow: '0 12px 24px -6px rgba(99, 102, 241, 0.6)',
                            }
                          }}
                        >
                          Generate Report
                        </Button>
                      </Box>
                    </Stack>
                  </Card>
                </motion.div>
              </Grid>

              {/* Recent Reports List */}
              <Grid item xs={12} md={7}>
                <motion.div variants={itemVariants}>
                  <Card
                    elevation={0}
                    sx={{
                      p: 4,
                      borderRadius: 6,
                      border: '1px solid',
                      borderColor: 'divider',
                      bgcolor: isDark ? 'rgba(30, 41, 59, 0.5)' : 'white',
                      backdropFilter: 'blur(10px)',
                      height: '100%'
                    }}
                  >
                    <Stack direction="row" spacing={2} alignItems="center" sx={{ mb: 4 }}>
                      <Box 
                        sx={{ 
                          p: 1.5, 
                          borderRadius: 3, 
                          bgcolor: 'secondary.main', 
                          display: 'flex',
                          boxShadow: '0 8px 16px -4px rgba(168, 85, 247, 0.4)'
                        }}
                      >
                        <Clock size={24} color="white" />
                      </Box>
                      <Typography variant="h5" sx={{ fontWeight: 800 }}>
                        Recent Reports
                      </Typography>
                    </Stack>

                    <List sx={{ width: '100%', p: 0 }}>
                      {recentReports.map((report, index) => (
                        <React.Fragment key={report.id}>
                          <ListItem 
                            sx={{ 
                              px: 0, 
                              py: 2,
                              transition: 'all 0.2s',
                              '&:hover': {
                                bgcolor: isDark ? 'rgba(255, 255, 255, 0.02)' : 'rgba(0, 0, 0, 0.01)',
                              }
                            }}
                          >
                            <ListItemIcon>
                              <Box 
                                sx={{ 
                                  p: 1.5, 
                                  borderRadius: 2, 
                                  bgcolor: isDark ? 'rgba(255, 255, 255, 0.05)' : 'rgba(0, 0, 0, 0.03)',
                                  display: 'flex'
                                }}
                              >
                                {getFormatIcon(report.format)}
                              </Box>
                            </ListItemIcon>
                            <ListItemText 
                              primary={
                                <Typography variant="subtitle1" fontWeight={700}>
                                  {report.name}
                                </Typography>
                              }
                              secondary={
                                <Stack direction="row" spacing={2} alignItems="center" sx={{ mt: 0.5 }}>
                                  <Stack direction="row" spacing={0.5} alignItems="center">
                                    <Calendar size={14} />
                                    <Typography variant="caption">{report.date}</Typography>
                                  </Stack>
                                  <Typography variant="caption" sx={{ opacity: 0.5 }}>•</Typography>
                                  <Typography variant="caption">{report.size}</Typography>
                                </Stack>
                              }
                            />
                            <ListItemSecondaryAction>
                              <Stack direction="row" spacing={1}>
                                <Tooltip title="Download">
                                  <IconButton size="small" sx={{ borderRadius: 2 }}>
                                    <Download size={18} />
                                  </IconButton>
                                </Tooltip>
                                <Tooltip title="More">
                                  <IconButton size="small" sx={{ borderRadius: 2 }}>
                                    <MoreVertical size={18} />
                                  </IconButton>
                                </Tooltip>
                              </Stack>
                            </ListItemSecondaryAction>
                          </ListItem>
                          {index < recentReports.length - 1 && <Divider component="li" sx={{ opacity: 0.5 }} />}
                        </React.Fragment>
                      ))}
                    </List>

                    {recentReports.length === 0 && (
                      <Box sx={{ py: 8, textAlign: 'center' }}>
                        <FileText size={48} style={{ opacity: 0.2, marginBottom: 16 }} />
                        <Typography color="text.secondary">
                          No reports generated yet
                        </Typography>
                      </Box>
                    )}
                  </Card>
                </motion.div>
              </Grid>
            </Grid>
          </motion.div>
        </Container>
      </Box>
    </Layout>
  );
};

export default Reports;