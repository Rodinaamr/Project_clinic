import { useAuth } from '@/contexts/AuthContext';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';

const Profile = () => {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    dateOfBirth: (user as any)?.age ? `${new Date().getFullYear() - (user as any).age}-01-01` : 'Not Set',
    address: 'Not Set',
    bloodType: 'O+',
    allergies: 'None',
    medications: 'None',
  });

  useEffect(() => {
    if (user) {
      setProfile(prev => ({
        ...prev,
        fullName: user.name || prev.fullName,
        email: user.email || prev.email,
        phone: user.phone || prev.phone
      }));
    }
  }, [user]);

  const handleEditProfile = () => {
    setIsEditing(true);
    Alert.alert('✏️ Edit Mode', 'You can now edit your profile information.');
  };

  const handleSaveChanges = () => {
    setIsEditing(false);
    Alert.alert('✅ Profile Saved', 'Your profile has been updated successfully!');
  };

  const handleCancelEdit = () => {
    setIsEditing(false);
    Alert.alert('Edit Cancelled', 'No changes were made.');
  };

  const handleChangePhoto = () => {
    Alert.alert('📷 Change Profile Photo', 'Feature coming soon...');
  };

  const updateField = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  const handleVerifyEmail = () => {
    Alert.alert('📧 Verify Email', `Verification email sent to ${profile.email}`);
  };

  const handleDownloadRecords = () => {
    Alert.alert('📄 Download Records', 'Generating PDF...');
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wahid Lofty Clinics</Text>
        <Text style={styles.pageTitle}>My Profile</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        <View style={styles.photoSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{profile.fullName.split(' ').map(n => n[0]).join('').toUpperCase() || 'P'}</Text>
            </View>
            <TouchableOpacity style={styles.changePhotoButton} onPress={handleChangePhoto}>
              <Text style={styles.changePhotoText}>📷 Change Photo</Text>
            </TouchableOpacity>
          </View>

          <Text style={styles.profileName}>{profile.fullName}</Text>
          <Text style={styles.profileEmail}>{profile.email}</Text>
          <Text style={styles.profileId}>Patient ID: PT-{user?.id || '000'}</Text>
        </View>

        <View style={styles.actionButtons}>
          {!isEditing ? (
            <TouchableOpacity style={styles.editButton} onPress={handleEditProfile}>
              <Text style={styles.editButtonText}>✏️ Edit Profile</Text>
            </TouchableOpacity>
          ) : (
            <View style={styles.editModeButtons}>
              <TouchableOpacity style={styles.saveButton} onPress={handleSaveChanges}>
                <Text style={styles.saveButtonText}>💾 Save Changes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.cancelButton} onPress={handleCancelEdit}>
                <Text style={styles.cancelButtonText}>❌ Cancel</Text>
              </TouchableOpacity>
            </View>
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          <View style={styles.infoCard}>
            <InfoField label="Full Name" value={profile.fullName} editable={isEditing} onChange={(v: string) => updateField('fullName', v)} />
            <InfoField
              label="Email"
              value={profile.email}
              editable={isEditing}
              onChange={(v: string) => updateField('email', v)}
              rightButton={<TouchableOpacity onPress={handleVerifyEmail}><Text style={styles.verifyButton}>Verify</Text></TouchableOpacity>}
            />
            <InfoField label="Phone" value={profile.phone} editable={isEditing} onChange={(v: string) => updateField('phone', v)} />
            <InfoField label="Date of Birth" value={profile.dateOfBirth} editable={isEditing} onChange={(v: string) => updateField('dateOfBirth', v)} />
            <InfoField label="Address" value={profile.address} editable={isEditing} onChange={(v: string) => updateField('address', v)} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          <View style={styles.infoCard}>
            <InfoField label="Blood Type" value={profile.bloodType} editable={isEditing} onChange={(v: string) => updateField('bloodType', v)} />
            <InfoField label="Allergies" value={profile.allergies} editable={isEditing} onChange={(v: string) => updateField('allergies', v)} />
            <InfoField label="Current Medications" value={profile.medications} editable={isEditing} onChange={(v: string) => updateField('medications', v)} />
          </View>
        </View>

        <TouchableOpacity style={styles.downloadButton} onPress={handleDownloadRecords}>
          <Text style={styles.downloadButtonText}>📥 Download Medical Records</Text>
        </TouchableOpacity>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          <View style={styles.emergencyCard}>
            <Text style={styles.emergencyName}>John Johnson (Father)</Text>
            <Text style={styles.emergencyPhone}>📞 +1 (555) 987-6543</Text>
          </View>
        </View>

        <View style={styles.bottomSpacer} />
      </ScrollView>
    </View>
  );
};

const InfoField = ({ label, value, editable = false, onChange, rightButton }: any) => (
  <View style={styles.infoField}>
    <Text style={styles.infoLabel}>{label}</Text>
    {editable ? (
      <TextInput style={styles.infoInput} value={value} onChangeText={onChange} />
    ) : (
      <View style={styles.valueContainer}>
        <Text style={styles.infoValue}>{value}</Text>
        {rightButton}
      </View>
    )}
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
  },
  scrollView: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 20,
  },
  photoSection: {
    alignItems: 'center',
    marginBottom: 20,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#3498db',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  avatarText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  changePhotoButton: {
    backgroundColor: '#ffffff',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#3498db',
  },
  changePhotoText: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  profileName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 5,
  },
  profileEmail: {
    fontSize: 16,
    color: '#7f8c8d',
    marginBottom: 5,
  },
  profileId: {
    fontSize: 14,
    color: '#3498db',
    fontWeight: '600',
  },
  actionButtons: {
    marginBottom: 25,
  },
  editButton: {
    backgroundColor: '#3498db',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
  },
  editButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  editModeButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saveButton: {
    flex: 1,
    backgroundColor: '#27ae60',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginRight: 10,
  },
  saveButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  cancelButton: {
    flex: 1,
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: 'center',
    marginLeft: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#ffffff',
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
  infoCard: {
    backgroundColor: '#ffffff',
    borderRadius: 12,
    padding: 20,
    borderWidth: 1,
    borderColor: '#e8e8e8',
  },
  infoField: {
    marginBottom: 20,
  },
  infoLabel: {
    fontSize: 14,
    color: '#7f8c8d',
    marginBottom: 6,
    fontWeight: '500',
  },
  valueContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  infoValue: {
    fontSize: 16,
    color: '#2c3e50',
    fontWeight: '500',
    flex: 1,
  },
  infoInput: {
    fontSize: 16,
    color: '#2c3e50',
    borderWidth: 1,
    borderColor: '#e0e0e0',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: '#f8f9fa',
  },
  verifyButton: {
    color: '#3498db',
    fontWeight: '600',
    fontSize: 14,
    backgroundColor: '#e8f4fc',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 6,
  },
  downloadButton: {
    backgroundColor: '#ffffff',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 25,
    borderWidth: 2,
    borderColor: '#3498db',
    borderStyle: 'dashed',
  },
  downloadButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#3498db',
  },
  emergencyCard: {
    backgroundColor: '#fff8e1',
    borderRadius: 12,
    padding: 20,
    borderWidth: 2,
    borderColor: '#ffd54f',
  },
  emergencyName: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#2c3e50',
    marginBottom: 8,
  },
  emergencyPhone: {
    fontSize: 16,
    color: '#2c3e50',
    marginBottom: 15,
  },
  editContactButton: {
    backgroundColor: '#ffd54f',
    paddingVertical: 10,
    borderRadius: 8,
    alignItems: 'center',
  },
  editContactText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#2c3e50',
  },
  bottomSpacer: {
    height: 80,
  },
});

export default Profile;