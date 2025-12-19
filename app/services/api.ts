<<<<<<< HEAD
import apiClient from './apiClient';

// Doctor API endpoints
export const doctorApi = {
    getAll: () => apiClient.get('/doctors'),
    getById: (id: number) => apiClient.get(`/doctors/${id}`),
    getBySpeciality: (speciality: string) => apiClient.get(`/doctors/speciality/${speciality}`),
    getAvailable: (date: string, startTime: string, endTime: string) =>
        apiClient.get('/doctors/available', { params: { date, startTime, endTime } }),
};

// Patient API endpoints
export const patientApi = {
    search: (query?: string) => apiClient.get('/patients', { params: { query } }),
    getById: (id: number) => apiClient.get(`/patients/${id}`),
    register: (patient: any) => apiClient.post('/patients', patient),
};

// Appointment API endpoints
export const appointmentApi = {
    getUpcoming: (days: number = 7) => apiClient.get('/appointments', { params: { days } }),
    getToday: () => apiClient.get('/appointments/today'),
    create: (appointment: any) => apiClient.post('/appointments', appointment),
    update: (id: number, appointment: any) => apiClient.put(`/appointments/${id}`, appointment),
    cancel: (id: number) => apiClient.delete(`/appointments/${id}`),
};

// Assistant API endpoints
export const assistantApi = {
    getAll: () => apiClient.get('/assistants'),
    getById: (id: number) => apiClient.get(`/assistants/${id}`),
    create: (assistant: any) => apiClient.post('/assistants', assistant),
    update: (id: number, assistant: any) => apiClient.put(`/assistants/${id}`, assistant),
    delete: (id: number) => apiClient.delete(`/assistants/${id}`),
};

// Feedback API endpoints
export const feedbackApi = {
    getAll: () => apiClient.get('/feedbacks'),
    getById: (id: number) => apiClient.get(`/feedbacks/${id}`),
    create: (feedback: any) => apiClient.post('/feedbacks', feedback),
    update: (id: number, feedback: any) => apiClient.put(`/feedbacks/${id}`, feedback),
    delete: (id: number) => apiClient.delete(`/feedbacks/${id}`),
};

// Medical Report API endpoints
export const medicalReportApi = {
    getAll: () => apiClient.get('/medicalreports'),
    getById: (id: number) => apiClient.get(`/medicalreports/${id}`),
    create: (report: any) => apiClient.post('/medicalreports', report),
    update: (id: number, report: any) => apiClient.put(`/medicalreports/${id}`, report),
    delete: (id: number) => apiClient.delete(`/medicalreports/${id}`),
};

// Medication API endpoints
export const medicationApi = {
    getAll: () => apiClient.get('/medications'),
    getById: (id: number) => apiClient.get(`/medications/${id}`),
    create: (medication: any) => apiClient.post('/medications', medication),
    update: (id: number, medication: any) => apiClient.put(`/medications/${id}`, medication),
    delete: (id: number) => apiClient.delete(`/medications/${id}`),
};

// Payment API endpoints
export const paymentApi = {
    getAll: () => apiClient.get('/payments'),
    getById: (id: number) => apiClient.get(`/payments/${id}`),
    create: (payment: any) => apiClient.post('/payments', payment),
    update: (id: number, payment: any) => apiClient.put(`/payments/${id}`, payment),
    delete: (id: number) => apiClient.delete(`/payments/${id}`),
};

// Prescription API endpoints
export const prescriptionApi = {
    getAll: () => apiClient.get('/prescriptions'),
    getById: (id: number) => apiClient.get(`/prescriptions/${id}`),
    create: (prescription: any) => apiClient.post('/prescriptions', prescription),
    update: (id: number, prescription: any) => apiClient.put(`/prescriptions/${id}`, prescription),
    delete: (id: number) => apiClient.delete(`/prescriptions/${id}`),
};

// Treatment Report API endpoints
export const treatmentReportApi = {
    getAll: () => apiClient.get('/treatmentreports'),
    getById: (id: number) => apiClient.get(`/treatmentreports/${id}`),
    create: (report: any) => apiClient.post('/treatmentreports', report),
    update: (id: number, report: any) => apiClient.put(`/treatmentreports/${id}`, report),
    delete: (id: number) => apiClient.delete(`/treatmentreports/${id}`),
};

export default {
    doctor: doctorApi,
    patient: patientApi,
    appointment: appointmentApi,
    assistant: assistantApi,
    feedback: feedbackApi,
    medicalReport: medicalReportApi,
    medication: medicationApi,
    payment: paymentApi,
    prescription: prescriptionApi,
    treatmentReport: treatmentReportApi,
};
=======
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
      console.log('📦 Response data:', response.data);
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
    // Test basic connection
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

// Patients API
export const patientApi = {
  // Get all patients
  getAll: () => api.get('/api/Patients'),
  
  // Get patient by ID
  getById: (id: number) => api.get(`/api/Patients/${id}`),
  
  // Create new patient (signup)
  create: (data: any) => api.post('/api/Patients', data),
  
  // Signup endpoint
  signup: (data: any) => api.post('/api/Patients/SignUp', data),
  
  // Login endpoint
  login: (credentials: { email: string; password: string }) => 
    api.post('/api/Patients/Login', credentials),
  
  // Update patient
  update: (id: number, data: any) => api.put(`/api/Patients/${id}`, data),
  
  // Delete patient
  delete: (id: number) => api.delete(`/api/Patients/${id}`),
  
  // Test endpoint
  test: () => api.get('/api/Patients/Test'),
};

// Other APIs (keep as you had them)
export const doctorApi = {
  getAll: () => api.get('/api/Doctors'),
  getById: (id: number) => api.get(`/api/Doctors/${id}`),
  create: (data: any) => api.post('/api/Doctors', data),
  update: (id: number, data: any) => api.put(`/api/Doctors/${id}`, data),
  delete: (id: number) => api.delete(`/api/Doctors/${id}`),
};

export const appointmentApi = {
  getAll: () => api.get('/api/Appointments'),
  getById: (id: number) => api.get(`/api/Appointments/${id}`),
  create: (data: any) => api.post('/api/Appointments', data),
  update: (id: number, data: any) => api.put(`/api/Appointments/${id}`, data),
  delete: (id: number) => api.delete(`/api/Appointments/${id}`),
};

export const assistantApi = {
  getAll: () => api.get('/api/Assistants'),
  getById: (id: number) => api.get(`/api/Assistants/${id}`),
  create: (data: any) => api.post('/api/Assistants', data),
  update: (id: number, data: any) => api.put(`/api/Assistants/${id}`, data),
  delete: (id: number) => api.delete(`/api/Assistants/${id}`),
};

export default api;
>>>>>>> origin/main
