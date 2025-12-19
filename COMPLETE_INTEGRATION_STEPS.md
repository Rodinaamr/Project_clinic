# COMPLETE BACKEND INTEGRATION - ALL REMAINING SCREENS

## FILE 4: app/doctor/appointments.tsx

### Change 1: Update imports (Line 2)
**FIND:**
```typescript
import { MOCK_APPOINTMENTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { useAppointments } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator import
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Replace mock data with backend hook
**FIND:**
```typescript
  const [appointments] = useState(MOCK_APPOINTMENTS);
```

**REPLACE WITH:**
```typescript
  const { data: appointmentsData, loading, error } = useAppointments();
  const appointments = appointmentsData || [];
```

### Change 4: Add loading/error states (before return)
**ADD BEFORE RETURN:**
```typescript
  if (loading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color={Colors.primary} />
      </View>
    );
  }

  if (error) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <Text style={{ color: Colors.status.error }}>Error: {error}</Text>
      </View>
    );
  }
```

---

## FILE 5: app/doctor/patient-medical-history.tsx

### Change 1: Update imports
**FIND:**
```typescript
import { MOCK_APPOINTMENTS, MOCK_REPORTS, Report } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { useMedicalReports } from '@/hooks/useBackendData';
import { Report } from '@/constants/mockData';
```

### Change 2: Add ActivityIndicator import
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Replace mock data
**FIND:**
```typescript
  const [reports] = useState(MOCK_REPORTS);
```

**REPLACE WITH:**
```typescript
  const { data: reportsData, loading, error } = useMedicalReports();
  const reports = reportsData || [];
```

### Change 4: Add loading/error states (before return)
**ADD:**
```typescript
  if (loading) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><ActivityIndicator size="large" color={Colors.primary} /></View>;
  if (error) return <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}><Text>Error: {error}</Text></View>;
```

---

## FILE 6: app/doctor/patient-feedback.tsx

### Change 1: Update imports (Line 7)
**FIND:**
```typescript
import { MOCK_FEEDBACK } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { useFeedback } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator import
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Replace mock data
**FIND:**
```typescript
  const [feedbacks] = useState(MOCK_FEEDBACK);
```

**REPLACE WITH:**
```typescript
  const { data: feedbackData, loading, error } = useFeedback();
  const feedbacks = feedbackData || [];
```

### Change 4: Add loading/error states
**ADD BEFORE RETURN:**
```typescript
  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Error: {error}</Text></View>;
```

---

## FILE 7: app/patient/book-appointment.tsx

### Change 1: Update imports (Line 2)
**FIND:**
```typescript
import { SPECIALTIES, Specialty, TIME_SLOTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { SPECIALTIES, Specialty, TIME_SLOTS } from '@/constants/mockData';
import { useDoctors, createAppointment } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator import
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Add backend data fetching
**ADD AFTER STATE DECLARATIONS:**
```typescript
  const { data: doctors, loading: doctorsLoading } = useDoctors();
```

### Change 4: Update booking function
**FIND:**
```typescript
  const handleBookAppointment = () => {
    // Here you would typically make an API call
    alert('Appointment booked successfully!');
    router.back();
  };
```

**REPLACE WITH:**
```typescript
  const handleBookAppointment = async () => {
    if (!selectedDoctor || !selectedDate || !selectedTime) {
      alert('Please fill all fields');
      return;
    }

    const result = await createAppointment({
      doctorId: selectedDoctor.id,
      appointmentDate: new Date(selectedDate + 'T' + selectedTime).toISOString(),
      duration: 30,
      status: 'Scheduled',
      notes: ''
    });

    if (result.success) {
      alert('Appointment booked successfully!');
      router.back();
    } else {
      alert('Error: ' + result.error);
    }
  };
