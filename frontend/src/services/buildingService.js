import api from './api';

const buildingService = {
  getAllBuildings: async () => {
    const response = await api.get('/buildings');
    return response.data;
  },
  
  getBuildingById: async (id) => {
    const response = await api.get(`/buildings/${id}`);
    return response.data;
  },
  
  createBuilding: async (data) => {
    const response = await api.post('/buildings', data);
    return response.data;
  }
};

export default buildingService;
