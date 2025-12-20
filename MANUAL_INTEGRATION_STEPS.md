# EXACT CODE CHANGES FOR BACKEND INTEGRATION

## FILE 1: app/doctor/dashboard.tsx

### Change 1: Update imports (Line 6)
**FIND:**
```typescript
import { MOCK_APPOINTMENTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { useTodayAppointments } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator import (Line 36)
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

### Change 3: Add backend data fetching (After line 45, before fadeAnim)
**FIND:**
```typescript
  const { width: screenWidth } = Dimensions.get('window');

  const fadeAnim = useRef(new Animated.Value(0)).current;
```

**REPLACE WITH:**
```typescript
  const { width: screenWidth } = Dimensions.get('window');

  // Fetch real data from backend
  const { data: appointmentsData, loading, error } = useTodayAppointments();

  const fadeAnim = useRef(new Animated.Value(0)).current;
```

### Change 4: Update data processing (Lines 136-142)
**FIND:**
```typescript
  const today = new Date().toISOString().split('T')[0];
  const todayAppointments = MOCK_APPOINTMENTS.filter(
    apt => apt.date === today && apt.status === 'reserved'
  );
  const emergencyCases = MOCK_APPOINTMENTS.filter(
    apt => apt.isEmergency && apt.status === 'reserved'
  ).length;
```

**REPLACE WITH:**
```typescript
  // Process backend data
  const todayAppointments = appointmentsData?.filter(
    (apt: any) => apt.status === 'Scheduled'
  ) || [];
  
  const emergencyCases = appointmentsData?.filter(
    (apt: any) => apt.isEmergency && apt.status === 'Scheduled'
  ).length || 0;

  const completedCount = appointmentsData?.filter(
    (apt: any) => apt.status === 'Completed'
  ).length || 0;
