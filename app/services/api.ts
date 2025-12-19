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
