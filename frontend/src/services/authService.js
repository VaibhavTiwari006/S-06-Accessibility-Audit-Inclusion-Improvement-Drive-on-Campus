import api from './api';

const authService = {
  login: async (email, password) => {
    const response = await api.post('/auth/login', { email, password });
    // Backend wraps everything in ApiResponse: { success, message, data: { token, role, ... } }
    // We unwrap and return just the inner AuthResponse object
    return response.data.data;
  },

  getCurrentUser: async () => {
    return {
      role: localStorage.getItem('userRole'),
      fullName: localStorage.getItem('userFullName'),
      email: localStorage.getItem('userEmail'),
    };
  }
};

export default authService;
