import React, { useState } from 'react';
import {
    ScrollView,
    StyleSheet,
    Switch,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const Notifications = () => {
  const [appointmentReminders, setAppointmentReminders] = useState(true);
  const [testResults, setTestResults] = useState(true);
  const [prescriptionUpdates, setPrescriptionUpdates] = useState(false);
  const [billingAlerts, setBillingAlerts] = useState(true);
  const [newsletter, setNewsletter] = useState(false);
  const [promotions, setPromotions] = useState(false);

  const notificationCategories = [
    {
      title: 'Medical Notifications',
      items: [
        {
          id: 'appointments',
          title: 'Appointment Reminders',
          description: 'Receive reminders before appointments',
          enabled: appointmentReminders,
          toggle: setAppointmentReminders,
        },
        {
          id: 'results',
          title: 'Test Results',
          description: 'Get notified when test results are ready',
          enabled: testResults,
          toggle: setTestResults,
        },
        {
          id: 'prescriptions',
          title: 'Prescription Updates',
          description: 'Updates about prescriptions and refills',
          enabled: prescriptionUpdates,
          toggle: setPrescriptionUpdates,
        },
      ],
    },
    {
      title: 'Account Notifications',
      items: [
        {
          id: 'billing',
          title: 'Billing Alerts',
          description: 'Payment reminders and billing updates',
          enabled: billingAlerts,
          toggle: setBillingAlerts,
        },
      ],
    },
    {
      title: 'Updates & Offers',
      items: [
        {
          id: 'newsletter',
          title: 'Newsletter',
          description: 'Monthly health tips and clinic updates',
          enabled: newsletter,
          toggle: setNewsletter,
        },
        {
          id: 'promotions',
          title: 'Promotions & Offers',
          description: 'Special offers and discounts',
          enabled: promotions,
          toggle: setPromotions,
        },
      ],
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Wahid Lofty Clinics</Text>
        <Text style={styles.pageTitle}>Notifications</Text>
        <Text style={styles.pageSubtitle}>Manage your notification preferences</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Notification Settings */}
        {notificationCategories.map((category, categoryIndex) => (
          <View key={categoryIndex} style={styles.section}>
            <Text style={styles.sectionTitle}>{category.title}</Text>
            
            <View style={styles.sectionCard}>
              {category.items.map((item, itemIndex) => (
                <View key={item.id}>
                  <View style={styles.notificationItem}>
                    <View style={styles.notificationInfo}>
                      <Text style={styles.notificationTitle}>{item.title}</Text>
                      <Text style={styles.notificationDescription}>{item.description}</Text>
                    </View>
                    <Switch
                      value={item.enabled}
                      onValueChange={item.toggle}
                      trackColor={{ false: '#d1d8e0', true: '#3498db' }}
                      thumbColor={item.enabled ? '#ffffff' : '#ffffff'}
                      ios_backgroundColor="#d1d8e0"
                    />
                  </View>
                  
                  {/* Divider */}
                  {itemIndex < category.items.length - 1 && (
                    <View style={styles.divider} />
                  )}
                </View>
              ))}
            </View>
          </View>
        ))}

        {/* Notification History */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          
          <View style={styles.historyCard}>
            <NotificationHistoryItem
              title="Appointment Confirmed"
              message="Your appointment with Dr. Smith is confirmed for tomorrow at 10:00 AM"
              time="2 hours ago"
              read={true}
            />
            <View style={styles.divider} />
            <NotificationHistoryItem
              title="Test Results Ready"
              message="Your blood test results from Jan 15 are now available"
              time="1 day ago"
              read={true}
            />
            <View style={styles.divider} />
            <NotificationHistoryItem
              title="Payment Reminder"
              message="Your invoice for January services is due in 3 days"
              time="3 days ago"
              read={false}
            />
            <View style={styles.divider} />
            <NotificationHistoryItem
              title="Prescription Refill"
              message="Your prescription for Topical Cream is ready for refill"
              time="1 week ago"
              read={true}
            />
          </View>
        </View>

        {/* Clear Notifications Button */}
        <TouchableOpacity 
          style={styles.clearButton}
          onPress={() => console.log('Clear all notifications')}
        >
          <Text style={styles.clearButtonText}>Clear All Notifications</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const NotificationHistoryItem = ({ title, message, time, read }: any) => (
  <View style={styles.historyItem}>
    <View style={styles.historyIcon}>
      <View style={[styles.iconCircle, !read && styles.unreadIcon]}>
        <Text style={styles.iconText}>📋</Text>
      </View>
    </View>
    <View style={styles.historyContent}>
      <Text style={[styles.historyTitle, !read && styles.unreadTitle]}>
        {title}
      </Text>
      <Text style={styles.historyMessage}>{message}</Text>
      <Text style={styles.historyTime}>{time}</Text>
    </View>
    {!read && <View style={styles.unreadDot} />}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9fa',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 20,
    paddingBottom: 15,
    backgroundColor: '#ffffff',
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
  },
  title: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 5,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: '#2c3e50',
    textAlign: 'center',
    marginBottom: 5,
  },
  pageSubtitle: {
    fontSize: 14,
    color: '#7f8c8d',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  section: {
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 12,
    marginLeft: 5,
  },
  sectionCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
  },
  notificationInfo: {
    flex: 1,
    marginRight: 15,
  },
  notificationTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  notificationDescription: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 18,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginHorizontal: 20,
  },
  historyCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    padding: 20,
  },
  historyItem: {
    flexDirection: 'row',
    paddingVertical: 12,
  },
  historyIcon: {
    marginRight: 15,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#e8f4fc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  unreadIcon: {
    backgroundColor: '#d4edda',
  },
  iconText: {
    fontSize: 22,
  },
  historyContent: {
    flex: 1,
  },
  historyTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  unreadTitle: {
    color: '#27ae60',
  },
  historyMessage: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 6,
    lineHeight: 18,
  },
  historyTime: {
    fontSize: 12,
    color: '#95a5a6',
  },
  unreadDot: {
    width: 10,
    height: 10,
    borderRadius: 5,
    backgroundColor: '#27ae60',
    marginLeft: 10,
    marginTop: 5,
  },
  clearButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 16,
    borderRadius: 10,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 30,
    borderWidth: 1,
    borderColor: '#e74c3c',
  },
  clearButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#e74c3c',
  },
  bottomSpacer: {
    height: 80,
  },
});

export default Notifications;