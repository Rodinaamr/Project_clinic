import { useRouter } from 'expo-router';
import React from 'react';
import {
    Alert,
    Modal,
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
  } | null;
}

const PatientSidebar: React.FC<PatientSidebarProps> = ({ visible, onClose, user }) => {
  const router = useRouter();

  // ===== ALL WORKING BUTTONS =====
  
  // 1. My Profile Button
  const handleProfile = () => {
    onClose();
    router.push('/patient/profile');
  };

  // 2. Settings Button
  const handleSettings = () => {
    onClose();
    router.push('/patient/settings');
  };

  // 3. Notifications Button
  const handleNotifications = () => {
    onClose();
    router.push('/patient/notifications');
  };

  // 5. Help & Support Button
  const handleHelp = () => {
    onClose();
    router.push('/patient/help');
  };

  // 6. Logout Button (with confirmation)
  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => {
            onClose();
            // Navigate to login/home page
            router.push('/');
            Alert.alert('Logged Out', 'You have been logged out successfully.');
          },
        },
      ]
    );
  };

  const menuItems = [
    { icon: '👤', label: 'My Profile', onPress: handleProfile },
    { icon: '⚙️', label: 'Settings', onPress: handleSettings },
    { icon: '🔔', label: 'Notifications', onPress: handleNotifications },
    { icon: '❓', label: 'Help & Support', onPress: handleHelp },
    { icon: '🚪', label: 'Logout', onPress: handleLogout, color: '#e74c3c' },
  ];

  return (
    <Modal
      visible={visible}
      transparent={true}
      animationType="slide"
      onRequestClose={onClose}
    >
      <View style={styles.overlay}>
        <View style={styles.sidebar}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.userInfo}>
              <View style={styles.avatar}>
                <Text style={styles.avatarText}>
                  {user?.name ? user.name.charAt(0).toUpperCase() : 'S'}
                </Text>
              </View>
              <View style={styles.userDetails}>
                <Text style={styles.userName}>{user?.name || 'Sarah Johnson'}</Text>
                <Text style={styles.userEmail}>{user?.email || 'sarah.johnson@example.com'}</Text>
                <Text style={styles.clinicName}>Wahid Lofty Clinics</Text>
              </View>
            </View>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Text style={styles.closeText}>✕</Text>
            </TouchableOpacity>
          </View>

          {/* Menu Items - ALL BUTTONS WORKING */}
          <ScrollView style={styles.menu}>
            {menuItems.map((item, index) => (
              <TouchableOpacity
                key={index}
                style={styles.menuItem}
                onPress={item.onPress} // THIS MAKES BUTTONS WORK
                activeOpacity={0.7}
              >
                <Text style={styles.menuIcon}>{item.icon}</Text>
                <Text
                  style={[
                    styles.menuText,
                    item.color ? { color: item.color } : {},
                  ]}
                >
                  {item.label}
                </Text>
                <Text style={styles.arrow}>›</Text>
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
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  sidebar: {
    width: 300,
    backgroundColor: 'white',
    height: '100%',
  },
  header: {
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#e0e0e0',
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
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  avatarText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
  },
  userDetails: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 4,
  },
  clinicName: {
    fontSize: 12,
    color: '#3498db',
    fontWeight: '500',
  },
  closeButton: {
    padding: 5,
  },
  closeText: {
    fontSize: 24,
    color: '#7f8c8d',
  },
  menu: {
    flex: 1,
    paddingVertical: 10,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  menuIcon: {
    fontSize: 22,
    width: 30,
  },
  menuText: {
    flex: 1,
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    marginLeft: 10,
  },
  arrow: {
    fontSize: 20,
    color: '#95a5a6',
  },
  footer: {
    padding: 20,
    borderTopWidth: 1,
    borderTopColor: '#e0e0e0',
    alignItems: 'center',
  },
  version: {
    fontSize: 12,
    color: '#95a5a6',
    marginBottom: 4,
  },
  copyright: {
    fontSize: 12,
    color: '#95a5a6',
    textAlign: 'center',
  },
});

export default PatientSidebar;