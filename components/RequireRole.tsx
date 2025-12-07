import { useAuth, UserRole } from '@/contexts/AuthContext';
import { useRouter } from 'expo-router';
import React, { useEffect } from 'react';
import { ActivityIndicator, View } from 'react-native';

type Props = {
  allowedRoles: UserRole[];
  children: React.ReactNode;
};

const RequireRole: React.FC<Props> = ({ allowedRoles, children }) => {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (isLoading) return;
    if (!user) {
      // Not authenticated — send to landing/login
      router.replace('/');
      return;
    }

    if (!allowedRoles.includes(user.role)) {
      // Redirect to role-appropriate dashboard
      if (user.role === 'doctor') router.replace('/doctor/dashboard');
      else if (user.role === 'assistant') router.replace('/assistant/dashboard');
      else router.replace('/');
    }
  }, [user, isLoading, allowedRoles, router]);

  if (isLoading || !user) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator />
      </View>
    );
  }

  if (!allowedRoles.includes(user.role)) return null;

  return <>{children}</>;
};

export default RequireRole;
