import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { Stack } from 'expo-router';
import { FileText } from 'lucide-react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import Colors from '@/constants/colors';
import { MOCK_REPORTS } from '@/constants/mockData';

// Define type for report
interface Report {
  id: string;
  title: string;
  date: string;
  patientName: string;
  doctorName: string;
}

export default function AssistantReportsPage() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <Stack.Screen
        options={{
          title: 'Reports Management',
          headerStyle: { backgroundColor: Colors.primaryLight || '#4A90E2' },
          headerTintColor: Colors.white || '#FFFFFF',
        }}
      />
      <ScrollView
        style={styles.container}
        contentContainerStyle={[
          styles.content,
          { paddingBottom: insets.bottom + 20 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        {MOCK_REPORTS.map((report: Report) => (
          <View key={report.id} style={styles.reportCard}>
            <View style={styles.header}>
              <FileText size={20} color={Colors.primaryLight || '#4A90E2'} />
              <View style={styles.reportInfo}>
                <Text style={styles.reportTitle}>{report.title}</Text>
                <Text style={styles.reportDate}>
                  {new Date(report.date).toLocaleDateString()}
                </Text>
              </View>
            </View>
            <Text style={styles.patientName}>{report.patientName}</Text>
            <Text style={styles.doctor}>Dr. {report.doctorName}</Text>
          </View>
        ))}
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.offWhite || '#F5F7FA',
  },
  content: {
    padding: 20,
    paddingTop: 16,
  },
  reportCard: {
    backgroundColor: Colors.white || '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    marginBottom: 16,
    shadowColor: Colors.shadow?.small || '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    marginBottom: 12,
  },
  reportInfo: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 15,
    fontWeight: '600',
    color: Colors.text?.primary || '#000000',
    marginBottom: 4,
  },
  reportDate: {
    fontSize: 12,
    color: Colors.text?.secondary || '#666666',
  },
  patientName: {
    fontSize: 14,
    color: Colors.text?.secondary || '#666666',
    marginBottom: 4,
  },
  doctor: {
    fontSize: 13,
    color: Colors.primaryLight || '#4A90E2',
    fontWeight: '500',
  },
});