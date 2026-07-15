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
  }
};

export default buildingService;
