import api from './api';

const auditService = {
  getAllAudits: async () => {
    const response = await api.get('/audits');
    return response.data.data ?? [];
  },

  getAuditById: async (id) => {
    const response = await api.get(`/audits/${id}`);
    return response.data.data;
  },

  startAudit: async (data) => {
    const response = await api.post('/audits', data);
    return response.data.data;
  },
  
  submitChecklistResponse: async (auditId, responses) => {
    const response = await api.post(`/audits/${auditId}/responses`, responses);
    return response.data.data;
  }
};

export default auditService;
