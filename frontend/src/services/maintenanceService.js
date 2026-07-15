import api from './api';

const maintenanceService = {
  getAllTasks: async () => {
    const response = await api.get('/maintenance-tasks');
    return response.data.data ?? [];
  },
  createTask: async (data) => {
    const response = await api.post('/maintenance-tasks', data);
    return response.data.data;
  },
  updateTaskStatus: async (id, status, notes) => {
    const response = await api.patch(`/maintenance-tasks/${id}/status`, { status, completionNotes: notes });
    return response.data.data;
  }
};

export default maintenanceService;
