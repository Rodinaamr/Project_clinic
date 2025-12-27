# Examples Folder

This folder contains example code demonstrating how to use the Medical AI Services.

## 📁 Files

### `PrescriptionScannerExample.tsx`
A complete React Native component showing how to integrate OCR, ACR, and NLP services.

**⚠️ Important:** This is a **reference example** file, not meant to be run directly in your app. 

### How to Use These Examples

1. **Copy the code** you need from the example files
2. **Paste it into your actual app components** (e.g., in `app/` folder)
3. **Adjust the import paths** based on where you place the code

### Import Paths

When copying code from examples to your app:

**From `examples/` folder** (as shown in examples):
```typescript
import { extractPrescriptionText } from '../app/services/medicalOCR';
import { validateMedicalDocument } from '../app/services/medicalACR';
import { analyzePrescription } from '../app/services/medicalNLP';
```

**From `app/` folder** (when using in your actual app):
```typescript
import { extractPrescriptionText } from './services/medicalOCR';
import { validateMedicalDocument } from './services/medicalACR';
import { analyzePrescription } from './services/medicalNLP';
```

**From `app/components/` folder**:
```typescript
import { extractPrescriptionText } from '../services/medicalOCR';
import { validateMedicalDocument } from '../services/medicalACR';
import { analyzePrescription } from '../services/medicalNLP';
```

## 🚀 Quick Integration

### Example 1: Add to Existing Component

```typescript
// In your existing component file (e.g., app/patient/prescriptions.tsx)
import { extractPrescriptionText } from '../services/medicalOCR';
import { validateMedicalDocument } from '../services/medicalACR';
import { analyzePrescription } from '../services/medicalNLP';
import * as ImagePicker from 'expo-image-picker';

export default function PrescriptionsScreen() {
  const handleScanPrescription = async () => {
    // Pick image
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });
    
    if (result.canceled) return;
    
    const imageUri = result.assets[0].uri;
    
    // Process prescription
    const text = await extractPrescriptionText(imageUri);
    const validation = await validateMedicalDocument(imageUri);
    const analysis = await analyzePrescription(text, patientAllergies);
    
    // Use the results...
    console.log(analysis);
  };
  
  return (
    // Your UI here
    <Button title="Scan Prescription" onPress={handleScanPrescription} />
  );
}
```

### Example 2: Create New Dedicated Component

Create a new file: `app/components/PrescriptionScanner.tsx`

Then copy the code from `examples/PrescriptionScannerExample.tsx` and update the imports:

```typescript
// Change from:
import { extractPrescriptionText } from '../app/services/medicalOCR';

// To:
import { extractPrescriptionText } from '../services/medicalOCR';
```

## 📚 More Information

- See `QUICKSTART.md` for setup instructions
- See `docs/MEDICAL_AI_SERVICES.md` for detailed documentation
- See `REFACTORING_SUMMARY.md` for what changed

## ⚠️ Note About TypeScript Errors

If you see import errors in the examples folder, that's normal! These are reference files.

When you copy the code to your actual app location and adjust the import paths, the errors will disappear.

The examples show how to use the services, but you should integrate them into your actual app components with proper import paths for your file structure.