```

---

## FILE 8: app/patient/reports.tsx

### Change 1: Update imports (Line 2)
**FIND:**
```typescript
import { MOCK_REPORTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { useMedicalReports } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Replace mock data
**FIND:**
```typescript
  const [reports] = useState(MOCK_REPORTS);
```

**REPLACE WITH:**
```typescript
  const { data: reportsData, loading, error } = useMedicalReports();
  const reports = reportsData || [];
```

### Change 4: Add loading/error states
**ADD BEFORE RETURN:**
```typescript
  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Error: {error}</Text></View>;
```

---

## FILE 9: app/patient/payments.tsx

### Change 1: Update imports (Line 2)
**FIND:**
```typescript
import { MOCK_PAYMENTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { usePayments } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Replace mock data
**FIND:**
```typescript
  const [payments] = useState(MOCK_PAYMENTS);
```

**REPLACE WITH:**
```typescript
  const { data: paymentsData, loading, error } = usePayments();
  const payments = paymentsData || [];
```

### Change 4: Add loading/error states
**ADD BEFORE RETURN:**
```typescript
  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Error: {error}</Text></View>;
```

---

## FILE 10: app/assistant/appointments.tsx

### Change 1: Update imports (Line 7)
**FIND:**
```typescript
import { MOCK_APPOINTMENTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { useAppointments } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Replace mock data
**FIND:**
```typescript
  const [appointments] = useState(MOCK_APPOINTMENTS);
```

**REPLACE WITH:**
```typescript
  const { data: appointmentsData, loading, error } = useAppointments();
  const appointments = appointmentsData || [];
```

### Change 4: Add loading/error states
**ADD BEFORE RETURN:**
```typescript
  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Error: {error}</Text></View>;
```

---

## FILE 11: app/assistant/walk-in-booking.tsx

### Change 1: Update imports (Line 2)
**FIND:**
```typescript
import { SPECIALTIES, Specialty, TIME_SLOTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { SPECIALTIES, Specialty, TIME_SLOTS } from '@/constants/mockData';
import { useDoctors, usePatients, createAppointment } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Add backend data fetching
**ADD AFTER STATE DECLARATIONS:**
```typescript
  const { data: doctors, loading: doctorsLoading } = useDoctors();
  const { data: patients, loading: patientsLoading } = usePatients();
```

### Change 4: Update booking function
**FIND:**
```typescript
  const handleBooking = () => {
    alert('Walk-in appointment booked!');
    router.back();
  };
```

**REPLACE WITH:**
```typescript
  const handleBooking = async () => {
    if (!selectedPatient || !selectedDoctor || !selectedDate || !selectedTime) {
      alert('Please fill all fields');
      return;
    }

    const result = await createAppointment({
      patientId: selectedPatient.id,
      doctorId: selectedDoctor.id,
      appointmentDate: new Date(selectedDate + 'T' + selectedTime).toISOString(),
      duration: 30,
      status: 'Scheduled',
      notes: 'Walk-in'
    });

    if (result.success) {
      alert('Walk-in appointment booked!');
      router.back();
    } else {
      alert('Error: ' + result.error);
    }
  };
```

---

## FILE 12: app/assistant/reports.tsx

### Change 1: Update imports (Line 7)
**FIND:**
```typescript
import { MOCK_REPORTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { useMedicalReports } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Replace mock data
**FIND:**
```typescript
  const [reports] = useState(MOCK_REPORTS);
```

**REPLACE WITH:**
```typescript
  const { data: reportsData, loading, error } = useMedicalReports();
  const reports = reportsData || [];
```

### Change 4: Add loading/error states
**ADD BEFORE RETURN:**
```typescript
  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Error: {error}</Text></View>;
```

---

## FILE 13: app/assistant/payments.tsx

### Change 1: Update imports (Line 7)
**FIND:**
```typescript
import { MOCK_PAYMENTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { usePayments, createPayment } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator
**FIND:**
```typescript
    View,
} from 'react-native';
```

**REPLACE WITH:**
```typescript
    View,
    ActivityIndicator,
} from 'react-native';
```

### Change 3: Replace mock data
**FIND:**
```typescript
  const [payments] = useState(MOCK_PAYMENTS);
```

**REPLACE WITH:**
```typescript
  const { data: paymentsData, loading, error, refetch } = usePayments();
  const payments = paymentsData || [];
```

### Change 4: Add loading/error states
**ADD BEFORE RETURN:**
```typescript
  if (loading) return <View style={{ flex: 1, justifyContent: 'center' }}><ActivityIndicator size="large" /></View>;
  if (error) return <View style={{ flex: 1, justifyContent: 'center' }}><Text>Error: {error}</Text></View>;
```

### Change 5: Update payment creation (if exists)
**IF THERE'S A handlePayment FUNCTION, UPDATE IT:**
```typescript
  const handlePayment = async (paymentData: any) => {
    const result = await createPayment(paymentData);
    if (result.success) {
      refetch(); // Reload payments
      alert('Payment recorded!');
    } else {
      alert('Error: ' + result.error);
    }
  };
```

---

## SUMMARY

**Total Files Updated: 13**
- ✅ 3 Dashboards (Doctor, Patient, Assistant)
- ✅ 4 Doctor screens
- ✅ 4 Patient screens  
- ✅ 5 Assistant screens

**Pattern for ALL screens:**
1. Replace mock data import with backend hook
2. Add ActivityIndicator import
3. Use hook to fetch data
4. Add loading/error states
5. Update any create/update functions to use backend

**After completing these changes:**
1. Start backend: `.\start-backend.bat`
2. Start frontend: `npm start`
3. Test each screen

**Your system will be fully integrated with real backend data!**
