import api from './api';

const ENDPOINT = '/Patients';

export const getPatients = async () => {
    const response = await api.get(ENDPOINT);
    return response.data;
};

export const getPatient = async (id) => {
    const response = await api.get(`${ENDPOINT}/${id}`);
    return response.data;
};

export const createPatient = async (data) => {
    const response = await api.post(ENDPOINT, data);
    return response.data;
};

export const updatePatient = async (id, data) => {
    const response = await api.put(`${ENDPOINT}/${id}`, data);
    return response.data;
};

export const deletePatient = async (id) => {
    const response = await api.delete(`${ENDPOINT}/${id}`);
    return response.data;
};

// Custom endpoints
export const signUp = async (data) => {
    const response = await api.post(`${ENDPOINT}/SignUp`, data);
    return response.data;
};

export const login = async (email, password) => {
    const response = await api.post(`${ENDPOINT}/Login`, { email, password });
    return response.data;
};

export const testPatientService = async () => {
    const response = await api.get(`${ENDPOINT}/Test`);
    return response.data;
};
