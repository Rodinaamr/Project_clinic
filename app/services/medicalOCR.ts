// services/medicalOCR.ts - Real OCR Service for Prescription Image Processing
import * as FileSystem from 'expo-file-system';

// Fix for deprecated readAsStringAsync in Expo SDK 52+
const readFileBase64 = async (uri: string): Promise<string> => {
  try {
    return await FileSystem.readAsStringAsync(uri, { encoding: 'base64' });
  } catch (e) {
    // Fallback for newer Expo versions if strict mode is actively blocking it
    // Note: Expo 52+ still supports it but warns. If it errors, we need to handle it.
    console.warn('⚠️ readAsStringAsync failed, trying fetch blob fallback');
    const response = await fetch(uri);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const base64data = reader.result as string;
        // Remove data url prefix (e.g. "data:image/jpeg;base64,")
        resolve(base64data.split(',')[1]);
      };
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }
};

/**
 * Extract text from prescription image using OCR
 * Strategies:
 * 1. Local .NET Backend (Tesseract) - Best for Privacy & Reliability (Requires setup)
 * 2. Google Cloud Vision (Best Public) - Requires API Key
 * 3. OCR.space (Fallback) - Free tier limit issues often occur
 */
export const extractPrescriptionText = async (imageUri: string): Promise<string> => {
  // -------------------------------------------------------------------------
  // STRATEGY 0: GEMINI VISION (Best Quality, Free Tier, One Key)
  // -------------------------------------------------------------------------
  try {
    const { callAI } = require('./aiService'); // Lazy load
    console.log('✨ OCR: Attempting Gemini Vision...');

    // Check if key exists (simple check without importing env directly if issues arise)
    const hasGeminiKey = process.env.EXPO_PUBLIC_GEMINI_API_KEY && process.env.EXPO_PUBLIC_GEMINI_API_KEY !== 'YOUR_GEMINI_API_KEY_HERE';

    if (hasGeminiKey) {
      console.log('✨ OCR: Key found, sending image to Gemini...');
      const base64Image = await readFileBase64(imageUri);

      const prompt = `
          Extract ALL text from this medical prescription image exactly as written. 
          Preserve the structure (line breaks). 
          Do not summarize. 
          Return structured JSON: { "text": "full extracted text here" }
        `;

      const aiResult = await callAI(prompt, true, base64Image);

      if (aiResult.success && aiResult.data && aiResult.data.text) {
        console.log('✅ OCR: Gemini Vision Success');
        return aiResult.data.text;
      } else {
        console.warn('⚠️ OCR: Gemini returned success=false or no data', aiResult);
      }
    } else {
      console.warn('⚠️ OCR: No Gemini Key found in environment variables (EXPO_PUBLIC_GEMINI_API_KEY)');
    }
  } catch (e) {
    console.warn('⚠️ OCR: Gemini Vision failed (Key missing or network issue), skipping...', e);
  }

  // -------------------------------------------------------------------------
  // STRATEGY 1: LOCAL .NET BACKEND (Privacy & Reliability)
  // -------------------------------------------------------------------------
  // -------------------------------------------------------------------------
  // STRATEGY 1: LOCAL .NET BACKEND (Privacy & Reliability)
  // -------------------------------------------------------------------------
  try {
    console.log('🔍 Attempting Local Backend OCR using Tesseract...');

    // List of potential backend URLs to try
    // 1. 192.168.100.31 - Your specific computer's IP (Best for physical device key)
    // 2. 10.0.2.2 - Android Emulator default alias to host
    // 3. localhost - iOS Simulator or Web
    const potentialUrls = [
      'http://192.168.100.31:5148/api/ocr/process',
      'http://10.0.2.2:5148/api/ocr/process',
      'http://localhost:5148/api/ocr/process'
    ];

    let backendSuccess = false;

    for (const backendUrl of potentialUrls) {
      if (backendSuccess) break;

      try {
        console.log(`Trying backend at: ${backendUrl}`);

        const fileExtension = imageUri.split('.').pop()?.toLowerCase() || 'jpg';
        const mimeType = fileExtension === 'png' ? 'image/png' : 'image/jpeg';
        const fileName = `prescription.${fileExtension}`;

        const formData = new FormData();
        formData.append('file', {
          uri: imageUri,
          name: fileName,
          type: mimeType
        } as any);

        // Short timeout for each attempt
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 1500);

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
            console.log(`✅ Local Parsing Success (${backendUrl})`);
            return result.text;
          }
        }
      } catch (err) {
        // Continue to next URL
      }
    }
  } catch (e: any) {
    console.log('⚠️ Local Backend skipped or failed (falling back to Cloud APIs)...');
  }

  // -------------------------------------------------------------------------
  // STRATEGY 2: GOOGLE CLOUD VISION
  // -------------------------------------------------------------------------
  try {
    if (process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY && process.env.EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY !== 'YOUR_GOOGLE_CLOUD_API_KEY_HERE') {
      console.log('🔄 Attempting Google Cloud Vision...');
      const base64Image = await readFileBase64(imageUri);

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
    let base64ForUrl = await readFileBase64(imageUri);

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
    const base64Audio = await readFileBase64(audioUri);

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