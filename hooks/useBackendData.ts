import {
    appointmentApi,
    assistantApi,
    doctorApi,
    feedbackApi,
    medicalReportApi,
    medicationApi,
    patientApi,
    paymentApi,
    prescriptionApi,
    treatmentReportApi
} from '@/app/services/api';
import { useCallback, useEffect, useState } from 'react';

// Generic hook for fetching data with loading and error states
export function useBackendData<T>(
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
    return useBackendData(() => appointmentApi.getUpcoming(days), [days]);
}

export function useTodayAppointments() {
    return useBackendData(() => appointmentApi.getToday(), []);
}

export async function createAppointment(appointmentData: any) {
    try {
        const response = await appointmentApi.create(appointmentData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function updateAppointment(id: number, appointmentData: any) {
    try {
        const response = await appointmentApi.update(id, appointmentData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

export async function cancelAppointment(id: number) {
    try {
        await appointmentApi.cancel(id);
        return { success: true };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Doctors
export function useDoctors() {
    return useBackendData(() => doctorApi.getAll(), []);
}

export function useDoctor(id: number) {
    return useBackendData(() => doctorApi.getById(id), [id]);
}

export function useDoctorsBySpeciality(speciality: string) {
    return useBackendData(() => doctorApi.getBySpeciality(speciality), [speciality]);
}

export function useAvailableDoctors(date: string, startTime: string, endTime: string) {
    return useBackendData(
        () => doctorApi.getAvailable(date, startTime, endTime),
        [date, startTime, endTime]
    );
}

// Patients
export function usePatients(searchQuery?: string) {
    return useBackendData(() => patientApi.search(searchQuery), [searchQuery]);
}

export function usePatient(id: number) {
    return useBackendData(() => patientApi.getById(id), [id]);
}

export async function registerPatient(patientData: any) {
    try {
        const response = await patientApi.signup(patientData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Assistants
export function useAssistants() {
    return useBackendData(() => assistantApi.getAll(), []);
}

export function useAssistant(id: number) {
    return useBackendData(() => assistantApi.getById(id), [id]);
}

export async function createAssistant(assistantData: any) {
    try {
        const response = await assistantApi.create(assistantData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Feedback
export function useFeedback() {
    return useBackendData(() => feedbackApi.getAll(), []);
}

export async function createFeedback(feedbackData: any) {
    try {
        const response = await feedbackApi.create(feedbackData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Medical Reports
export function useMedicalReports() {
    return useBackendData(() => medicalReportApi.getAll(), []);
}

export function useMedicalReport(id: number) {
    return useBackendData(() => medicalReportApi.getById(id), [id]);
}

export async function createMedicalReport(reportData: any) {
    try {
        const response = await medicalReportApi.create(reportData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Medications
export function useMedications() {
    return useBackendData(() => medicationApi.getAll(), []);
}

export async function createMedication(medicationData: any) {
    try {
        const response = await medicationApi.create(medicationData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Payments
export function usePayments() {
    return useBackendData(() => paymentApi.getAll(), []);
}

export async function createPayment(paymentData: any) {
    try {
        const response = await paymentApi.create(paymentData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Prescriptions
export function usePrescriptions() {
    return useBackendData(() => prescriptionApi.getAll(), []);
}

export async function createPrescription(prescriptionData: any) {
    try {
        const response = await prescriptionApi.create(prescriptionData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}

// Treatment Reports
export function useTreatmentReports() {
    return useBackendData(() => treatmentReportApi.getAll(), []);
}

export async function createTreatmentReport(reportData: any) {
    try {
        const response = await treatmentReportApi.create(reportData);
        return { success: true, data: response.data };
    } catch (error: any) {
        return { success: false, error: error.message };
    }
}
