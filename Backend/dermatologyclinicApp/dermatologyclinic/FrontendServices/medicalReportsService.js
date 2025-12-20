import api from './api';

const ENDPOINT = '/MedicalReports';

export const getMedicalReports = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getMedicalReport = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createMedicalReport = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updateMedicalReport = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deleteMedicalReport = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};
