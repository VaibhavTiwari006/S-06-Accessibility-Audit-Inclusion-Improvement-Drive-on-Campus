import axios from 'axios';

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api',
  timeout: 60000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to attach JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const AUTH_KEYS = ['accessToken', 'userRole', 'userFullName', 'userEmail', 'userId', 'userAvatar'];

// Response interceptor to handle global errors like 401 Unauthorized
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401 && !error.config.url.includes('/auth/login')) {
      // Clear only stored auth session data, preserving accessibility preferences
      AUTH_KEYS.forEach(key => localStorage.removeItem(key));
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

export default api;
