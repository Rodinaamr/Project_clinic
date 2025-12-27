import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React, { useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Modal,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

interface PatientSidebarProps {
  visible: boolean;
  onClose: () => void;
  user: {
    name?: string;
    email?: string;
    photo?: string;
  } | null;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ visible, onClose, user }) => {
  const router = useRouter();
  const { logout } = useAuth();

  // Toast State for Sidebar
  const [toastMsg, setToastMsg] = useState('');
  const toastOpacity = useRef(new Animated.Value(0)).current;

  const showToast = (msg: string) => {
    setToastMsg(msg);
    Animated.sequence([
      Animated.timing(toastOpacity, { toValue: 1, duration: 300, useNativeDriver: true }),
      Animated.delay(1500),
      Animated.timing(toastOpacity, { toValue: 0, duration: 300, useNativeDriver: true }),
    ]).start();
  };

  const handleNavigation = (route: string) => {
    onClose();
    router.push(route as any);
  };

  const handleLogoutPress = () => {
    const performLogout = async () => {
      showToast('👋 Logging you out...');
      // 1. Close modal first
      onClose();
      // 2. Clear state and storage
      await logout();
      // 3. Redirect
      router.replace('/');
    };

    if (Platform.OS === 'web') {
      // @ts-ignore
      if (typeof window !== 'undefined' && window.confirm('Are you sure you want to logout?')) {
        performLogout();
      }
    } else {
      Alert.alert(
        'Logout',
        'Are you sure you want to logout?',
        [
          { text: 'Cancel', style: 'cancel' },
          { text: 'Logout', style: 'destructive', onPress: performLogout },
        ]
      );
    }
  };

  const menuItems = [
    {
      icon: 'person' as const,
      label: 'My Profile',
      onPress: () => handleNavigation('/patient/profile'),
      color: '#6c5ce7'
    },
    {
      icon: 'settings' as const,
      label: 'Settings',
      onPress: () => handleNavigation('/patient/settings'),
      color: '#a29bfe'
    },
    {
      icon: 'notifications' as const,
      label: 'Notifications',
      onPress: () => handleNavigation('/patient/notifications'),
      color: '#fdcb6e'
    },
    {
      icon: 'help-circle' as const,
      label: 'Help & Support',
      onPress: () => handleNavigation('/patient/help'),
      color: '#ff7675'
    },
    {
      icon: 'log-out' as const,
      label: 'Logout',
      onPress: handleLogoutPress,
      color: '#e17055'
    },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="fade"
      onRequestClose={onClose}
    >
      <TouchableOpacity
        style={styles.overlay}
        activeOpacity={1}
        onPress={onClose}
      >
        <TouchableOpacity
          style={styles.sidebar}
          activeOpacity={1}
          onPress={(e) => e.stopPropagation()}
        >
          {/* TOAST PANEL */}
          <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
            <Text style={styles.toastText}>{toastMsg}</Text>
          </Animated.View>

          {/* Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'M'}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user?.name || 'malak elbeltagy'}</Text>
                <Text style={styles.userEmail} numberOfLines={1}>
                  {user?.email || 'elbeltagy@gmail.com'}
                </Text>
                <Text style={styles.clinicName}>Wahid Lofty Clinics</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#7f8c8d" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <ScrollView style={styles.menu} showsVerticalScrollIndicator={false}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress}
                activeOpacity={0.7}
              >
                <View style={[styles.iconContainer, { backgroundColor: item.color + '15' }]}>
                  <Ionicons name={item.icon} size={22} color={item.color} />
                </View>
                <Text style={styles.menuText}>{item.label}</Text>
                <Ionicons name="chevron-forward" size={18} color="#bdc3c7" />
              </TouchableOpacity>
            ))}
          </ScrollView>

          {/* Footer */}
          <View style={styles.footer}>
            <Text style={styles.version}>Version 1.0.0</Text>
            <Text style={styles.copyright}>
              © 2024 Wahid Lofty Clinics. All rights reserved.
            </Text>
          </View>
        </TouchableOpacity>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
    justifyContent: 'center',
    alignItems: 'flex-end',
  },
  sidebar: {
    width: 320,
    backgroundColor: 'white',
    height: '100%',
    shadowColor: '#000',
    shadowOffset: { width: -2, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 10,
  },
  toast: {
    position: 'absolute',
    top: 40,
    alignSelf: 'center',
    backgroundColor: '#2c3e50',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    zIndex: 2000,
  },
  toastText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 12,
  },
  header: {
    padding: 24,
    paddingTop: 60,
    borderBottomWidth: 1,
    borderBottomColor: '#f1f2f6',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  avatar: {
    width: 64,
    height: 64,
    borderRadius: 32,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    borderWidth: 2,
    borderColor: '#f1f2f6',
  },
  avatarText: {
    fontSize: 24,
    fontWeight: '700',
    color: 'white',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '700',
    color: '#2d3436',
    marginBottom: 2,
  },
  userEmail: {
    fontSize: 13,
    color: '#636e72',
    marginBottom: 4,
  },
  clinicName: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '600',
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  closeButton: {
    padding: 4,
    marginTop: -4,
  },
  menu: {
    flex: 1,
    paddingVertical: 12,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 14,
    paddingHorizontal: 24,
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#2d3436',
    fontWeight: '600',
  },
  footer: {
    padding: 24,
    borderTopWidth: 1,
    borderTopColor: '#f1f2f6',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  version: {
    fontSize: 12,
    color: '#b2bec3',
    marginBottom: 6,
  },
  copyright: {
    fontSize: 11,
    color: '#b2bec3',
    textAlign: 'center',
    lineHeight: 16,
  },
});

export default PatientSidebar;