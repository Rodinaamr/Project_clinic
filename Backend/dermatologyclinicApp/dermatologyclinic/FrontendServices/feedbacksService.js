import api from './api';

const ENDPOINT = '/Feedbacks';

export const getFeedbacks = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getFeedback = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createFeedback = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updateFeedback = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deleteFeedback = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};
