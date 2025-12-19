import React, { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    Alert,
    Button,
    Linking,
    ScrollView,
    StyleSheet,
    Text,
    View
} from 'react-native';
import { assistantApi } from './services/api';

export default function TestConnectionScreen() {
  const [assistants, setAssistants] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const testConnection = async () => {
    setLoading(true);
    setStatus('idle');
    
    console.log('🧪 Testing connection to backend...');
    
    try {
      const response = await assistantApi.getAll();
      
      console.log('✅ SUCCESS! Response:', {
        status: response.status,
        data: response.data,
        count: response.data.length
      });
      
      setAssistants(response.data);
      setStatus('success');
      
      Alert.alert(
        '🎉 CONNECTED!',
        `Frontend successfully connected to backend!\n\n` +
        `Status: ${response.status}\n` +
        `Found ${response.data.length} assistants in database.`
      );
      
    } catch (error: any) {
      console.error('❌ CONNECTION FAILED:', error);
      setStatus('error');
      
      Alert.alert(
        '❌ CONNECTION FAILED',
        `Error: ${error.message}\n\n` +
        `Troubleshooting:\n` +
        `1. Is backend running? (Visual Studio F5)\n` +
        `2. Open: https://localhost:7078/api/Assistants\n` +
        `3. Check browser console (F12) for details`
      );
    } finally {
      setLoading(false);
    }
  };

  const createTestAssistant = async () => {
    try {
      await assistantApi.create({
        firstName: 'Frontend',
        lastName: 'Test',
        email: 'test@clinic.com',
        phone: '0123456789',
        role: 'Test Assistant'
      });
      Alert.alert('✅ Created', 'Test assistant added!');
      testConnection(); // Refresh
    } catch (error) {
      Alert.alert('❌ Error', 'Failed to create assistant');
    }
  };

  const openBackendURL = () => {
    Linking.openURL('https://localhost:7078/api/Assistants');
  };

  useEffect(() => {
    testConnection();
  }, []);

  return (
    <ScrollView style={styles.container}>
      <Text style={styles.title}>🔗 Frontend-Backend Connection Test</Text>
      
      <Text style={styles.subtitle}>
        Testing connection to:{'\n'}
        <Text style={styles.url}>https://localhost:7078</Text>
      </Text>

      {/* Status Display */}
      <View style={[
        styles.statusBox,
        status === 'success' && styles.successBox,
        status === 'error' && styles.errorBox
      ]}>
        <Text style={styles.statusText}>
          {status === 'idle' && '🔵 Ready to test'}
          {status === 'success' && '✅ Connected to backend!'}
          {status === 'error' && '❌ Connection failed'}
        </Text>
      </View>

      {/* Buttons */}
      <View style={styles.buttonContainer}>
        <Button
          title={loading ? "Testing..." : "Test Connection"}
          onPress={testConnection}
          disabled={loading}
          color="#007AFF"
        />
      </View>
      
      <View style={styles.buttonContainer}>
        <Button
          title="Add Test Assistant"
          onPress={createTestAssistant}
          color="#34C759"
        />
      </View>

      <View style={styles.buttonContainer}>
        <Button
          title="Open Backend URL"
          onPress={openBackendURL}
          color="#8E44AD"
        />
      </View>

      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="large" color="#007AFF" />
          <Text style={styles.loadingText}>Connecting to backend...</Text>
        </View>
      )}

      {/* Results */}
      <View style={styles.resultsContainer}>
        <Text style={styles.resultsTitle}>
          📊 Database Results ({assistants.length} assistants)
        </Text>
        
        {assistants.length === 0 ? (
          <Text style={styles.emptyText}>No assistants found. Add one above!</Text>
        ) : (
          assistants.map((assistant) => (
            <View key={assistant.id} style={styles.assistantCard}>
              <Text style={styles.assistantName}>
                {assistant.firstName} {assistant.lastName}
              </Text>
              <Text style={styles.assistantDetail}>📧 {assistant.email}</Text>
              <Text style={styles.assistantDetail}>📞 {assistant.phone}</Text>
              <Text style={styles.assistantDetail}>💼 {assistant.role}</Text>
            </View>
          ))
        )}
      </View>

      {/* Quick Test */}
      <View style={styles.testContainer}>
        <Text style={styles.testTitle}>Quick Manual Test:</Text>
        <Text style={styles.testText}>
          Backend URL:{'\n'}
          <Text style={styles.testLink}>
            https://localhost:7078/api/Assistants
          </Text>
          {'\n\n'}
          Should show: []
          {assistants.length > 0 && ` or ${assistants.length} assistants`}
        </Text>
        
        <Text style={styles.testInstructions}>
          To test manually:{'\n'}
          1. Keep backend running (Visual Studio F5){'\n'}
          2. Click "Open Backend URL" above{'\n'}
          3. Should see JSON data in browser
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#f8f9fa',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1a1a1a',
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 25,
    color: '#666',
    textAlign: 'center',
    lineHeight: 22,
  },
  url: {
    fontWeight: 'bold',
    color: '#007AFF',
    fontFamily: 'monospace',
  },
  statusBox: {
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
    backgroundColor: '#e9ecef',
  },
  successBox: {
    backgroundColor: '#d4edda',
    borderColor: '#c3e6cb',
  },
  errorBox: {
    backgroundColor: '#f8d7da',
    borderColor: '#f5c6cb',
  },
  statusText: {
    fontSize: 16,
    fontWeight: '600',
    textAlign: 'center',
  },
  buttonContainer: {
    marginBottom: 15,
  },
  loadingContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  loadingText: {
    marginTop: 10,
    color: '#666',
  },
  resultsContainer: {
    marginTop: 25,
    padding: 20,
    backgroundColor: 'white',
    borderRadius: 10,
  },
  resultsTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#333',
  },
  emptyText: {
    textAlign: 'center',
    color: '#999',
    fontStyle: 'italic',
    padding: 20,
  },
  assistantCard: {
    padding: 15,
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
    marginBottom: 10,
  },
  assistantName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  assistantDetail: {
    fontSize: 14,
    color: '#555',
    marginBottom: 3,
  },
  testContainer: {
    marginTop: 25,
    padding: 15,
    backgroundColor: '#e8f4fd',
    borderRadius: 8,
    marginBottom: 30,
  },
  testTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#1565c0',
  },
  testText: {
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
    marginBottom: 15,
  },
  testLink: {
    color: '#007AFF',
    fontWeight: 'bold',
    fontFamily: 'monospace',
  },
  testInstructions: {
    fontSize: 13,
    color: '#555',
    lineHeight: 18,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 6,
    borderLeftWidth: 4,
    borderLeftColor: '#3498DB',
  },
});