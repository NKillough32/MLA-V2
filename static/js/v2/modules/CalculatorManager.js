/**
 * Calculator Manager - Registry and management for medical calculators
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import { EVENTS, STORAGE_KEYS, CALCULATOR_TYPES, TOOL_CATEGORIES } from './Constants.js';
import { calculatorRegistry } from './Calculators.js';
import calculatorBridge from './CalculatorBridge.js';

export class CalculatorManager {
    constructor() {
        this.calculators = new Map();
        this.currentCalculator = null;
        this.recentTools = [];
        this.toolNotes = {};
        this.bridge = calculatorBridge;
    }

    /**
     * Initialize calculator manager and auto-register all calculators
     */
    initialize() {
        // Initialize the bridge with dependencies
        this.bridge.initialize(eventBus, storage, analytics);
        
        // Load saved data
        this.recentTools = storage.getItem(STORAGE_KEYS.RECENT_TOOLS, []);
        this.toolNotes = storage.getItem(STORAGE_KEYS.TOOL_NOTES, {});
        
        // Auto-register all calculators from registry
        this.registerAllCalculators();
        
        // Register bridge calculators
        this.registerBridgeCalculators();
        
        console.log(`🧮 Calculator Manager initialized with ${this.calculators.size} calculators`);
    }
    
    /**
     * Auto-register all calculators from the registry
     */
    registerAllCalculators() {
        Object.entries(calculatorRegistry).forEach(([id, config]) => {
            this.registerCalculator(id, config);
        });
    }

    /**
     * Register calculators from ExtractedCalculators bridge
     */
    registerBridgeCalculators() {
        // Check if ExtractedCalculators is available
        const EC = window.ExtractedCalculators;
        if (!EC) {
            console.warn('⚠️ ExtractedCalculators not loaded - many calculators unavailable');
            console.info('ℹ️  Only 6 native V2 calculators available without bridge');
            return; // Exit early if bridge not available
        }
        
        console.log('✅ ExtractedCalculators bridge loaded - registering 55+ calculators...');
        
        // Note: For now, the bridge provides most calculator functionality
        // V2 native implementations in Calculators.js only cover 6 calculators
        // TODO: Migrate remaining calculators to native V2 implementations

        // === BASIC HEALTH CALCULATORS ===
        
        // BMI Calculator
        if (EC.getBMICalculator) {
            this.registerCalculator('bmi', {
                name: 'BMI Calculator',
                category: TOOL_CATEGORIES.GENERAL,
                description: 'Body Mass Index calculation and interpretation',
                keywords: ['bmi', 'body', 'mass', 'index', 'weight', 'height', 'obesity'],
                getTemplate: () => EC.getBMICalculator(),
                calculate: () => EC.calculateBMI(),
                bindEvents: () => {}
            });
        }

        // GCS Calculator
        if (EC.getGCSCalculator) {
            this.registerCalculator('gcs', {
                name: 'Glasgow Coma Scale',
                category: TOOL_CATEGORIES.NEUROLOGY,
                description: 'Neurological assessment scale',
                keywords: ['gcs', 'glasgow', 'coma', 'scale', 'consciousness', 'neurology'],
                getTemplate: () => EC.getGCSCalculator(),
                calculate: () => EC.calculateGCS(),
                bindEvents: () => {}
            });
        }

        // MADDERS Calculator
        if (EC.getMADDERSCalculator) {
            this.registerCalculator('madders', {
                name: 'MADDERS Score',
                category: TOOL_CATEGORIES.ASSESSMENT,
                description: 'Mental health assessment tool',
                keywords: ['madders', 'mental', 'health', 'assessment', 'score'],
                getTemplate: () => EC.getMADDERSCalculator(),
                calculate: () => EC.calculateMADDERS(),
                bindEvents: () => {}
            });
        }

        // === CARDIOVASCULAR CALCULATORS ===
        
        // GRACE Score
        if (EC.getGRACECalculator) {
            this.registerCalculator('grace', {
                name: 'GRACE Score',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Risk stratification for ACS',
                keywords: ['grace', 'acs', 'risk', 'cardiac', 'heart'],
                getTemplate: () => EC.getGRACECalculator(),
                calculate: () => EC.calculateGRACE(),
                bindEvents: () => {}
            });
        }

        // CHADS2-VASc Score
        if (EC.getCHADS2VAScCalculator) {
            this.registerCalculator('chads2vasc', {
                name: 'CHADS2-VASc Score',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Stroke risk assessment in atrial fibrillation',
                keywords: ['chads2', 'vasc', 'stroke', 'risk', 'atrial', 'fibrillation', 'anticoagulation'],
                getTemplate: () => EC.getCHADS2VAScCalculator(),
                calculate: () => EC.calculateCHADS2VASc(),
                bindEvents: () => {}
            });
        }

        // HAS-BLED Score
        if (EC.getHASBLEDCalculator) {
            this.registerCalculator('hasbled', {
                name: 'HAS-BLED Score',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Bleeding risk assessment for anticoagulation',
                keywords: ['hasbled', 'bleeding', 'risk', 'anticoagulation', 'warfarin'],
                getTemplate: () => EC.getHASBLEDCalculator(),
                calculate: () => EC.calculateHASBLED(),
                bindEvents: () => {}
            });
        }

        // HEART Score
        if (EC.getHEARTCalculator) {
            this.registerCalculator('heart', {
                name: 'HEART Score',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Predicts 6-week major adverse cardiac events in chest pain',
                keywords: ['heart', 'chest pain', 'cardiac', 'mace', 'risk'],
                getTemplate: () => EC.getHEARTCalculator(),
                calculate: () => EC.calculateHEART(),
                bindEvents: () => {}
            });
        }

        // Caprini VTE Risk
        if (EC.getCapriniCalculator) {
            this.registerCalculator('caprini', {
                name: 'Caprini VTE Risk Score',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Stratifies venous thromboembolism risk in surgical patients',
                keywords: ['caprini', 'vte', 'dvt', 'thrombosis', 'surgery', 'prophylaxis'],
                getTemplate: () => EC.getCapriniCalculator(),
                calculate: () => EC.calculateCaprini(),
                bindEvents: () => {}
            });
        }

        // QRISK3
        if (EC.getQRISK3Calculator) {
            this.registerCalculator('qrisk3', {
                name: 'QRISK3',
                category: TOOL_CATEGORIES.RISK,
                description: 'CV risk assessment',
                keywords: ['qrisk', 'cardiovascular', 'risk', 'prevention'],
                getTemplate: () => EC.getQRISK3Calculator(),
                calculate: () => EC.calculateQRISK3(),
                bindEvents: () => {}
            });
        }

        // QRISK (Legacy)
        if (EC.getQRISKCalculator) {
            this.registerCalculator('qrisk', {
                name: 'QRISK Calculator',
                category: TOOL_CATEGORIES.RISK,
                description: 'Cardiovascular risk assessment (legacy version)',
                keywords: ['qrisk', 'cardiovascular', 'risk', 'prevention', 'legacy'],
                getTemplate: () => EC.getQRISKCalculator(),
                calculate: () => EC.calculateQRISK(),
                bindEvents: () => {}
            });
        }
        
        // QRISK3 Official (ClinRisk Ltd. validated algorithm)
        if (EC.getQRISK3OfficialCalculator) {
            this.registerCalculator('qrisk3-official', {
                name: 'QRISK3 Calculator (Official)',
                category: TOOL_CATEGORIES.RISK,
                description: '10-year CVD risk using validated ClinRisk algorithm',
                keywords: ['qrisk3', 'qrisk', 'cardiovascular', 'cvd', 'risk', 'prevention', 'official', 'clinrisk', 'nice', 'statin', 'cholesterol'],
                getTemplate: () => EC.getQRISK3OfficialCalculator(),
                calculate: () => EC.calculateQRISK3Official(),
                bindEvents: () => {}
            });
        }
        
        // === RESPIRATORY CALCULATORS ===
        
        // CURB-65
        if (EC.getCURB65Calculator) {
            this.registerCalculator('curb65', {
                name: 'CURB-65',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Pneumonia severity assessment',
                keywords: ['curb', 'pneumonia', 'severity', 'respiratory'],
                getTemplate: () => EC.getCURB65Calculator(),
                calculate: () => EC.calculateCURB65(),
                bindEvents: () => {}
            });
        }

        // CRB-65
        if (EC.getCRB65Calculator) {
            this.registerCalculator('crb65', {
                name: 'CRB-65',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Community pneumonia severity assessment (without urea)',
                keywords: ['crb', 'pneumonia', 'severity', 'respiratory', 'community'],
                getTemplate: () => EC.getCRB65Calculator(),
                calculate: () => EC.calculateCRB65(),
                bindEvents: () => {}
            });
        }

        // Peak Flow (PEFR)
        if (EC.getPEFRCalculator) {
            this.registerCalculator('pefr', {
                name: 'Peak Flow Calculator',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Expected peak expiratory flow rate',
                keywords: ['pefr', 'peak', 'flow', 'respiratory', 'asthma'],
                getTemplate: () => EC.getPEFRCalculator(),
                calculate: () => EC.calculatePEFR(),
                bindEvents: () => {}
            });
        }
        
        // === NEUROLOGICAL CALCULATORS ===
        
        // NIHSS
        if (EC.getNIHSSCalculator) {
            this.registerCalculator('nihss', {
                name: 'NIHSS',
                category: TOOL_CATEGORIES.NEUROLOGY,
                description: 'Stroke severity assessment',
                keywords: ['nihss', 'stroke', 'neurology', 'severity'],
                getTemplate: () => EC.getNIHSSCalculator(),
                calculate: () => EC.calculateNIHSS(),
                bindEvents: () => {}
            });
        }

        // Modified Rankin Scale
        if (EC.getModifiedRankinCalculator) {
            this.registerCalculator('rankin', {
                name: 'Modified Rankin Scale',
                category: TOOL_CATEGORIES.NEUROLOGY,
                description: 'Functional disability assessment after stroke',
                keywords: ['rankin', 'modified', 'stroke', 'disability', 'functional', 'outcome'],
                getTemplate: () => EC.getModifiedRankinCalculator(),
                calculate: () => EC.calculateModifiedRankin(),
                bindEvents: () => {}
            });
        }

        // ABCD2 Score
        if (EC.getABCD2Calculator) {
            this.registerCalculator('abcd2', {
                name: 'ABCD2 Score',
                category: TOOL_CATEGORIES.NEUROLOGY,
                description: 'TIA stroke risk stratification',
                keywords: ['abcd2', 'tia', 'stroke', 'risk'],
                getTemplate: () => EC.getABCD2Calculator(),
                calculate: () => EC.calculateABCD2(),
                bindEvents: () => {}
            });
        }
        
        // === CRITICAL CARE CALCULATORS ===
        
        // APACHE II
        if (EC.getAPACHECalculator) {
            this.registerCalculator('apache', {
                name: 'APACHE II',
                category: TOOL_CATEGORIES.CRITICAL_CARE,
                description: 'ICU mortality prediction',
                keywords: ['apache', 'icu', 'mortality', 'critical'],
                getTemplate: () => EC.getAPACHECalculator(),
                calculate: () => EC.calculateAPACHE(),
                bindEvents: () => {}
            });
        }

        // SOFA Score
        if (EC.getSOFACalculator) {
            this.registerCalculator('sofa', {
                name: 'SOFA Score',
                category: TOOL_CATEGORIES.CRITICAL_CARE,
                description: 'Sequential organ failure assessment',
                keywords: ['sofa', 'organ', 'failure', 'critical', 'sepsis'],
                getTemplate: () => EC.getSOFACalculator(),
                calculate: () => EC.calculateSOFA(),
                bindEvents: () => {}
            });
        }

        // MEWS (Modified Early Warning Score)
        if (EC.getMEWSCalculator) {
            this.registerCalculator('mews', {
                name: 'MEWS',
                category: TOOL_CATEGORIES.CRITICAL_CARE,
                description: 'Modified Early Warning Score',
                keywords: ['mews', 'warning', 'deterioration', 'vital'],
                getTemplate: () => EC.getMEWSCalculator(),
                calculate: () => EC.calculateMEWS(),
                bindEvents: () => {}
            });
        }

        // NEWS2
        if (EC.getNEWS2Calculator) {
            this.registerCalculator('news2', {
                name: 'NEWS2',
                category: TOOL_CATEGORIES.CRITICAL_CARE,
                description: 'National Early Warning Score 2',
                keywords: ['news', 'warning', 'deterioration', 'rcp'],
                getTemplate: () => EC.getNEWS2Calculator(),
                calculate: () => EC.calculateNEWS2(),
                bindEvents: () => {}
            });
        }
        
        // === RENAL CALCULATORS ===
        
        // eGFR
        if (EC.getEGFRCalculator) {
            this.registerCalculator('egfr', {
                name: 'eGFR Calculator',
                category: TOOL_CATEGORIES.NEPHROLOGY,
                description: 'Estimated glomerular filtration rate',
                keywords: ['egfr', 'kidney', 'renal', 'creatinine'],
                getTemplate: () => EC.getEGFRCalculator(),
                calculate: () => EC.calculateEGFR(),
                bindEvents: () => {}
            });
        }

        // FENa
        if (EC.getFENaCalculator) {
            this.registerCalculator('fena', {
                name: 'FENa (Fractional Excretion of Sodium)',
                category: TOOL_CATEGORIES.NEPHROLOGY,
                description: 'Distinguishes prerenal from intrinsic AKI',
                keywords: ['fena', 'sodium', 'aki', 'renal', 'failure', 'prerenal'],
                getTemplate: () => EC.getFENaCalculator(),
                calculate: () => EC.calculateFENa(),
                bindEvents: () => {}
            });
        }

        // Free Water Deficit
        if (EC.getFreeWaterDeficitCalculator) {
            this.registerCalculator('free-water-deficit', {
                name: 'Free Water Deficit',
                category: TOOL_CATEGORIES.NEPHROLOGY,
                description: 'Calculates free water deficit in hypernatremia',
                keywords: ['water', 'deficit', 'hypernatremia', 'sodium', 'dehydration'],
                getTemplate: () => EC.getFreeWaterDeficitCalculator(),
                calculate: () => EC.calculateFreeWaterDeficit(),
                bindEvents: () => {}
            });
        }

        // Urea/Creatinine Ratio
        if (EC.getUreaCreatinineCalculator) {
            this.registerCalculator('urea-creatinine', {
                name: 'Urea/Creatinine Ratio',
                category: TOOL_CATEGORIES.NEPHROLOGY,
                description: 'Blood urea nitrogen to creatinine ratio calculation',
                keywords: ['urea', 'creatinine', 'ratio', 'bun', 'kidney', 'renal'],
                getTemplate: () => EC.getUreaCreatinineCalculator(),
                calculate: () => EC.calculateUreaCreatinine(),
                bindEvents: () => {}
            });
        }
        
        // === HEPATOLOGY CALCULATORS ===
        
        // MELD Score
        if (EC.getMELDCalculator) {
            this.registerCalculator('meld', {
                name: 'MELD Score',
                category: TOOL_CATEGORIES.HEPATOLOGY,
                description: 'Model for End-stage Liver Disease',
                keywords: ['meld', 'liver', 'hepatology', 'cirrhosis'],
                getTemplate: () => EC.getMELDCalculator(),
                calculate: () => EC.calculateMELD(),
                bindEvents: () => {}
            });
        }

        // Child-Pugh
        if (EC.getChildPughCalculator) {
            this.registerCalculator('child-pugh', {
                name: 'Child-Pugh Score',
                category: TOOL_CATEGORIES.HEPATOLOGY,
                description: 'Chronic liver disease severity',
                keywords: ['child', 'pugh', 'liver', 'cirrhosis'],
                getTemplate: () => EC.getChildPughCalculator(),
                calculate: () => EC.calculateChildPugh(),
                bindEvents: () => {}
            });
        }
        
        // === LABORATORY CALCULATORS ===
        
        // Anion Gap
        if (EC.getAnionGapCalculator) {
            this.registerCalculator('anion-gap', {
                name: 'Anion Gap',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'Serum anion gap calculation',
                keywords: ['anion', 'gap', 'electrolytes', 'acidosis'],
                getTemplate: () => EC.getAnionGapCalculator(),
                calculate: () => EC.calculateAnionGap(),
                bindEvents: () => {}
            });
        }

        // Corrected Calcium
        if (EC.getCorrectedCalciumCalculator) {
            this.registerCalculator('corrected-calcium', {
                name: 'Corrected Calcium',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'Albumin-corrected calcium',
                keywords: ['calcium', 'albumin', 'corrected', 'biochemistry'],
                getTemplate: () => EC.getCorrectedCalciumCalculator(),
                calculate: () => EC.calculateCorrectedCalcium(),
                bindEvents: () => {}
            });
        }

        // LDL Calculator
        if (EC.getLDLCalculator) {
            this.registerCalculator('ldl-calc', {
                name: 'LDL Calculator',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'LDL cholesterol calculation using Friedewald equation',
                keywords: ['ldl', 'cholesterol', 'friedewald', 'lipids', 'cardiovascular'],
                getTemplate: () => EC.getLDLCalculator(),
                calculate: () => EC.calculateLDL(),
                bindEvents: () => {}
            });
        }

        // Corrected Sodium
        if (EC.getCorrectedSodiumCalculator) {
            this.registerCalculator('corrected-sodium', {
                name: 'Corrected Sodium',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'Glucose-corrected sodium',
                keywords: ['sodium', 'glucose', 'corrected', 'hyperglycemia'],
                getTemplate: () => EC.getCorrectedSodiumCalculator(),
                calculate: () => EC.calculateCorrectedSodium(),
                bindEvents: () => {}
            });
        }

        // Osmolal Gap
        if (EC.getOsmolalGapCalculator) {
            this.registerCalculator('osmolal-gap', {
                name: 'Osmolal Gap',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'Serum osmolal gap calculation',
                keywords: ['osmolal', 'gap', 'toxicology', 'alcohol'],
                getTemplate: () => EC.getOsmolalGapCalculator(),
                calculate: () => EC.calculateOsmolalGap(),
                bindEvents: () => {}
            });
        }
        
        // Mean Arterial Pressure
        if (EC.getMAPCalculator) {
            this.registerCalculator('map', {
                name: 'Mean Arterial Pressure',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Calculate MAP from BP',
                keywords: ['map', 'mean', 'arterial', 'pressure', 'bp'],
                getTemplate: () => EC.getMAPCalculator(),
                calculate: () => EC.calculateMAP(),
                bindEvents: () => {}
            });
        }

        // A-a Gradient
        if (EC.getAAGradientCalculator) {
            this.registerCalculator('aa-gradient', {
                name: 'A-a Gradient',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Alveolar-arterial oxygen gradient',
                keywords: ['aa', 'gradient', 'oxygen', 'respiratory', 'abg'],
                getTemplate: () => EC.getAAGradientCalculator(),
                calculate: () => EC.calculateAAGradient(),
                bindEvents: () => {}
            });
        }
        
        // PERC Rule
        if (EC.getPERCCalculator) {
            this.registerCalculator('perc', {
                name: 'PERC Rule',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Pulmonary embolism rule-out criteria',
                keywords: ['perc', 'pe', 'pulmonary', 'embolism'],
                getTemplate: () => EC.getPERCCalculator(),
                calculate: () => EC.calculatePERC(),
                bindEvents: () => {}
            });
        }

        // TIMI Risk Score
        if (EC.getTIMICalculator) {
            this.registerCalculator('timi', {
                name: 'TIMI Risk Score',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Cardiac risk stratification',
                keywords: ['timi', 'cardiac', 'risk', 'acs'],
                getTemplate: () => EC.getTIMICalculator(),
                calculate: () => EC.calculateTIMI(),
                bindEvents: () => {}
            });
        }

        // RCRI (Revised Cardiac Risk Index)
        if (EC.getRCRICalculator) {
            this.registerCalculator('rcri', {
                name: 'Revised Cardiac Risk Index',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Perioperative cardiac risk',
                keywords: ['rcri', 'cardiac', 'perioperative', 'surgery'],
                getTemplate: () => EC.getRCRICalculator(),
                calculate: () => EC.calculateRCRI(),
                bindEvents: () => {}
            });
        }

        // QTc Calculator
        if (EC.getQTcCalculator) {
            this.registerCalculator('qtc', {
                name: 'QTc Calculator',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Corrected QT interval',
                keywords: ['qtc', 'qt', 'interval', 'ecg', 'arrhythmia'],
                getTemplate: () => EC.getQTcCalculator(),
                calculate: () => EC.calculateQTc(),
                bindEvents: () => {}
            });
        }

        // Wells DVT Score
        if (EC.getWellsDVTCalculator) {
            this.registerCalculator('wells-dvt', {
                name: 'Wells DVT Score',
                category: TOOL_CATEGORIES.VASCULAR,
                description: 'Deep vein thrombosis probability',
                keywords: ['wells', 'dvt', 'thrombosis', 'vascular'],
                getTemplate: () => EC.getWellsDVTCalculator(),
                calculate: () => EC.calculateWellsDVT(),
                bindEvents: () => {}
            });
        }

        // Wells Calculator (General)
        if (EC.getWellsCalculator) {
            this.registerCalculator('wells', {
                name: 'Wells Score Calculator',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Wells scoring system (commonly PE)',
                keywords: ['wells', 'score', 'pe', 'pulmonary', 'embolism'],
                getTemplate: () => EC.getWellsCalculator(),
                calculate: () => EC.calculateWells(),
                bindEvents: () => {}
            });
        }

        // Wells PE Score
        if (EC.getWellsCalculator) {
            this.registerCalculator('wells-pe', {
                name: 'Wells PE Score',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Pulmonary embolism probability',
                keywords: ['wells', 'pe', 'pulmonary', 'embolism'],
                getTemplate: () => EC.getWellsCalculator(),
                calculate: () => EC.calculateWells(),
                bindEvents: () => {}
            });
        }
        
        // === GASTROENTEROLOGY ADDITIONAL ===
        
        // Rockall Score
        if (EC.getRockallCalculator) {
            this.registerCalculator('rockall', {
                name: 'Rockall Score',
                category: TOOL_CATEGORIES.GASTROENTEROLOGY,
                description: 'Upper GI bleeding risk assessment',
                keywords: ['rockall', 'gi', 'bleeding', 'upper'],
                getTemplate: () => EC.getRockallCalculator(),
                calculate: () => EC.calculateRockall(),
                bindEvents: () => {}
            });
        }

        // Glasgow-Blatchford Score
        if (EC.getGlasgowBlatchfordCalculator) {
            this.registerCalculator('glasgow-blatchford', {
                name: 'Glasgow-Blatchford Score',
                category: TOOL_CATEGORIES.GASTROENTEROLOGY,
                description: 'GI bleeding severity assessment',
                keywords: ['glasgow', 'blatchford', 'gi', 'bleeding'],
                getTemplate: () => EC.getGlasgowBlatchfordCalculator(),
                calculate: () => EC.calculateGlasgowBlatchford(),
                bindEvents: () => {}
            });
        }

        // Centor Score
        if (EC.getCentorCalculator) {
            this.registerCalculator('centor', {
                name: 'Centor Score',
                category: TOOL_CATEGORIES.INFECTIOUS_DISEASE,
                description: 'Strep throat probability',
                keywords: ['centor', 'strep', 'throat', 'pharyngitis'],
                getTemplate: () => EC.getCentorCalculator(),
                calculate: () => EC.calculateCentor(),
                bindEvents: () => {}
            });
        }

        // Alvarado Score
        if (EC.getAlvaradoCalculator) {
            this.registerCalculator('alvarado', {
                name: 'Alvarado Score',
                category: TOOL_CATEGORIES.SURGERY,
                description: 'Acute appendicitis diagnosis',
                keywords: ['alvarado', 'appendicitis', 'surgery', 'diagnosis'],
                getTemplate: () => EC.getAlvaradoCalculator(),
                calculate: () => EC.calculateAlvarado(),
                bindEvents: () => {}
            });
        }
        
        // === PSYCHIATRY CALCULATORS ===
        
        // PHQ-9
        if (EC.getPHQ9Calculator) {
            this.registerCalculator('phq9', {
                name: 'PHQ-9',
                category: TOOL_CATEGORIES.PSYCHIATRY,
                description: 'Depression severity questionnaire',
                keywords: ['phq', 'depression', 'psychiatry', 'mental'],
                getTemplate: () => EC.getPHQ9Calculator(),
                calculate: () => EC.calculatePHQ9(),
                bindEvents: () => {}
            });
        }

        // GAD-7
        if (EC.getGAD7Calculator) {
            this.registerCalculator('gad7', {
                name: 'GAD-7',
                category: TOOL_CATEGORIES.PSYCHIATRY,
                description: 'Generalized anxiety disorder assessment',
                keywords: ['gad', 'anxiety', 'psychiatry', 'mental'],
                getTemplate: () => EC.getGAD7Calculator(),
                calculate: () => EC.calculateGAD7(),
                bindEvents: () => {}
            });
        }

        // CIWA-Ar
        if (EC.getCIWACalculator) {
            this.registerCalculator('ciwa', {
                name: 'CIWA-Ar',
                category: TOOL_CATEGORIES.PSYCHIATRY,
                description: 'Clinical Institute Withdrawal Assessment for Alcohol',
                keywords: ['ciwa', 'alcohol', 'withdrawal', 'detox', 'addiction'],
                getTemplate: () => EC.getCIWACalculator(),
                calculate: () => EC.calculateCIWA(),
                bindEvents: () => {}
            });
        }

        // STOP-BANG
        if (EC.getSTOPBANGCalculator) {
            this.registerCalculator('stopbang', {
                name: 'STOP-BANG',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'Obstructive sleep apnea screening tool',
                keywords: ['stop', 'bang', 'sleep', 'apnea', 'osa', 'snoring'],
                getTemplate: () => EC.getSTOPBANGCalculator(),
                calculate: () => EC.calculateSTOPBANG(),
                bindEvents: () => {}
            });
        }

        // Mental State Examination
        if (EC.getMSECalculator) {
            this.registerCalculator('mse', {
                name: 'Mental State Exam',
                category: TOOL_CATEGORIES.PSYCHIATRY,
                description: 'Structured MSE assessment',
                keywords: ['mse', 'mental', 'state', 'psychiatry'],
                getTemplate: () => EC.getMSECalculator(),
                calculate: () => EC.calculateMSE(),
                bindEvents: () => {}
            });
        }

        // MMSE
        if (EC.getMMSECalculator) {
            this.registerCalculator('mmse', {
                name: 'Mini-Mental State Exam',
                category: TOOL_CATEGORIES.NEUROLOGY,
                description: 'Cognitive impairment screening',
                keywords: ['mmse', 'cognitive', 'dementia', 'mental'],
                getTemplate: () => EC.getMMSECalculator(),
                calculate: () => EC.calculateMMSE(),
                bindEvents: () => {}
            });
        }
        
        // === GERIATRICS & NUTRITION ===
        
        // MUST Score
        if (EC.getMUSTCalculator) {
            this.registerCalculator('must', {
                name: 'MUST Score',
                category: TOOL_CATEGORIES.NUTRITION,
                description: 'Malnutrition Universal Screening Tool',
                keywords: ['must', 'malnutrition', 'nutrition', 'screening'],
                getTemplate: () => EC.getMUSTCalculator(),
                calculate: () => EC.calculateMUST(),
                bindEvents: () => {}
            });
        }

        // Waterlow Score
        if (EC.getWaterlowCalculator) {
            this.registerCalculator('waterlow', {
                name: 'Waterlow Score',
                category: TOOL_CATEGORIES.SURGERY,
                description: 'Pressure ulcer risk assessment',
                keywords: ['waterlow', 'pressure', 'ulcer', 'risk'],
                getTemplate: () => EC.getWaterlowCalculator(),
                calculate: () => EC.calculateWaterlow(),
                bindEvents: () => {}
            });
        }

        // Frailty Index
        if (EC.getFrailtyCalculator) {
            this.registerCalculator('frailty', {
                name: 'Frailty Index',
                category: TOOL_CATEGORIES.GERIATRICS,
                description: 'Clinical frailty assessment',
                keywords: ['frailty', 'geriatrics', 'elderly', 'assessment'],
                getTemplate: () => EC.getFrailtyCalculator(),
                calculate: () => EC.calculateFrailty(),
                bindEvents: () => {}
            });
        }

        // Barthel Index
        if (EC.getBarthelCalculator) {
            this.registerCalculator('barthel', {
                name: 'Barthel Index',
                category: TOOL_CATEGORIES.GERIATRICS,
                description: 'Activities of daily living assessment',
                keywords: ['barthel', 'adl', 'independence', 'function'],
                getTemplate: () => EC.getBarthelCalculator(),
                calculate: () => EC.calculateBarthel(),
                bindEvents: () => {}
            });
        }

        // === ORTHOPAEDIC CALCULATORS ===
        
        // Ottawa Ankle Rules
        if (EC.getOttawaAnkleCalculator) {
            this.registerCalculator('ottawa-ankle', {
                name: 'Ottawa Ankle Rules',
                category: TOOL_CATEGORIES.ORTHOPAEDICS,
                description: 'Ankle fracture decision rule',
                keywords: ['ottawa', 'ankle', 'fracture', 'xray'],
                getTemplate: () => EC.getOttawaAnkleCalculator(),
                calculate: () => EC.calculateOttawaAnkle(),
                bindEvents: () => {}
            });
        }

        // === OBSTETRICS & PAEDIATRICS ===
        
        // APGAR Score
        if (EC.getAPGARCalculator) {
            this.registerCalculator('apgar', {
                name: 'APGAR Score',
                category: TOOL_CATEGORIES.PAEDIATRICS,
                description: 'Newborn assessment score',
                keywords: ['apgar', 'newborn', 'paediatric', 'assessment'],
                getTemplate: () => EC.getAPGARCalculator(),
                calculate: () => EC.calculateAPGAR(),
                bindEvents: () => {}
            });
        }

        // Maintenance Fluids
        if (EC.getMaintenanceFluidsCalculator) {
            this.registerCalculator('maintenance-fluids', {
                name: 'Maintenance Fluids (Holliday-Segar)',
                category: TOOL_CATEGORIES.PAEDIATRICS,
                description: 'Calculates maintenance fluid requirements by weight',
                keywords: ['fluids', 'maintenance', 'pediatric', 'holliday', 'segar', 'hydration'],
                getTemplate: () => EC.getMaintenanceFluidsCalculator(),
                calculate: () => EC.calculateMaintenanceFluids(),
                bindEvents: () => {}
            });
        }

        // Bishop Score
        if (EC.getBishopCalculator) {
            this.registerCalculator('bishop', {
                name: 'Bishop Score',
                category: TOOL_CATEGORIES.OBSTETRICS,
                description: 'Cervical readiness for induction',
                keywords: ['bishop', 'cervical', 'induction', 'labour'],
                getTemplate: () => EC.getBishopCalculator(),
                calculate: () => EC.calculateBishop(),
                bindEvents: () => {}
            });
        }

        // === PALLIATIVE CARE ===
        
        // Palliative Care Calculator
        if (EC.getPalliativeCalculator) {
            this.registerCalculator('palliative', {
                name: 'Palliative Care Assessment',
                category: TOOL_CATEGORIES.PALLIATIVE,
                description: 'Palliative care needs assessment',
                keywords: ['palliative', 'end', 'life', 'care', 'comfort'],
                getTemplate: () => EC.getPalliativeCalculator(),
                calculate: () => EC.calculatePalliative(),
                bindEvents: () => {}
            });
        }

        // === PHARMACOLOGY ===
        
        // Insulin Sliding Scale
        if (EC.getInsulinSlidingCalculator) {
            this.registerCalculator('insulin-sliding', {
                name: 'Insulin Sliding Scale',
                category: TOOL_CATEGORIES.ENDOCRINOLOGY,
                description: 'Variable rate insulin infusion',
                keywords: ['insulin', 'sliding', 'diabetes', 'glucose'],
                getTemplate: () => EC.getInsulinSlidingCalculator(),
                calculate: () => EC.calculateInsulinSliding(),
                bindEvents: () => {}
            });
        }

        // Vasopressor Calculator
        if (EC.getVasopressorCalculator) {
            this.registerCalculator('vasopressor', {
                name: 'Vasopressor Calculator',
                category: TOOL_CATEGORIES.CRITICAL_CARE,
                description: 'Inotrope/vasopressor dosing',
                keywords: ['vasopressor', 'inotrope', 'noradrenaline', 'adrenaline'],
                getTemplate: () => EC.getVasopressorCalculator(),
                calculate: () => EC.calculateVasopressor(),
                bindEvents: () => {}
            });
        }

        // Infusion Rate Calculator
        if (EC.getInfusionRateCalculator) {
            this.registerCalculator('infusion-rate', {
                name: 'Infusion Rate Calculator',
                category: TOOL_CATEGORIES.PHARMACOLOGY,
                description: 'IV infusion rate and drop calculations',
                keywords: ['infusion', 'rate', 'drip', 'iv', 'drops'],
                getTemplate: () => EC.getInfusionRateCalculator(),
                calculate: () => EC.calculateInfusionRate(),
                bindEvents: () => {}
            });
        }

        // Cockcroft-Gault Calculator
        if (EC.getCockcroftGaultCalculator) {
            this.registerCalculator('cockcroft-gault', {
                name: 'Cockcroft-Gault Calculator',
                category: TOOL_CATEGORIES.NEPHROLOGY,
                description: 'Creatinine clearance estimation',
                keywords: ['cockcroft', 'gault', 'creatinine', 'clearance'],
                getTemplate: () => EC.getCockcroftGaultCalculator(),
                calculate: () => EC.calculateCockcroftGault(),
                bindEvents: () => {}
            });
        }

        // Body Surface Area Calculator
        if (EC.getBSACalculator) {
            this.registerCalculator('bsa', {
                name: 'Body Surface Area Calculator',
                category: TOOL_CATEGORIES.GENERAL,
                description: 'BSA calculation using multiple formulas',
                keywords: ['bsa', 'surface', 'area', 'dubois', 'mosteller'],
                getTemplate: () => EC.getBSACalculator(),
                calculate: () => EC.calculateBSA(),
                bindEvents: () => {}
            });
        }

        // Fluid Balance Calculator
        if (EC.getFluidBalanceCalculator) {
            this.registerCalculator('fluid-balance', {
                name: 'Fluid Balance Calculator',
                category: TOOL_CATEGORIES.GENERAL,
                description: 'Daily fluid requirements and balance',
                keywords: ['fluid', 'balance', 'requirements', 'maintenance'],
                getTemplate: () => EC.getFluidBalanceCalculator(),
                calculate: () => EC.calculateFluidBalance(),
                bindEvents: () => {}
            });
        }

        // RASS Calculator
        if (EC.getRASSCalculator) {
            this.registerCalculator('rass', {
                name: 'RASS Scale',
                category: TOOL_CATEGORIES.ASSESSMENT,
                description: 'Richmond Agitation-Sedation Scale',
                keywords: ['rass', 'sedation', 'agitation', 'richmond', 'scale', 'consciousness'],
                getTemplate: () => EC.getRASSCalculator(),
                calculate: () => EC.calculateRASS(),
                bindEvents: () => {}
            });
        }

        // Fracture Risk Calculator (FRAX)
        if (EC.getFractureRiskCalculator) {
            this.registerCalculator('frax-fracture', {
                name: 'Fracture Risk Calculator',
                category: TOOL_CATEGORIES.RISK,
                description: 'FRAX fracture risk assessment tool',
                keywords: ['frax', 'fracture', 'risk', 'osteoporosis', 'bone', 'density'],
                getTemplate: () => EC.getFractureRiskCalculator(),
                calculate: () => EC.calculateFractureRisk(),
                bindEvents: () => {}
            });
        }

        // Anion Gap Calculator
        if (EC.getAnionGapCalculator) {
            this.registerCalculator('anion-gap', {
                name: 'Anion Gap Calculator',
                category: TOOL_CATEGORIES.LAB,
                description: 'Calculate serum anion gap from electrolytes',
                keywords: ['anion', 'gap', 'electrolytes', 'sodium', 'chloride', 'bicarbonate', 'acidosis'],
                getTemplate: () => EC.getAnionGapCalculator(),
                calculate: () => EC.calculateAnionGap(),
                bindEvents: () => {}
            });
        }

        // Wells DVT Score Calculator
        if (EC.getWellsDVTCalculator) {
            this.registerCalculator('wells-dvt', {
                name: 'Wells DVT Score',
                category: TOOL_CATEGORIES.ASSESSMENT,
                description: 'Wells Deep Vein Thrombosis probability score',
                keywords: ['wells', 'dvt', 'deep', 'vein', 'thrombosis', 'probability', 'score'],
                getTemplate: () => EC.getWellsDVTCalculator(),
                calculate: () => EC.calculateWellsDVT(),
                bindEvents: () => {}
            });
        }

        // Paediatric Dosing
        if (EC.getPaediatricDosingCalculator) {
            this.registerCalculator('paediatric-dosing', {
                name: 'Paediatric Dosing',
                category: TOOL_CATEGORIES.PAEDIATRICS,
                description: 'Weight-based drug dosing',
                keywords: ['paediatric', 'dosing', 'weight', 'children'],
                getTemplate: () => EC.getPaediatricDosingCalculator(),
                calculate: () => EC.calculatePaediatricDosing(),
                bindEvents: () => {}
            });
        }

        // Drug Volume Calculator
        if (EC.getDrugVolumeCalculator) {
            this.registerCalculator('drug-volume', {
                name: 'Drug Volume Calculator',
                category: TOOL_CATEGORIES.PHARMACOLOGY,
                description: 'Drug volume and dilution calculations',
                keywords: ['drug', 'volume', 'dilution', 'concentration'],
                getTemplate: () => EC.getDrugVolumeCalculator(),
                calculate: () => EC.calculateDrugVolume(),
                bindEvents: () => {}
            });
        }
        
        // Unit Converter
        if (EC.getUnitConverterCalculator) {
            this.registerCalculator('unit-converter', {
                name: 'Clinical Unit Converter',
                category: TOOL_CATEGORIES.UTILITIES,
                description: 'Convert between clinical units',
                keywords: ['unit', 'converter', 'conversion', 'mmol', 'mg'],
                getTemplate: () => EC.getUnitConverterCalculator(),
                calculate: () => EC.calculateUnitConverter(),
                bindEvents: () => {}
            });
        }

        // === ADDITIONAL RESPIRATORY ===
        
        // Asthma Calculator
        if (EC.getAsthmaCalculator) {
            this.registerCalculator('asthma', {
                name: 'Asthma Severity',
                category: TOOL_CATEGORIES.RESPIRATORY,
                description: 'BTS/SIGN asthma severity assessment',
                keywords: ['asthma', 'pef', 'respiratory', 'wheeze'],
                getTemplate: () => EC.getAsthmaCalculator(),
                calculate: () => EC.calculateAsthma(),
                bindEvents: () => {}
            });
        }

        // Winters Formula
        if (EC.getWintersCalculator) {
            this.registerCalculator('winters', {
                name: 'Winters Formula',
                category: TOOL_CATEGORIES.LABORATORY,
                description: 'Expected pCO2 in metabolic acidosis',
                keywords: ['winters', 'pco2', 'acidosis', 'metabolic', 'compensation'],
                getTemplate: () => EC.getWintersCalculator(),
                calculate: () => EC.calculateWinters(),
                bindEvents: () => {}
            });
        }

        // === ADDITIONAL CARDIOLOGY ===
        
        // GRACE Score
        if (EC.getGRACECalculator) {
            this.registerCalculator('grace', {
                name: 'GRACE Score',
                category: TOOL_CATEGORIES.CARDIOLOGY,
                description: 'Risk stratification for ACS',
                keywords: ['grace', 'acs', 'risk', 'cardiac', 'heart'],
                getTemplate: () => EC.getGRACECalculator(),
                calculate: () => EC.calculateGRACE(),
                bindEvents: () => {}
            });
        }

        // CRUSADE Score
        if (EC.getCRUSADECalculator) {
            this.registerCalculator('crusade', {
                name: 'CRUSADE Bleeding Risk',
                category: TOOL_CATEGORIES.RISK,
                description: 'Bleeding risk in ACS patients',
                keywords: ['crusade', 'bleeding', 'acs', 'cardiac'],
                getTemplate: () => EC.getCRUSADECalculator(),
                calculate: () => EC.calculateCRUSADE(),
                bindEvents: () => {}
            });
        }

        console.log(`✅ Bridge calculators registered: ${this.calculators.size - 6} from ExtractedCalculators`);
    }

    /**
     * Register a calculator
     */
    registerCalculator(id, config) {
        const calculator = {
            id,
            name: config.name,
            category: config.category || TOOL_CATEGORIES.OTHER,
            description: config.description || '',
            keywords: config.keywords || [],
            getTemplate: config.getTemplate,
            calculate: config.calculate,
            bindEvents: config.bindEvents,
            metadata: config.metadata || {}
        };

        this.calculators.set(id, calculator);
        
        return calculator;
    }
    
    /**
     * Load calculator into detail view
     */
    loadCalculator(calculatorId) {
        const calculator = this.getCalculator(calculatorId);
        if (!calculator) {
            console.error(`Calculator not found: ${calculatorId}`);
            return false;
        }

        try {
            // Switch to calculator detail panel first
            eventBus.emit(EVENTS.UI_SWITCH_TOOL, { tool: 'calculator-detail' });
            
            // Set current calculator
            this.currentCalculator = calculator;
            
            // Add to recent tools
            this.addToRecentTools(calculatorId);
            
            // Get container element
            const container = document.getElementById('calculator-detail-container');
            if (!container) {
                console.error('Calculator container not found');
                return false;
            }
            
            // Clear existing content
            container.innerHTML = '';
            
            // Render calculator
            const success = this.renderCalculator(calculator, container);
            if (success) {
                // Emit event
                eventBus.emit(EVENTS.CALCULATOR_LOADED, {
                    id: calculator.id,
                    name: calculator.name,
                    category: calculator.category
                });
                
                // Analytics
                analytics.trackCalculatorUse(calculator.id);
                
                console.log(`✅ Calculator loaded: ${calculator.name}`);
            }
            
            return success;
        } catch (error) {
            console.error('Error loading calculator:', error);
            return false;
        }
    }

    /**
     * Render calculator HTML and bind events
     */
    renderCalculator(calculator, container) {
        try {
            // Create back button
            const backButton = `
                <button class="back-btn" onclick="window.quizApp.showCalculatorList(); event.stopPropagation();" 
                        style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; display: flex; align-items: center; gap: 8px;">
                    <span style="font-size: 16px;">←</span> Back to Calculators
                </button>
            `;
            
            // Render HTML using getTemplate with back button
            const html = calculator.getTemplate();
            container.innerHTML = backButton + html;
            
            // Bind calculator events - pass the container
            if (calculator.bindEvents) {
                calculator.bindEvents(container);
            }
            
            return true;
        } catch (error) {
            console.error('Error rendering calculator:', error);
            return false;
        }
    }
    
    /**
     * Execute calculation for a calculator
     */
    executeCalculation(calculatorId) {
        const calculator = this.getCalculator(calculatorId);
        if (!calculator) {
            console.error(`Calculator not found: ${calculatorId}`);
            return null;
        }
        
        try {
            const result = calculator.calculate();
            
            // Emit event
            eventBus.emit(EVENTS.CALCULATOR_CALCULATED, {
                id: calculator.id,
                name: calculator.name,
                result
            });
            
            // Vibration feedback
            if (result && !result.error) {
                analytics.vibrateSuccess();
            } else if (result && result.error) {
                analytics.vibrateError();
            }
            
            return result;
        } catch (error) {
            console.error('Calculation error:', error);
            eventBus.emit(EVENTS.ERROR_OCCURRED, { 
                type: 'calculator', 
                calculator: calculatorId,
                error 
            });
            return { error: error.message };
        }
    }

    /**
     * Get calculator by ID
     */
    getCalculator(id) {
        return this.calculators.get(id);
    }

    /**
     * Get all calculators
     */
    getAllCalculators() {
        return Array.from(this.calculators.values());
    }

    /**
     * Get calculators by category
     */
    getCalculatorsByCategory(category) {
        return this.getAllCalculators().filter(calc => calc.category === category);
    }

    /**
     * Get calculator count
     */
    getCalculatorCount() {
        return this.calculators.size;
    }

    /**
     * Search calculators by keyword
     */
    searchCalculators(query) {
        const searchTerm = query.toLowerCase();
        return this.getAllCalculators().filter(calc => {
            const nameMatch = calc.name.toLowerCase().includes(searchTerm);
            const keywordMatch = calc.keywords.some(keyword => 
                keyword.toLowerCase().includes(searchTerm)
            );
            const descMatch = calc.description.toLowerCase().includes(searchTerm);
            
            return nameMatch || keywordMatch || descMatch;
        });
    }

    /**
     * Add calculator to recent tools
     */
    addToRecentTools(calculatorId) {
        // Remove if already exists
        this.recentTools = this.recentTools.filter(id => id !== calculatorId);
        
        // Add to beginning
        this.recentTools.unshift(calculatorId);
        
        // Keep only last 10
        if (this.recentTools.length > 10) {
            this.recentTools = this.recentTools.slice(0, 10);
        }
        
        // Save to storage
        storage.setItem(STORAGE_KEYS.RECENT_TOOLS, this.recentTools);
    }

    /**
     * Get recent tools
     */
    getRecentTools() {
        return this.recentTools.map(id => this.getCalculator(id)).filter(Boolean);
    }

    /**
     * Clear recent tools
     */
    clearRecentTools() {
        this.recentTools = [];
        storage.removeItem(STORAGE_KEYS.RECENT_TOOLS);
    }

    /**
     * Calculator result interpretation - NEW FEATURE
     */
    interpretResult(calculatorId, result) {
        const interpretations = {
            'bmi': this.interpretBMI(result),
            'gcs': this.interpretGCS(result),
            'chads2-vasc': this.interpretCHADS2VASc(result),
            'hasbled': this.interpretHASBLED(result),
            'curb65': this.interpretCURB65(result),
            'news2': this.interpretNEWS2(result),
            'egfr': this.interpreteGFR(result),
            'wells': this.interpretWells(result)
        };
        
        return interpretations[calculatorId] || { 
            interpretation: 'Result calculated', 
            recommendation: 'Please interpret clinically',
            riskLevel: 'unknown'
        };
    }

    /**
     * Calculator comparison tool - NEW FEATURE
     */
    compareCalculators(calculatorIds, patientData) {
        return calculatorIds.map(id => {
            const calc = this.getCalculator(id);
            if (!calc) return null;
            
            return {
                id,
                name: calc.name,
                category: calc.category,
                result: this.calculateWithData(id, patientData),
                interpretation: this.interpretResult(id, patientData),
                clinicalRelevance: this.getClinicalRelevance(id, calc.category)
            };
        }).filter(Boolean);
    }

    /**
     * Smart calculator suggestions - NEW FEATURE
     */
    suggestCalculators(symptoms, demographics, vitals) {
        const suggestions = [];
        
        // Age-based suggestions
        if (demographics.age > 65) {
            suggestions.push('frailty', 'barthel', 'waterlow');
        }
        
        // Symptom-based suggestions
        if (symptoms.includes('chest pain')) {
            suggestions.push('grace', 'chads2-vasc', 'wells');
        }
        if (symptoms.includes('shortness of breath')) {
            suggestions.push('curb65', 'news2', 'wells');
        }
        if (symptoms.includes('confusion')) {
            suggestions.push('gcs', 'news2', 'mmse');
        }
        
        // Vital sign triggers
        if (vitals.systolic > 160 || vitals.diastolic > 100) {
            suggestions.push('qrisk3', 'chads2-vasc');
        }
        
        return suggestions.map(id => this.getCalculator(id)).filter(Boolean);
    }

    /**
     * Get tool notes for calculator
     */
    getToolNotes(calculatorId) {
        return this.toolNotes[calculatorId] || '';
    }

    /**
     * Save tool notes for calculator
     */
    saveToolNotes(calculatorId, notes) {
        this.toolNotes[calculatorId] = notes;
        storage.setItem(STORAGE_KEYS.TOOL_NOTES, this.toolNotes);
    }

    /**
     * Get calculator categories
     */
    getCategories() {
        const categories = new Set();
        this.getAllCalculators().forEach(calc => {
            categories.add(calc.category);
        });
        return Array.from(categories).sort();
    }

    /**
     * Export calculator data
     */
    exportCalculatorData() {
        return {
            calculators: this.getAllCalculators().map(calc => ({
                id: calc.id,
                name: calc.name,
                category: calc.category,
                description: calc.description,
                keywords: calc.keywords
            })),
            recentTools: this.recentTools,
            toolNotes: this.toolNotes,
            exportDate: new Date().toISOString(),
            version: '2.0'
        };
    }

    /**
     * Get calculator statistics
     */
    getStatistics() {
        const stats = {};
        const categories = this.getCategories();
        
        categories.forEach(category => {
            stats[category] = this.getCalculatorsByCategory(category).length;
        });
        
        return {
            totalCalculators: this.getCalculatorCount(),
            categoryCounts: stats,
            recentToolsCount: this.recentTools.length,
            notesCount: Object.keys(this.toolNotes).length
        };
    }

    /**
     * Interpretation helper methods - COMPREHENSIVE IMPLEMENTATIONS
     */
    
    interpretBMI(result) {
        const bmi = result.bmi || result;
        let category, riskLevel, recommendation;
        
        if (bmi < 18.5) {
            category = 'Underweight';
            riskLevel = 'moderate';
            recommendation = 'Nutritional assessment recommended. Screen for eating disorders and malnutrition.';
        } else if (bmi < 25) {
            category = 'Normal weight';
            riskLevel = 'low';
            recommendation = 'Maintain healthy lifestyle with balanced diet and regular exercise.';
        } else if (bmi < 30) {
            category = 'Overweight';
            riskLevel = 'moderate';
            recommendation = 'Lifestyle modification advised. Consider dietary counselling and increased physical activity.';
        } else if (bmi < 35) {
            category = 'Obese Class I';
            riskLevel = 'high';
            recommendation = 'Weight management essential. Consider referral to specialist weight management service.';
        } else if (bmi < 40) {
            category = 'Obese Class II';
            riskLevel = 'high';
            recommendation = 'Significant health risk. Specialist referral recommended. Consider pharmacotherapy.';
        } else {
            category = 'Obese Class III';
            riskLevel = 'critical';
            recommendation = 'Very high health risk. Urgent specialist referral. Consider bariatric surgery assessment.';
        }
        
        return { interpretation: category, recommendation, riskLevel, value: bmi.toFixed(1) };
    }

    interpretGCS(result) {
        const score = result.score || result;
        let category, riskLevel, recommendation;
        
        if (score <= 8) {
            category = 'Severe impairment';
            riskLevel = 'critical';
            recommendation = 'IMMEDIATE: Secure airway, consider intubation. CT head urgently. ITU referral.';
        } else if (score <= 12) {
            category = 'Moderate impairment';
            riskLevel = 'high';
            recommendation = 'Close monitoring required. CT head. Consider HDU admission. Frequent neurological observations.';
        } else if (score <= 14) {
            category = 'Mild impairment';
            riskLevel = 'moderate';
            recommendation = 'Regular neurological observations. Consider CT head if deteriorating or mechanism concerning.';
        } else {
            category = 'Normal consciousness';
            riskLevel = 'low';
            recommendation = 'Continue routine monitoring. Reassess if any deterioration.';
        }
        
        return { interpretation: category, recommendation, riskLevel, score };
    }

    interpretCHADS2VASc(result) {
        const score = result.score || result;
        let riskLevel, recommendation, annualStrokeRisk;
        
        if (score === 0) {
            riskLevel = 'low';
            annualStrokeRisk = '0.2%';
            recommendation = 'Low risk. No anticoagulation required. Consider aspirin only in certain cases.';
        } else if (score === 1) {
            riskLevel = 'moderate';
            annualStrokeRisk = '0.6-2.0%';
            recommendation = 'Moderate risk. Consider anticoagulation (DOAC preferred). Discuss risks/benefits with patient.';
        } else if (score === 2) {
            riskLevel = 'moderate-high';
            annualStrokeRisk = '2.2-3.2%';
            recommendation = 'Anticoagulation recommended unless contraindicated. DOAC preferred over warfarin.';
        } else {
            riskLevel = 'high';
            annualStrokeRisk = score === 3 ? '3.2%' : `${Math.min(score * 1.5, 15)}%`;
            recommendation = 'High risk. Anticoagulation strongly recommended. Use HAS-BLED to assess bleeding risk.';
        }
        
        return { interpretation: `${score}/9 points`, recommendation, riskLevel, annualStrokeRisk, score };
    }

    interpretHASBLED(result) {
        const score = result.score || result;
        let riskLevel, recommendation;
        
        if (score <= 2) {
            riskLevel = 'low';
            recommendation = 'Low bleeding risk. Anticoagulation can proceed if indicated. Annual review recommended.';
        } else {
            riskLevel = 'high';
            recommendation = 'Increased bleeding risk. Anticoagulation still beneficial if CHA2DS2-VASc ≥2. Address modifiable risk factors. More frequent monitoring required.';
        }
        
        return { interpretation: `${score}/9 points`, recommendation, riskLevel, score };
    }

    interpretCURB65(result) {
        const score = result.score || result;
        let riskLevel, recommendation, mortality;
        
        if (score === 0 || score === 1) {
            riskLevel = 'low';
            mortality = score === 0 ? '0.7%' : '2.1%';
            recommendation = 'Low severity. Consider home treatment with oral antibiotics. Safety net advice essential.';
        } else if (score === 2) {
            riskLevel = 'moderate';
            mortality = '9.2%';
            recommendation = 'Moderate severity. Consider hospital admission. IV antibiotics initially. Senior review required.';
        } else {
            riskLevel = 'high';
            mortality = score === 3 ? '14.5%' : '>27%';
            recommendation = 'High severity. Hospital admission essential. Consider ITU/HDU. IV antibiotics. Consultant review.';
        }
        
        return { interpretation: `${score}/5 points`, recommendation, riskLevel, mortality, score };
    }

    interpretNEWS2(result) {
        const score = result.score || result;
        let riskLevel, recommendation, urgency;
        
        if (score === 0) {
            riskLevel = 'low';
            urgency = 'Routine';
            recommendation = 'Continue routine monitoring. Minimum 12-hourly observations.';
        } else if (score <= 4) {
            riskLevel = 'low-medium';
            urgency = 'Low';
            recommendation = 'Increase observation frequency to minimum 4-6 hourly. Inform nurse in charge.';
        } else if (score <= 6) {
            riskLevel = 'medium';
            urgency = 'Medium';
            recommendation = 'Urgent review by clinician with competency in acute illness. Minimum hourly observations. Consider HDU.';
        } else {
            riskLevel = 'high';
            urgency = 'High';
            recommendation = 'EMERGENCY: Immediate clinical review. Consultant and critical care team. Continuous monitoring. Consider ITU.';
        }
        
        return { interpretation: `${score} points`, recommendation, riskLevel, urgency, score };
    }

    interpreteGFR(result) {
        const egfr = result.egfr || result;
        let stage, riskLevel, recommendation;
        
        if (egfr >= 90) {
            stage = 'Stage 1 (Normal/High)';
            riskLevel = 'low';
            recommendation = 'Normal kidney function. Continue routine monitoring if risk factors present.';
        } else if (egfr >= 60) {
            stage = 'Stage 2 (Mildly reduced)';
            riskLevel = 'low';
            recommendation = 'Mild reduction. Monitor annually. Address cardiovascular risk factors.';
        } else if (egfr >= 45) {
            stage = 'Stage 3a (Mild-moderate)';
            riskLevel = 'moderate';
            recommendation = 'Mild-moderate CKD. 6-monthly monitoring. Adjust medication doses. Nephrology referral if declining.';
        } else if (egfr >= 30) {
            stage = 'Stage 3b (Moderate-severe)';
            riskLevel = 'moderate-high';
            recommendation = 'Moderate-severe CKD. 3-monthly monitoring. Nephrology referral advised. Medication review essential.';
        } else if (egfr >= 15) {
            stage = 'Stage 4 (Severe)';
            riskLevel = 'high';
            recommendation = 'Severe CKD. Nephrology follow-up essential. Prepare for renal replacement therapy. Frequent monitoring.';
        } else {
            stage = 'Stage 5 (End-stage)';
            riskLevel = 'critical';
            recommendation = 'End-stage kidney disease. Urgent nephrology input. Dialysis or transplant required.';
        }
        
        return { interpretation: stage, recommendation, riskLevel, egfr: egfr.toFixed(1) };
    }

    interpretWells(result) {
        const score = result.score || result;
        let riskLevel, recommendation, probability;
        
        if (score <= 1) {
            riskLevel = 'low';
            probability = '1.3%';
            recommendation = 'Low probability of DVT/PE. Consider D-dimer. If negative, DVT/PE unlikely.';
        } else if (score <= 2) {
            riskLevel = 'moderate';
            probability = '16.2%';
            recommendation = 'Moderate probability. D-dimer testing. If positive or high clinical suspicion, proceed to imaging.';
        } else {
            riskLevel = 'high';
            probability = '40.6%';
            recommendation = 'High probability. Proceed directly to imaging (ultrasound for DVT, CTPA for PE). Consider treatment dose anticoagulation while awaiting results.';
        }
        
        return { interpretation: `${score} points`, recommendation, riskLevel, probability, score };
    }

    /**
     * Calculate with patient data - Helper method
     */
    calculateWithData(calculatorId, patientData) {
        // Placeholder for actual calculation logic
        // This would interface with the calculator's calculate method
        return { calculated: true, data: patientData };
    }

    /**
     * Get clinical relevance - Helper method
     */
    getClinicalRelevance(calculatorId, category) {
        const relevanceMap = {
            [TOOL_CATEGORIES.CARDIOLOGY]: 'Essential for cardiovascular risk stratification and management decisions',
            [TOOL_CATEGORIES.RESPIRATORY]: 'Critical for assessing respiratory disease severity and determining treatment location',
            [TOOL_CATEGORIES.NEPHROLOGY]: 'Important for medication dosing and monitoring chronic kidney disease progression',
            [TOOL_CATEGORIES.CRITICAL_CARE]: 'Vital for triage, severity assessment, and determining level of care required',
            [TOOL_CATEGORIES.GENERAL]: 'Useful for routine clinical assessment and health monitoring'
        };
        
        return relevanceMap[category] || 'Aids clinical decision-making and risk assessment';
    }
}

// Create and export singleton instance
export const calculatorManager = new CalculatorManager();