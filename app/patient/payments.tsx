import { paymentsApi } from '@/app/services';
import Colors from '@/constants/colors';
import { useAuth } from '@/contexts/AuthContext';
import { Stack } from 'expo-router';
import { CreditCard } from 'lucide-react-native';
import React, { useEffect, useState } from 'react';
import { ActivityIndicator, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function PaymentsPage() {
  const insets = useSafeAreaInsets();
  const { user } = useAuth();
  const [payments, setPayments] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchPayments = async () => {
      if (!user?.id) return;
      try {
        const response = await paymentsApi.getAll();
        if (response.data) {
          const userPayments = response.data.filter((p: any) => String(p.patientId) === String(user.id));
          setPayments(userPayments);
        }
      } catch (err) {
        console.error('Error fetching payments:', err);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPayments();
  }, [user?.id]);

  const totalPaid = payments
    .filter(p => p.status === 'Paid')
    .reduce((sum, p) => sum + Number(p.amount), 0);

  return (
    <>
      <Stack.Screen
        options={{
          title: 'My Payments',
          headerStyle: { backgroundColor: Colors.gold },
          headerTintColor: Colors.white,
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 20 },
        ]}
      >
        {isLoading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.gold} />
            <Text style={styles.loadingText}>Fetching your payments...</Text>
          </View>
        ) : payments.length > 0 ? (
          payments.map((payment: any) => (
            <View key={payment.id} style={styles.paymentCard}>
              <View style={styles.paymentHeader}>
                <CreditCard size={20} color={Colors.gold} />
                <View style={styles.paymentInfo}>
                  <Text style={styles.paymentName}>{payment.paymentMethod || 'Hospital Care'}</Text>
                  <Text style={styles.paymentDate}>
                    {new Date(payment.paymentDate).toLocaleDateString()}
                  </Text>
                </View>
              </View>
              <View style={styles.paymentFooter}>
                <Text style={styles.paymentAmount}>${payment.amount}</Text>
                <View
                  style={[
                    styles.statusBadge,
                    payment.status === 'Paid'
                      ? styles.statusPaid
                      : styles.statusPending,
                  ]}
                >
                  <Text
                    style={[
                      styles.statusText,
                      payment.status === 'Paid'
                        ? styles.statusTextPaid
                        : styles.statusTextPending,
                    ]}
                  >
                    {payment.status}
                  </Text>
                </View>
              </View>
            </View>
          ))
        ) : (
          <View style={styles.emptyState}>
            <CreditCard size={64} color={Colors.border.medium} />
            <Text style={styles.emptyText}>No payment history found</Text>
          </View>
        )}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite,
  },
  content: {
    padding: 20,
  },
  summaryCard: {
    backgroundColor: Colors.gold,
    borderRadius: 16,
    padding: 24,
    marginBottom: 20,
    shadowColor: Colors.shadow.medium,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  summaryLabel: {
    fontSize: 14,
    color: Colors.white,
    opacity: 0.9,
    marginBottom: 8,
  },
  summaryAmount: {
    fontSize: 36,
    fontWeight: '700' as const,
    color: Colors.white,
  },
  paymentCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 12,
    shadowColor: Colors.shadow.small,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  paymentHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 16,
  },
  paymentInfo: {
    flex: 1,
  },
  paymentName: {
    fontSize: 15,
    fontWeight: '600' as const,
    color: Colors.text.primary,
    marginBottom: 4,
  },
  paymentDate: {
    fontSize: 12,
    color: Colors.text.secondary,
  },
  paymentFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentAmount: {
    fontSize: 20,
    fontWeight: '700' as const,
    color: Colors.text.primary,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusPaid: {
    backgroundColor: `${Colors.status.success}20`,
  },
  statusPending: {
    backgroundColor: `${Colors.status.pending}20`,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  statusTextPaid: {
    color: Colors.status.success,
  },
  statusTextPending: {
    color: Colors.status.pending,
  },
  loadingContainer: {
    paddingVertical: 40,
    alignItems: 'center',
    justifyContent: 'center',
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: Colors.text.secondary,
  },
  emptyState: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 60,
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginTop: 16,
  },
});
