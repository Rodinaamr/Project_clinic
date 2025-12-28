// services/medicalNLP.ts - REAL NLP IMPLEMENTATION WITH AI INTEGRATION
import { callAI } from './aiService';

interface AnalysisResult {
  warnings: string[];
  medications: { name: string; dosage: string; foundIn: string }[];
  recommendations: string[];
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  confidence: number;
  summary: string;
  requiresLabWork: boolean;
  analysisMetrics: any;
  source: 'AI_OPENAI' | 'AI_GEMINI' | 'REGEX_FALLBACK';
}

/**
 * Analyzes prescription text using AI (OpenAI/Gemini) with a Regex fallback.
 */
export const analyzePrescription = async (text: string, patientAllergies: string[] = []): Promise<AnalysisResult> => {

  // -------------------------------------------------------------------------
  // AI STRATEGY (Primary)
  // -------------------------------------------------------------------------
  try {
    const prompt = `
      You are a medical AI assistant. Analyze the following prescription text.
      Patient Allergies: ${patientAllergies.join(', ') || 'None'}.
      
      Extract:
      1. Medications (name, dosage, foundIn)
      2. Warnings (drug-drug interactions, allergy conflicts, side effects)
      3. Recommendations (follow-up, administration instructions)
      4. Severity (HIGH, MEDIUM, LOW)
      
      Return JSON ONLY with these exact keys:
      {
        "medications": [{"name": "string", "dosage": "string", "foundIn": "string context"}],
        "warnings": ["string"],
        "recommendations": ["string"],
        "severity": "string",
        "requiresLabWork": boolean,
        "summary": "string"
      }
      
      Prescription Text:
      "${text}"
    `;

    const aiResult = await callAI(prompt, true);

    if (aiResult.success && aiResult.data) {
      console.log(`✅ NLP: AI Analysis Successful via ${aiResult.source}`);
      return {
        ...aiResult.data,
        confidence: 0.95,
        analysisMetrics: { source: aiResult.source },
        source: `AI_${aiResult.source}` as any
      };
    }

  } catch (e) {
    console.warn('⚠️ NLP: AI Analysis failed, falling back to Regex', e);
  }

  // -------------------------------------------------------------------------
  // FALLBACK STRATEGY (Regex)
  // -------------------------------------------------------------------------
  console.log('⚠️ NLP: Using Regex Fallback');
  return analyzeWithRegex(text, patientAllergies);
};

