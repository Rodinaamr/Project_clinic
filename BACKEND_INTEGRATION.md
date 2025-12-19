# Switching from Mock Data to Real Backend

Your app is currently using **mock data** from `constants/mockData.ts`. To use the **real backend**, you need to replace the mock data imports with API calls.

## Quick Guide

### **Current State (Mock Data)**
```typescript
import { MOCK_APPOINTMENTS } from '@/constants/mockData';

// Using mock data directly
const appointments = MOCK_APPOINTMENTS;
```

### **New State (Real Backend)**
```typescript
import { useAppointments } from '@/hooks/useBackendData';

// Fetch from backend
const { appointments, loading, error } = useAppointments();
```

---

## Files Using Mock Data

These files need to be updated to use the backend:

### **Appointments:**
- `app/doctor/appointments.tsx`
- `app/doctor/dashboard.tsx`
- `app/patient/dashboard.tsx`
- `app/assistant/appointments.tsx`
- `app/assistant/dashboard.tsx`

### **Reports:**
- `app/patient/reports.tsx`
- `app/assistant/reports.tsx`
- `app/doctor/patient-medical-history.tsx`

### **Payments:**
- `app/patient/payments.tsx`
- `app/assistant/payments.tsx`

### **Feedback:**
- `app/doctor/patient-feedback.tsx`

---

## Example: Update Doctor Dashboard

### **Before (Mock Data):**
```typescript
import { MOCK_APPOINTMENTS } from '@/constants/mockData';

export default function DoctorDashboard() {
  const appointments = MOCK_APPOINTMENTS;
  
  return (
    <View>
      {appointments.map(apt => ...)}
    </View>
  );
}
```

### **After (Real Backend):**
```typescript
import { useAppointments } from '@/hooks/useBackendData';

export default function DoctorDashboard() {
  const { appointments, loading, error } = useAppointments();
  
  if (loading) return <Text>Loading...</Text>;
  if (error) return <Text>Error: {error}</Text>;
  
  return (
    <View>
      {appointments.map(apt => ...)}
    </View>
  );
}
```

---

## Next Steps

1. **Make sure backend is running** - Run `start-backend.bat`
2. **Test the API** - Open `http://localhost:5148/swagger` to verify backend is working
3. **Update one file at a time** - Start with `app/doctor/dashboard.tsx`
4. **Use the hooks** - Import from `@/hooks/useBackendData`

---

## Need Help?

I can help you update specific files to use the real backend. Just let me know which screen you want to connect first!

The backend is **ready and working** - it just needs to be connected to your frontend screens.
