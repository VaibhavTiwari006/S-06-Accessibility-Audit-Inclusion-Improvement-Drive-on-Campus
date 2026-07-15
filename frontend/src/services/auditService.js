import api from './api';

const auditService = {
  getAllAudits: async () => {
    const response = await api.get('/audits');
    return response.data;
  },

  getAuditById: async (id) => {
    const response = await api.get(`/audits/${id}`);
    return response.data;
  },

  startAudit: async (data) => {
    const response = await api.post('/audits', data);
    return response.data;
  },
  
  submitChecklistResponse: async (auditId, responses) => {
    const response = await api.post(`/audits/${auditId}/responses`, responses);
    return response.data;
  }
};

export default auditService;
