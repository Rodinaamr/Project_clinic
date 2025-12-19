# Complete Backend Integration Guide

This guide shows you how to replace **ALL** mock data across the entire system (Doctor, Patient, Assistant) with real backend API calls.

---

## 🎯 **Quick Reference**

### **Instead of Mock Data:**
```typescript
import { MOCK_APPOINTMENTS } from '@/constants/mockData';
const appointments = MOCK_APPOINTMENTS;
```

### **Use Real Backend:**
```typescript
import { useAppointments } from '@/hooks/useBackendData';
const { data: appointments, loading, error } = useAppointments();
```

---

## 📋 **All Available Hooks**

### **Appointments**
```typescript
import { 
  useAppointments,           // Get upcoming appointments
  useTodayAppointments,      // Get today's appointments
  createAppointment,         // Create new appointment
  updateAppointment,         // Update appointment
  cancelAppointment          // Cancel appointment
} from '@/hooks/useBackendData';

// Usage:
const { data, loading, error, refetch } = useAppointments(7); // 7 days
const { data: todayApts } = useTodayAppointments();

// Create:
const result = await createAppointment({
  patientId: 1,
  doctorId: 2,
  appointmentDate: '2024-12-08T10:00:00',
  duration: 30,
  status: 'Scheduled'
});
```

### **Doctors**
```typescript
import { 
  useDoctors,                // Get all doctors
  useDoctor,                 // Get single doctor
  useDoctorsBySpeciality,    // Filter by speciality
  useAvailableDoctors        // Check availability
} from '@/hooks/useBackendData';

const { data: doctors } = useDoctors();
const { data: doctor } = useDoctor(1);
const { data: dermDoctors } = useDoctorsBySpeciality('Dermatology');
```

### **Patients**
```typescript
import { 
  usePatients,               // Search patients
  usePatient,                // Get single patient
  registerPatient            // Register new patient
} from '@/hooks/useBackendData';

const { data: patients } = usePatients('John');
const { data: patient } = usePatient(1);
const result = await registerPatient({ firstName: 'John', ... });
```

### **Assistants**
```typescript
import { 
  useAssistants,
  useAssistant,
  createAssistant
} from '@/hooks/useBackendData';
```

### **Medical Reports**
```typescript
import { 
  useMedicalReports,
  useMedicalReport,
  createMedicalReport
} from '@/hooks/useBackendData';
```

### **Payments**
```typescript
import { 
  usePayments,
  createPayment
} from '@/hooks/useBackendData';
```

### **Feedback**
```typescript
import { 
  useFeedback,
  createFeedback
} from '@/hooks/useBackendData';
```

### **Medications**
```typescript
import { 
  useMedications,
  createMedication
} from '@/hooks/useBackendData';
```

### **Prescriptions**
```typescript
import { 
  usePrescriptions,
  createPrescription
} from '@/hooks/useBackendData';
```

### **Treatment Reports**
```typescript
import { 
  useTreatmentReports,
  createTreatmentReport
} from '@/hooks/useBackendData';
```

---

## 🔄 **Migration Examples**

### **Example 1: Doctor Dashboard**

**Before (Mock):**
```typescript
import { MOCK_APPOINTMENTS } from '@/constants/mockData';

export default function DoctorDashboard() {
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = MOCK_APPOINTMENTS.filter(
    apt => apt.date === today && apt.status === 'reserved'
  );
  
  return <View>{/* render appointments */}</View>;
}
```

**After (Real Backend):**
```typescript
import { useTodayAppointments } from '@/hooks/useBackendData';

export default function DoctorDashboard() {
  const { data: appointments, loading, error } = useTodayAppointments();
  
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  
  const todayAppointments = appointments?.filter(
    apt => apt.status === 'Scheduled'
  ) || [];
  
  return <View>{/* render appointments */}</View>;
}
```

---

### **Example 2: Patient Reports**

**Before (Mock):**
```typescript
import { MOCK_REPORTS } from '@/constants/mockData';

export default function PatientReports() {
  const reports = MOCK_REPORTS;
  return <View>{/* render reports */}</View>;
}
```

**After (Real Backend):**
```typescript
import { useMedicalReports } from '@/hooks/useBackendData';

export default function PatientReports() {
  const { data: reports, loading, error, refetch } = useMedicalReports();
  
  if (loading) return <ActivityIndicator />;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <View>
      <Button title="Refresh" onPress={refetch} />
      {/* render reports */}
    </View>
  );
}
```

---

### **Example 3: Book Appointment**

**Before (Mock):**
```typescript
import { MOCK_APPOINTMENTS } from '@/constants/mockData';

const handleBooking = () => {
  MOCK_APPOINTMENTS.push(newAppointment);
  // Navigate away
};
```

**After (Real Backend):**
```typescript
import { createAppointment } from '@/hooks/useBackendData';

const handleBooking = async () => {
  const result = await createAppointment({
    patientId: user.id,
    doctorId: selectedDoctor.id,
    appointmentDate: selectedDate,
    duration: 30,
    status: 'Scheduled'
  });
  
  if (result.success) {
    alert('Appointment booked!');
    router.back();
  } else {
    alert('Error: ' + result.error);
  }
};
```

---

## 📁 **Files to Update**

### **Doctor Screens:**
- ✅ `app/doctor/dashboard.tsx` - Use `useTodayAppointments()`
- ✅ `app/doctor/appointments.tsx` - Use `useAppointments()`
- ✅ `app/doctor/patient-medical-history.tsx` - Use `useMedicalReports()`
- ✅ `app/doctor/patient-feedback.tsx` - Use `useFeedback()`

### **Patient Screens:**
- ✅ `app/patient/dashboard.tsx` - Use `useTodayAppointments()`
- ✅ `app/patient/book-appointment.tsx` - Use `createAppointment()`
- ✅ `app/patient/reports.tsx` - Use `useMedicalReports()`
- ✅ `app/patient/payments.tsx` - Use `usePayments()`

### **Assistant Screens:**
- ✅ `app/assistant/dashboard.tsx` - Use `useTodayAppointments()`, `usePayments()`
- ✅ `app/assistant/appointments.tsx` - Use `useAppointments()`
- ✅ `app/assistant/walk-in-booking.tsx` - Use `createAppointment()`
- ✅ `app/assistant/reports.tsx` - Use `useMedicalReports()`
- ✅ `app/assistant/payments.tsx` - Use `usePayments()`

---

## ⚠️ **Important Notes**

### **1. Backend Must Be Running**
Make sure `start-backend.bat` is running before using the app.

### **2. Data Structure Differences**
The backend data structure might differ slightly from mock data:
- Mock: `apt.date` (string)
- Backend: `apt.appointmentDate` (DateTime)

You may need to adjust property names when migrating.

### **3. Loading States**
Always handle loading and error states:
```typescript
if (loading) return <ActivityIndicator />;
if (error) return <Text>Error: {error}</Text>;
if (!data) return <Text>No data</Text>;
```

### **4. Refetch Data**
Use the `refetch()` function to reload data after creating/updating:
```typescript
const { data, refetch } = useAppointments();

const handleCreate = async () => {
  await createAppointment(newData);
  refetch(); // Reload the list
};
```

---

## 🚀 **Next Steps**

1. **Start Backend**: Run `start-backend.bat`
2. **Test API**: Open `http://localhost:5148/swagger`
3. **Update Screens**: Replace mock data imports with hooks
4. **Test Each Screen**: Verify data loads correctly

---

## 💡 **Need Help?**

All hooks are ready in `hooks/useBackendData.ts`. Just import and use them!

The backend is **fully functional** - it just needs to be connected to your screens.
