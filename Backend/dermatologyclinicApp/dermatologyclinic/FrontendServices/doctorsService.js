import api from './api';

const ENDPOINT = '/Doctors';

export const getDoctors = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getDoctor = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createDoctor = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updateDoctor = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deleteDoctor = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};
