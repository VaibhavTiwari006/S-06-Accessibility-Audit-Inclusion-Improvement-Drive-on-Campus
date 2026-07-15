import api from './api';

const dashboardService = {
  getStats: async () => {
    const response = await api.get('/dashboard/stats');
    return response.data; // Note: returns ApiResponse { success, data, message }
  }
};

export default dashboardService;
