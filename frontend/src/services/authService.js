import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    return response.data;
  },

  getCurrentUser: async () => {
    // Assuming backend has a /auth/me endpoint or similar, 
    // or we just decode JWT locally if needed. 
    // For now we will return role from localStorage.
    return {
      role: localStorage.getItem('userRole')
    };
  }
};

export default authService;
