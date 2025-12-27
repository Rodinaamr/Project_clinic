import { appointmentsApi } from '@/app/services/appointments';
import { doctorsApi } from '@/app/services/doctors';
import { SPECIALTIES, Specialty, TIME_SLOTS } from '@/constants/mockData';
import { useAuth } from '@/contexts/AuthContext';
import { LinearGradient } from 'expo-linear-gradient';
import { Stack, useRouter } from 'expo-router';
import { Calendar, Check, Clock, Info } from 'lucide-react-native';
import React, { useEffect, useRef, useState } from 'react';
import {
  ActivityIndicator,
  Alert,
  Animated,
  Platform,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function BookAppointmentPage() {
  const router = useRouter();
  const insets = useSafeAreaInsets();
  const { user } = useAuth();

  const [selectedSpecialty, setSelectedSpecialty] = useState<Specialty | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [isEmergency, setIsEmergency] = useState<boolean>(false);
  const [isBooking, setIsBooking] = useState(false);
  const [mainDoctor, setMainDoctor] = useState<any>(null);

  // Toast State
  const [toastMsg, setToastMsg] = useState('');
  const toastOpacity = useRef(new Animated.Value(0)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    Animated.sequence([
      Animated.timing(toastOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      useNativeDriver: true,
    }).start();

    const fetchMainDoctor = async () => {
      try {
        const response = await doctorsApi.getAll();
        if (response.data && response.data.length > 0) {
          const wahid = response.data.find((d: any) =>
            d.lastName?.toLowerCase()?.includes('lotfy') || d.firstName?.toLowerCase()?.includes('wahid')
          ) || response.data[0];
          setMainDoctor(wahid);
        }
      } catch (err) {
        console.error('Error fetching doctor:', err);
      }
    };
    fetchMainDoctor();
  }, [fadeAnim]);

  const getNextDays = (count: number) => {
    const days = [];
    for (let i = 0; i < count; i++) {
      const date = new Date();
      date.setDate(date.getDate() + i);
      days.push(date);
    }
    return days;
  };

  const availableDates = getNextDays(14);

  const handleConfirmBooking = async () => {
    if (!selectedSpecialty || !selectedDate || !selectedTime) {
      showToast('⚠️ Please complete selection');
      return;
    }

    if (!user?.id) {
      showToast('❌ Login required');
      return;
    }

    setIsBooking(true);
    showToast('⏳ Processing your booking...');

    try {
      const [hours, minutes] = selectedTime.split(':').map(Number);
      const [year, month, day] = selectedDate.split('-').map(Number);
      const appointmentDateTime = new Date(year, month - 1, day, hours, minutes);
      const notes = `Specialty: ${selectedSpecialty}${isEmergency ? ' (EMERGENCY)' : ''}`;

      let patientIdNum = parseInt(user.id);
      if (isNaN(patientIdNum)) {
        const match = user.id.match(/\d+/);
        patientIdNum = match ? parseInt(match[0]) : 5;
      }

      const payload = {
        appointmentDate: appointmentDateTime.toISOString(),
        status: 'Scheduled',
        notes: notes,
        isEmergency: isEmergency,
        patientId: patientIdNum,
        doctorId: mainDoctor?.id || 1,
        duration: 30
      };

      await appointmentsApi.create(payload);
      showToast('✅ Booking Confirmed!');

      const successMsg = `Success! Your session with Dr. ${mainDoctor?.lastName || 'Wahid'} is set.\n\n📅 ${appointmentDateTime.toLocaleDateString()}\n⏰ ${selectedTime}`;

      setTimeout(() => {
        // @ts-ignore
        if (Platform.OS === 'web' && typeof window !== 'undefined') {
          // @ts-ignore
          window.alert('Booking Confirmed! 🎉\n\n' + successMsg);
          router.push('/patient/dashboard');
        } else {
          Alert.alert(
            'Booking Confirmed! 🎉',
            successMsg,
            [{ text: 'Great!', onPress: () => router.push('/patient/dashboard') }]
          );
        }
      }, 500);

    } catch (error: any) {
      console.error('❌ Booking failed:', error);
      showToast('❌ Booking failed');
      Alert.alert('Booking Error', 'We couldn\'t schedule your appointment.');
    } finally {
      setIsBooking(false);
    }
  };

  return (
    <View style={styles.outerContainer}>
      <Stack.Screen
        options={{
          headerShown: true,
          title: 'Secure Booking',
          headerStyle: { backgroundColor: '#3498db' },
          headerTintColor: '#fff',
        }}
      />

      <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
        <Text style={styles.toastText}>{toastMsg}</Text>
      </Animated.View>

      <Animated.ScrollView
        style={[styles.container, { opacity: fadeAnim }]}
        contentContainerStyle={[
          styles.scrollContent,
          { paddingBottom: insets.bottom + 40 },
        ]}
        showsVerticalScrollIndicator={false}
      >
        <LinearGradient
          colors={['#3498db', '#2980b9']}
          style={styles.heroSection}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <Calendar size={40} color="white" />
          <Text style={styles.heroTitle}>Book Appointment</Text>
          <View style={styles.doctorBadge}>
            <Text style={styles.doctorBadgeText}>
              With Dr. {mainDoctor?.lastName || 'Wahid Lotfy'}
            </Text>
          </View>
        </LinearGradient>

        <View style={styles.card}>
          <View style={styles.sectionHeader}>
            <Info size={18} color="#3498db" />
            <Text style={styles.sectionTitle}>1. Choose Specialty</Text>
          </View>
          <View style={styles.specialtyGrid}>
            {SPECIALTIES.map((specialty) => (
              <Pressable
                key={specialty}
                style={[
                  styles.specialtyItem,
                  selectedSpecialty === specialty && styles.specialtyItemSelected,
                ]}
                onPress={() => setSelectedSpecialty(specialty)}
              >
                <Text
                  style={[
                    styles.specialtyText,
                    selectedSpecialty === specialty && styles.specialtyTextSelected,
                  ]}
                >
                  {specialty}
                </Text>
                {selectedSpecialty === specialty && (
                  <Check size={14} color="white" strokeWidth={3} />
                )}
              </Pressable>
            ))}
          </View>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>2. Select Date</Text>
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.dateScroll}
          >
            {availableDates.map((date) => {
              const dateStr = date.toISOString().split('T')[0];
              const isSelected = selectedDate === dateStr;
              return (
                <Pressable
                  key={dateStr}
                  style={[
                    styles.dateItem,
                    isSelected && styles.dateItemSelected,
                  ]}
                  onPress={() => setSelectedDate(dateStr)}
                >
                  <Text style={[styles.dateDay, isSelected && styles.dateDaySelected]}>
                    {date.toLocaleDateString('en-US', { weekday: 'short' })}
                  </Text>
                  <Text style={[styles.dateNumber, isSelected && styles.dateNumberSelected]}>
                    {date.getDate()}
                  </Text>
                </Pressable>
              );
            })}
          </ScrollView>
        </View>

        <View style={styles.card}>
          <Text style={styles.sectionTitle}>3. Available Times</Text>
          <View style={styles.timeGrid}>
            {TIME_SLOTS.map((time) => {
              const isSelected = selectedTime === time;
              return (
                <Pressable
                  key={time}
                  style={[
                    styles.timeItem,
                    isSelected && styles.timeItemSelected,
                  ]}
                  onPress={() => setSelectedTime(time)}
                >
                  <Clock size={14} color={isSelected ? "white" : "#3498db"} />
                  <Text style={[styles.timeText, isSelected && styles.timeTextSelected]}>
                    {time}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        <View style={styles.card}>
          <Pressable
            style={styles.emergencyToggle}
            onPress={() => setIsEmergency(!isEmergency)}
          >
            <View style={[styles.checkbox, isEmergency && styles.checkboxChecked]}>
              {isEmergency && <Check size={14} color="white" strokeWidth={3} />}
            </View>
            <View style={styles.emergencyContent}>
              <Text style={styles.emergencyTitle}>Mark as urgent/Emergency</Text>
              <Text style={styles.emergencySubtitle}>Clinical priority will be applied</Text>
            </View>
          </Pressable>
        </View>

        <Pressable
          style={({ pressed }) => [
            styles.confirmButton,
            pressed && styles.buttonPressed,
            isBooking && { opacity: 0.7 }
          ]}
          onPress={handleConfirmBooking}
          disabled={isBooking}
        >
          {isBooking ? (
            <ActivityIndicator color="white" />
          ) : (
            <>
              <Text style={styles.confirmButtonText}>Confirm My Appointment</Text>
              <Check size={20} color="white" />
            </>
          )}
        </Pressable>
      </Animated.ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  outerContainer: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  toast: {
    position: 'absolute',
    top: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(44, 62, 80, 0.95)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 12,
    zIndex: 1000,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 10,
  },
  toastText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  container: {
    flex: 1,
  },
  scrollContent: {
    padding: 20,
  },
  heroSection: {
    alignItems: 'center',
    padding: 30,
    borderRadius: 24,
    marginBottom: 20,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 8,
  },
  heroTitle: {
    fontSize: 26,
    fontWeight: '800',
    color: 'white',
    marginTop: 12,
    marginBottom: 8,
  },
  doctorBadge: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 20,
  },
  doctorBadgeText: {
    color: 'white',
    fontSize: 13,
    fontWeight: '600',
  },
  card: {
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 2,
  },
  sectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#2c3e50',
    marginBottom: 12,
  },
  specialtyGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  specialtyItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 12,
    backgroundColor: '#F8FAFB',
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  specialtyItemSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  specialtyText: {
    fontSize: 13,
    fontWeight: '600',
    color: '#515C6F',
  },
  specialtyTextSelected: {
    color: 'white',
  },
  dateScroll: {
    gap: 12,
  },
  dateItem: {
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderRadius: 16,
    backgroundColor: '#F8FAFB',
    borderWidth: 1,
    borderColor: '#E1E8ED',
    minWidth: 70,
  },
  dateItemSelected: {
    backgroundColor: '#3498db',
    borderColor: '#3498db',
  },
  dateDay: {
    fontSize: 11,
    color: '#95a5a6',
    fontWeight: '700',
    textTransform: 'uppercase',
    marginBottom: 4,
  },
  dateDaySelected: {
    color: 'rgba(255, 255, 255, 0.8)',
  },
  dateNumber: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2c3e50',
  },
  dateNumberSelected: {
    color: 'white',
  },
  timeGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  timeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingVertical: 10,
    paddingHorizontal: 14,
    borderRadius: 12,
    backgroundColor: '#F8FAFB',
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  timeItemSelected: {
    backgroundColor: '#2ecc71',
    borderColor: '#2ecc71',
  },
  timeText: {
    fontSize: 14,
    fontWeight: '700',
    color: '#2c3e50',
  },
  timeTextSelected: {
    color: 'white',
  },
  emergencyToggle: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#E1E8ED',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#e74c3c',
    borderColor: '#e74c3c',
  },
  emergencyContent: {
    flex: 1,
  },
  emergencyTitle: {
    fontSize: 15,
    fontWeight: '700',
    color: '#2c3e50',
  },
  emergencySubtitle: {
    fontSize: 12,
    color: '#95a5a6',
    fontWeight: '500',
  },
  confirmButton: {
    backgroundColor: '#3498db',
    borderRadius: 20,
    height: 64,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 15,
    elevation: 8,
  },
  buttonPressed: {
    transform: [{ scale: 0.98 }],
    opacity: 0.9,
  },
  confirmButtonText: {
    fontSize: 18,
    fontWeight: '800',
    color: 'white',
  },
});
