// src/context/PlatformContext.jsx
import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { apiFetch } from '../api/client';

const PlatformContext = createContext(null);

export const PlatformProvider = ({ children }) => {
    const [platforms, setPlatforms] = useState({});
    const [platformStats, setPlatformStats] = useState({});
    const [loading, setLoading] = useState(true);
    const [syncStatus, setSyncStatus] = useState({});
    const [lastSynced, setLastSynced] = useState({});

    const fetchPlatforms = useCallback(async () => {
        try {
            setLoading(true);
            const data = await apiFetch('/api/profiles/me');
            setPlatforms(data.platforms || {});
        } catch (error) {
            console.error('Failed to fetch platforms:', error);
        } finally {
            setLoading(false);
        }
    }, []);

    const fetchPlatformStats = useCallback(async () => {
        try {
            const data = await apiFetch('/api/profiles/me/stats');
            setPlatformStats(data || {});
        } catch (error) {
            console.error('Failed to fetch platform stats:', error);
        }
    }, []);

    useEffect(() => {
        fetchPlatforms();
        fetchPlatformStats();
    }, [fetchPlatforms, fetchPlatformStats]);

    const connectPlatform = async (platform, username) => {
        try {
            const data = await apiFetch('/api/profiles/platform', {
                method: 'PUT',
                body: JSON.stringify({ platform, username }),
            });
            setPlatforms(data.platforms || {});
            setLastSynced({ ...lastSynced, [platform]: new Date().toISOString() });
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const disconnectPlatform = async (platform) => {
        try {
            const data = await apiFetch(`/api/profiles/platform/${platform}`, {
                method: 'DELETE',
            });
            setPlatforms(data.platforms || {});
            const newStats = { ...platformStats };
            delete newStats[platform];
            setPlatformStats(newStats);
            return { success: true };
        } catch (error) {
            return { success: false, error: error.message };
        }
    };

    const syncPlatform = async (platform) => {
        try {
            setSyncStatus({ ...syncStatus, [platform]: 'syncing' });
            const data = await apiFetch(`/api/profiles/sync/${platform}`, {
                method: 'POST',
            });
            setPlatformStats({ ...platformStats, [platform]: data });
            setLastSynced({ ...lastSynced, [platform]: new Date().toISOString() });
            setSyncStatus({ ...syncStatus, [platform]: 'success' });
            return { success: true };
        } catch (error) {
            setSyncStatus({ ...syncStatus, [platform]: 'error' });
            return { success: false, error: error.message };
        }
    };

    const syncAllPlatforms = async () => {
        const connectedPlatforms = Object.keys(platforms).filter(
            (key) => platforms[key]
        );
        const results = await Promise.allSettled(
            connectedPlatforms.map((platform) => syncPlatform(platform))
        );
        return results;
    };

    const value = {
        platforms,
        platformStats,
        loading,
        syncStatus,
        lastSynced,
        connectPlatform,
        disconnectPlatform,
        syncPlatform,
        syncAllPlatforms,
        refreshPlatforms: fetchPlatforms,
        refreshStats: fetchPlatformStats,
    };

    return (
        <PlatformContext.Provider value={value}>
            {children}
        </PlatformContext.Provider>
    );
};

export const usePlatformData = () => {
    const context = useContext(PlatformContext);
    if (!context) {
        throw new Error('usePlatformData must be used within PlatformProvider');
    }
    return context;
};
