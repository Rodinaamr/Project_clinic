import api from './api';

const ENDPOINT = '/Medications';

export const getMedications = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getMedication = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createMedication = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updateMedication = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deleteMedication = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};
