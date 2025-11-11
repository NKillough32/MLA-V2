/**
 * Consolidated calculator registry
 * Combines native V2 calculators with bridge calculators sourced from ExtractedCalculators
 */

import { TOOL_CATEGORIES } from './Constants.js';
import { v2Calculators } from './Calculators.js';

const CATEGORY_LABELS = {
    GENERAL: 'General',
    CARDIOLOGY: TOOL_CATEGORIES.CARDIOLOGY,
    NEUROLOGY: TOOL_CATEGORIES.NEUROLOGY,
    RESPIRATORY: TOOL_CATEGORIES.RESPIRATORY,
    CRITICAL_CARE: TOOL_CATEGORIES.CRITICAL_CARE,
    NEPHROLOGY: TOOL_CATEGORIES.NEPHROLOGY || 'Nephrology',
    RENAL: TOOL_CATEGORIES.RENAL || 'Renal',
    GASTROENTEROLOGY: TOOL_CATEGORIES.GASTROENTEROLOGY,
    HEPATOLOGY: 'Hepatology',
    LABORATORY: 'Laboratory',
    LAB: 'Laboratory',
    CHEMISTRY: TOOL_CATEGORIES.CHEMISTRY,
    ASSESSMENT: 'Assessment',
    RISK: 'Risk',
    VASCULAR: 'Vascular',
    INFECTIOUS_DISEASE: 'Infectious Disease',
    SURGERY: 'Surgery',
    PSYCHIATRY: TOOL_CATEGORIES.PSYCHIATRY,
    NUTRITION: 'Nutrition',
    GERIATRICS: TOOL_CATEGORIES.GERIATRICS,
    OBSTETRICS: TOOL_CATEGORIES.OBSTETRICS,
    PAEDIATRICS: 'Paediatrics',
    PHARMACOLOGY: 'Pharmacology',
    ENDOCRINOLOGY: 'Endocrinology',
    ENDOCRINE: TOOL_CATEGORIES.ENDOCRINE,
    UTILITIES: 'Utilities',
    PALLIATIVE: 'Palliative Care',
    ORTHOPAEDICS: 'Orthopaedics',
    EMERGENCY: TOOL_CATEGORIES.EMERGENCY,
    OTHER: TOOL_CATEGORIES.OTHER,
    BODY_METRICS: TOOL_CATEGORIES.BODY_METRICS
};

const toTitleCase = (identifier = '') => identifier
    .toLowerCase()
    .split('_')
    .map(part => part.charAt(0).toUpperCase() + part.slice(1))
    .join(' ');

const resolveCategory = (identifier) => {
    if (!identifier) {
        return TOOL_CATEGORIES.OTHER;
    }

    const resolved = CATEGORY_LABELS[identifier] || TOOL_CATEGORIES[identifier];

    if (resolved) {
        return /^[a-z\s]+$/.test(resolved) ? toTitleCase(resolved.toUpperCase().replace(/\s+/g, '_')) : resolved;
    }

    return toTitleCase(identifier);
};

