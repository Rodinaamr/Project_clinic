import React, { useState } from 'react';
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
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    fullName: 'Sarah Johnson',
    email: 'sarah.johnson@example.com',
    phone: '+1 (555) 123-4567',
    dateOfBirth: 'March 15, 1990',
    address: '123 Main St, New York, NY',
    bloodType: 'O+',
    allergies: 'Penicillin, Peanuts',
    medications: 'Topical Cream, Vitamins',
  });

  // ===== WORKING BUTTONS =====

  // 1. Edit Profile Button
  const handleEditProfile = () => {
    setIsEditing(true);
    Alert.alert('✏️ Edit Mode', 'You can now edit your profile information.');
  };

  // 2. Save Changes Button
  const handleSaveChanges = () => {
    setIsEditing(false);
    Alert.alert(
      '✅ Profile Saved',
      'Your profile has been updated successfully!',
      [{ text: 'OK' }]
    );
  };

  // 3. Cancel Edit Button
  const handleCancelEdit = () => {
    setIsEditing(false);
    Alert.alert('Edit Cancelled', 'No changes were made.');
  };

  // 4. Change Photo Button
  const handleChangePhoto = () => {
    Alert.alert(
      '📷 Change Profile Photo',
      'Choose an option:',
      [
        {
          text: '📸 Take Photo',
          onPress: () => Alert.alert('Camera', 'Opening camera...')
        },
        {
          text: '🖼️ Choose from Gallery',
          onPress: () => Alert.alert('Gallery', 'Opening photo gallery...')
        },
        {
          text: '👤 Use Default Avatar',
          onPress: () => Alert.alert('Avatar', 'Default avatar selected')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  // 5. Update Field
  const updateField = (field: string, value: string) => {
    setProfile(prev => ({ ...prev, [field]: value }));
  };

  // 6. Verify Email Button
  const handleVerifyEmail = () => {
    Alert.alert(
      '📧 Verify Email',
      'Verification email sent to sarah.johnson@example.com',
      [
        { text: 'Resend Email', onPress: () => Alert.alert('Email Resent', 'Check your inbox') },
        { text: 'Enter Code', onPress: () => showVerificationCodeInput() },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  const showVerificationCodeInput = () => {
    Alert.prompt(
      'Enter Verification Code',
      'Enter the 6-digit code sent to your email:',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Verify',
          onPress: (code?: string) => {
            if (code && code.length === 6) {
              Alert.alert('✅ Email Verified!', 'Your email has been verified successfully.');
            } else {
              Alert.alert('❌ Invalid Code', 'Please enter a valid 6-digit code.');
            }
          }
        }
      ],
      'plain-text'
    );
  };

  // 7. Download Medical Records
  const handleDownloadRecords = () => {
    Alert.alert(
      '📄 Download Records',
      'Choose format:',
      [
        {
          text: '📋 PDF Format',
          onPress: () => Alert.alert('Downloading...', 'PDF file will be saved to your device')
        },
        {
          text: '📊 Excel Format',
          onPress: () => Alert.alert('Downloading...', 'Excel file will be saved to your device')
        },
        { text: 'Cancel', style: 'cancel' }
      ]
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Wahid Lofty Clinics</Text>
        <Text style={styles.pageTitle}>My Profile</Text>
      </View>

      <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
        
        {/* Profile Photo Section */}
        <View style={styles.photoSection}>
          <View style={styles.avatarContainer}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>SJ</Text>
            </View>
            <TouchableOpacity style={styles.changePhotoButton} onPress={handleChangePhoto}>
              <Text style={styles.changePhotoText}>📷 Change Photo</Text>
            </TouchableOpacity>
          </View>
          
          <Text style={styles.profileName}>{profile.fullName}</Text>
          <Text style={styles.profileEmail}>{profile.email}</Text>
          <Text style={styles.profileId}>Patient ID: PT-12345</Text>
        </View>

        {/* Edit/Save Buttons */}
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

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Personal Information</Text>
          
          <View style={styles.infoCard}>
            <InfoField 
              label="Full Name" 
              value={profile.fullName}
              editable={isEditing}
              onChange={(value: string) => updateField('fullName', value)}
            />
            <InfoField 
              label="Email" 
              value={profile.email}
              editable={isEditing}
              onChange={(value: string) => updateField('email', value)}
              rightButton={
                <TouchableOpacity onPress={handleVerifyEmail}>
                  <Text style={styles.verifyButton}>Verify</Text>
                </TouchableOpacity>
              }
            />
            <InfoField 
              label="Phone" 
              value={profile.phone}
              editable={isEditing}
              onChange={(value: string) => updateField('phone', value)}
            />
            <InfoField 
              label="Date of Birth" 
              value={profile.dateOfBirth}
              editable={isEditing}
              onChange={(value: string) => updateField('dateOfBirth', value)}
            />
            <InfoField 
              label="Address" 
              value={profile.address}
              editable={isEditing}
              onChange={(value: string) => updateField('address', value)}
            />
          </View>
        </View>

        {/* Medical Information */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Medical Information</Text>
          
          <View style={styles.infoCard}>
            <InfoField 
              label="Blood Type" 
              value={profile.bloodType}
              editable={isEditing}
              onChange={(value: string) => updateField('bloodType', value)}
            />
            <InfoField 
              label="Allergies" 
              value={profile.allergies}
              editable={isEditing}
              onChange={(value: string) => updateField('allergies', value)}
            />
            <InfoField 
              label="Current Medications" 
              value={profile.medications}
              editable={isEditing}
              onChange={(value: string) => updateField('medications', value)}
            />
          </View>
        </View>

        {/* Download Records Button */}
        <TouchableOpacity 
          style={styles.downloadButton}
          onPress={handleDownloadRecords}
        >
          <Text style={styles.downloadButtonText}>📥 Download Medical Records</Text>
        </TouchableOpacity>

        {/* Emergency Contact */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Emergency Contact</Text>
          
          <View style={styles.emergencyCard}>
            <Text style={styles.emergencyName}>John Johnson (Father)</Text>
            <Text style={styles.emergencyPhone}>📞 +1 (555) 987-6543</Text>
            <TouchableOpacity 
              style={styles.editContactButton}
              onPress={() => Alert.alert('Edit Contact', 'Edit emergency contact feature')}
            >
              <Text style={styles.editContactText}>Edit Contact</Text>
            </TouchableOpacity>
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
      <TextInput
        style={styles.infoInput}
        value={value}
        onChangeText={onChange}
        placeholder={value}
      />
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