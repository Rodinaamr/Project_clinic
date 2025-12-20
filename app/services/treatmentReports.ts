import api from './api';

const ENDPOINT = '/api/TreatmentReports';

export const treatmentReportsApi = {
    getAll: () => api.get(ENDPOINT),
    getById: (id: number) => api.get(`${ENDPOINT}/${id}`),
    create: (data: any) => api.post(ENDPOINT, data),
    update: (id: number, data: any) => api.put(`${ENDPOINT}/${id}`, data),
    delete: (id: number) => api.delete(`${ENDPOINT}/${id}`),
};

export default treatmentReportsApi;