// ============================================================================
// REGEX FALLBACK (Original Logic)
// ============================================================================
const analyzeWithRegex = (text: string, patientAllergies: string[] = []): AnalysisResult => {
  const warnings: string[] = [];
  const medications: any[] = [];
  const recommendations: string[] = [];

  // Extract medications dynamically
  const medRegex = /(\b\w+\b)\s+(\d+%|\d+mg|\d+\s*mg)/gi;
  const medMatches = text.matchAll(medRegex);

  for (const match of medMatches) {
    const name = match[1];
    const dosage = match[2];

    medications.push({
      name,
      dosage,
      foundIn: text.includes(name) ? text.split('\n').find(line => line.includes(name))?.trim() || '' : ''
    });
  }

  // Check for specific drugs and their warnings
  medications.forEach(med => {
    const medName = med.name.toLowerCase();

    // Drug-allergy interactions
    patientAllergies.forEach(allergy => {
      const allergyLower = allergy.toLowerCase();
      if (
        (allergyLower.includes('penicillin') && medName.includes('penicillin')) ||
        (allergyLower.includes('sulfa') && medName.includes('sulfa')) ||
        (allergyLower.includes('tetracycline') && medName.includes('doxycycline')) ||
        (allergyLower.includes('erythromycin') && medName.includes('erythromycin'))
      ) {
        warnings.push(`⚠️ ${med.name} contraindicated - Patient allergy: ${allergy}`);
      }
    });

    // Drug-specific warnings (Hardcoded known interactions)
    if (medName.includes('isotretinoin') || medName.includes('accutane')) {
      warnings.push('⚠️ Isotretinoin requires pregnancy test and monitoring');
      warnings.push('⚠️ Avoid pregnancy for 1 month after treatment');
      recommendations.push('Monthly liver function tests required');
    }

    if (medName.includes('doxycycline') || medName.includes('tetracycline')) {
      warnings.push('☀️ Photosensitivity risk - Use sunscreen SPF 50+');
      warnings.push('💊 Take with food to avoid GI upset');
      if (text.toLowerCase().includes('30 days') || text.toLowerCase().includes('long term')) {
        warnings.push('⚠️ Long-term antibiotic use requires monitoring');
      }
    }

    if (medName.includes('tretinoin') || medName.includes('retinoid')) {
      warnings.push('☀️ Increased sun sensitivity - Strict sun protection required');
      warnings.push('⚠️ Initial skin irritation common');
      recommendations.push('Start with every other day application');
    }

    if (medName.includes('spironolactone')) {
      warnings.push('⚠️ Monitor potassium levels');
      warnings.push('⚠️ Avoid in pregnancy');
    }
  });

  // Check for duration
  const durationMatch = text.match(/(\d+)\s*(week|day|month)s?/i);
  if (durationMatch) {
    const duration = parseInt(durationMatch[1]);
    const unit = durationMatch[2].toLowerCase();

    if ((unit === 'week' && duration > 4) || (unit === 'month' && duration > 1)) {
      warnings.push(`📅 Extended treatment (${duration} ${unit}s) - Monitor for side effects`);
    }
  }

  // Check for follow-up
  if (text.toLowerCase().includes('follow up') || text.toLowerCase().includes('follow-up')) {
    const followUpMatch = text.match(/follow up in (\d+)\s*(week|day|month)s?/i);
    if (followUpMatch) {
      recommendations.push(`Schedule follow-up in ${followUpMatch[1]} ${followUpMatch[2]}s`);
    }
  }

  // Pregnancy warnings for women of childbearing age
  if (text.toLowerCase().includes('woman') || text.toLowerCase().includes('female')) {
    const teratogenicDrugs = ['isotretinoin', 'accutane', 'spironolactone', 'methotrexate'];
    teratogenicDrugs.forEach(drug => {
      if (text.toLowerCase().includes(drug)) {
        warnings.push(`⚠️ ${drug.charAt(0).toUpperCase() + drug.slice(1)} is teratogenic - Pregnancy test required`);
      }
    });
  }

  // Calculate confidence based on analysis quality
  const hasDosages = medications.every(m => m.dosage && m.dosage.trim().length > 0);
  const hasContext = medications.every(m => m.foundIn && m.foundIn.length > 5);
  const medicalTermsCount = (text.match(/\b(mg|ml|tablet|capsule|cream|gel|ointment|apply|take|dose|daily|twice|prescription|rx)\b/gi) || []).length;

  let confidenceScore = 0.65; // Base confidence
  if (medications.length > 0) confidenceScore += 0.10;
  if (hasDosages) confidenceScore += 0.10;
  if (hasContext) confidenceScore += 0.05;
  if (medicalTermsCount > 5) confidenceScore += 0.10;
  confidenceScore = Math.min(0.95, confidenceScore); // Cap at 95%

  // Determine if lab work is required
  const requiresLabWork =
    text.toLowerCase().includes('lab') ||
    text.toLowerCase().includes('test') ||
    text.toLowerCase().includes('blood work') ||
    medications.some(m => {
      const medName = m.name.toLowerCase();
      return ['isotretinoin', 'accutane', 'spironolactone', 'methotrexate'].includes(medName);
    });

  // Return fallback analysis
  return {
    warnings: [...new Set(warnings)],
    medications,
    recommendations: [...new Set(recommendations)],
    severity: warnings.length > 3 ? 'HIGH' : warnings.length > 0 ? 'MEDIUM' : 'LOW',
    confidence: confidenceScore,
    summary: `Found ${medications.length} medication(s) with ${warnings.length} clinical observation(s)`,
    requiresLabWork,
    analysisMetrics: {
      medicationsIdentified: medications.length,
      warningsGenerated: warnings.length,
      recommendationsProvided: recommendations.length,
      medicalTermsDetected: medicalTermsCount,
      hasDosageInfo: hasDosages,
      hasContextInfo: hasContext,
    },
    source: 'REGEX_FALLBACK'
  };
};