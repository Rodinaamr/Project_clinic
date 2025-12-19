import createContextHook from '@nkzw/create-context-hook';
import { useCallback, useMemo, useState } from 'react';
import { patientsApi as patientApi } from '../app/services';

const ROLE_IMAGES = {
  patient: 'https://cdn-icons-png.flaticon.com/512/3001/3001764.png',
  doctor: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
  assistant: 'https://www.kindpng.com/picc/m/66-663423_virtual-assistant-png-transparent-png.png'
};

export type UserRole = 'patient' | 'doctor' | 'assistant';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  photo?: string;
  phone?: string;
  specialty?: string;

  // ✅ Added fields
  age?: number;
  gender?: string;
}

const MOCK_USERS: User[] = [
  {
    id: 'patient-1',
    name: 'Sarah Johnson',
    email: 'sarah@example.com',
    role: 'patient',
    phone: '+1 234 567 8901',
    photo: 'https://cdn-icons-png.flaticon.com/512/4648/4648273.png',
  },
  {
    id: 'patient-2',
    name: 'Michael Chen',
    email: 'michael@example.com',
    role: 'patient',
    phone: '+1 234 567 8902',
    photo: 'https://cdn-icons-png.flaticon.com/512/3001/3001764.png',
  },
  {
    id: 'doctor-1',
    name: 'Dr. Wahid Lotfy',
    email: 'doctor@clinic.com',
    role: 'doctor',
    specialty: 'Dermatology & Aesthetic Medicine',
    phone: '+1 234 567 9000',
    photo: 'https://cdn-icons-png.flaticon.com/512/3774/3774299.png',
  },
  {
    id: 'assistant-1',
    name: 'Assistant',
    email: 'assistant@clinic.com',
    role: 'assistant',
    phone: '+1 234 567 9100',
    photo: 'https://www.kindpng.com/picc/m/66-663423_virtual-assistant-png-transparent-png.png'
  },
];

const MOCK_CREDENTIALS: Record<string, { password: string; userId: string }> = {
  'sarah@example.com': { password: 'patient123', userId: 'patient-1' },
  'michael@example.com': { password: 'patient123', userId: 'patient-2' },
  'doctor@clinic.com': { password: 'doctor123', userId: 'doctor-1' },
  'assistant@clinic.com': { password: 'assistant123', userId: 'assistant-1' },
};

export const [AuthProvider, useAuth] = createContextHook(() => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const login = useCallback(async (email: string, password: string): Promise<boolean> => {
    setIsLoading(true);

    try {
      // 1. Try Backend Login
      try {
        const response = await patientApi.login({ email, password });
        if (response.data) {
          const p = response.data;
          const newUser: User = {
            id: String(p.id),
            name: `${p.firstName} ${p.lastName}`,
            email: p.email,
            role: 'patient', // Assuming patient login for now
            phone: p.phone,
            photo: ROLE_IMAGES['patient'],
            // age/gender might need another call or calculated if not returned
          };
          setUser(newUser);
          setIsLoading(false);
          return true;
        }
      } catch (backendErr) {
        console.warn('Backend login failed, trying mocks...', backendErr);
      }

      // 2. Fallback to MOCK_CREDENTIALS (for "Sarah", "Michael", "Doctor", "Assistant")
      // This ensures existing mock flows (like doctor/assistant login) still work if backend only has patients
      const credentials = MOCK_CREDENTIALS[email.toLowerCase()];
      if (credentials && credentials.password === password) {
        const foundUser = MOCK_USERS.find((u) => u.id === credentials.userId);
        if (foundUser) {
          setUser(foundUser);
          setIsLoading(false);
          return true;
        }
      }
    } catch (err) {
      console.error(err);
    }

    setIsLoading(false);
    return false;
  }, []);

  const logout = useCallback(() => {
    setUser(null);
  }, []);

  const register = useCallback(
    async (
      name: string,
      email: string,
      password: string,
      phone: string,
      age?: string | number,
      gender?: string
    ): Promise<boolean> => {
      // Client-side validation (extra check)
      if (!password || password.length < 6) {
        setIsLoading(false);
        return false;
      }

      setIsLoading(true);

      try {
        // Split full name into first/last
        const parts = name.trim().split(/\s+/);
        const firstName = parts[0] || name;
        const lastName = parts.slice(1).join(' ') || parts[0] || '-';

        // Calculate approx DateOfBirth from Age
        let dateOfBirth = new Date().toISOString();
        if (age) {
          const ageNum = Number(age);
          if (!isNaN(ageNum)) {
            const year = new Date().getFullYear() - ageNum;
            dateOfBirth = new Date(year, 0, 1).toISOString();
          }
        }

        const payload: any = {
          firstName,
          lastName,
          email,
          phone,
          password,
          gender, // backend needs to support this or it will be ignored
          dateOfBirth,
          address: '' // Optional
        };

        console.log('Registering with payload:', payload);

        // using the new service (we need to update import too)
        const response = await patientApi.create(payload);

        // backend returns created patient
        const created = response?.data;
        if (created) {
          const newUser: User = {
            id: String(created.id),
            name: `${created.firstName} ${created.lastName}`,
            email: created.email,
            role: 'patient',
            phone: created.phone,
            photo: ROLE_IMAGES['patient'],
            age: age ? Number(age) : undefined,
            gender: gender
          };

          setUser(newUser);
          setIsLoading(false);
          return true;
        }

        setIsLoading(false);
        return false;
      } catch (err: any) {
        console.error('Registration error detailing:', err.response?.data || err.message);
        setIsLoading(false);
        return false;
      }
    },
    []
  );

  return useMemo(
    () => ({
      user,
      isLoading,
      isAuthenticated: !!user,
      login,
      logout,
      register,
    }),
    [user, isLoading, login, logout, register]
  );
});
