// services/medicalOCR.ts - Real OCR Service for Prescription Image Processing
import * as FileSystem from 'expo-file-system';

/**
 * Extract text from prescription image using OCR
 * Strategies:
 * 1. Local .NET Backend (Tesseract) - Best for Privacy & Reliability (Requires setup)
 * 2. Google Cloud Vision (Best Public) - Requires API Key
 * 3. OCR.space (Fallback) - Free tier limit issues often occur
 */
export const extractPrescriptionText = async (imageUri: string): Promise<string> => {
  // -------------------------------------------------------------------------
  // STRATEGY 1: LOCAL .NET BACKEND (Privacy & Reliability)
  // -------------------------------------------------------------------------
  try {
    console.log('� Attempting Local Backend OCR using Tesseract...');

    // For Android Emulator use 10.0.2.2, for Physical Device use your LAN IP (e.g. 192.168.1.9)
    // For Web use localhost
    const backendUrl = 'http://localhost:5148/api/ocr/process';

    const fileExtension = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
    const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
    const fileName = `prescription.${fileExtension}`;

    const formData = new FormData();
    formData.append('file', {
      uri: imageUri,
      name: fileName,
      type: mimeType
    } as any);

    // Short timeout to fallback quickly if backend is not running
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 2000);

    const response = await fetch(backendUrl, {
      method: 'POST',
      body: formData,
      signal: controller.signal,
      headers: {
        'Accept': 'application/json',
      }
    });
    clearTimeout(timeoutId);

    if (response.ok) {
      const result = await response.json();
      if (result.text) {
        console.log('✅ Local Parsing Success');
        return result.text;
      }
    } else {
      // Log error but continue to fallback
      try {
        const err = await response.json();
        console.warn('⚠️ Local Backend Error:', err.error);
        if (err.error && err.error.includes("Training data missing")) {
          throw new Error("BACKEND SETUP REQUIRED: Please download 'eng.traineddata' and place it in the Backend/dermatologyclinicApp/dermatologyclinic/tessdata folder.");
        }
      } catch (e) { }
    }
  } catch (e: any) {
    console.log('⚠️ Local Backend skipped or failed (falling back to Cloud APIs)...');
    if (e.message && e.message.includes("BACKEND SETUP REQUIRED")) throw e;
  }

  // -------------------------------------------------------------------------
  // STRATEGY 2: GOOGLE CLOUD VISION
  // -------------------------------------------------------------------------
  try {
    if (process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY && process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY !== 'YOUR_GOOGLE_CLOUD_API_KEY_HERE') {
      console.log('🔄 Attempting Google Cloud Vision...');
      const base64Image = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });

      const response = await fetch(
        `https://vision.googleapis.com/v1/images:annotate?key=${process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY}`,
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            requests: [{
              image: { content: base64Image },
              features: [{ type: 'DOCUMENT_TEXT_DETECTION', maxResults: 1 }]
            }]
          })
        }
      );
      const result = await response.json();
      if (result.responses?.[0]?.fullTextAnnotation?.text) {
        return result.responses[0].fullTextAnnotation.text;
      }
    }
  } catch (e) { console.warn('⚠️ Google Cloud failed'); }

  // -------------------------------------------------------------------------
  // STRATEGY 3: OCR.SPACE (Last Resort)
  // -------------------------------------------------------------------------
  try {
    console.log('🔄 Attempting OCR.space Fallback...');
    // Detect file type from URI or default to jpeg
    const fileExtension = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
    const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';

    // Read the image file as base64 again to ensure we have it
    let base64ForUrl = await FileSystem.readAsStringAsync(imageUri, { encoding: 'base64' });

    // Ensure clean base64
    const cleanBase64 = base64ForUrl.replace(/(\r\n|\n|\r)/gm, "");

    // Use URLSearchParams for x-www-form-urlencoded body (more reliable than FormData for base64 strings sometimes)
    const bodyParams = new URLSearchParams();
    bodyParams.append('apikey', process.env.EXPO_PUBLIC_OCR_SPACE_API_KEY || 'helloworld');
    bodyParams.append('base64Image', `data:${mimeType};base64,${cleanBase64}`);
    bodyParams.append('language', 'eng');
    bodyParams.append('isOverlayRequired', 'false');
    bodyParams.append('scale', 'true');
    bodyParams.append('detectOrientation', 'true');

    // console.log(`📤 Sending base64 text to OCR API (${mimeType})`);

    const ocrSpaceResponse = await fetch('https://api.ocr.space/parse/image', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: bodyParams.toString(),
    });

    const ocrSpaceResult = await ocrSpaceResponse.json();

    console.log('📊 OCR.space Response:', JSON.stringify(ocrSpaceResult, null, 2));

    if (ocrSpaceResult.ParsedResults && ocrSpaceResult.ParsedResults[0]?.ParsedText) {
      const extractedText = ocrSpaceResult.ParsedResults[0].ParsedText;
      console.log('✅ OCR: Successfully extracted text using OCR.space');
      return extractedText;
    }

    // Check for specific API errors
    if (ocrSpaceResult.ErrorMessage) {
      throw new Error(`OCR API Error: ${ocrSpaceResult.ErrorMessage}. Please check your API key in .env file.`);
    }

    throw new Error('No text could be extracted from this image. Please ensure it is a clear photo of a medical document with readable text.');

  } catch (error: any) {
    console.error('❌ OCR Error:', error);
    // Provide helpful error messages
    if (error.message?.includes('API')) {
      throw error; // Re-throw API errors as-is
    }
    throw new Error(error.message || 'Failed to process image OCR');
  }
};

/**
 * Alternative: Process prescription using audio transcription
 * For voice-based prescription input
 */
export const transcribePrescriptionAudio = async (audioUri: string): Promise<string> => {
  try {
    console.log('🎤 Audio Transcription: Processing audio file:', audioUri);

    // Read audio file as base64
    const base64Audio = await FileSystem.readAsStringAsync(audioUri, {
      encoding: 'base64',
    });

    // Use Google Cloud Speech-to-Text API
    const response = await fetch(
      `https://speech.googleapis.com/v1/speech:recognize?key=${process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY || 'YOUR_API_KEY'}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          config: {
            encoding: 'LINEAR16',
            languageCode: 'en-US',
            enableAutomaticPunctuation: true,
            model: 'medical_conversation',
          },
          audio: {
            content: base64Audio,
          },
        }),
      }
    );

    const result = await response.json();

    if (result.results && result.results[0]?.alternatives) {
      const transcription = result.results[0].alternatives[0].transcript;
      console.log('✅ Audio Transcription: Successfully transcribed audio');
      console.log('📝 Transcription:', transcription);
      return transcription;
    }

    throw new Error('Could not transcribe audio. Please ensure the recording is clear.');

  } catch (error: any) {
    console.error('❌ Audio Transcription Error:', error);
    throw new Error(error.message || 'Failed to transcribe audio');
  }
};