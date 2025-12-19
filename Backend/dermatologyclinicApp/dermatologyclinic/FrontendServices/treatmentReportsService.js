import api from './api';

const ENDPOINT = '/TreatmentReports';

export const getTreatmentReports = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getTreatmentReport = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createTreatmentReport = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updateTreatmentReport = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deleteTreatmentReport = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};
