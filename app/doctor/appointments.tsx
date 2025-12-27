import { appointmentsApi } from '@/app/services';
import Colors from '@/constants/colors';
import { useBackendData } from '@/hooks/useBackendData';
import { Stack } from 'expo-router';
import { AlertCircle, Clock, User } from 'lucide-react-native';
import React from 'react';
import { ActivityIndicator, Pressable, ScrollView, StyleSheet, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function DoctorAppointmentsPage() {
  const insets = useSafeAreaInsets();
  const { data: appointments, loading, error } = useBackendData(
    () => appointmentsApi.getAll(),
    []
  );

  return (
    <>
      <Stack.Screen
        options={{
          title: 'All Appointments',
          headerStyle: { backgroundColor: Colors.secondary },
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
        {loading ? (
          <View style={styles.loadingContainer}>
            <ActivityIndicator size="large" color={Colors.secondary} />
            <Text style={styles.loadingText}>Loading appointments...</Text>
          </View>
        ) : (appointments || []).length === 0 ? (
          <View style={styles.emptyState}>
            <Text style={styles.emptyText}>No appointments found</Text>
          </View>
        ) : (appointments || []).map((apt: any) => (
          <View key={apt.id} style={styles.appointmentCard}>
            <View style={styles.cardHeader}>
              <View style={styles.patientInfo}>
                <User size={20} color={Colors.secondary} />
                <Text style={styles.patientName}>
                  {apt.patient ? `${apt.patient.firstName} ${apt.patient.lastName}` : `Patient #${apt.patientId}`}
                </Text>
              </View>
              {apt.isEmergency && (
                <View style={styles.emergencyBadge}>
                  <AlertCircle size={14} color={Colors.status.error} />
                  <Text style={styles.emergencyText}>Emergency</Text>
                </View>
              )}
            </View>

            <View style={styles.cardBody}>
              <View style={styles.infoRow}>
                <Clock size={16} color={Colors.text.secondary} />
                <Text style={styles.infoText}>
                  {new Date(apt.appointmentDate).toLocaleDateString()} at {new Date(apt.appointmentDate).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Text>
              </View>
              <Text style={styles.specialty}>{apt.notes?.split('Specialty: ')[1]?.split(',')[0] || 'General Consultation'}</Text>
            </View>

            <View style={styles.cardFooter}>
              <View
                style={[
                  styles.statusBadge,
                  apt.status === 'reserved' && styles.statusReserved,
                  apt.status === 'completed' && styles.statusCompleted,
                  apt.status === 'canceled' && styles.statusCanceled,
                ]}
              >
                <Text
                  style={[
                    styles.statusText,
                    apt.status === 'Scheduled' && styles.statusTextReserved,
                    apt.status === 'Completed' && styles.statusTextCompleted,
                    apt.status === 'Cancelled' && styles.statusTextCanceled,
                  ]}
                >
                  {apt.status}
                </Text>
              </View>

              {apt.status === 'Scheduled' && (
                <Pressable style={styles.viewButton}>
                  <Text style={styles.viewButtonText}>View Details</Text>
                </Pressable>
              )}
            </View>
          </View>
        ))}
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
  appointmentCard: {
    backgroundColor: Colors.white,
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.shadow.small,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  patientInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  patientName: {
    fontSize: 16,
    fontWeight: '600' as const,
    color: Colors.text.primary,
  },
  emergencyBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    backgroundColor: `${Colors.status.error}20`,
  },
  emergencyText: {
    fontSize: 11,
    fontWeight: '600' as const,
    color: Colors.status.error,
  },
  cardBody: {
    marginBottom: 12,
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 8,
  },
  infoText: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  specialty: {
    fontSize: 14,
    color: Colors.text.primary,
    fontWeight: '500' as const,
  },
  cardFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 8,
  },
  statusReserved: {
    backgroundColor: `${Colors.status.pending}20`,
  },
  statusCompleted: {
    backgroundColor: `${Colors.status.completed}20`,
  },
  statusCanceled: {
    backgroundColor: `${Colors.status.canceled}20`,
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600' as const,
  },
  statusTextReserved: {
    color: Colors.status.pending,
  },
  statusTextCompleted: {
    color: Colors.status.completed,
  },
  statusTextCanceled: {
    color: Colors.status.canceled,
  },
  viewButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: Colors.secondary,
  },
  viewButtonText: {
    fontSize: 13,
    fontWeight: '600' as const,
    color: Colors.white,
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
    paddingVertical: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    fontSize: 16,
    color: Colors.text.secondary,
  }
});
