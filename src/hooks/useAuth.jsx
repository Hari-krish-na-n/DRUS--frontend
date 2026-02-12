// src/hooks/useAuth.jsx
import { useState, useContext, createContext, useEffect } from 'react';
import { apiFetch, setToken, getToken } from '../api/client';
import { jwtDecode } from 'jwt-decode';

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = getToken();
    if (token) {
      loadUser();
    } else {
      setLoading(false);
    }
  }, []);

  const loadUser = async () => {
    try {
      const userData = await apiFetch('/api/profiles/me');
      setUser(userData);
    } catch (error) {
      console.error('Failed to load user:', error);
      setToken(null);
    } finally {
      setLoading(false);
    }
  };

  const login = async ({ email, password }) => {
    const data = await apiFetch('/api/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    setToken(data.token);
    setUser(data.user);
    return data;
  };

  const register = async ({ name, email, password }) => {
    const data = await apiFetch('/api/auth/register', {
      method: 'POST',
      body: JSON.stringify({ name, email, password })
    });
    return data;
  };

  const loginWithGoogle = async (credentialToken) => {
    try {
      // Decode the Google JWT token to get user info
      const decoded = jwtDecode(credentialToken);
      
      console.log('Decoded Google user:', {
        email: decoded.email,
        name: decoded.name,
        picture: decoded.picture
      });

      // Send decoded user info to backend
      const data = await apiFetch('/api/auth/google', {
        method: 'POST',
        body: JSON.stringify({
          email: decoded.email,
          name: decoded.name,
          picture: decoded.picture
        })
      });

      console.log('Backend response:', data);

      // Store token and user data
      setToken(data.token);
      setUser(data.user);
      
      return data;
    } catch (error) {
      console.error('Google login error:', error);
      throw error;
    }
  };

  const logout = () => {
    setToken(null);
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    loginWithGoogle,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};