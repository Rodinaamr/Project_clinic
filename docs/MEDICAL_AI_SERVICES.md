# Medical AI Services Documentation

## Overview
This document explains how the medical AI services work together to process prescriptions through OCR (Optical Character Recognition), ACR (Automated Content Recognition), and NLP (Natural Language Processing).

---

## Service Architecture

### 🔄 Processing Flow
```
User Uploads Image/Audio
        ↓
1. medicalOCR.ts (Extract Text)
        ↓
2. medicalACR.ts (Validate Document)
        ↓
3. medicalNLP.ts (Analyze Content)
        ↓
Results Displayed to User
```

---

## Services Breakdown

### 📸 medicalOCR.ts - Text Extraction
**Purpose:** Extract text from prescription images or transcribe audio recordings

**Key Functions:**
- `extractPrescriptionText(imageUri: string)` - Extract text from images
- `transcribePrescriptionAudio(audioUri: string)` - Transcribe audio to text

**How It Works:**
1. Reads the uploaded image/audio file as base64
2. Sends to Google Cloud Vision API for OCR processing
3. Falls back to OCR.space if Google Cloud fails
4. Returns extracted text

**APIs Used:**
- **Primary:** Google Cloud Vision API (Document Text Detection)
- **Fallback:** OCR.space API

**Example Output:**
```
MEDICAL CENTER PRESCRIPTION
DOCTOR: Dr. John Smith
DATE: 2025-12-27
PATIENT: Jane Doe

Rx:
1. Clindamycin 1% Gel
   Apply once daily to affected area
2. Doxycycline 100mg
   Take once daily with food

Follow up: 2 weeks
```

---

### 🔍 medicalACR.ts - Document Validation
**Purpose:** Verify document authenticity and completeness

**Key Function:**
- `validateMedicalDocument(imageUri: string)` - Validate prescription document

**How It Works:**
1. Calls OCR service to extract text
2. Analyzes text for required components:
   - Doctor signature
   - Date
   - Doctor information
   - Patient information
3. Determines document type (prescription, lab result, referral, doctor note)
4. Matches doctor/patient names against database
5. Calculates clarity and validation scores

**Validation Checks:**
- ✓ Document type detection
- ✓ Signature presence
- ✓ Date validation
- ✓ Doctor verification (against database)
- ✓ Patient identification
- ✓ Text clarity score (1-10)

**Example Output:**
```javascript
{
  isValid: true,
  documentType: "prescription",
  hasSignature: true,
  hasDate: true,
  hasDoctorInfo: true,
  hasPatientInfo: true,
  identifiedDoctor: "Dr. John Smith",
  identifiedPatient: "Jane Doe",
  clarityScore: 9,
  confidence: 0.89,
  validationScore: 100,
  recommendations: [
    "✓ Doctor signature detected",
    "✓ Date found in document",
    "✓ Patient identified: Jane Doe",
    "✓ Provider identified: Dr. John Smith"
  ]
}
```

---

### 🧠 medicalNLP.ts - Prescription Analysis
**Purpose:** Analyze prescription content for medications, warnings, and interactions

**Key Function:**
- `analyzePrescription(text: string, patientAllergies?: string[])` - Analyze prescription text

**How It Works:**
1. Extracts medications using regex patterns
2. Identifies dosages and context
3. Checks for drug-allergy interactions
4. Generates medication-specific warnings
5. Detects treatment duration
6. Provides safety recommendations
7. Calculates confidence based on text quality

**Analysis Features:**
- 💊 Medication extraction with dosages
- ⚠️ Drug-allergy interaction checking
- 🔬 Special drug warnings (isotretinoin, doxycycline, etc.)
- ☀️ Photosensitivity alerts
- 🤰 Pregnancy risk detection
- 📅 Treatment duration monitoring
- 🔬 Lab work requirements

**Example Output:**
```javascript
{
  medications: [
    {
      name: "Clindamycin",
      dosage: "1% Gel",
      foundIn: "1. Clindamycin 1% Gel"
    },
    {
      name: "Doxycycline",
      dosage: "100mg",
      foundIn: "2. Doxycycline 100mg"
    }
  ],
  warnings: [
    "☀️ Photosensitivity risk - Use sunscreen SPF 50+",
    "💊 Take with food to avoid GI upset"
  ],
  recommendations: [
    "Schedule follow-up in 2 weeks"
  ],
  severity: "MEDIUM",
  confidence: 0.85,
  summary: "Found 2 medication(s) with 2 clinical observation(s)",
  requiresLabWork: false,
  analysisMetrics: {
    medicationsIdentified: 2,
    warningsGenerated: 2,
    recommendationsProvided: 1,
    medicalTermsDetected: 8,
    hasDosageInfo: true,
    hasContextInfo: true
  }
}
```

