// src/context/ThemeContext.jsx
import React, { createContext, useContext, useState, useEffect, useMemo } from 'react';
import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import { CssBaseline } from '@mui/material';

const ThemeContext = createContext(null);

const getDesignTokens = (mode, customColors = {}) => ({
    palette: {
        mode,
        primary: {
            main: customColors.primary || (mode === 'dark' ? '#818cf8' : '#6366f1'),
            light: mode === 'dark' ? '#a5b4fc' : '#818cf8',
            dark: mode === 'dark' ? '#4f46e5' : '#4338ca',
            contrastText: '#ffffff',
        },
        secondary: {
            main: customColors.secondary || (mode === 'dark' ? '#c084fc' : '#a855f7'),
            light: mode === 'dark' ? '#d8b4fe' : '#c084fc',
            dark: mode === 'dark' ? '#9333ea' : '#7e22ce',
        },
        background: {
            default: mode === 'dark' ? '#0f172a' : '#f8fafc',
            paper: mode === 'dark' ? '#1e293b' : '#ffffff',
        },
        text: {
            primary: mode === 'dark' ? '#f8fafc' : '#1e293b',
            secondary: mode === 'dark' ? '#94a3b8' : '#64748b',
        },
        divider: mode === 'dark' ? 'rgba(148, 163, 184, 0.1)' : 'rgba(100, 116, 139, 0.1)',
    },
    typography: {
        fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', sans-serif",
        h1: { fontWeight: 800, letterSpacing: '-0.025em' },
        h2: { fontWeight: 700, letterSpacing: '-0.025em' },
        h3: { fontWeight: 700, letterSpacing: '-0.025em' },
        h4: { fontWeight: 600, letterSpacing: '-0.025em' },
        h5: { fontWeight: 600, letterSpacing: '-0.025em' },
        h6: { fontWeight: 600, letterSpacing: '-0.01em' },
        subtitle1: { fontWeight: 500 },
        button: { fontWeight: 600, textTransform: 'none' },
    },
    shape: {
        borderRadius: 16,
    },
    shadows: [
        'none',
        '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
        '0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1)',
        '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -2px rgba(0, 0, 0, 0.1)',
        '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -4px rgba(0, 0, 0, 0.1)',
        '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1)',
        ...Array(19).fill('none') // Fill remaining shadows
    ],
    components: {
        MuiCssBaseline: {
            styleOverrides: {
                body: {
                    scrollbarColor: mode === 'dark' ? '#475569 #1e293b' : '#cbd5e1 #f8fafc',
                    '&::-webkit-scrollbar': {
                        width: '8px',
                        height: '8px',
                    },
                    '&::-webkit-scrollbar-track': {
                        background: mode === 'dark' ? '#1e293b' : '#f8fafc',
                    },
                    '&::-webkit-scrollbar-thumb': {
                        background: mode === 'dark' ? '#475569' : '#cbd5e1',
                        borderRadius: '10px',
                    },
                    '&::-webkit-scrollbar-thumb:hover': {
                        background: mode === 'dark' ? '#64748b' : '#94a3b8',
                    },
                },
            },
        },
        MuiButton: {
            styleOverrides: {
                root: {
                    borderRadius: 12,
                    padding: '8px 16px',
                    transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        transform: 'translateY(-1px)',
                        boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                    },
                    '&:active': {
                        transform: 'translateY(0)',
                    },
                },
                containedPrimary: {
                    background: mode === 'dark' 
                        ? 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)'
                        : 'linear-gradient(135deg, #6366f1 0%, #4f46e5 100%)',
                    '&:hover': {
                        background: mode === 'dark'
                            ? 'linear-gradient(135deg, #a5b4fc 0%, #818cf8 100%)'
                            : 'linear-gradient(135deg, #818cf8 0%, #6366f1 100%)',
                    },
                },
            },
        },
        MuiCard: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                    border: mode === 'dark' ? '1px solid rgba(255, 255, 255, 0.05)' : '1px solid rgba(0, 0, 0, 0.05)',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
                    '&:hover': {
                        borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        boxShadow: mode === 'dark' 
                            ? '0 20px 25px -5px rgba(0, 0, 0, 0.3)' 
                            : '0 20px 25px -5px rgba(0, 0, 0, 0.05)',
                        transform: 'translateY(-2px)',
                    },
                },
            },
        },
        MuiPaper: {
            styleOverrides: {
                root: {
                    backgroundImage: 'none',
                },
            },
        },
        MuiTextField: {
            styleOverrides: {
                root: {
                    '& .MuiOutlinedInput-root': {
                        borderRadius: 12,
                        transition: 'all 0.2s',
                        '& fieldset': {
                            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)',
                        },
                        '&:hover fieldset': {
                            borderColor: mode === 'dark' ? 'rgba(255, 255, 255, 0.2)' : 'rgba(0, 0, 0, 0.2)',
                        },
                        '&.Mui-focused fieldset': {
                            borderWidth: '2px',
                        },
                    },
                },
            },
        },
    },
});

export const ThemeContextProvider = ({ children }) => {
    const [mode, setMode] = useState(() => {
        const saved = localStorage.getItem('themeMode');
        return saved || 'light';
    });

    const [customColors, setCustomColors] = useState(() => {
        const saved = localStorage.getItem('customColors');
        return saved ? JSON.parse(saved) : {};
    });

    const [fontSize, setFontSize] = useState(() => {
        const saved = localStorage.getItem('fontSize');
        return saved || 'medium';
    });

    const [compactMode, setCompactMode] = useState(() => {
        const saved = localStorage.getItem('compactMode');
        return saved === 'true';
    });

    useEffect(() => {
        localStorage.setItem('themeMode', mode);
    }, [mode]);

    useEffect(() => {
        localStorage.setItem('customColors', JSON.stringify(customColors));
    }, [customColors]);

    useEffect(() => {
        localStorage.setItem('fontSize', fontSize);
    }, [fontSize]);

    useEffect(() => {
        localStorage.setItem('compactMode', compactMode);
    }, [compactMode]);

    const theme = useMemo(
        () => createTheme(getDesignTokens(mode, customColors)),
        [mode, customColors]
    );

    const toggleTheme = () => {
        setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'));
    };

    const setThemeMode = (newMode) => {
        setMode(newMode);
    };

    const updateCustomColors = (colors) => {
        setCustomColors(colors);
    };

    const toggleCompactMode = () => {
        setCompactMode((prev) => !prev);
    };

    const resetTheme = () => {
        setMode('light');
        setCustomColors({});
        setFontSize('medium');
        setCompactMode(false);
    };

    const value = {
        mode,
        toggleTheme,
        setThemeMode,
        customColors,
        updateCustomColors,
        fontSize,
        setFontSize,
        compactMode,
        toggleCompactMode,
        resetTheme,
    };

    return (
        <ThemeContext.Provider value={value}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
};

export const useTheme = () => {
    const context = useContext(ThemeContext);
    if (!context) {
        throw new Error('useTheme must be used within ThemeContextProvider');
    }
    return context;
};
