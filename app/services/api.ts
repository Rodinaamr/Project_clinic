import axios from 'axios';

// Your backend URL (make sure it matches your Visual Studio port)
const API_BASE_URL = 'https://localhost:7078';

console.log('🌐 Connecting to backend at:', API_BASE_URL);

const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Log requests and responses
api.interceptors.request.use((config) => {
  console.log(`📤 Request: ${config.method?.toUpperCase()} ${config.url}`);
  return config;
});

api.interceptors.response.use(
  (response) => {
    console.log(`✅ Response: ${response.status} ${response.config.url}`);
    return response;
  },
  (error) => {
    console.error('❌ API Error:', error.message);
    return Promise.reject(error);
  }
);

// Export API endpoints
export const assistantApi = {
  getAll: () => api.get('/api/Assistants'),
  getById: (id: number) => api.get(`/api/Assistants/${id}`),
  create: (data: any) => api.post('/api/Assistants', data),
  update: (id: number, data: any) => api.put(`/api/Assistants/${id}`, data),
  delete: (id: number) => api.delete(`/api/Assistants/${id}`),
};

export const appointmentApi = {
  getAll: () => api.get('/api/Appointments'),
  getById: (id: number) => api.get(`/api/Appointments/${id}`),
  create: (data: any) => api.post('/api/Appointments', data),
  update: (id: number, data: any) => api.put(`/api/Appointments/${id}`, data),
  delete: (id: number) => api.delete(`/api/Appointments/${id}`),
};

export const doctorApi = {
  getAll: () => api.get('/api/Doctors'),
  getById: (id: number) => api.get(`/api/Doctors/${id}`),
  create: (data: any) => api.post('/api/Doctors', data),
  update: (id: number, data: any) => api.put(`/api/Doctors/${id}`, data),
  delete: (id: number) => api.delete(`/api/Doctors/${id}`),
};

export default api;