---

## Integration Example

### Complete Workflow
```typescript
// 1. User uploads prescription image
const imageUri = "file:///path/to/prescription.jpg";

// 2. Extract text
const extractedText = await extractPrescriptionText(imageUri);
console.log("Extracted:", extractedText);

// 3. Validate document
const validation = await validateMedicalDocument(imageUri);
console.log("Valid:", validation.isValid);
console.log("Score:", validation.validationScore);

// 4. Analyze prescription
const patientAllergies = ["Penicillin", "Sulfa"];
const analysis = await analyzePrescription(extractedText, patientAllergies);
console.log("Medications:", analysis.medications);
console.log("Warnings:", analysis.warnings);
console.log("Severity:", analysis.severity);
```

---

## Setup Requirements

### 1. Install Dependencies
```bash
npm install expo-file-system
```

### 2. Configure API Keys
Create a `.env` file in your project root:
```env
EXPO_PUBLIC_GOOGLE_CLOUD_API_KEY=your_google_cloud_api_key
EXPO_PUBLIC_OCR_SPACE_API_KEY=your_ocr_space_api_key
```

### 3. Enable Google Cloud APIs
- Cloud Vision API (for image OCR)
- Cloud Speech-to-Text API (for audio transcription)

---

## Error Handling

All services include comprehensive error handling:

```typescript
try {
  const text = await extractPrescriptionText(imageUri);
} catch (error) {
  // User-friendly error messages:
  // - Image quality issues
  // - Network connectivity problems
  // - API failures
  console.error(error.message);
}
```

---

## Performance Considerations

### OCR Processing Time
- Image OCR: 2-5 seconds (depending on image size)
- Audio Transcription: 3-8 seconds (depending on audio length)

### API Rate Limits
- **Google Cloud Vision:** 1,800 requests/minute (free tier: 1,000 requests/month)
- **OCR.space:** 25,000 requests/month (free tier)
- **Speech-to-Text:** 60 minutes/month (free tier)

### Optimization Tips
1. Compress images before upload (max 1MB recommended)
2. Use appropriate image formats (JPEG, PNG)
3. Ensure good lighting and clear text in images
4. Cache results to avoid redundant API calls
5. Implement request queuing for multiple uploads

---

## Security Best Practices

### 1. API Key Protection
✅ Store API keys in environment variables
✅ Never commit `.env` to version control
✅ Add `.env` to `.gitignore`
✅ Restrict API keys to specific APIs
✅ Rotate keys regularly

### 2. Data Privacy
✅ Encrypt prescription images in transit
✅ Don't store uploaded images longer than necessary
✅ Comply with HIPAA/healthcare data regulations
✅ Implement user authentication
✅ Use HTTPS for all API calls

### 3. Input Validation
✅ Validate file types before processing
✅ Limit file sizes
✅ Sanitize extracted text
✅ Implement rate limiting
✅ Handle malformed data gracefully

---

## Troubleshooting

### Common Issues

**Issue: "Failed to extract text from prescription"**
- **Cause:** Poor image quality, unclear text
- **Solution:** Ensure image is well-lit, text is clear, use higher resolution

**Issue: "No OCR API could process this image"**
- **Cause:** API key not configured or API quota exceeded
- **Solution:** Check `.env` file, verify API keys, check quota limits

**Issue: "Property 'EncodingType' does not exist"**
- **Cause:** Incorrect expo-file-system usage
- **Solution:** Use `encoding: 'base64'` instead of `FileSystem.EncodingType.Base64`

**Issue: Low confidence scores**
- **Cause:** Poor text quality, incomplete prescriptions
- **Solution:** Improve image quality, ensure complete prescription information

---

## Future Enhancements

### Planned Features
- [ ] Support for handwritten prescriptions
- [ ] Multi-language support
- [ ] Drug interaction database integration
- [ ] Real-time prescription verification with pharmacy
- [ ] Barcode/QR code scanning
- [ ] Insurance verification
- [ ] Prescription history tracking
- [ ] AI-powered dosage recommendations

---

## Support & Resources

### API Documentation
- [Google Cloud Vision](https://cloud.google.com/vision/docs)
- [Google Speech-to-Text](https://cloud.google.com/speech-to-text/docs)
- [OCR.space API](https://ocr.space/OCRAPI)

### Related Services
- `app/services/api.ts` - Backend API integration
- `app/services/doctorApi.ts` - Doctor database queries
- `app/services/patientApi.ts` - Patient database queries
- `app/services/medicationApi.ts` - Medication database queries

---

## License & Credits
Medical AI Services for Dermatology Clinic Application
Built with Google Cloud Vision API and OCR.space API
