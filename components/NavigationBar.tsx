import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { usePathname, useRouter } from 'expo-router';
import React, { useState } from 'react';
import {
    Dimensions,
    Platform,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';
import PatientSidebar from './PatientSidebar';

const { width } = Dimensions.get('window');
const isWeb = Platform.OS === 'web';
const isTablet = width > 768;
const isDesktop = isWeb && isTablet;

interface NavItem {
  name: string;
  icon: keyof typeof Ionicons.glyphMap;
  route: string;
}

const navItems: NavItem[] = [
  { name: 'Dashboard', icon: 'home', route: '/patient/dashboard' },
  { name: 'Appointments', icon: 'calendar', route: '/patient/book-appointment' },
  { name: 'Payments', icon: 'card', route: '/patient/payments' },
  { name: 'Contact', icon: 'call', route: '/patient/contact' },
  { name: 'Feedback', icon: 'chatbubble', route: '/patient/feedback' },
];

const doctorNavItems: NavItem[] = [
  { name: 'Dashboard', icon: 'home', route: '/doctor/dashboard' },
  { name: 'Appointments', icon: 'calendar', route: '/doctor/appointments' },
  { name: 'Records', icon: 'folder', route: '/doctor/medical-records' },
  { name: 'Messages', icon: 'chatbubble', route: '/doctor/patient-feedback' },
];

const assistantNavItems: NavItem[] = [
  { name: 'Dashboard', icon: 'home', route: '/assistant/dashboard' },
  { name: 'Appointments', icon: 'calendar', route: '/assistant/appointments' },
  { name: 'Walk-in', icon: 'add', route: '/assistant/walk-in-booking' },
  { name: 'Patients', icon: 'people', route: '/assistant/patients' },
  { name: 'Payments', icon: 'card', route: '/assistant/payments' },
];

export default function NavigationBar() {
  const router = useRouter();
  const pathname = usePathname();
  const [sidebarVisible, setSidebarVisible] = useState(false);
  const { user } = useAuth();
  
  const isAuthPage = pathname?.startsWith('/auth') || pathname === '/';
  if (isAuthPage) {
    return null;
  }

  const tintColor = '#2c3e50';
  const backgroundColor = '#FFFFFF';

  const handleNavigation = (route: string) => {
    router.push(route as any);
  };

  const isActive = (route: string) => {
    return pathname === route;
  };

  // determine which nav items to show based on role
  const visibleItems = user?.role === 'doctor' ? doctorNavItems : user?.role === 'assistant' ? assistantNavItems : navItems;

  return (
    <>
      {/* DESKTOP/TABLET NAVIGATION (Top) */}
      {isDesktop ? (
        <View style={[styles.desktopNav, { backgroundColor }]}>
          {/* Logo - Wahid Lofty Clinics */}
          <TouchableOpacity 
            style={styles.logo}
            onPress={() => handleNavigation('/patient/dashboard')}
          >
            <Ionicons name="medical" size={24} color={tintColor} />
            <Text style={[styles.logoText, { color: tintColor }]}>
              Wahid Lofty Clinics
            </Text>
          </TouchableOpacity>

          {/* Navigation Links */}
          <View style={styles.navLinks}>
            {visibleItems.map((item) => (
              <TouchableOpacity
                key={item.route}
                style={[
                  styles.navButton,
                  isActive(item.route) && { 
                    backgroundColor: '#3498db20',
                  },
                ]}
                onPress={() => handleNavigation(item.route)}
              >
                <Ionicons
                  name={isActive(item.route) ? item.icon : (item.icon + '-outline') as any}
                  size={20}
                  color={isActive(item.route) ? '#3498db' : '#555'}
                />
                <Text style={[
                  styles.navText,
                  { 
                    color: isActive(item.route) ? '#3498db' : '#555',
                  }
                ]}>
                  {item.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* User Profile Button */}
          <TouchableOpacity
            style={styles.profile}
            onPress={() => setSidebarVisible(true)}
          >
            <Ionicons name="person-circle" size={28} color="#3498db" />
            {user?.name && (
              <Text style={styles.userName}>
                {user.name}
              </Text>
            )}
          </TouchableOpacity>
        </View>
      ) : (
        /* MOBILE NAVIGATION (Bottom) - FIXED POSITION REMOVED */
        <View style={[styles.mobileNav, { backgroundColor }]}>
          {visibleItems.slice(0, 4).map((item) => (
            <TouchableOpacity
              key={item.route}
              style={[
                styles.mobileButton,
                isActive(item.route) && styles.activeMobileButton
              ]}
              onPress={() => handleNavigation(item.route)}
            >
              <Ionicons
                name={isActive(item.route) ? item.icon : (item.icon + '-outline') as any}
                size={22}
                color={isActive(item.route) ? '#3498db' : '#555'}
              />
              <Text style={[
                styles.mobileText,
                { 
                  color: isActive(item.route) ? '#3498db' : '#555',
                }
              ]}>
                {item.name}
              </Text>
            </TouchableOpacity>
          ))}
          
          {/* More button */}
          <TouchableOpacity
            style={styles.mobileButton}
            onPress={() => setSidebarVisible(true)}
          >
            <Ionicons
              name="ellipsis-horizontal"
              size={22}
              color="#555"
            />
            <Text style={[styles.mobileText, { color: '#555' }]}>
              More
            </Text>
          </TouchableOpacity>
        </View>
      )}

      {/* PatientSidebar */}
      <PatientSidebar
        visible={sidebarVisible}
        onClose={() => setSidebarVisible(false)}
        user={user}
      />
    </>
  );
}

const styles = StyleSheet.create({
  // Desktop Navigation - NO ABSOLUTE POSITION
  desktopNav: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 12, // SMALLER
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 5,
    zIndex: 1000,
  },
  logo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  logoText: {
    fontSize: 18, // SMALLER
    fontWeight: 'bold',
    color: '#2c3e50',
  },
  navLinks: {
    flexDirection: 'row',
    gap: 12,
    flex: 1,
    justifyContent: 'center',
  },
  navButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  navText: {
    fontSize: 14,
    fontWeight: '500',
  },
  profile: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    padding: 4,
  },
  userName: {
    fontSize: 14,
    color: '#555',
    fontWeight: '500',
  },

  // Mobile Navigation - NO ABSOLUTE POSITION
  mobileNav: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 10,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 10,
    zIndex: 1000,
    backgroundColor: '#ffffff',
  },
  mobileButton: {
    alignItems: 'center',
    gap: 4,
    flex: 1,
    paddingVertical: 6,
  },
  activeMobileButton: {
    backgroundColor: '#f0f8ff',
    borderRadius: 8,
  },
  mobileText: {
    fontSize: 10,
    fontWeight: '500',
  },
});