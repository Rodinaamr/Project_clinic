import api from './api';

const ENDPOINT = '/api/Patients';

export const patientsApi = {
    // Get all patients
    getAll: () => api.get(ENDPOINT),

    // Get patient by ID
    getById: (id: number) => api.get(`${ENDPOINT}/${id}`),

    // Create new patient (standard create)
    create: (data: any) => api.post(ENDPOINT, data),

    // Signup endpoint (specific business logic if any)
    signup: (data: any) => api.post(`${ENDPOINT}/SignUp`, data),

    // Login endpoint
    login: (credentials: { email: string; password: string }) =>
        api.post(`${ENDPOINT}/Login`, credentials),

    // Update patient
    update: (id: number, data: any) => api.put(`${ENDPOINT}/${id}`, data),

    // Delete patient
    delete: (id: number) => api.delete(`${ENDPOINT}/${id}`),

    // Test endpoint
    test: () => api.get(`${ENDPOINT}/Test`),
};

export default patientsApi;
