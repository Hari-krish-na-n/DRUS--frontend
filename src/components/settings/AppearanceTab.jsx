// src/components/settings/AppearanceTab.jsx
import React, { useState } from "react";
import {
    Box,
    Paper,
    Typography,
    Grid,
    Radio,
    RadioGroup,
    FormControlLabel,
    useTheme,
    Switch,
    Tooltip,
    IconButton
} from "@mui/material";
import { Sun, Moon, Laptop, Palette, Type, Check } from "lucide-react";
import { useTheme as useAppTheme } from "../../hooks/useTheme";

const ThemeOption = ({ value, label, icon: Icon, active }) => (
    <Paper
        elevation={0}
        sx={{
            p: 2,
            borderRadius: 4,
            border: '2px solid',
            borderColor: active ? 'primary.main' : 'divider',
            bgcolor: active ? 'primary.main' + '05' : 'transparent',
            cursor: 'pointer',
            textAlign: 'center',
            transition: 'all 0.2s',
            '&:hover': { borderColor: 'primary.main', bgcolor: 'primary.main' + '05' }
        }}
    >
        <Box sx={{ display: 'flex', justifyContent: 'center', mb: 1, color: active ? 'primary.main' : 'text.secondary' }}>
            <Icon size={24} />
        </Box>
        <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>{label}</Typography>
        <Radio value={value} sx={{ display: 'none' }} />
    </Paper>
);

const AppearanceTab = () => {
    const { toggleTheme } = useAppTheme();
    const theme = useTheme();
    const currentMode = theme.palette.mode;

    const [primaryColor, setPrimaryColor] = useState('#667eea');
    const [compactMode, setCompactMode] = useState(false);

    const colors = [
        { name: 'Coding Blue', value: '#3b82f6' },
        { name: 'Hacker Green', value: '#10b981' },
        { name: 'Ruby Red', value: '#ef4444' },
        { name: 'Deep Purple', value: '#8b5cf6' },
        { name: 'Monokai Orange', value: '#f59e0b' }
    ];

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 4 }}>
            {/* Theme Mode */}
            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 1 }}>Theme Preference</Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Choose how DRUS looks on your device.
                </Typography>

                <RadioGroup value={currentMode} onChange={(e) => toggleTheme(e.target.value)}>
                    <Grid container spacing={3}>
                        <Grid item xs={4}>
                            <Box onClick={() => toggleTheme('light')}>
                                <ThemeOption value="light" label="Light" icon={Sun} active={currentMode === 'light'} />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box onClick={() => toggleTheme('dark')}>
                                <ThemeOption value="dark" label="Dark" icon={Moon} active={currentMode === 'dark'} />
                            </Box>
                        </Grid>
                        <Grid item xs={4}>
                            <Box onClick={() => toggleTheme('system')}>
                                <ThemeOption value="system" label="System" icon={Laptop} active={currentMode === 'system'} />
                            </Box>
                        </Grid>
                    </Grid>
                </RadioGroup>
            </Paper>

            {/* Accent Color */}
            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 1 }}>
                    <Palette size={20} color={primaryColor} />
                    <Typography variant="h6" sx={{ fontWeight: 800 }}>Primary Accent</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 4 }}>
                    Personalize the interface with your favorite coding aesthetic.
                </Typography>

                <Box sx={{ display: 'flex', gap: 2, flexWrap: 'wrap' }}>
                    {colors.map((color) => (
                        <Tooltip key={color.name} title={color.name}>
                            <Box
                                onClick={() => setPrimaryColor(color.value)}
                                sx={{
                                    width: 48,
                                    height: 48,
                                    borderRadius: '50%',
                                    bgcolor: color.value,
                                    cursor: 'pointer',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    border: '4px solid',
                                    borderColor: primaryColor === color.value ? 'primary.main' : 'transparent',
                                    transition: 'transform 0.2s',
                                    '&:hover': { transform: 'scale(1.1)' }
                                }}
                            >
                                {primaryColor === color.value && <Check size={20} color="white" />}
                            </Box>
                        </Tooltip>
                    ))}
                </Box>
            </Paper>

            {/* Typography & Accessibility */}
            <Paper sx={{ p: 4, borderRadius: 5, border: '1px solid', borderColor: 'divider', bgcolor: 'transparent', boxShadow: 'none' }}>
                <Typography variant="h6" sx={{ fontWeight: 800, mb: 3 }}>Interface Density</Typography>

                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
                        <Box sx={{ p: 1, borderRadius: 2, bgcolor: 'rgba(0,0,0,0.03)', color: 'secondary.main' }}>
                            <Type size={20} />
                        </Box>
                        <Box>
                            <Typography variant="subtitle2" sx={{ fontWeight: 800 }}>Compact Mode</Typography>
                            <Typography variant="caption" color="text.secondary">Reduce padding and font sizes for high-density views.</Typography>
                        </Box>
                    </Box>
                    <Switch
                        checked={compactMode}
                        onChange={(e) => setCompactMode(e.target.checked)}
                        color="primary"
                    />
                </Box>

                <Box sx={{ p: 2, borderRadius: 3, bgcolor: theme.palette.mode === 'dark' ? 'rgba(255,255,255,0.02)' : 'grey.50', border: '1px dashed', borderColor: 'divider' }}>
                    <Typography variant="overline" sx={{ fontWeight: 800, opacity: 0.6 }}>PREVIEW SCAN</Typography>
                    <Box sx={{ mt: 1, display: 'flex', flexDirection: 'column', gap: compactMode ? 0.5 : 1.5 }}>
                        <Typography variant={compactMode ? 'caption' : 'body2'} sx={{ fontWeight: 600 }}>Problem: Longest Common Subsequence</Typography>
                        <Typography variant={compactMode ? 'caption' : 'body2'} color="text.secondary">Difficulty: Medium | Time: 45ms</Typography>
                    </Box>
                </Box>
            </Paper>
        </Box>
    );
};

export default AppearanceTab;
