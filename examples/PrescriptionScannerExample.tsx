// Example usage of Medical AI Services
// This file demonstrates how to integrate OCR, ACR, and NLP services in your React Native components

import * as DocumentPicker from 'expo-document-picker';
import * as ImagePicker from 'expo-image-picker';
import React, { useState } from 'react';
import { ActivityIndicator, Alert, Button, Text, View } from 'react-native';
import { validateMedicalDocument } from '../app/services/medicalACR';
import { analyzePrescription } from '../app/services/medicalNLP';
import { extractPrescriptionText, transcribePrescriptionAudio } from '../app/services/medicalOCR';

export default function PrescriptionScanner() {
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState<any>(null);

    // ========================================
    // Method 1: Process Image Prescription
    // ========================================
    const processImagePrescription = async () => {
        try {
            setLoading(true);

            // Step 1: Pick an image
            const result = await ImagePicker.launchImageLibraryAsync({
                mediaTypes: ImagePicker.MediaTypeOptions.Images,
                allowsEditing: true,
                quality: 1,
            });

            if (result.canceled) {
                setLoading(false);
                return;
            }

            const imageUri = result.assets[0].uri;
            console.log('📸 Selected image:', imageUri);

            // Step 2: Extract text using OCR
            console.log('🔄 Extracting text from image...');
            const extractedText = await extractPrescriptionText(imageUri);
            console.log('✅ Extracted text:', extractedText);

            // Step 3: Validate document using ACR
            console.log('🔄 Validating document...');
            const validation = await validateMedicalDocument(imageUri);
            console.log('✅ Validation complete:', validation);

            // Step 4: Analyze prescription using NLP
            console.log('🔄 Analyzing prescription...');

            // Get patient allergies (you would fetch this from your patient profile)
            const patientAllergies = ['Penicillin', 'Sulfa']; // Example

            const analysis = await analyzePrescription(extractedText, patientAllergies);
            console.log('✅ Analysis complete:', analysis);

            // Step 5: Display results
            setResults({
                extractedText,
                validation,
                analysis,
            });

            // Show summary alert
            Alert.alert(
                'Processing Complete',
                `Found ${analysis.medications.length} medication(s)\n` +
                `Validation Score: ${validation.validationScore}/100\n` +
                `${analysis.warnings.length} warning(s) detected\n` +
                `Severity: ${analysis.severity}`,
                [{ text: 'OK' }]
            );

            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            console.error('❌ Error processing prescription:', error);
            Alert.alert('Error', error.message || 'Failed to process prescription');
        }
    };

    // ========================================
    // Method 2: Process Audio Prescription
    // ========================================
    const processAudioPrescription = async () => {
        try {
            setLoading(true);

            // Step 1: Pick an audio file
            const result = await DocumentPicker.getDocumentAsync({
                type: 'audio/*',
            });

            if (result.canceled) {
                setLoading(false);
                return;
            }

            const audioUri = result.assets[0].uri;
            console.log('🎤 Selected audio:', audioUri);

            // Step 2: Transcribe audio
            console.log('🔄 Transcribing audio...');
            const transcribedText = await transcribePrescriptionAudio(audioUri);
            console.log('✅ Transcribed text:', transcribedText);

            // Step 3: Analyze transcribed text using NLP
            console.log('🔄 Analyzing prescription...');
            const patientAllergies = ['Penicillin']; // Example
            const analysis = await analyzePrescription(transcribedText, patientAllergies);
            console.log('✅ Analysis complete:', analysis);

            // Step 4: Display results
            setResults({
                extractedText: transcribedText,
                validation: { message: 'Audio transcription - manual validation recommended' },
                analysis,
            });

            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            console.error('❌ Error processing audio:', error);
            Alert.alert('Error', error.message || 'Failed to process audio');
        }
    };

    // ========================================
    // Method 3: Camera Capture & Process
    // ========================================
    const capturePrescription = async () => {
        try {
            // Request camera permissions
            const permission = await ImagePicker.requestCameraPermissionsAsync();
            if (!permission.granted) {
                Alert.alert('Permission Required', 'Camera access is needed to scan prescriptions');
                return;
            }

            setLoading(true);

            // Capture image
            const result = await ImagePicker.launchCameraAsync({
                allowsEditing: true,
                quality: 1,
            });

            if (result.canceled) {
                setLoading(false);
                return;
            }

            const imageUri = result.assets[0].uri;

            // Process the captured image (same as Method 1)
            const extractedText = await extractPrescriptionText(imageUri);
            const validation = await validateMedicalDocument(imageUri);
            const analysis = await analyzePrescription(extractedText, []);

            setResults({ extractedText, validation, analysis });
            setLoading(false);
        } catch (error: any) {
            setLoading(false);
            Alert.alert('Error', error.message || 'Failed to capture prescription');
        }
    };

    // ========================================
    // Method 4: Validate Existing Prescription Text
    // ========================================
    const validateExistingText = async (prescriptionText: string) => {
        try {
            setLoading(true);

            // If you already have the text, you can skip OCR
            const patientAllergies = ['Penicillin', 'Sulfa'];
            const analysis = await analyzePrescription(prescriptionText, patientAllergies);

            console.log('Analysis:', analysis);

            // Check for safety issues
            if (analysis.severity === 'HIGH') {
                Alert.alert(
                    '⚠️ High Risk Detected',
                    `${analysis.warnings.length} critical warnings found:\n\n` +
                    analysis.warnings.join('\n'),
                    [{ text: 'Review', style: 'destructive' }]
                );
            }

            setLoading(false);
            return analysis;
        } catch (error: any) {
            setLoading(false);
            console.error('Validation error:', error);
            return null;
        }
    };

    // ========================================
    // Render UI
    // ========================================
    return (
        <View style={{ padding: 20 }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold', marginBottom: 20 }}>
                Prescription Scanner
            </Text>

            {loading ? (
                <View>
                    <ActivityIndicator size="large" color="#007AFF" />
                    <Text style={{ textAlign: 'center', marginTop: 10 }}>
                        Processing prescription...
                    </Text>
                </View>
            ) : (
                <View>
                    <Button
                        title="📸 Scan Prescription (Gallery)"
                        onPress={processImagePrescription}
                    />
                    <View style={{ height: 10 }} />

                    <Button
                        title="📷 Capture Prescription (Camera)"
                        onPress={capturePrescription}
                    />
                    <View style={{ height: 10 }} />

                    <Button
                        title="🎤 Upload Audio Prescription"
                        onPress={processAudioPrescription}
                    />
                </View>
            )}

            {/* Display Results */}
            {results && (
                <View style={{ marginTop: 20, padding: 15, backgroundColor: '#f5f5f5', borderRadius: 10 }}>
                    <Text style={{ fontWeight: 'bold', fontSize: 16, marginBottom: 10 }}>
                        Results:
                    </Text>

                    {/* Validation Score */}
                    <Text style={{ marginBottom: 5 }}>
                        ✓ Validation Score: {results.validation?.validationScore || 'N/A'}/100
                    </Text>

                    {/* Medications Found */}
                    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Medications:</Text>
                    {results.analysis?.medications?.map((med: any, index: number) => (
                        <Text key={index} style={{ marginLeft: 10 }}>
                            • {med.name} - {med.dosage}
                        </Text>
                    ))}

                    {/* Warnings */}
                    {results.analysis?.warnings?.length > 0 && (
                        <>
                            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#ff6b6b' }}>
                                Warnings ({results.analysis.warnings.length}):
                            </Text>
                            {results.analysis.warnings.map((warning: string, index: number) => (
                                <Text key={index} style={{ marginLeft: 10, color: '#ff6b6b' }}>
                                    {warning}
                                </Text>
                            ))}
                        </>
                    )}

                    {/* Recommendations */}
                    {results.analysis?.recommendations?.length > 0 && (
                        <>
                            <Text style={{ fontWeight: 'bold', marginTop: 10, color: '#4caf50' }}>
                                Recommendations:
                            </Text>
                            {results.analysis.recommendations.map((rec: string, index: number) => (
                                <Text key={index} style={{ marginLeft: 10, color: '#4caf50' }}>
                                    {rec}
                                </Text>
                            ))}
                        </>
                    )}

                    {/* Extracted Text Preview */}
                    <Text style={{ fontWeight: 'bold', marginTop: 10 }}>Extracted Text:</Text>
                    <Text style={{ marginLeft: 10, fontSize: 12, color: '#666' }}>
                        {results.extractedText?.substring(0, 200)}...
                    </Text>
                </View>
            )}
        </View>
    );
}

// ========================================
// Advanced Usage Examples
// ========================================

/**
 * Example 1: Batch Process Multiple Prescriptions
 */
export const batchProcessPrescriptions = async (imageUris: string[]) => {
    const results = [];

    for (const imageUri of imageUris) {
        try {
            const text = await extractPrescriptionText(imageUri);
            const validation = await validateMedicalDocument(imageUri);
            const analysis = await analyzePrescription(text, []);

            results.push({
                imageUri,
                text,
                validation,
                analysis,
                success: true,
            });
        } catch (error: any) {
            results.push({
                imageUri,
                error: error.message,
                success: false,
            });
        }
    }

    return results;
};

/**
 * Example 2: Save Results to Backend
 */
export const savePrescriptionAnalysis = async (
    patientId: number,
    prescriptionData: any
) => {
    try {
        // Save to your backend API
        const response = await fetch('https://your-api.com/prescriptions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                patientId,
                extractedText: prescriptionData.extractedText,
                medications: prescriptionData.analysis.medications,
                warnings: prescriptionData.analysis.warnings,
                validationScore: prescriptionData.validation.validationScore,
                isValid: prescriptionData.validation.isValid,
                timestamp: new Date().toISOString(),
            }),
        });

        return await response.json();
    } catch (error: any) {
        console.error('Failed to save prescription:', error);
        throw error;
    }
};

/**
 * Example 3: Check Drug Interactions Before Prescribing
 */
export const checkDrugInteractions = async (
    newPrescriptionText: string,
    currentMedications: string[],
    allergies: string[]
) => {
    // Analyze new prescription
    const newAnalysis = await analyzePrescription(newPrescriptionText, allergies);

    // Check for interactions with current medications
    const interactions: string[] = [];

    newAnalysis.medications.forEach((newMed: any) => {
        currentMedications.forEach((currentMed) => {
            // Add your drug interaction logic here
            // This is a simplified example
            if (newMed.name.toLowerCase().includes('doxycycline') &&
                currentMed.toLowerCase().includes('antacid')) {
                interactions.push(`⚠️ ${newMed.name} and ${currentMed}: Reduce absorption`);
            }
        });
    });

    return {
        ...newAnalysis,
        drugInteractions: interactions,
    };
};
