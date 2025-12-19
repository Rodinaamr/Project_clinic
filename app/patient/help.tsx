import { Ionicons } from '@expo/vector-icons';
import React from 'react';
import {
    Alert,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

const Help = () => {
  const faqItems = [
    {
      id: 1,
      question: 'How do I book an appointment?',
      answer: 'Go to the Book Appointment section, select your preferred doctor, choose a date and time, and confirm your booking.',
    },
    {
      id: 2,
      question: 'How can I view my medical records?',
      answer: 'Your medical records are available in the Medical History section. You can view, download, or share them with your doctor.',
    },
    {
      id: 3,
      question: 'What payment methods are accepted?',
      answer: 'We accept credit/debit cards, online banking, and insurance payments. All payments are secure and encrypted.',
    },
    {
      id: 4,
      question: 'How do I update my personal information?',
      answer: 'Go to My Profile section to update your contact details, emergency contacts, and medical information.',
    },
  ];

  const contactMethods = [
    {
      id: 1,
      icon: 'call',
      title: 'Emergency Hotline',
      details: 'Available 24/7',
      number: '+1 (800) 123-4567',
      action: () => Linking.openURL('tel:+18001234567'),
    },
    {
      id: 2,
      icon: 'mail',
      title: 'Email Support',
      details: 'Response within 24 hours',
      email: 'support@wahidloftyclinics.com',
      action: () => Linking.openURL('mailto:support@wahidloftyclinics.com'),
    },
    
  ];

  const resources = [
    {
      id: 1,
      title: 'Privacy Policy',
      action: () => Alert.alert('Privacy Policy', 'View our privacy policy document'),
    },
    {
      id: 2,
      title: 'Terms of Service',
      action: () => Alert.alert('Terms of Service', 'View terms and conditions'),
    },
    {
      id: 3,
      title: 'User Guide',
      action: () => Alert.alert('User Guide', 'Download user guide PDF'),
    },
    {
      id: 4,
      title: 'Medical Resources',
      action: () => Alert.alert('Medical Resources', 'Access educational materials'),
    },
  ];

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Wahid Lofty Clinics</Text>
        <Text style={styles.pageTitle}>Help & Support</Text>
        <Text style={styles.pageSubtitle}>We're here to help you</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Contact Methods */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Get in Touch</Text>
          
          <View style={styles.contactCard}>
            {contactMethods.map((method) => (
              <TouchableOpacity
                key={method.id}
                style={styles.contactItem}
                onPress={method.action}
                activeOpacity={0.7}
              >
                <View style={styles.contactIcon}>
                  <Ionicons name={method.icon as any} size={28} color="#3498db" />
                </View>
                <View style={styles.contactInfo}>
                  <Text style={styles.contactTitle}>{method.title}</Text>
                  <Text style={styles.contactDetails}>{method.details}</Text>
                  <Text style={styles.contactValue}>
                    
                  </Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#95a5a6" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Frequently Asked Questions */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          
          <View style={styles.faqCard}>
            {faqItems.map((faq) => (
              <View key={faq.id} style={styles.faqItem}>
                <Text style={styles.faqQuestion}>{faq.question}</Text>
                <Text style={styles.faqAnswer}>{faq.answer}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Clinic Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Clinic Information</Text>
          
          <View style={styles.clinicCard}>
            <InfoRow icon="location" label="Address" 
              value="123 Medical Center Drive, New York, NY 10001" />
            <InfoRow icon="time" label="Business Hours" 
              value="Mon-Fri: 8:00 AM - 8:00 PM\nSat: 9:00 AM - 5:00 PM\nSun: 10:00 AM - 4:00 PM" />
            <InfoRow icon="business" label="Department" 
              value="Dermatology & Skin Care" />
          </View>
        </View>

        {/* Resources */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Resources</Text>
          
          <View style={styles.resourcesCard}>
            {resources.map((resource) => (
              <TouchableOpacity
                key={resource.id}
                style={styles.resourceItem}
                onPress={resource.action}
                activeOpacity={0.7}
              >
                <Text style={styles.resourceTitle}>{resource.title}</Text>
                <Ionicons name="document-text" size={20} color="#3498db" />
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Feedback Button */}
        <TouchableOpacity 
          style={styles.feedbackButton}
          onPress={() => Alert.alert('Feedback', 'Thank you for your feedback!')}
        >
          <Ionicons name="chatbubble-ellipses" size={22} color="#ffffff" />
          <Text style={styles.feedbackButtonText}>Submit Feedback</Text>
        </TouchableOpacity>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const InfoRow = ({ icon, label, value }: any) => (
  <View style={styles.infoRow}>
    <View style={styles.infoIcon}>
      <Ionicons name={icon as any} size={20} color="#3498db" />
    </View>
    <View style={styles.infoContent}>
      <Text style={styles.infoLabel}>{label}</Text>
      <Text style={styles.infoValue}>{value}</Text>
    </View>
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
  contactCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 20,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  contactIcon: {
    width: 50,
    alignItems: 'center',
  },
  contactInfo: {
    flex: 1,
    marginHorizontal: 15,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  contactDetails: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  contactValue: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '500',
  },
  faqCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    padding: 20,
  },
  faqItem: {
    marginBottom: 20,
  },
  faqQuestion: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 8,
  },
  faqAnswer: {
    fontSize: 14,
    color: '#7f8c8d',
    lineHeight: 20,
  },
  clinicCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
    padding: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  infoIcon: {
    width: 30,
    marginTop: 2,
  },
  infoContent: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
    fontWeight: '500',
  },
  infoValue: {
    fontSize: 14,
    color: '#2c3e50',
    lineHeight: 20,
  },
  resourcesCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  resourceItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 18,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  resourceTitle: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
  },
  feedbackButton: {
    backgroundColor: '#3498db',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 18,
    borderRadius: 12,
    marginTop: 10,
    marginBottom: 40,
  },
  feedbackButtonText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#ffffff',
    marginLeft: 10,
  },
  bottomSpacer: {
    height: 80,
  },
});

export default Help;