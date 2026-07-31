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
  },

  updateDraft: async (id, data) => {
    const response = await api.put(`/audits/${id}`, data);
    return response.data.data;
  },

  submitAudit: async (id) => {
    const response = await api.post(`/audits/${id}/submit`);
    return response.data.data;
  },

  getChecklists: async (categoryId) => {
    const url = categoryId ? `/audit-checklists?categoryId=${categoryId}` : '/audit-checklists';
    const response = await api.get(url);
    return response.data.data ?? [];
  },

  getCategories: async () => {
    const response = await api.get('/audit-categories');
    return response.data.data ?? [];
  }
};

export default auditService;
