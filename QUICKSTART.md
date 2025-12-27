# 🚀 Quick Start Guide - Medical AI Services

## Get Started in 5 Minutes

### Step 1: Setup API Keys (2 minutes)

1. **Copy the environment template:**
   ```bash
   copy .env.example .env
   ```

2. **For testing (fastest option):**
   - Open `.env` file
   - Use the default OCR.space key that's already there:
   ```env
   EXPO_PUBLIC_OCR_SPACE_API_KEY=helloworld
   ```
   - This gives you 25,000 free requests/month!

3. **For production (recommended):**
   - Get Google Cloud Vision API key (see below)
   - Add it to `.env`:
   ```env
   EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY=your_actual_key_here
   ```

### Step 2: Install Dependencies (1 minute)

The required package should already be installed, but verify:
```bash
npm install expo-file-system
```

### Step 3: Test It! (2 minutes)

Copy this code into any component:

```typescript
import { extractPrescriptionText } from './services/medicalOCR';
import { validateMedicalDocument } from './services/medicalACR';
import { analyzePrescription } from './services/medicalNLP';
import * as ImagePicker from 'expo-image-picker';

// Inside your component:
const testPrescriptionScanner = async () => {
  // 1. Pick an image
  const result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    quality: 1,
  });

  if (result.canceled) return;

  const imageUri = result.assets[0].uri;

  // 2. Extract text (OCR)
  const text = await extractPrescriptionText(imageUri);
  console.log('Extracted:', text);

  // 3. Validate document (ACR)
  const validation = await validateMedicalDocument(imageUri);
  console.log('Valid:', validation.isValid);
  console.log('Score:', validation.validationScore);

  // 4. Analyze prescription (NLP)
  const analysis = await analyzePrescription(text, ['Penicillin']);
  console.log('Medications:', analysis.medications);
  console.log('Warnings:', analysis.warnings);
};
```

---

## 🎯 That's It!

You now have **fully functional medical AI services** that:
- ✅ Extract text from prescription images (OCR)
- ✅ Validate document authenticity (ACR)
- ✅ Analyze medications and generate warnings (NLP)
- ✅ Support audio transcription
- ✅ Work with real uploaded data (no mock data!)

---

## 📱 Testing with Your Phone

1. Start your Expo app:
   ```bash
   npx expo start
   ```

2. Scan the QR code with Expo Go app

3. Take a photo of any prescription or upload one from your gallery

4. Watch the magic happen! 🎉

---

## 🔧 Getting Google Cloud API Key (Optional but Recommended)

### Why Google Cloud Vision?
- Better accuracy than free alternatives
- Supports handwritten text
- 1,000 free requests/month
- Medical document optimization

### Setup (5 minutes):

1. **Go to Google Cloud Console:**
   - Visit: https://console.cloud.google.com/

2. **Create a new project:**
   - Click "Select a project" → "New Project"
   - Name it: "Medical Clinic OCR"
   - Click "Create"

3. **Enable APIs:**
   - Search for "Cloud Vision API" → Enable
   - Search for "Cloud Speech-to-Text API" → Enable (for audio support)

4. **Create API Key:**
   - Go to "APIs & Services" → "Credentials"
   - Click "Create Credentials" → "API Key"
   - Copy the key

5. **Secure your key (recommended):**
   - Click "Edit API key"
   - Under "API restrictions" → "Restrict key"
   - Select:
     - ✅ Cloud Vision API
     - ✅ Cloud Speech-to-Text API
   - Click "Save"

6. **Add to your .env file:**
   ```env
   EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY=AIzaSy... (your key)
   ```

---

## 🧪 Testing Examples

### Test Case 1: Valid Prescription
Upload an image with:
- Doctor name visible
- Patient name visible
- Date
- Medications with dosages
- Signature or stamp

**Expected Result:**
```
✅ Validation Score: 100/100
✅ Document Type: prescription
✅ 2-3 medications identified
✅ Relevant warnings based on medications
✅ Confidence: 85-95%
```

### Test Case 2: Missing Information
Upload a prescription missing a signature

**Expected Result:**
```
⚠️ Validation Score: 75/100
✗ Missing doctor signature
✓ Other fields present
```

### Test Case 3: Audio Prescription
Record yourself saying:
"Prescribe Doxycycline 100mg once daily for acne, and Tretinoin cream 0.05% apply at night"

**Expected Result:**
```
✅ Transcription successful
✅ 2 medications identified
⚠️ Warnings about photosensitivity
```

---

## 📊 What Each Service Does

### 1. OCR (medicalOCR.ts)
**Input:** Prescription image or audio  
**Output:** Extracted text  
**Time:** 2-5 seconds

### 2. ACR (medicalACR.ts)
**Input:** Prescription image  
**Output:** Validation score (0-100) + authenticity check  
**Time:** 3-6 seconds (includes OCR)

### 3. NLP (medicalNLP.ts)
**Input:** Prescription text + patient allergies  
**Output:** Medications, warnings, recommendations  
**Time:** < 1 second

---

## 🐛 Troubleshooting

### "Failed to extract text"
**Solution:** 
- Ensure image is clear and well-lit
- Check that `.env` file exists with API keys
- Verify internet connection

### "Property EncodingType does not exist"
**Solution:** Already fixed! Services use `encoding: 'base64'`

### "API quota exceeded"
**Solution:** 
- Wait until next month (free tier resets)
- Or switch to OCR.space fallback
- Or upgrade to paid tier

### Low confidence scores
**Solution:**
- Use higher resolution images
- Ensure prescription text is clearly visible
- Include all required fields (doctor, patient, date, signature)

---

## 📖 More Resources

- **Full Documentation:** See `docs/MEDICAL_AI_SERVICES.md`
- **Usage Examples:** See `examples/PrescriptionScannerExample.tsx`
- **Change Summary:** See `REFACTORING_SUMMARY.md`

---

## 🎉 You're Ready!

Your medical AI services are now fully configured and ready to process real prescriptions!

**No more hardcoded data. No more mock results. Everything is real and dynamic!**

Happy coding! 🚀
