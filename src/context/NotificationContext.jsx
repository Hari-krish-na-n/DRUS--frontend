// src/context/NotificationContext.jsx
import React, { createContext, useContext } from 'react';
import { SnackbarProvider, useSnackbar } from 'notistack';

const NotificationContext = createContext(null);

export const NotificationProvider = ({ children }) => {
    return (
        <SnackbarProvider
            maxSnack={3}
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
            }}
            autoHideDuration={4000}
            preventDuplicate
        >
            <NotificationContextProvider>{children}</NotificationContextProvider>
        </SnackbarProvider>
    );
};

const NotificationContextProvider = ({ children }) => {
    const { enqueueSnackbar, closeSnackbar } = useSnackbar();

    const showSuccess = (message) => {
        enqueueSnackbar(message, { variant: 'success' });
    };

    const showError = (message) => {
        enqueueSnackbar(message, { variant: 'error' });
    };

    const showInfo = (message) => {
        enqueueSnackbar(message, { variant: 'info' });
    };

    const showWarning = (message) => {
        enqueueSnackbar(message, { variant: 'warning' });
    };

    const value = {
        showSuccess,
        showError,
        showInfo,
        showWarning,
        closeSnackbar,
    };

    return (
        <NotificationContext.Provider value={value}>
            {children}
        </NotificationContext.Provider>
    );
};

export const useNotification = () => {
    const context = useContext(NotificationContext);
    if (!context) {
        throw new Error('useNotification must be used within NotificationProvider');
    }
    return context;
};
