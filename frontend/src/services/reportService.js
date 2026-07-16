import api from './api';

const reportService = {
  downloadCampusReport: async () => {
    // We use responseType: 'blob' because we expect binary PDF data
    const response = await api.get('/reports/campus', {
      responseType: 'blob'
    });
    return response.data;
  },
  
  downloadBuildingReport: async (buildingId) => {
    const response = await api.get(`/reports/building/${buildingId}`, {
      responseType: 'blob'
    });
    return response.data;
  },
  
  downloadAdvocacyLetter: async () => {
    const response = await api.get('/reports/advocacy', {
      responseType: 'blob'
    });
    return response.data;
  }
};

export default reportService;