export const BRIDGE_CALCULATOR_DEFINITIONS = [
    {
        id: 'bmi',
        name: 'BMI Calculator',
        category: 'GENERAL',
        description: 'Body Mass Index calculation and interpretation',
        keywords: [
            'bmi',
            'body',
            'mass',
            'index',
            'weight',
            'height',
            'obesity'
        ],
        getter: 'getBMICalculator',
        calculator: 'calculateBMI'
    },
    {
        id: 'gcs',
        name: 'Glasgow Coma Scale',
        category: 'NEUROLOGY',
        description: 'Neurological assessment scale',
        keywords: [
            'gcs',
            'glasgow',
            'coma',
            'scale',
            'consciousness',
            'neurology'
        ],
        getter: 'getGCSCalculator',
        calculator: 'calculateGCS'
    },
    {
        id: 'madders',
        name: 'MADDERS Score',
        category: 'ASSESSMENT',
        description: 'Mental health assessment tool',
        keywords: [
            'madders',
            'mental',
            'health',
            'assessment',
            'score'
        ],
        getter: 'getMADDERSCalculator',
        calculator: 'calculateMADDERS'
    },
    {
        id: 'grace',
        name: 'GRACE Score',
        category: 'CARDIOLOGY',
        description: 'Risk stratification for ACS',
        keywords: [
            'grace',
            'acs',
            'risk',
            'cardiac',
            'heart'
        ],
        getter: 'getGRACECalculator',
        calculator: 'calculateGRACE'
    },
    {
        id: 'chads2vasc',
        name: 'CHADS2-VASc Score',
        category: 'CARDIOLOGY',
        description: 'Stroke risk assessment in atrial fibrillation',
        keywords: [
            'chads2',
            'vasc',
            'stroke',
            'risk',
            'atrial',
            'fibrillation',
            'anticoagulation'
        ],
        getter: 'getCHADS2VAScCalculator',
        calculator: 'calculateCHADS2VASc'
    },
    {
        id: 'hasbled',
        name: 'HAS-BLED Score',
        category: 'CARDIOLOGY',
        description: 'Bleeding risk assessment for anticoagulation',
        keywords: [
            'hasbled',
            'bleeding',
            'risk',
            'anticoagulation',
            'warfarin'
        ],
        getter: 'getHASBLEDCalculator',
        calculator: 'calculateHASBLED'
    },
    {
        id: 'heart',
        name: 'HEART Score',
        category: 'CARDIOLOGY',
        description: 'Predicts 6-week major adverse cardiac events in chest pain',
        keywords: [
            'heart',
            'chest pain',
            'cardiac',
            'mace',
            'risk'
        ],
        getter: 'getHEARTCalculator',
        calculator: 'calculateHEART'
    },
    {
        id: 'caprini',
        name: 'Caprini VTE Risk Score',
        category: 'CARDIOLOGY',
        description: 'Stratifies venous thromboembolism risk in surgical patients',
        keywords: [
            'caprini',
            'vte',
            'dvt',
            'thrombosis',
            'surgery',
            'prophylaxis'
        ],
        getter: 'getCapriniCalculator',
        calculator: 'calculateCaprini'
    },
    {
        id: 'qrisk3',
        name: 'QRISK3',
        category: 'RISK',
        description: 'CV risk assessment',
        keywords: [
            'qrisk',
            'cardiovascular',
            'risk',
            'prevention'
        ],
        getter: 'getQRISK3Calculator',
        calculator: 'calculateQRISK3',
        requiresUnofficialQrisk: true
    },
    {
        id: 'qrisk',
        name: 'QRISK Calculator',
        category: 'RISK',
        description: 'Cardiovascular risk assessment (legacy version)',
        keywords: [
            'qrisk',
            'cardiovascular',
            'risk',
            'prevention',
            'legacy'
        ],
        getter: 'getQRISKCalculator',
        calculator: 'calculateQRISK',
        requiresUnofficialQrisk: true
    },
    {
        id: 'qrisk3-official',
        name: 'QRISK3 Calculator (Official)',
        category: 'RISK',
        description: '10-year CVD risk using validated ClinRisk algorithm',
        keywords: [
            'qrisk3',
            'qrisk',
            'cardiovascular',
            'cvd',
            'risk',
            'prevention',
            'official',
            'clinrisk',
            'nice',
            'statin',
            'cholesterol'
        ],
        getter: 'getQRISK3OfficialCalculator',
        calculator: 'calculateQRISK3Official'
    },
    {
        id: 'curb65',
        name: 'CURB-65',
        category: 'RESPIRATORY',
        description: 'Pneumonia severity assessment',
        keywords: [
            'curb',
            'pneumonia',
            'severity',
            'respiratory'
        ],
        getter: 'getCURB65Calculator',
        calculator: 'calculateCURB65'
    },
    {
        id: 'crb65',
        name: 'CRB-65',
        category: 'RESPIRATORY',
        description: 'Community pneumonia severity assessment (without urea)',
        keywords: [
            'crb',
            'pneumonia',
            'severity',
            'respiratory',
            'community'
        ],
        getter: 'getCRB65Calculator',
        calculator: 'calculateCRB65'
    },
    {
        id: 'pefr',
        name: 'Peak Flow Calculator',
        category: 'RESPIRATORY',
        description: 'Expected peak expiratory flow rate',
        keywords: [
            'pefr',
            'peak',
            'flow',
            'respiratory',
            'asthma'
        ],
        getter: 'getPEFRCalculator',
        calculator: 'calculatePEFR'
    },
    {
        id: 'nihss',
        name: 'NIHSS',
        category: 'NEUROLOGY',
        description: 'Stroke severity assessment',
        keywords: [
            'nihss',
            'stroke',
            'neurology',
            'severity'
        ],
        getter: 'getNIHSSCalculator',
        calculator: 'calculateNIHSS'
    },
    {
        id: 'rankin',
        name: 'Modified Rankin Scale',
        category: 'NEUROLOGY',
        description: 'Functional disability assessment after stroke',
        keywords: [
            'rankin',
            'modified',
            'stroke',
            'disability',
            'functional',
            'outcome'
        ],
        getter: 'getModifiedRankinCalculator',
        calculator: 'calculateModifiedRankin'
    },
    {
        id: 'abcd2',
        name: 'ABCD2 Score',
        category: 'NEUROLOGY',
        description: 'TIA stroke risk stratification',
        keywords: [
            'abcd2',
            'tia',
            'stroke',
            'risk'
        ],
        getter: 'getABCD2Calculator',
        calculator: 'calculateABCD2'
    },
    {
        id: 'apache',
        name: 'APACHE II',
        category: 'CRITICAL_CARE',
        description: 'ICU mortality prediction',
        keywords: [
            'apache',
            'icu',
            'mortality',
            'critical'
        ],
        getter: 'getAPACHECalculator',
        calculator: 'calculateAPACHE'
    },
    {
        id: 'sofa',
        name: 'SOFA Score',
        category: 'CRITICAL_CARE',
        description: 'Sequential organ failure assessment',
        keywords: [
            'sofa',
            'organ',
            'failure',
            'critical',
            'sepsis'
        ],
        getter: 'getSOFACalculator',
        calculator: 'calculateSOFA'
    },
    {
        id: 'mews',
        name: 'MEWS',
        category: 'CRITICAL_CARE',
        description: 'Modified Early Warning Score',
        keywords: [
            'mews',
            'warning',
            'deterioration',
            'vital'
        ],
        getter: 'getMEWSCalculator',
        calculator: 'calculateMEWS'
    },
    {
        id: 'news2',
        name: 'NEWS2',
        category: 'CRITICAL_CARE',
        description: 'National Early Warning Score 2',
        keywords: [
            'news',
            'warning',
            'deterioration',
            'rcp'
        ],
        getter: 'getNEWS2Calculator',
        calculator: 'calculateNEWS2'
    },
    {
        id: 'egfr',
        name: 'eGFR Calculator',
        category: 'NEPHROLOGY',
        description: 'Estimated glomerular filtration rate',
        keywords: [
            'egfr',
            'kidney',
            'renal',
            'creatinine'
        ],
        getter: 'getEGFRCalculator',
        calculator: 'calculateEGFR'
    },
    {
        id: 'fena',
        name: 'FENa (Fractional Excretion of Sodium)',
        category: 'NEPHROLOGY',
        description: 'Distinguishes prerenal from intrinsic AKI',
        keywords: [
            'fena',
            'sodium',
            'aki',
            'renal',
            'failure',
            'prerenal'
        ],
        getter: 'getFENaCalculator',
        calculator: 'calculateFENa'
    },
    {
        id: 'free-water-deficit',
        name: 'Free Water Deficit',
        category: 'NEPHROLOGY',
        description: 'Calculates free water deficit in hypernatremia',
        keywords: [
            'water',
            'deficit',
            'hypernatremia',
            'sodium',
            'dehydration'
        ],
        getter: 'getFreeWaterDeficitCalculator',
        calculator: 'calculateFreeWaterDeficit'
    },
    {
        id: 'urea-creatinine',
        name: 'Urea/Creatinine Ratio',
        category: 'NEPHROLOGY',
        description: 'Blood urea nitrogen to creatinine ratio calculation',
        keywords: [
            'urea',
            'creatinine',
            'ratio',
            'bun',
            'kidney',
            'renal'
        ],
        getter: 'getUreaCreatinineCalculator',
        calculator: 'calculateUreaCreatinine'
    },
    {
        id: 'meld',
        name: 'MELD Score',
        category: 'HEPATOLOGY',
        description: 'Model for End-stage Liver Disease',
        keywords: [
            'meld',
            'liver',
            'hepatology',
            'cirrhosis'
        ],
        getter: 'getMELDCalculator',
        calculator: 'calculateMELD'
    },
    {
        id: 'child-pugh',
        name: 'Child-Pugh Score',
        category: 'HEPATOLOGY',
        description: 'Chronic liver disease severity',
        keywords: [
            'child',
            'pugh',
            'liver',
            'cirrhosis'
        ],
        getter: 'getChildPughCalculator',
        calculator: 'calculateChildPugh'
    },
    {
        id: 'anion-gap',
        name: 'Anion Gap',
        category: 'LABORATORY',
        description: 'Serum anion gap calculation',
        keywords: [
            'anion',
            'gap',
            'electrolytes',
            'acidosis'
        ],
        getter: 'getAnionGapCalculator',
        calculator: 'calculateAnionGap'
    },
    {
        id: 'corrected-calcium',
        name: 'Corrected Calcium',
        category: 'LABORATORY',
        description: 'Albumin-corrected calcium',
        keywords: [
            'calcium',
            'albumin',
            'corrected',
            'biochemistry'
        ],
        getter: 'getCorrectedCalciumCalculator',
        calculator: 'calculateCorrectedCalcium'
    },
    {
        id: 'ldl-calc',
        name: 'LDL Calculator',
        category: 'LABORATORY',
        description: 'LDL cholesterol calculation using Friedewald equation',
        keywords: [
            'ldl',
            'cholesterol',
            'friedewald',
            'lipids',
            'cardiovascular'
        ],
        getter: 'getLDLCalculator',
        calculator: 'calculateLDL'
    },
    {
        id: 'corrected-sodium',
        name: 'Corrected Sodium',
        category: 'LABORATORY',
        description: 'Glucose-corrected sodium',
        keywords: [
            'sodium',
            'glucose',
            'corrected',
            'hyperglycemia'
        ],
        getter: 'getCorrectedSodiumCalculator',
        calculator: 'calculateCorrectedSodium'
    },
    {
        id: 'osmolal-gap',
        name: 'Osmolal Gap',
        category: 'LABORATORY',
        description: 'Serum osmolal gap calculation',
        keywords: [
            'osmolal',
            'gap',
            'toxicology',
            'alcohol'
        ],
        getter: 'getOsmolalGapCalculator',
        calculator: 'calculateOsmolalGap'
    },
    {
        id: 'map',
        name: 'Mean Arterial Pressure',
        category: 'CARDIOLOGY',
        description: 'Calculate MAP from BP',
        keywords: [
            'map',
            'mean',
            'arterial',
            'pressure',
            'bp'
        ],
        getter: 'getMAPCalculator',
        calculator: 'calculateMAP'
    },
    {
        id: 'aa-gradient',
        name: 'A-a Gradient',
        category: 'RESPIRATORY',
        description: 'Alveolar-arterial oxygen gradient',
        keywords: [
            'aa',
            'gradient',
            'oxygen',
            'respiratory',
            'abg'
        ],
        getter: 'getAAGradientCalculator',
        calculator: 'calculateAAGradient'
    },
    {
        id: 'perc',
        name: 'PERC Rule',
        category: 'RESPIRATORY',
        description: 'Pulmonary embolism rule-out criteria',
        keywords: [
            'perc',
            'pe',
            'pulmonary',
            'embolism'
        ],
        getter: 'getPERCCalculator',
        calculator: 'calculatePERC'
    },
    {
        id: 'timi',
        name: 'TIMI Risk Score',
        category: 'CARDIOLOGY',
        description: 'Cardiac risk stratification',
        keywords: [
            'timi',
            'cardiac',
            'risk',
            'acs'
        ],
        getter: 'getTIMICalculator',
        calculator: 'calculateTIMI'
    },
    {
        id: 'rcri',
        name: 'Revised Cardiac Risk Index',
        category: 'CARDIOLOGY',
        description: 'Perioperative cardiac risk',
        keywords: [
            'rcri',
            'cardiac',
            'perioperative',
            'surgery'
        ],
        getter: 'getRCRICalculator',
        calculator: 'calculateRCRI'
    },
    {
        id: 'qtc',
        name: 'QTc Calculator',
        category: 'CARDIOLOGY',
        description: 'Corrected QT interval',
        keywords: [
            'qtc',
            'qt',
            'interval',
            'ecg',
            'arrhythmia'
        ],
        getter: 'getQTcCalculator',
        calculator: 'calculateQTc'
    },
    {
        id: 'wells-dvt',
        name: 'Wells DVT Score',
        category: 'VASCULAR',
        description: 'Deep vein thrombosis probability',
        keywords: [
            'wells',
            'dvt',
            'thrombosis',
            'vascular'
        ],
        getter: 'getWellsDVTCalculator',
        calculator: 'calculateWellsDVT'
    },
    {
        id: 'wells',
        name: 'Wells Score Calculator',
        category: 'RESPIRATORY',
        description: 'Wells scoring system (commonly PE)',
        keywords: [
            'wells',
            'score',
            'pe',
            'pulmonary',
            'embolism'
        ],
        getter: 'getWellsCalculator',
        calculator: 'calculateWells'
    },
    {
        id: 'wells-pe',
        name: 'Wells PE Score',
        category: 'RESPIRATORY',
        description: 'Pulmonary embolism probability',
        keywords: [
            'wells',
            'pe',
            'pulmonary',
            'embolism'
        ],
        getter: 'getWellsCalculator',
        calculator: 'calculateWells'
    },
    {
        id: 'rockall',
        name: 'Rockall Score',
        category: 'GASTROENTEROLOGY',
        description: 'Upper GI bleeding risk assessment',
        keywords: [
            'rockall',
            'gi',
            'bleeding',
            'upper'
        ],
        getter: 'getRockallCalculator',
        calculator: 'calculateRockall'
    },
    {
        id: 'glasgow-blatchford',
        name: 'Glasgow-Blatchford Score',
        category: 'GASTROENTEROLOGY',
        description: 'GI bleeding severity assessment',
        keywords: [
            'glasgow',
            'blatchford',
            'gi',
            'bleeding'
        ],
        getter: 'getGlasgowBlatchfordCalculator',
        calculator: 'calculateGlasgowBlatchford'
    },
    {
        id: 'centor',
        name: 'Centor Score',
        category: 'INFECTIOUS_DISEASE',
        description: 'Strep throat probability',
        keywords: [
            'centor',
            'strep',
            'throat',
            'pharyngitis'
        ],
        getter: 'getCentorCalculator',
        calculator: 'calculateCentor'
    },
    {
        id: 'alvarado',
        name: 'Alvarado Score',
        category: 'SURGERY',
        description: 'Acute appendicitis diagnosis',
        keywords: [
            'alvarado',
            'appendicitis',
            'surgery',
            'diagnosis'
        ],
        getter: 'getAlvaradoCalculator',
        calculator: 'calculateAlvarado'
    },
    {
        id: 'phq9',
        name: 'PHQ-9',
        category: 'PSYCHIATRY',
        description: 'Depression severity questionnaire',
        keywords: [
            'phq',
            'depression',
            'psychiatry',
            'mental'
        ],
        getter: 'getPHQ9Calculator',
        calculator: 'calculatePHQ9'
    },
    {
        id: 'gad7',
        name: 'GAD-7',
        category: 'PSYCHIATRY',
        description: 'Generalized anxiety disorder assessment',
        keywords: [
            'gad',
            'anxiety',
            'psychiatry',
            'mental'
        ],
        getter: 'getGAD7Calculator',
        calculator: 'calculateGAD7'
    },
    {
        id: 'ciwa',
        name: 'CIWA-Ar',
        category: 'PSYCHIATRY',
        description: 'Clinical Institute Withdrawal Assessment for Alcohol',
        keywords: [
            'ciwa',
            'alcohol',
            'withdrawal',
            'detox',
            'addiction'
        ],
        getter: 'getCIWACalculator',
        calculator: 'calculateCIWA'
    },
    {
        id: 'stopbang',
        name: 'STOP-BANG',
        category: 'RESPIRATORY',
        description: 'Obstructive sleep apnea screening tool',
        keywords: [
            'stop',
            'bang',
            'sleep',
            'apnea',
            'osa',
            'snoring'
        ],
        getter: 'getSTOPBANGCalculator',
        calculator: 'calculateSTOPBANG'
    },
    {
        id: 'mse',
        name: 'Mental State Exam',
        category: 'PSYCHIATRY',
        description: 'Structured MSE assessment',
        keywords: [
            'mse',
            'mental',
            'state',
            'psychiatry'
        ],
        getter: 'getMSECalculator',
        calculator: 'calculateMSE'
    },
    {
        id: 'mmse',
        name: 'Mini-Mental State Exam',
        category: 'NEUROLOGY',
        description: 'Cognitive impairment screening',
        keywords: [
            'mmse',
            'cognitive',
            'dementia',
            'mental'
        ],
        getter: 'getMMSECalculator',
        calculator: 'calculateMMSE'
    },
    {
        id: 'must',
        name: 'MUST Score',
        category: 'NUTRITION',
        description: 'Malnutrition Universal Screening Tool',
        keywords: [
            'must',
            'malnutrition',
            'nutrition',
            'screening'
        ],
        getter: 'getMUSTCalculator',
        calculator: 'calculateMUST'
    },
    {
        id: 'waterlow',
        name: 'Waterlow Score',
        category: 'SURGERY',
        description: 'Pressure ulcer risk assessment',
        keywords: [
            'waterlow',
            'pressure',
            'ulcer',
            'risk'
        ],
        getter: 'getWaterlowCalculator',
        calculator: 'calculateWaterlow'
    },
    {
        id: 'frailty',
        name: 'Frailty Index',
        category: 'GERIATRICS',
        description: 'Clinical frailty assessment',
        keywords: [
            'frailty',
            'geriatrics',
            'elderly',
            'assessment'
        ],
        getter: 'getFrailtyCalculator',
        calculator: 'calculateFrailty'
    },
    {
        id: 'barthel',
        name: 'Barthel Index',
        category: 'GERIATRICS',
        description: 'Activities of daily living assessment',
        keywords: [
            'barthel',
            'adl',
            'independence',
            'function'
        ],
        getter: 'getBarthelCalculator',
        calculator: 'calculateBarthel'
    },
    {
        id: 'ottawa-ankle',
        name: 'Ottawa Ankle Rules',
        category: 'ORTHOPAEDICS',
        description: 'Ankle fracture decision rule',
        keywords: [
            'ottawa',
            'ankle',
            'fracture',
            'xray'
        ],
        getter: 'getOttawaAnkleCalculator',
        calculator: 'calculateOttawaAnkle'
    },
    {
        id: 'apgar',
        name: 'APGAR Score',
        category: 'PAEDIATRICS',
        description: 'Newborn assessment score',
        keywords: [
            'apgar',
            'newborn',
            'paediatric',
            'assessment'
        ],
        getter: 'getAPGARCalculator',
        calculator: 'calculateAPGAR'
    },
    {
        id: 'maintenance-fluids',
        name: 'Maintenance Fluids (Holliday-Segar)',
        category: 'PAEDIATRICS',
        description: 'Calculates maintenance fluid requirements by weight',
        keywords: [
            'fluids',
            'maintenance',
            'pediatric',
            'holliday',
            'segar',
            'hydration'
        ],
        getter: 'getMaintenanceFluidsCalculator',
        calculator: 'calculateMaintenanceFluids'
    },
    {
        id: 'bishop',
        name: 'Bishop Score',
        category: 'OBSTETRICS',
        description: 'Cervical readiness for induction',
        keywords: [
            'bishop',
            'cervical',
            'induction',
            'labour'
        ],
        getter: 'getBishopCalculator',
        calculator: 'calculateBishop'
    },
    {
        id: 'palliative',
        name: 'Palliative Care Assessment',
        category: 'PALLIATIVE',
        description: 'Palliative care needs assessment',
        keywords: [
            'palliative',
            'end',
            'life',
            'care',
            'comfort'
        ],
        getter: 'getPalliativeCalculator',
        calculator: 'calculatePalliative'
    },
    {
        id: 'insulin-sliding',
        name: 'Insulin Sliding Scale',
        category: 'ENDOCRINOLOGY',
        description: 'Variable rate insulin infusion',
        keywords: [
            'insulin',
            'sliding',
            'diabetes',
            'glucose'
        ],
        getter: 'getInsulinSlidingCalculator',
        calculator: 'calculateInsulinSliding'
    },
    {
        id: 'vasopressor',
        name: 'Vasopressor Calculator',
        category: 'CRITICAL_CARE',
        description: 'Inotrope/vasopressor dosing',
        keywords: [
            'vasopressor',
            'inotrope',
            'noradrenaline',
            'adrenaline'
        ],
        getter: 'getVasopressorCalculator',
        calculator: 'calculateVasopressor'
    },
    {
        id: 'infusion-rate',
        name: 'Infusion Rate Calculator',
        category: 'PHARMACOLOGY',
        description: 'IV infusion rate and drop calculations',
        keywords: [
            'infusion',
            'rate',
            'drip',
            'iv',
            'drops'
        ],
        getter: 'getInfusionRateCalculator',
        calculator: 'calculateInfusionRate'
    },
    {
        id: 'cockcroft-gault',
        name: 'Cockcroft-Gault Calculator',
        category: 'NEPHROLOGY',
        description: 'Creatinine clearance estimation',
        keywords: [
            'cockcroft',
            'gault',
            'creatinine',
            'clearance'
        ],
        getter: 'getCockcroftGaultCalculator',
        calculator: 'calculateCockcroftGault'
    },
    {
        id: 'bsa',
        name: 'Body Surface Area Calculator',
        category: 'GENERAL',
        description: 'BSA calculation using multiple formulas',
        keywords: [
            'bsa',
            'surface',
            'area',
            'dubois',
            'mosteller'
        ],
        getter: 'getBSACalculator',
        calculator: 'calculateBSA'
    },
    {
        id: 'fluid-balance',
        name: 'Fluid Balance Calculator',
        category: 'GENERAL',
        description: 'Daily fluid requirements and balance',
        keywords: [
            'fluid',
            'balance',
            'requirements',
            'maintenance'
        ],
        getter: 'getFluidBalanceCalculator',
        calculator: 'calculateFluidBalance'
    },
    {
        id: 'rass',
        name: 'RASS Scale',
        category: 'ASSESSMENT',
        description: 'Richmond Agitation-Sedation Scale',
        keywords: [
            'rass',
            'sedation',
            'agitation',
            'richmond',
            'scale',
            'consciousness'
        ],
        getter: 'getRASSCalculator',
        calculator: 'calculateRASS'
    },
    {
        id: 'frax-fracture',
        name: 'Fracture Risk Calculator',
        category: 'RISK',
        description: 'FRAX fracture risk assessment tool',
        keywords: [
            'frax',
            'fracture',
            'risk',
            'osteoporosis',
            'bone',
            'density'
        ],
        getter: 'getFractureRiskCalculator',
        calculator: 'calculateFractureRisk'
    },
    {
        id: 'paediatric-dosing',
        name: 'Paediatric Dosing',
        category: 'PAEDIATRICS',
        description: 'Weight-based drug dosing',
        keywords: [
            'paediatric',
            'dosing',
            'weight',
            'children'
        ],
        getter: 'getPaediatricDosingCalculator',
        calculator: 'calculatePaediatricDosing'
    },
    {
        id: 'drug-volume',
        name: 'Drug Volume Calculator',
        category: 'PHARMACOLOGY',
        description: 'Drug volume and dilution calculations',
        keywords: [
            'drug',
            'volume',
            'dilution',
            'concentration'
        ],
        getter: 'getDrugVolumeCalculator',
        calculator: 'calculateDrugVolume'
    },
    {
        id: 'unit-converter',
        name: 'Clinical Unit Converter',
        category: 'UTILITIES',
        description: 'Convert between clinical units',
        keywords: [
            'unit',
            'converter',
            'conversion',
            'mmol',
            'mg'
        ],
        getter: 'getUnitConverterCalculator',
        calculator: 'calculateUnitConverter'
    },
    {
        id: 'asthma',
        name: 'Asthma Severity',
        category: 'RESPIRATORY',
        description: 'BTS/SIGN asthma severity assessment',
        keywords: [
            'asthma',
            'pef',
            'respiratory',
            'wheeze'
        ],
        getter: 'getAsthmaCalculator',
        calculator: 'calculateAsthma'
    },
    {
        id: 'winters',
        name: 'Winters Formula',
        category: 'LABORATORY',
        description: 'Expected pCO2 in metabolic acidosis',
        keywords: [
            'winters',
            'pco2',
            'acidosis',
            'metabolic',
            'compensation'
        ],
        getter: 'getWintersCalculator',
        calculator: 'calculateWinters'
    },
    {
        id: 'crusade',
        name: 'CRUSADE Bleeding Risk',
        category: 'RISK',
        description: 'Bleeding risk in ACS patients',
        keywords: [
            'crusade',
            'bleeding',
            'acs',
            'cardiac'
        ],
        getter: 'getCRUSADECalculator',
        calculator: 'calculateCRUSADE'
    }
];

