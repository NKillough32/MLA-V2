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
}

// Create and export singleton instance
export const calculatorManager = new CalculatorManager();