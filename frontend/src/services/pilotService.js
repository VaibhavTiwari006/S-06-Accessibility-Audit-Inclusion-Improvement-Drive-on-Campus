import api from './api';

const pilotService = {
  getAll: async () => {
    const response = await api.get('/pilot-improvements');
    return response.data.data ?? [];
  },

  getMine: async () => {
    const response = await api.get('/pilot-improvements/mine');
    return response.data.data ?? [];
  },

  propose: async (data) => {
    const response = await api.post('/pilot-improvements', data);
    return response.data.data;
  },

  updateStatus: async (id, status, adminNotes) => {
    const response = await api.patch(`/pilot-improvements/${id}/status`, { status, adminNotes });
    return response.data.data;
  },
};

export default pilotService;
