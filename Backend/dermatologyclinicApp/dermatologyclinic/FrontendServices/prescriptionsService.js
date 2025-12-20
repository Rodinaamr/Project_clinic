import api from './api';

const ENDPOINT = '/Prescriptions';

export const getPrescriptions = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getPrescription = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createPrescription = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updatePrescription = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deletePrescription = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};
