import axios from 'axios';

// Base API configuration
// Ensure you have axios installed: npm install axios
const api = axios.create({
  baseURL: 'https://localhost:7078/api', // Check your launchSettings.json for the correct port
  headers: {
    'Content-Type': 'application/json',
  },
});

// Optional: Add interceptors for handling tokens if you implement JWT later
// api.interceptors.request.use((config) => {
//     const token = localStorage.getItem('token');
//     if (token) {
//         config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
// });

export default api;
