// app/services/api.ts
import axios from 'axios';
import { Platform } from 'react-native';

// Get base URL based on platform
const getBaseUrl = () => {
  if (__DEV__) {
    const url = Platform.select({
      ios: 'http://localhost:5148',
      android: 'http://10.0.2.2:5148',
      web: 'http://localhost:5148',
      default: 'http://localhost:5148',
    });
    console.log(`🌐 Using backend URL: ${url}`);
    return url;
  }
  return 'https://your-production-url.com';
};

const API_BASE_URL = getBaseUrl();

// Create axios instance
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 15000,
  headers: {
    'Content-Type': 'application/json',
    'Accept': 'application/json',
  },
});

// Request interceptor for logging
api.interceptors.request.use(
  (config) => {
    console.log(`➡️  ${config.method?.toUpperCase()} ${config.url}`);
    if (config.data) {
      console.log('📦 Request data:', config.data);
    }
    return config;
  },
  (error) => {
    console.error('❌ Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor for logging
api.interceptors.response.use(
  (response) => {
    console.log(`✅ ${response.status} ${response.config.method?.toUpperCase()} ${response.config.url}`);
    if (response.data) {
      // console.log('📦 Response data:', response.data);
    }
    return response;
  },
  (error) => {
    console.error('❌ Response error:', {
      message: error.message,
      status: error.response?.status,
      url: error.config?.url,
      data: error.response?.data
    });
    return Promise.reject(error);
  }
);

// Test backend connection
export const testBackendConnection = async () => {
  console.log(`🔍 Testing connection to: ${API_BASE_URL}`);

  try {
    const response = await api.get('/api/Patients/Test');
    return {
      success: true,
      data: response.data,
      message: `✅ Connected! ${response.data.message}`
    };
  } catch (error: any) {
    console.error('Connection error:', error.message);
    let errorMessage = error.message;
    if (error.code === 'ECONNREFUSED') {
      errorMessage = `Cannot connect to ${API_BASE_URL}. Make sure backend is running.`;
    } else if (error.response?.status === 404) {
      errorMessage = 'Endpoint not found. Check controller routes.';
    } else if (error.response?.status === 0) {
      errorMessage = 'CORS error. Check backend CORS configuration.';
    }
    return {
      success: false,
      error: errorMessage
    };
  }
};

// Patient API endpoints
export const patientApi = {
  getAll: () => api.get('/api/Patients'),
  getById: (id: number) => api.get(`/api/Patients/${id}`),
  create: (data: any) => api.post('/api/Patients', data),
  signup: (data: any) => api.post('/api/Patients/SignUp', data),
  login: (credentials: { email: string; password: string }) =>
    api.post('/api/Patients/Login', credentials),
  update: (id: number, data: any) => api.put(`/api/Patients/${id}`, data),
  delete: (id: number) => api.delete(`/api/Patients/${id}`),
  search: (query?: string) => api.get('/api/Patients', { params: { query } }),
  test: () => api.get('/api/Patients/Test'),
};

// Doctor API endpoints
export const doctorApi = {
  getAll: () => api.get('/api/Doctors'),
  getById: (id: number) => api.get(`/api/Doctors/${id}`),
  getBySpeciality: (speciality: string) => api.get(`/api/Doctors/speciality/${speciality}`),
  getAvailable: (date: string, startTime: string, endTime: string) =>
    api.get('/api/Doctors/available', { params: { date, startTime, endTime } }),
  create: (data: any) => api.post('/api/Doctors', data),
  update: (id: number, data: any) => api.put(`/api/Doctors/${id}`, data),
  delete: (id: number) => api.delete(`/api/Doctors/${id}`),
};

// Appointment API endpoints
export const appointmentApi = {
  getAll: () => api.get('/api/Appointments'),
  getById: (id: number) => api.get(`/api/Appointments/${id}`),
  getUpcoming: (days: number = 7) => api.get('/api/Appointments/upcoming', { params: { days } }),
  getToday: () => api.get('/api/Appointments/today'),
  create: (data: any) => api.post('/api/Appointments', data),
  update: (id: number, data: any) => api.put(`/api/Appointments/${id}`, data),
  cancel: (id: number) => api.delete(`/api/Appointments/${id}`),
  delete: (id: number) => api.delete(`/api/Appointments/${id}`),
};

// Assistant API endpoints
export const assistantApi = {
  getAll: () => api.get('/api/Assistants'),
  getById: (id: number) => api.get(`/api/Assistants/${id}`),
  create: (data: any) => api.post('/api/Assistants', data),
  update: (id: number, data: any) => api.put(`/api/Assistants/${id}`, data),
  delete: (id: number) => api.delete(`/api/Assistants/${id}`),
};

// Feedback API endpoints
export const feedbackApi = {
  getAll: () => api.get('/api/Feedbacks'),
  getById: (id: number) => api.get(`/api/Feedbacks/${id}`),
  create: (data: any) => api.post('/api/Feedbacks', data),
  update: (id: number, data: any) => api.put(`/api/Feedbacks/${id}`, data),
  delete: (id: number) => api.delete(`/api/Feedbacks/${id}`),
};

// Medical Report API endpoints
export const medicalReportApi = {
  getAll: () => api.get('/api/medicalreports'),
  getById: (id: number) => api.get(`/api/medicalreports/${id}`),
  create: (report: any) => api.post('/api/medicalreports', report),
  update: (id: number, report: any) => api.put(`/api/medicalreports/${id}`, report),
  delete: (id: number) => api.delete(`/api/medicalreports/${id}`),
};

// Medication API endpoints
export const medicationApi = {
  getAll: () => api.get('/api/medications'),
  getById: (id: number) => api.get(`/api/medications/${id}`),
  create: (medication: any) => api.post('/api/medications', medication),
  update: (id: number, medication: any) => api.put(`/api/medications/${id}`, medication),
  delete: (id: number) => api.delete(`/api/medications/${id}`),
};

// Payment API endpoints
export const paymentApi = {
  getAll: () => api.get('/api/payments'),
  getById: (id: number) => api.get(`/api/payments/${id}`),
  create: (payment: any) => api.post('/api/payments', payment),
  update: (id: number, payment: any) => api.put(`/api/payments/${id}`, payment),
  delete: (id: number) => api.delete(`/api/payments/${id}`),
};

// Prescription API endpoints
export const prescriptionApi = {
  getAll: () => api.get('/api/prescriptions'),
  getById: (id: number) => api.get(`/api/prescriptions/${id}`),
  create: (prescription: any) => api.post('/api/prescriptions', prescription),
  update: (id: number, prescription: any) => api.put(`/api/prescriptions/${id}`, prescription),
  delete: (id: number) => api.delete(`/api/prescriptions/${id}`),
};

// Treatment Report API endpoints
export const treatmentReportApi = {
  getAll: () => api.get('/api/treatmentreports'),
  getById: (id: number) => api.get(`/api/treatmentreports/${id}`),
  create: (report: any) => api.post('/api/treatmentreports', report),
  update: (id: number, report: any) => api.put(`/api/treatmentreports/${id}`, report),
  delete: (id: number) => api.delete(`/api/treatmentreports/${id}`),
};

export default api;
