import api from './api';

const issueService = {
  getAllIssues: async () => {
    const response = await api.get('/student-reports');
    return response.data;
  },

  reportIssue: async (data) => {
    // Requires multipart/form-data for image uploads
    const response = await api.post('/student-reports', data, {
      headers: { 'Content-Type': 'multipart/form-data' }
    });
    return response.data;
  },

  updateIssueStatus: async (id, status) => {
    const response = await api.patch(`/student-reports/${id}/status`, { status });
    return response.data;
  }
};

export default issueService;