```

### Change 5: Add loading/error states (Before return statement, line 163)
**FIND:**
```typescript
  return (
    <RequireRole allowedRoles={['doctor']}>
```

**REPLACE WITH:**
```typescript
  // Show loading state
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 16, color: Colors.text.secondary }}>Loading...</Text>
      </View>
    );
  }

  // Show error state
  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center', padding: 20 }]}>
        <Text style={{ color: Colors.status.error, fontSize: 16 }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <RequireRole allowedRoles={['doctor']}>
```

### Change 6: Update completed count (Line 342)
**FIND:**
```typescript
                      <Text style={styles.statNumber}>
                        {MOCK_APPOINTMENTS.filter(apt => apt.status === 'completed').length}
                      </Text>
```

**REPLACE WITH:**
```typescript
                      <Text style={styles.statNumber}>
                        {completedCount}
                      </Text>
```

---

## FILE 2: app/patient/dashboard.tsx

### Change 1: Update imports (Line 4)
**FIND:**
```typescript
import { MOCK_APPOINTMENTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { useTodayAppointments } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator import (Line 26)
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

### Change 3: Replace mock data with backend (Lines 38-41)
**FIND:**
```typescript
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [nextAppointment] = useState(
    MOCK_APPOINTMENTS.find(apt => apt.patientId === user?.id && apt.status === 'reserved')
  );
```

**REPLACE WITH:**
```typescript
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  
  // Fetch real data from backend
  const { data: appointmentsData, loading, error } = useTodayAppointments();
  
  const nextAppointment = appointmentsData?.find(
    (apt: any) => apt.patientId === user?.id && apt.status === 'Scheduled'
  );
```

### Change 4: Add loading/error states (Before return, line 113)
**FIND:**
```typescript
  return (
    <RequireRole allowedRoles={['patient']}>
```

**REPLACE WITH:**
```typescript
  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 16 }}>Loading...</Text>
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: Colors.status.error }}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <RequireRole allowedRoles={['patient']}>
```

---

## FILE 3: app/assistant/dashboard.tsx

### Change 1: Update imports (Line 4)
**FIND:**
```typescript
import { MOCK_APPOINTMENTS, MOCK_PAYMENTS } from '@/constants/mockData';
```

**REPLACE WITH:**
```typescript
import { useTodayAppointments, usePayments } from '@/hooks/useBackendData';
```

### Change 2: Add ActivityIndicator import (Line 32)
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

### Change 3: Add backend data fetching (After line 51)
**FIND:**
```typescript
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  useEffect(() => {
```

**REPLACE WITH:**
```typescript
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  // Fetch real data from backend
  const { data: appointmentsData, loading: apptLoading, error: apptError } = useTodayAppointments();
  const { data: paymentsData, loading: payLoading, error: payError } = usePayments();

  useEffect(() => {
```

### Change 4: Update stats calculation (Lines 138-148)
**FIND:**
```typescript
  // Stats calculation for the icons only
  const todayAppointments = MOCK_APPOINTMENTS.filter(
    apt => apt.status === 'reserved'
  ).length;
  const completedThisMonth = MOCK_APPOINTMENTS.filter(
    apt => apt.status === 'completed' && new Date(apt.date).getMonth() === new Date().getMonth()
  ).length;
  const emergencyAppointments = MOCK_APPOINTMENTS.filter(
    apt => apt.isEmergency && apt.status === 'reserved'
  ).length;
  const totalPatients = 12; // From your second image
```

**REPLACE WITH:**
```typescript
  // Stats calculation from backend data
  const todayAppointments = appointmentsData?.filter(
    (apt: any) => apt.status === 'Scheduled'
  ).length || 0;
  const completedThisMonth = appointmentsData?.filter(
    (apt: any) => apt.status === 'Completed'
  ).length || 0;
  const emergencyAppointments = appointmentsData?.filter(
    (apt: any) => apt.isEmergency && apt.status === 'Scheduled'
  ).length || 0;
  const totalPatients = 12;
```

### Change 5: Add loading/error states (Before return, line 256)
**FIND:**
```typescript
  return (
    <RequireRole allowedRoles={['assistant']}>
```

**REPLACE WITH:**
```typescript
  if (apptLoading || payLoading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color={Colors.primary} />
        <Text style={{ marginTop: 16 }}>Loading...</Text>
      </View>
    );
  }

  if (apptError || payError) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: Colors.status.error }}>Error loading data</Text>
      </View>
    );
  }

  return (
    <RequireRole allowedRoles={['assistant']}>
```

### Change 6: Update appointments display (Line 487)
**FIND:**
```typescript
              MOCK_APPOINTMENTS.filter(apt => apt.status === 'reserved').slice(0, 3).map((apt) => (
```

**REPLACE WITH:**
```typescript
              (appointmentsData?.filter((apt: any) => apt.status === 'Scheduled') || []).slice(0, 3).map((apt: any) => (
```

### Change 7: Update payments display (Lines 536, 544, 556)
**FIND:**
```typescript
          {MOCK_PAYMENTS.filter(p => p.status === 'pending').length > 0 && (
```

**REPLACE WITH:**
```typescript
          {(paymentsData?.filter((p: any) => p.status === 'pending') || []).length > 0 && (
```

**FIND:**
```typescript
                  <Text style={styles.sectionCountText}>{MOCK_PAYMENTS.filter(p => p.status === 'pending').length}</Text>
```

**REPLACE WITH:**
```typescript
                  <Text style={styles.sectionCountText}>{(paymentsData?.filter((p: any) => p.status === 'pending') || []).length}</Text>
```

**FIND:**
```typescript
                      {MOCK_PAYMENTS.filter(p => p.status === 'pending').length} payments pending
```

**REPLACE WITH:**
```typescript
                      {(paymentsData?.filter((p: any) => p.status === 'pending') || []).length} payments pending
```

---

## INSTRUCTIONS:

1. Open each file in VS Code
2. Use Ctrl+F to find the exact text
3. Replace with the new code
4. Save the file
5. Test by running the backend and frontend

## TESTING:

1. Start backend: `.\start-backend.bat`
2. Start frontend: `npm start`
3. Check each dashboard loads with real data

---

**These are the 3 MAIN dashboards. The remaining 10 screens follow the same pattern.**

Would you like me to continue with the remaining screens?
