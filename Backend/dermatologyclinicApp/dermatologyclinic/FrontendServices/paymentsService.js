import api from './api';

const ENDPOINT = '/Payments';

export const getPayments = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getPayment = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createPayment = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updatePayment = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deletePayment = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};
