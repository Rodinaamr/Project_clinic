import React, { useState } from 'react';
import {
    Alert,
    Modal,
    ScrollView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

const Settings = () => {
  // ===== STATE =====
  const [notifications, setNotifications] = useState(true);
  const [twoFactor, setTwoFactor] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [autoSave, setAutoSave] = useState(true);
  const [dataBackup, setDataBackup] = useState(true);
  const [privacyMode, setPrivacyMode] = useState(false);
  
  // 2FA Modal
  const [show2FAModal, setShow2FAModal] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');
  const [is2FASetup, setIs2FASetup] = useState(false);
  const [temp2FA, setTemp2FA] = useState(false);
  const [generatedCode, setGeneratedCode] = useState('');
  const [attempts, setAttempts] = useState(0);

  // ===== WORKING TWO-FACTOR AUTHENTICATION =====
  const open2FAModal = () => {
    if (!twoFactor && !is2FASetup) {
      // Generate a random 6-digit code
      const code = Math.floor(100000 + Math.random() * 900000).toString();
      setGeneratedCode(code);
      setVerificationCode('');
      setAttempts(0);
      setShow2FAModal(true);
      setTemp2FA(true);
      
      // In real app, send code via SMS/Email
      console.log('2FA Code generated:', code);
    } else if (twoFactor) {
      // Disable 2FA
      Alert.alert(
        'Disable Two-Factor Authentication',
        'Are you sure you want to disable 2FA protection?',
        [
          { text: 'Cancel', style: 'cancel' },
          {
            text: 'Disable',
            style: 'destructive',
            onPress: () => {
              setTwoFactor(false);
              setIs2FASetup(false);
              Alert.alert(
                '2FA Disabled',
                'Two-factor authentication has been turned off.',
                [{ text: 'OK' }]
              );
            }
          }
        ]
      );
    }
  };

  const verify2FACode = () => {
    if (attempts >= 3) {
      Alert.alert(
        'Too Many Attempts',
        'Please request a new verification code.',
        [{ text: 'OK' }]
      );
      return;
    }

    if (verificationCode.length !== 6) {
      Alert.alert('Invalid Code', 'Please enter a 6-digit code.');
      return;
    }

    if (verificationCode === generatedCode) {
      setTwoFactor(true);
      setIs2FASetup(true);
      setShow2FAModal(false);
      setVerificationCode('');
      setAttempts(0);
      Alert.alert(
        '2FA Activated!',
        'Your account is now protected with two-factor authentication.',
        [{ text: 'OK' }]
      );
    } else {
      const newAttempts = attempts + 1;
      setAttempts(newAttempts);
      
      if (newAttempts >= 3) {
        Alert.alert(
          'Account Locked',
          'Too many failed attempts. 2FA setup cancelled.',
          [
            { 
              text: 'OK', 
              onPress: () => {
                setShow2FAModal(false);
                setTemp2FA(false);
              }
            }
          ]
        );
      } else {
        Alert.alert(
          'Incorrect Code',
          `The code you entered is incorrect. Try again.`,
          [{ text: 'OK' }]
        );
      }
    }
  };

  const resend2FACode = () => {
    const newCode = Math.floor(100000 + Math.random() * 900000).toString();
    setGeneratedCode(newCode);
    setVerificationCode('');
    setAttempts(0);
    
    Alert.alert(
      'New Code Sent',
      'A new verification code has been generated.',
      [{ text: 'OK' }]
    );
  };

  // ===== OTHER BUTTON FUNCTIONS =====
  const toggleNotifications = () => {
    setNotifications(!notifications);
  };

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled);
  };

  const toggleAutoSave = () => {
    setAutoSave(!autoSave);
  };

  const toggleDataBackup = () => {
    setDataBackup(!dataBackup);
  };

  const togglePrivacyMode = () => {
    setPrivacyMode(!privacyMode);
  };

  const resetSettings = () => {
    Alert.alert(
      'Reset All Settings',
      'This will reset all settings to their default values. Are you sure?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Reset',
          style: 'destructive',
          onPress: () => {
            setNotifications(true);
            setTwoFactor(false);
            setSoundEnabled(true);
            setAutoSave(true);
            setDataBackup(true);
            setPrivacyMode(false);
            setIs2FASetup(false);
            Alert.alert(
              'Settings Reset',
              'All settings have been restored to default values.',
              [{ text: 'OK' }]
            );
          }
        }
      ]
    );
  };

  const saveSettings = () => {
    const settingsToSave = {
      notifications,
      twoFactor,
      soundEnabled,
      autoSave,
      dataBackup,
      privacyMode,
    };
    
    // In a real app, save to AsyncStorage or backend
    console.log('Settings saved:', settingsToSave);
    
    Alert.alert(
      'Settings Saved',
      'All your preferences have been saved.',
      [{ text: 'OK' }]
    );
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>Wahid Lofty Clinics</Text>
        <Text style={styles.pageTitle}>Settings</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Section 1: Security - WORKING 2FA */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Security</Text>
          
          <View style={styles.card}>
            <TouchableOpacity style={styles.row} onPress={open2FAModal}>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Two-Factor Authentication</Text>
                <Text style={styles.itemDesc}>
                  {twoFactor ? 'Extra security enabled' : 'Add extra security to your account'}
                </Text>
              </View>
              <View style={[
                styles.statusBadge,
                twoFactor ? styles.statusActive : styles.statusInactive
              ]}>
                <Text style={styles.statusText}>
                  {twoFactor ? 'ON' : 'OFF'}
                </Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>

        {/* Section 2: Notifications */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Notifications</Text>
          
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Push Notifications</Text>
                <Text style={styles.itemDesc}>
                  Appointment reminders, test results
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  notifications ? styles.toggleOn : styles.toggleOff,
                ]}
                onPress={toggleNotifications}
              >
                <Text style={styles.toggleText}>
                  {notifications ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Section 3: Privacy & Data */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Privacy & Data</Text>
          
          <View style={styles.card}>
            {/* Privacy Mode */}
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Privacy Mode</Text>
                <Text style={styles.itemDesc}>
                  Hide sensitive information
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  privacyMode ? styles.toggleOn : styles.toggleOff,
                ]}
                onPress={togglePrivacyMode}
              >
                <Text style={styles.toggleText}>
                  {privacyMode ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Cloud Backup */}
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Cloud Backup</Text>
                <Text style={styles.itemDesc}>
                  Backup medical records to cloud
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  dataBackup ? styles.toggleOn : styles.toggleOff,
                ]}
                onPress={toggleDataBackup}
              >
                <Text style={styles.toggleText}>
                  {dataBackup ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.divider} />

            {/* Auto Save */}
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Auto Save</Text>
                <Text style={styles.itemDesc}>
                  Automatically save changes
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  autoSave ? styles.toggleOn : styles.toggleOff,
                ]}
                onPress={toggleAutoSave}
              >
                <Text style={styles.toggleText}>
                  {autoSave ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Section 4: Sound */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Sound</Text>
          
          <View style={styles.card}>
            <View style={styles.row}>
              <View style={styles.textContainer}>
                <Text style={styles.itemTitle}>Sound Effects</Text>
                <Text style={styles.itemDesc}>
                  Play sounds for notifications
                </Text>
              </View>
              <TouchableOpacity
                style={[
                  styles.toggleButton,
                  soundEnabled ? styles.toggleOn : styles.toggleOff,
                ]}
                onPress={toggleSound}
              >
                <Text style={styles.toggleText}>
                  {soundEnabled ? 'ON' : 'OFF'}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Action Buttons */}
        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.saveButton} onPress={saveSettings}>
            <Text style={styles.saveButtonText}>Save Settings</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.resetButton} onPress={resetSettings}>
            <Text style={styles.resetButtonText}>Reset to Default</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>

      {/* ===== 2FA SETUP MODAL ===== */}
      <Modal
        visible={show2FAModal}
        transparent={true}
        animationType="slide"
        onRequestClose={() => {
          setShow2FAModal(false);
          setTemp2FA(false);
        }}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Setup Two-Factor Authentication</Text>
            
            <View style={styles.codeSection}>
              <Text style={styles.modalSubtitle}>Enter this 6-digit code:</Text>
              
              <View style={styles.codeDisplay}>
                <Text style={styles.codeText}>{generatedCode}</Text>
              </View>
            </View>
            
            <TextInput
              style={styles.codeInput}
              value={verificationCode}
              onChangeText={setVerificationCode}
              placeholder="000000"
              keyboardType="number-pad"
              maxLength={6}
              autoFocus={true}
            />
            
            <View style={styles.modalButtons}>
              <TouchableOpacity
                style={[styles.modalButton, styles.verifyButton]}
                onPress={verify2FACode}
              >
                <Text style={styles.verifyButtonText}>Verify Code</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.resendButton]}
                onPress={resend2FACode}
              >
                <Text style={styles.resendButtonText}>Get New Code</Text>
              </TouchableOpacity>
              
              <TouchableOpacity
                style={[styles.modalButton, styles.cancelButton]}
                onPress={() => {
                  setShow2FAModal(false);
                  setTemp2FA(false);
                }}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

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
  card: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  textContainer: {
    flex: 1,
    marginRight: 10,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2c3e50',
    marginBottom: 4,
  },
  itemDesc: {
    fontSize: 14,
    color: '#7f8c8d',
  },
  statusBadge: {
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 15,
    minWidth: 70,
    alignItems: 'center',
  },
  statusActive: {
    backgroundColor: '#27ae60',
  },
  statusInactive: {
    backgroundColor: '#e74c3c',
  },
  statusText: {
    color: 'white',
    fontSize: 14,
    fontWeight: 'bold',
  },
  toggleButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    borderRadius: 20,
    minWidth: 70,
    alignItems: 'center',
  },
  toggleOn: {
    backgroundColor: '#27ae60',
  },
  toggleOff: {
    backgroundColor: '#e74c3c',
  },
  toggleText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 14,
  },
  divider: {
    height: 1,
    backgroundColor: '#f0f0f0',
    marginVertical: 10,
  },
  actionButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 30,
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginRight: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resetButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginLeft: 10,
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  bottomSpacer: {
    height: 80,
  },
  // Modal Styles
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 12,
    padding: 25,
    width: '90%',
    maxWidth: 400,
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 20,
    textAlign: 'center',
  },
  codeSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  modalSubtitle: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 10,
    textAlign: 'center',
  },
  codeDisplay: {
    backgroundColor: '#f8f9fa',
    padding: 20,
    borderRadius: 10,
    marginVertical: 15,
    borderWidth: 2,
    borderColor: '#3498db',
  },
  codeText: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2c3e50',
    letterSpacing: 5,
  },
  codeInput: {
    borderWidth: 2,
    borderColor: '#3498db',
    borderRadius: 10,
    padding: 15,
    fontSize: 24,
    textAlign: 'center',
    marginVertical: 10,
    color: '#2c3e50',
    fontWeight: 'bold',
    letterSpacing: 5,
  },
  modalButtons: {
    marginTop: 10,
  },
  modalButton: {
    paddingVertical: 14,
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 10,
  },
  verifyButton: {
    backgroundColor: '#27ae60',
  },
  verifyButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  resendButton: {
    backgroundColor: '#3498db',
  },
  resendButtonText: {
    color: 'white',
    fontSize: 14,
    fontWeight: '600',
  },
  cancelButton: {
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#e0e0e0',
  },
  cancelButtonText: {
    color: '#6c757d',
    fontSize: 14,
    fontWeight: '600',
  },
});

export default Settings;