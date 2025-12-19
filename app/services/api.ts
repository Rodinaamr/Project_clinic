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