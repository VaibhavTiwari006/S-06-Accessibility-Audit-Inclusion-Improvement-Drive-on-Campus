import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Cryptographic JWT parser and expiration validator
export const parseJwt = (token) => {
  try {
    if (!token || typeof token !== 'string') return null;
    const parts = token.split('.');
    if (parts.length !== 3) return null;
    const base64Url = parts[1];
    const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
    const jsonPayload = decodeURIComponent(
      atob(base64)
        .split('')
        .map((c) => '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2))
        .join('')
    );
    return JSON.parse(jsonPayload);
  } catch {
    return null;
  }
};

export const isTokenValid = (token) => {
  const payload = parseJwt(token);
  if (!payload) return false;
  if (payload.exp && typeof payload.exp === 'number') {
    // Check if expiration timestamp in seconds has passed
    if (payload.exp * 1000 <= Date.now()) {
      return false; // Token has expired
    }
  }
  return true;
};

const AUTH_KEYS = ['accessToken', 'userRole', 'userFullName', 'userEmail', 'userId', 'userAvatar'];

export const clearSession = () => {
  AUTH_KEYS.forEach(key => localStorage.removeItem(key));
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      try {
        const token = localStorage.getItem('accessToken');
        const role = localStorage.getItem('userRole');
        const fullName = localStorage.getItem('userFullName');
        const email = localStorage.getItem('userEmail');
        const userId = localStorage.getItem('userId');

        // Strictly validate JWT structure AND expiration
        if (!isTokenValid(token)) {
          clearSession();
          setUser(null);
          setLoading(false);
          return;
        }

        // Token is cryptographically valid and unexpired — restore session
        setUser({ id: userId ? parseInt(userId) : null, role, fullName, email });
        setLoading(false);
      } catch (err) {
        console.error('Failed to initialize auth state:', err);
        clearSession();
        setUser(null);
        setLoading(false);
      }
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      // data is the unwrapped AuthResponse: { token, role, fullName, email, userId }
      if (!isTokenValid(data.token)) {
        return { success: false, message: 'Invalid token received from server.' };
      }
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userFullName', data.fullName);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userId', data.userId);
      setUser({ id: data.userId, role: data.role, fullName: data.fullName, email: data.email });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const register = async (fullName, email, password) => {
    try {
      const data = await authService.register(fullName, email, password);
      if (!isTokenValid(data.token)) {
        return { success: false, message: 'Invalid token received from server.' };
      }
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userFullName', data.fullName);
      localStorage.setItem('userEmail', data.email);
      localStorage.setItem('userId', data.userId);
      setUser({ id: data.userId, role: data.role, fullName: data.fullName, email: data.email });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Registration failed' };
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
    window.location.href = '/login';
  };

  const updateUser = (updatedData) => {
    if (updatedData.fullName) {
      localStorage.setItem('userFullName', updatedData.fullName);
    }
    if (updatedData.avatar !== undefined) {
      if (updatedData.avatar) {
        localStorage.setItem('userAvatar', updatedData.avatar);
      } else {
        localStorage.removeItem('userAvatar');
      }
    }
    setUser(prev => prev ? { ...prev, ...updatedData } : null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, loading, updateUser }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
