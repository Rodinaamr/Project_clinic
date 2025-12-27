import { useAuth } from '@/contexts/AuthContext';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import React, { useEffect, useRef, useState } from 'react';
import {
  Alert,
  Animated,
  Dimensions,
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const { width } = Dimensions.get('window');

const Profile = () => {
  const { user, updateUser } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  // Advanced Toast State
  const [toastMsg, setToastMsg] = useState('');
  const toastOpacity = useRef(new Animated.Value(0)).current;

  const [profile, setProfile] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: (user as any)?.age ? `${new Date().getFullYear() - (user as any).age}-01-01` : 'Not Set',
    address: user?.specialty || 'Not Set', // Reusing fields as available or clinical fields
    bloodType: user?.bloodType || 'O+',
    allergies: user?.allergies || 'None',
    medications: user?.medications || 'None',
    emergencyName: user?.emergencyName || 'John Johnson',
    emergencyRelation: user?.emergencyRelation || 'Father',
    emergencyPhone: user?.emergencyPhone || '+1 (555) 987-6543',
    photo: user?.photo || null,
  });

  // Show Advanced Message logic
  const showAdvancedMessage = (msg: string) => {
    setToastMsg(msg);
    Animated.sequence([
      Animated.timing(toastOpacity, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
      Animated.delay(2000),
      Animated.timing(toastOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone,
        photo: user.photo || prev.photo,
        bloodType: user.bloodType || prev.bloodType,
        allergies: user.allergies || prev.allergies,
        medications: user.medications || prev.medications,
        emergencyName: user.emergencyName || prev.emergencyName,
        emergencyPhone: user.emergencyPhone || prev.emergencyPhone,
        emergencyRelation: user.emergencyRelation || prev.emergencyRelation,
      }));
    }
  }, [user]);

  const handleEditProfile = () => {
    setIsEditing(true);
    showAdvancedMessage('✏️ Edit mode activated');
  };

  const handleSaveChanges = () => {
    // 1. Locally save to profile state is already done via updateField

    // 2. Sync with AuthContext (This makes it persist in the current session)
    updateUser({
      name: profile.fullName,
      email: profile.email,
      phone: profile.phone,
      photo: profile.photo || undefined,
      bloodType: profile.bloodType,
      allergies: profile.allergies,
      medications: profile.medications,
      emergencyName: profile.emergencyName,
      emergencyPhone: profile.emergencyPhone,
      emergencyRelation: profile.emergencyRelation,
    });

    setIsEditing(false);
    showAdvancedMessage('✅ Profile saved successfully!');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    // Reset to current user data
    if (user) {
      setProfile(prev => ({
        ...prev,
        fullName: user.name || '',
        email: user.email || '',
        phone: user.phone || '',
        photo: user.photo || null,
        bloodType: user.bloodType || 'O+',
        allergies: user.allergies || 'None',
        medications: user.medications || 'None',
        emergencyName: user.emergencyName || 'John Johnson',
        emergencyPhone: user.emergencyPhone || '',
        emergencyRelation: user.emergencyRelation || '',
      }));
    }
    showAdvancedMessage('❌ Changes cancelled');
  };

  const handleChangePhoto = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (status !== 'granted') {
      showAdvancedMessage('⚠️ Storage permission required');
      return;
    }

    try {
      const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 0.8,
      });

      if (!result.canceled) {
        const selectedUri = result.assets[0].uri;
        setProfile(prev => ({ ...prev, photo: selectedUri }));

        if (!isEditing) {
          updateUser({ photo: selectedUri });
          showAdvancedMessage('📸 Photo updated!');
        } else {
          showAdvancedMessage('🖼️ New photo selected');
        }
      }
    } catch (error) {
      console.error(error);
      showAdvancedMessage('❌ Failed to pick image');
    }
  };

  const updateField = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleDownloadRecords = () => {
    const reportData = `
MEDICAL REPORT - WAHID LOFTY CLINICS
------------------------------------
Patient: ${profile.fullName}
ID: PT-${user?.id || '5'}
Email: ${profile.email}
Phone: ${profile.phone}
Blood Type: ${profile.bloodType}
Allergies: ${profile.allergies}
Medications: ${profile.medications}
Emergency Contact: ${profile.emergencyName} (${profile.emergencyPhone})
------------------------------------
Generated on: ${new Date().toLocaleDateString()}
    `;

    if (Platform.OS === 'web' && typeof window !== 'undefined') {
      // @ts-ignore
      const doc = window.document;
      const element = doc.createElement('a');
      // @ts-ignore
      const file = new Blob([reportData], { type: 'text/plain' });
      element.href = URL.createObjectURL(file);
      element.download = `${profile.fullName.replace(' ', '_')}_Medical_Report.txt`;
      doc.body.appendChild(element);
      element.click();
      doc.body.removeChild(element);
      showAdvancedMessage('📥 Report downloaded!');
    } else {
      showAdvancedMessage('📄 Summary generated');
      Alert.alert('Medical Summary', reportData);
    }
  };

  const getInitials = (name: string) => {
    return name ? name.split(' ').map(n => n[0]).join('').toUpperCase() : 'P';
  };

  return (
    <View style={styles.container}>
      {/* ADVANCED TOAST MESSAGE */}
      <Animated.View style={[styles.toast, { opacity: toastOpacity }]}>
        <Text style={styles.toastText}>{toastMsg}</Text>
      </Animated.View>

      <View style={styles.header}>
        <Text style={styles.title}>Wahid Lofty Clinics</Text>
        <Text style={styles.pageTitle}>Patient Profile</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.photoSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              {profile.photo ? (
                <Image source={{ uri: profile.photo }} style={styles.photoImage} />
              ) : (
                <Text style={styles.avatarText}>{getInitials(profile.fullName)}</Text>
              )}
            </View>
            <TouchableOpacity style={styles.changePhotoButton} onPress={handleChangePhoto}>
              <Ionicons name="camera" size={16} color="#3498db" />
              <Text style={styles.changePhotoText}>Change Photo</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{profile.fullName}</Text>
          <Text style={styles.profileEmail}>{profile.email}</Text>
          <View style={styles.badgeRow}>
            <Text style={styles.profileId}>PT-{user?.id || '5'}</Text>
            <Text style={styles.roleBadge}>{user?.role?.toUpperCase() || 'PATIENT'}</Text>
          </View>
        </View>

        <View style={styles.actionButtons}>
          {!isEditing ? (
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Ionicons name="create-outline" size={20} color="white" />
              <Text style={styles.editButtonText}>Edit My Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editModeButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Ionicons name="checkmark-circle" size={20} color="white" />
                <Text style={styles.saveButtonText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                <Ionicons name="close-circle" size={20} color="white" />
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Identity Info</Text>
          <View style={styles.infoCard}>
            <InfoField label="Full Name" value={profile.fullName} editable={isEditing} onChange={(v: string) => updateField('fullName', v)} />
            <InfoField label="Email Address" value={profile.email} editable={isEditing} onChange={(v: string) => updateField('email', v)} />
            <InfoField label="Phone Contact" value={profile.phone} editable={isEditing} onChange={(v: string) => updateField('phone', v)} />
            <InfoField label="Date Of Birth" value={profile.dateOfBirth} editable={isEditing} onChange={(v: string) => updateField('dateOfBirth', v)} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical History</Text>
          <View style={styles.infoCard}>
            <InfoField label="Blood Type" value={profile.bloodType} editable={isEditing} onChange={(v: string) => updateField('bloodType', v)} />
            <InfoField label="Allergies" value={profile.allergies} editable={isEditing} onChange={(v: string) => updateField('allergies', v)} />
            <InfoField label="Medications" value={profile.medications} editable={isEditing} onChange={(v: string) => updateField('medications', v)} />
          </View>
        </View>

        <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadRecords}>
          <Ionicons name="cloud-download-outline" size={22} color="#3498db" />
          <Text style={styles.downloadButtonText}>Export Records (TXT)</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.emergencyCard}>
            {isEditing ? (
              <View>
                <Text style={styles.fieldLabel}>Contact Name</Text>
                <TextInput
                  style={styles.emergencyInput}
                  value={profile.emergencyName}
                  onChangeText={(v) => updateField('emergencyName', v)}
                  placeholder="Enter name"
                />
                <Text style={styles.fieldLabel}>Relationship</Text>
                <TextInput
                  style={styles.emergencyInput}
                  value={profile.emergencyRelation}
                  onChangeText={(v) => updateField('emergencyRelation', v)}
                  placeholder="e.g. Brother"
                />
                <Text style={styles.fieldLabel}>Phone Number</Text>
                <TextInput
                  style={styles.emergencyInput}
                  value={profile.emergencyPhone}
                  onChangeText={(v) => updateField('emergencyPhone', v)}
                  placeholder="Enter phone"
                  keyboardType="phone-pad"
                />
              </View>
            ) : (
              <View>
                <Text style={styles.emergencyNameText}>
                  {profile.emergencyName} <Text style={styles.relationText}>({profile.emergencyRelation || 'Relation'})</Text>
                </Text>
                <View style={styles.phoneRow}>
                  <Ionicons name="call" size={16} color="#2c3e50" />
                  <Text style={styles.emergencyPhoneText}>{profile.emergencyPhone}</Text>
                </View>
              </View>
            )}
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const InfoField = ({ label, value, editable = false, onChange }: any) => (
  <View style={styles.infoField}>
    <Text style={styles.infoLabel}>{label}</Text>
    {editable ? (
      <TextInput style={styles.infoInput} value={value} onChangeText={onChange} placeholder={label} />
    ) : (
      <View style={styles.valueRow}>
        <Text style={styles.infoValue}>{value || 'Not set'}</Text>
      </View>
    )}
  </View>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F7F9FC',
  },
  toast: {
    position: 'absolute',
    top: 60,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(44, 62, 80, 0.9)',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 25,
    zIndex: 1000,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 10,
  },
  toastText: {
    color: 'white',
    fontWeight: '700',
    fontSize: 14,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 50,
    paddingBottom: 20,
    backgroundColor: '#ffffff',
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 10,
    elevation: 3,
  },
  title: {
    fontSize: 14,
    fontWeight: '600',
    color: '#3498db',
    textAlign: 'center',
    textTransform: 'uppercase',
    letterSpacing: 1.5,
    marginBottom: 4,
  },
  pageTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#2c3e50',
    textAlign: 'center',
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 24,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    borderWidth: 4,
    borderColor: 'white',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 12,
    elevation: 8,
    overflow: 'hidden',
  },
  photoImage: {
    width: '100%',
    height: '100%',
  },
  avatarText: {
    fontSize: 44,
    fontWeight: '800',
    color: '#ffffff',
  },
  changePhotoButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 25,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    borderWidth: 1,
    borderColor: '#E1E8ED',
  },
  changePhotoText: {
    fontSize: 13,
    color: '#3498db',
    fontWeight: '700',
  },
  profileName: {
    fontSize: 26,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 15,
    color: '#7f8c8d',
    marginBottom: 10,
  },
  badgeRow: {
    flexDirection: 'row',
    gap: 8,
  },
  profileId: {
    fontSize: 12,
    fontWeight: '700',
    color: '#3498db',
    backgroundColor: '#E8F4FD',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  roleBadge: {
    fontSize: 12,
    fontWeight: '700',
    color: '#27ae60',
    backgroundColor: '#E9F7EF',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 15,
  },
  actionButtons: {
    marginBottom: 30,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 10,
    shadowColor: '#3498db',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  editModeButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  saveButton: {
    flex: 2,
    backgroundColor: '#2ecc71',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 16,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#ffffff',
  },
  section: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 16,
    paddingLeft: 4,
  },
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 24,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.03,
    shadowRadius: 15,
    elevation: 2,
  },
  infoField: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 12,
    color: '#95a5a6',
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 1,
    marginBottom: 6,
  },
  infoInput: {
    fontSize: 16,
    color: '#2c3e50',
    backgroundColor: '#F8FAFB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#E1E8ED',
    fontWeight: '600',
  },
  valueRow: {
    paddingVertical: 6,
  },
  infoValue: {
    fontSize: 17,
    color: '#2c3e50',
    fontWeight: '700',
  },
  downloadButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 20,
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 12,
    marginBottom: 30,
    borderWidth: 2,
    borderColor: '#3498db',
    borderStyle: 'dashed',
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#3498db',
  },
  emergencyCard: {
    backgroundColor: '#FEF9E7',
    borderRadius: 24,
    padding: 24,
    borderWidth: 1,
    borderColor: '#F9E79F',
  },
  fieldLabel: {
    fontSize: 11,
    fontWeight: '800',
    color: '#D4AC0D',
    marginBottom: 6,
    marginTop: 8,
    textTransform: 'uppercase',
  },
  emergencyInput: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: '#F9E79F',
    fontWeight: '600',
    fontSize: 15,
    color: '#2c3e50',
  },
  emergencyNameText: {
    fontSize: 19,
    fontWeight: '800',
    color: '#2c3e50',
    marginBottom: 10,
  },
  relationText: {
    fontSize: 15,
    color: '#7f8c8d',
    fontWeight: '600',
  },
  emergencyPhoneText: {
    fontSize: 17,
    color: '#2c3e50',
    fontWeight: '700',
    marginLeft: 10,
  },
  phoneRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  bottomSpacer: {
    height: 120,
  },
});

export default Profile;