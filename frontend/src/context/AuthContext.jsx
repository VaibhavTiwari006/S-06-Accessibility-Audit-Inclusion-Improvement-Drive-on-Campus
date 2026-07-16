import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

// Validate that a JWT token has the correct 3-part structure
const isValidJwt = (token) => {
  if (!token || typeof token !== 'string') return false;
  const parts = token.split('.');
  return parts.length === 3;
};

const clearSession = () => {
  localStorage.clear();
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = () => {
      const token = localStorage.getItem('accessToken');
      const role = localStorage.getItem('userRole');
      const fullName = localStorage.getItem('userFullName');
      const email = localStorage.getItem('userEmail');

      // Validate JWT structure — 3 parts separated by dots
      if (!isValidJwt(token)) {
        // Corrupt or missing token — wipe everything
        clearSession();
        setLoading(false);
        return;
      }

      // Token looks valid — restore the session from localStorage
      setUser({ role, fullName, email });
      setLoading(false);
    };

    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      // data is the unwrapped AuthResponse: { token, role, fullName, email, userId }
      if (!isValidJwt(data.token)) {
        return { success: false, message: 'Invalid token received from server.' };
      }
      localStorage.setItem('accessToken', data.token);
      localStorage.setItem('userRole', data.role);
      localStorage.setItem('userFullName', data.fullName);
      localStorage.setItem('userEmail', data.email);
      setUser({ role: data.role, fullName: data.fullName, email: data.email });
      return { success: true };
    } catch (error) {
      return { success: false, message: error.response?.data?.message || 'Login failed' };
    }
  };

  const logout = () => {
    clearSession();
    setUser(null);
    window.location.href = '/login';
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
