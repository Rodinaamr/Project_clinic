import api from '@/app/services/api';
import { useCallback, useEffect, useState } from 'react';

// Generic hook for fetching data with loading and error states
function useBackendData<T>(
    fetchFunction: () => Promise<{ data: T }>,
    dependencies: any[] = []
) {
    const [data, setData] = useState<T | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const refetch = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await fetchFunction();
            setData(response.data);
        } catch (err: any) {
            setError(err.message || 'Failed to fetch data');
            console.error('Backend fetch error:', err);
        } finally {
            setLoading(false);
        }
    }, dependencies);

    useEffect(() => {
        refetch();
    }, [refetch]);

    return { data, loading, error, refetch };
}

// Appointments
export function useAppointments(days: number = 7) {
    return useBackendData(() => api.appointment.getUpcoming(days), [days]);
}

export function useTodayAppointments() {
    return useBackendData(() => api.appointment.getToday(), []);
}

export async function createAppointment(appointmentData: any) {
    try {
        const response = await api.appointment.create(appointmentData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateAppointment(id: number, appointmentData: any) {
    try {
        const response = await api.appointment.update(id, appointmentData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function cancelAppointment(id: number) {
    try {
        await api.appointment.cancel(id);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Doctors
export function useDoctors() {
    return useBackendData(() => api.doctor.getAll(), []);
}

export function useDoctor(id: number) {
    return useBackendData(() => api.doctor.getById(id), [id]);
}

export function useDoctorsBySpeciality(speciality: string) {
    return useBackendData(() => api.doctor.getBySpeciality(speciality), [speciality]);
}

export function useAvailableDoctors(date: string, startTime: string, endTime: string) {
    return useBackendData(
        () => api.doctor.getAvailable(date, startTime, endTime),
        [date, startTime, endTime]
    );
}

// Patients
export function usePatients(searchQuery?: string) {
    return useBackendData(() => api.patient.search(searchQuery), [searchQuery]);
}

export function usePatient(id: number) {
    return useBackendData(() => api.patient.getById(id), [id]);
}

export async function registerPatient(patientData: any) {
    try {
        const response = await api.patient.register(patientData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Assistants
export function useAssistants() {
    return useBackendData(() => api.assistant.getAll(), []);
}

export function useAssistant(id: number) {
    return useBackendData(() => api.assistant.getById(id), [id]);
}

export async function createAssistant(assistantData: any) {
    try {
        const response = await api.assistant.create(assistantData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Feedback
export function useFeedback() {
    return useBackendData(() => api.feedback.getAll(), []);
}

export async function createFeedback(feedbackData: any) {
    try {
        const response = await api.feedback.create(feedbackData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Medical Reports
export function useMedicalReports() {
    return useBackendData(() => api.medicalReport.getAll(), []);
}

export function useMedicalReport(id: number) {
    return useBackendData(() => api.medicalReport.getById(id), [id]);
}

export async function createMedicalReport(reportData: any) {
    try {
        const response = await api.medicalReport.create(reportData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Medications
export function useMedications() {
    return useBackendData(() => api.medication.getAll(), []);
}

export async function createMedication(medicationData: any) {
    try {
        const response = await api.medication.create(medicationData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Payments
export function usePayments() {
    return useBackendData(() => api.payment.getAll(), []);
}

export async function createPayment(paymentData: any) {
    try {
        const response = await api.payment.create(paymentData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Prescriptions
export function usePrescriptions() {
    return useBackendData(() => api.prescription.getAll(), []);
}

export async function createPrescription(prescriptionData: any) {
    try {
        const response = await api.prescription.create(prescriptionData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Treatment Reports
export function useTreatmentReports() {
    return useBackendData(() => api.treatmentReport.getAll(), []);
}

export async function createTreatmentReport(reportData: any) {
    try {
        const response = await api.treatmentReport.create(reportData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
