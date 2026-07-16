import api from './api';

const issueService = {
  getAllIssues: async () => {
    const response = await api.get('/student-reports');
    return response.data.data ?? [];
  },

  getMyIssues: async () => {
    const response = await api.get('/student-reports/mine');
    return response.data.data ?? [];
  },

  reportIssue: async (data) => {
    const response = await api.post('/student-reports', data);
    return response.data.data;
  },

  updateIssueStatus: async (id, status) => {
    const response = await api.patch(`/student-reports/${id}/status`, { status });
    return response.data.data;
  }
};

export default issueService;
