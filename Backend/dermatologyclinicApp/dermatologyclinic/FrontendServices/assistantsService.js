import api from './api';

const ENDPOINT = '/Assistants';

export const getAssistants = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getAssistant = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createAssistant = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updateAssistant = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deleteAssistant = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};
