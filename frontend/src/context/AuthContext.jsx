import React, { createContext, useContext, useState, useEffect } from 'react';
import authService from '../services/authService';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const initAuth = async () => {
      const token = localStorage.getItem('accessToken');
      if (token) {
        try {
          const userData = await authService.getCurrentUser();
          setUser(userData);
        } catch (error) {
          console.error("Failed to restore session", error);
          localStorage.removeItem('accessToken');
          localStorage.removeItem('userRole');
        }
      }
      setLoading(false);
    };
    initAuth();
  }, []);

  const login = async (email, password) => {
    try {
      const data = await authService.login(email, password);
      // data is now the unwrapped AuthResponse: { token, role, fullName, email, userId }
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
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userFullName');
    localStorage.removeItem('userEmail');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, loading }}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
