import api from './api';

const buildingService = {
  getAllBuildings: async () => {
    const response = await api.get('/buildings');
    // ApiResponse wrapper: { success, data: [...], message }
    return response.data.data ?? [];
  },
  
  getBuildingById: async (id) => {
    const response = await api.get(`/buildings/${id}`);
    return response.data.data;
  },
  
  createBuilding: async (data) => {
    const response = await api.post('/buildings', data);
    return response.data.data;
  },

  updateBuilding: async (id, data) => {
    const response = await api.put(`/buildings/${id}`, data);
    return response.data.data;
  },

  deleteBuilding: async (id) => {
    const response = await api.delete(`/buildings/${id}`);
    return response.data;
  }
};

export default buildingService;
