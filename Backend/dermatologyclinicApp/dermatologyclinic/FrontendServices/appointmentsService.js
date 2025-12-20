import api from './api';

const ENDPOINT = '/Appointments';

export const getAppointments = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getAppointment = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createAppointment = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updateAppointment = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deleteAppointment = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};