const addBridgeMetadata = (definition) => ({
    ...definition,
    category: resolveCategory(definition.category),
    keywords: Array.isArray(definition.keywords) ? definition.keywords : [],
    metadata: {
        source: 'bridge',
        getter: definition.getter,
        calculator: definition.calculator
    }
});

const shouldIncludeDefinition = (definition, options) => {
    if (!definition || !options) {
        return true;
    }

    if (definition.requiresUnofficialQrisk && options.disableUnofficialQrisk) {
        return false;
    }

    return true;
};

export const createBridgeCalculatorConfigs = (extractedCalculators, options = {}) => {
    if (!extractedCalculators) {
        return [];
    }

    return BRIDGE_CALCULATOR_DEFINITIONS
        .filter(def => shouldIncludeDefinition(def, options))
        .map(def => {
            const getterFn = extractedCalculators?.[def.getter];
            const calculateFn = extractedCalculators?.[def.calculator];

            if (typeof getterFn !== 'function' || typeof calculateFn !== 'function') {
                return null;
            }

            const definitionWithMetadata = addBridgeMetadata(def);

            return {
                id: definitionWithMetadata.id,
                name: definitionWithMetadata.name,
                category: definitionWithMetadata.category,
                description: definitionWithMetadata.description || '',
                keywords: definitionWithMetadata.keywords,
                getTemplate: () => getterFn(),
                calculate: () => calculateFn(),
                bindEvents: () => {},
                metadata: definitionWithMetadata.metadata
            };
        })
        .filter(Boolean);
};

export const createCalculatorRegistry = (options = {}) => {
    const extractedCalculators = options.extractedCalculators ?? (typeof window !== 'undefined' ? window.ExtractedCalculators : null);
    const registry = new Map();

    v2Calculators.getAllCalculators().forEach(calculator => {
        if (!calculator || !calculator.id) {
            return;
        }

        registry.set(calculator.id, {
            ...calculator,
            metadata: {
                ...(calculator.metadata || {}),
                source: 'native'
            }
        });
    });

    createBridgeCalculatorConfigs(extractedCalculators, options).forEach(calculator => {
        if (!calculator || !calculator.id || registry.has(calculator.id)) {
            return;
        }

        registry.set(calculator.id, calculator);
    });

    return registry;
};

export const getCalculatorRegistryObject = (options = {}) => {
    const registry = createCalculatorRegistry(options);
    const registryObject = Object.fromEntries(registry.entries());

    return {
        ...registryObject,
        getAllCalculators: () => Array.from(registry.values()),
        getCalculatorCount: () => registry.size,
        getCalculator: (id) => registry.get(id),
        getRegistryMap: () => registry
    };
};
