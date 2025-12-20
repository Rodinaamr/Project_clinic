# Complete System Integration - Implementation Plan

## Goal
Replace ALL mock data with real backend API calls across the entire application.

## Backend Status
✅ **Backend is 100% complete and functional**
- API running on `http://localhost:5148`
- All endpoints tested via Swagger
- Database configured and migrations applied

## Integration Approach

Due to the complexity of updating all screens simultaneously, here's the recommended approach:

### Phase 1: Core Data Hooks (✅ COMPLETE)
- ✅ Created `hooks/useBackendData.ts` with all necessary hooks
- ✅ Created `app/services/api.ts` with all API endpoints
- ✅ Created `app/services/apiClient.ts` for HTTP communication

### Phase 2: Update Screens (IN PROGRESS)

#### **Critical Note on Data Structure Differences:**

The backend uses different property names than mock data:

**Mock Data:**
```typescript
{
  id: 'apt-1',
  date: '2024-12-08',
  time: '10:00',
  patientName: 'John Doe',
  doctorName: 'Dr. Smith',
  status: 'reserved'
}
```

**Backend Data:**
```typescript
{
  id: 1,  // number, not string
  appointmentDate: '2024-12-08T10:00:00',  // DateTime, not separate date/time
  duration: 30,  // in minutes
  patient: { firstName: 'John', lastName: 'Doe' },  // nested object
  doctor: { firstName: 'Dr.', lastName: 'Smith' },  // nested object
  status: 'Scheduled'  // different status values
}
```

### Required Changes for Each Screen:

#### 1. **Import Changes**
```typescript
// REMOVE:
import { MOCK_APPOINTMENTS, MOCK_REPORTS, etc. } from '@/constants/mockData';

// ADD:
import { useAppointments, useMedicalReports, etc. } from '@/hooks/useBackendData';
import { ActivityIndicator } from 'react-native';
```

#### 2. **Data Fetching**
```typescript
// REMOVE:
const appointments = MOCK_APPOINTMENTS;

// ADD:
const { data: appointments, loading, error, refetch } = useAppointments();

// ADD Loading State:
if (loading) return (
  <View style={styles.loadingContainer}>
    <ActivityIndicator size="large" color={Colors.primary} />
    <Text>Loading...</Text>
  </View>
);

// ADD Error State:
if (error) return (
  <View style={styles.errorContainer}>
    <Text style={styles.errorText}>Error: {error}</Text>
    <Button title="Retry" onPress={refetch} />
  </View>
);
```

#### 3. **Data Access Updates**
```typescript
// REMOVE:
apt.date
apt.time
apt.patientName
apt.status === 'reserved'

// REPLACE WITH:
new Date(apt.appointmentDate).toLocaleDateString()
new Date(apt.appointmentDate).toLocaleTimeString()
`${apt.patient?.firstName} ${apt.patient?.lastName}`
apt.status === 'Scheduled'
```

#### 4. **Create/Update Operations**
```typescript
// REMOVE:
MOCK_APPOINTMENTS.push(newAppointment);

// REPLACE WITH:
const result = await createAppointment({
  patientId: selectedPatient.id,
  doctorId: selectedDoctor.id,
  appointmentDate: new Date(selectedDate + 'T' + selectedTime).toISOString(),
  duration: 30,
  status: 'Scheduled',
  notes: notes
});

if (result.success) {
  refetch(); // Reload the list
  // Show success message
} else {
  // Show error message
}
```

## Screen-by-Screen Update Checklist

### Doctor Screens
- [ ] `app/doctor/dashboard.tsx`
  - Replace `MOCK_APPOINTMENTS` with `useTodayAppointments()`
  - Update appointment display logic
  - Add loading/error states
  
- [ ] `app/doctor/appointments.tsx`
  - Replace `MOCK_APPOINTMENTS` with `useAppointments()`
  - Update filtering logic
  - Add loading/error states

- [ ] `app/doctor/patient-medical-history.tsx`
  - Replace `MOCK_REPORTS` with `useMedicalReports()`
  - Update report display
  - Add loading/error states

- [ ] `app/doctor/patient-feedback.tsx`
  - Replace `MOCK_FEEDBACK` with `useFeedback()`
  - Update feedback display
  - Add loading/error states

### Patient Screens
- [ ] `app/patient/dashboard.tsx`
  - Replace `MOCK_APPOINTMENTS` with `useTodayAppointments()`
  - Update appointment display
  - Add loading/error states

- [ ] `app/patient/book-appointment.tsx`
  - Use `useDoctors()` to fetch doctors
  - Use `createAppointment()` to book
  - Add form validation
  - Add success/error handling

- [ ] `app/patient/reports.tsx`
  - Replace `MOCK_REPORTS` with `useMedicalReports()`
  - Update report display
  - Add loading/error states

- [ ] `app/patient/payments.tsx`
  - Replace `MOCK_PAYMENTS` with `usePayments()`
  - Update payment display
  - Add loading/error states

### Assistant Screens
- [ ] `app/assistant/dashboard.tsx`
  - Replace `MOCK_APPOINTMENTS` with `useTodayAppointments()`
  - Replace `MOCK_PAYMENTS` with `usePayments()`
  - Update displays
  - Add loading/error states

- [ ] `app/assistant/appointments.tsx`
  - Replace `MOCK_APPOINTMENTS` with `useAppointments()`
  - Add appointment management
  - Add loading/error states

- [ ] `app/assistant/walk-in-booking.tsx`
  - Use `usePatients()` for patient search
  - Use `useDoctors()` for doctor selection
  - Use `createAppointment()` to book
  - Add form validation

- [ ] `app/assistant/reports.tsx`
  - Replace `MOCK_REPORTS` with `useMedicalReports()`
  - Update report display
  - Add loading/error states

- [ ] `app/assistant/payments.tsx`
  - Replace `MOCK_PAYMENTS` with `usePayments()`
  - Use `createPayment()` for new payments
  - Add loading/error states

## Testing Checklist

After each screen update:
1. ✅ Backend is running (`start-backend.bat`)
2. ✅ Screen loads without errors
3. ✅ Loading state appears briefly
4. ✅ Data displays correctly
5. ✅ Create/Update operations work
6. ✅ Error handling works (test by stopping backend)

## Common Issues & Solutions

### Issue: "Cannot read property 'map' of undefined"
**Solution:** Add null checks:
```typescript
{appointments?.map(apt => ...)}
// or
{(appointments || []).map(apt => ...)}
```

### Issue: "Date is invalid"
**Solution:** Parse dates correctly:
```typescript
const date = new Date(apt.appointmentDate);
const dateStr = date.toLocaleDateString();
const timeStr = date.toLocaleTimeString();
```

### Issue: "Property 'patientName' does not exist"
**Solution:** Access nested properties:
```typescript
const patientName = `${apt.patient?.firstName || ''} ${apt.patient?.lastName || ''}`;
```

## Next Steps

1. **Start Backend:** `.\start-backend.bat`
2. **Verify:** Open `http://localhost:5148/swagger`
3. **Update Screens:** Follow this plan systematically
4. **Test:** After each screen update
5. **Iterate:** Fix any issues that arise

## Support Files Created

- `hooks/useBackendData.ts` - All data hooks
- `app/services/api.ts` - All API endpoints  
- `app/services/apiClient.ts` - HTTP client
- `COMPLETE_BACKEND_INTEGRATION.md` - Detailed guide
- `BACKEND_STATUS.md` - Current status

---

**The backend is ready. Now we systematically update each screen to use it.**
