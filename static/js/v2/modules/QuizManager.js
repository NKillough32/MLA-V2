/**
 * Quiz Manager - Handles quiz loading, state, and progression
 */

import { eventBus } from './EventBus.js';
import { storage } from './StorageManager.js';
import { analytics } from './AnalyticsManager.js';
import UIHelpers from './UIHelpers.js';
import { EVENTS, STORAGE_KEYS, QUIZ_CONFIG } from './Constants.js';

export class QuizManager {
    constructor() {
        this.storage = storage;  // Store reference to storage
        this.eventBus = eventBus;
        this.analytics = analytics;
        
        this.currentQuiz = null;
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.submittedAnswers = {};
        this.ruledOutAnswers = {};
        this.questions = [];
        this.fullQuestionBank = [];
        this.quizName = '';
        this.flaggedQuestions = new Set();
        this.selectedQuizLength = QUIZ_CONFIG.DEFAULT_LENGTH;
        this.feedbackMode = 'immediate'; // 'immediate' or 'end'

        this.categoryKeywords = {
            // General / Internal Medicine
            general: ['general medicine', 'internal medicine', 'primary care', 'ward round', 'clinic', 'outpatient', 'inpatient', 'admission', 'discharge', 'history taking', 'examination', 'diagnosis', 'management', 'treatment'],
            
            // Emergency Medicine
            emergency: ['emergency', 'resuscitation', 'acute', 'trauma', 'aed', 'shock', 'crash', 'cardiac arrest', 'cpr', 'airway', 'anaphylaxis', 'sepsis', 'unconscious', 'collapse', 'overdose', 'poisoning', 'burns', 'fracture', 'haemorrhage', 'bleeding', 'a&e', 'accident'],
            
            // Cardiology
            cardiology: ['cardiology', 'heart', 'ecg', 'arrhythmia', 'cardiac', 'angina', 'myocardial infarction', 'heart failure', 'atrial fibrillation', 'ventricular', 'pacemaker', 'murmur', 'valve', 'coronary', 'hypertension', 'blood pressure', 'chest pain', 'palpitations', 'stemi', 'nstemi', 'troponin', 'bnp'],
            
            // Respiratory
            respiratory: ['respiratory', 'asthma', 'copd', 'lung', 'pneumonia', 'breathlessness', 'pleural', 'bronchitis', 'emphysema', 'tuberculosis', 'pulmonary', 'cough', 'sputum', 'dyspnoea', 'oxygen', 'spirometry', 'chest x-ray', 'fibrosis', 'embolism', 'ards'],
            
            // Neurology
            neurology: ['neurology', 'neurological', 'brain', 'stroke', 'seizure', 'epilepsy', 'headache', 'migraine', 'meningitis', 'encephalitis', 'parkinson', 'dementia', 'alzheimer', 'multiple sclerosis', 'neuropathy', 'nerve', 'paralysis', 'weakness', 'tremor', 'consciousness', 'gcs', 'lumbar puncture', 'ct head', 'mri brain'],
            
            // Gastroenterology
            gastroenterology: ['gastroenterology', 'gastrointestinal', 'gi', 'abdominal', 'liver', 'hepatic', 'cirrhosis', 'hepatitis', 'pancreas', 'pancreatitis', 'bowel', 'colon', 'crohn', 'ulcerative colitis', 'ibd', 'diarrhoea', 'constipation', 'vomiting', 'nausea', 'dysphagia', 'reflux', 'gord', 'peptic ulcer', 'gi bleed', 'melaena', 'haematemesis', 'ascites', 'jaundice', 'bilirubin'],
            
            // Endocrinology & Diabetes
            endocrinology: ['endocrine', 'endocrinology', 'diabetes', 'diabetic', 'insulin', 'glucose', 'hba1c', 'thyroid', 'hyperthyroid', 'hypothyroid', 'adrenal', 'cushing', 'addison', 'pituitary', 'hormone', 'calcium', 'parathyroid', 'osteoporosis', 'dka', 'hypoglycaemia', 'hyperglycaemia'],
            
            // Renal / Nephrology
            renal: ['renal', 'kidney', 'nephrology', 'dialysis', 'creatinine', 'egfr', 'ckd', 'aki', 'acute kidney injury', 'chronic kidney disease', 'proteinuria', 'haematuria', 'uti', 'urinary', 'electrolyte', 'sodium', 'potassium', 'urea', 'glomerulonephritis', 'nephrotic', 'nephritic'],
            
            // Haematology
            haematology: ['haematology', 'blood', 'anaemia', 'haemoglobin', 'platelet', 'clotting', 'coagulation', 'warfarin', 'anticoagulant', 'dvt', 'pe', 'thrombosis', 'embolism', 'leukaemia', 'lymphoma', 'myeloma', 'transfusion', 'bleeding', 'bruising', 'sickle cell', 'thalassaemia', 'iron', 'b12', 'folate'],
            
            // Infectious Diseases
            infectious: ['infection', 'infectious', 'sepsis', 'antibiotic', 'bacteria', 'viral', 'fungal', 'fever', 'pyrexia', 'hiv', 'aids', 'tuberculosis', 'tb', 'malaria', 'pneumonia', 'meningitis', 'cellulitis', 'abscess', 'mrsa', 'c diff', 'clostridium', 'vaccination', 'immunisation'],
            
            // Rheumatology / MSK
            rheumatology: ['rheumatology', 'rheumatoid', 'arthritis', 'joint', 'osteoarthritis', 'gout', 'lupus', 'sle', 'autoimmune', 'connective tissue', 'vasculitis', 'fibromyalgia', 'back pain', 'musculoskeletal', 'msk', 'bone', 'muscle', 'tendon', 'inflammation', 'swelling', 'stiffness', 'dmard'],
            
            // Dermatology
            dermatology: ['dermatology', 'skin', 'rash', 'eczema', 'psoriasis', 'dermatitis', 'urticaria', 'melanoma', 'skin cancer', 'acne', 'wound', 'ulcer', 'cellulitis', 'fungal', 'itching', 'pruritus', 'biopsy', 'lesion', 'mole', 'pigmented'],
            
            // Psychiatry / Mental Health
            psychiatry: ['psychiatry', 'psychiatric', 'mental health', 'depression', 'anxiety', 'bipolar', 'schizophrenia', 'psychosis', 'suicide', 'self-harm', 'eating disorder', 'anorexia', 'bulimia', 'ptsd', 'ocd', 'personality disorder', 'addiction', 'substance', 'alcohol', 'delirium', 'dementia', 'capacity', 'section', 'mental health act'],
            
            // Geriatrics / Elderly Care
            geriatrics: ['geriatric', 'elderly', 'older', 'frailty', 'falls', 'delirium', 'dementia', 'polypharmacy', 'care home', 'nursing home', 'mobility', 'continence', 'pressure sore', 'osteoporosis', 'hip fracture', 'discharge planning', 'cga', 'comprehensive geriatric assessment'],
            
            // Paediatrics
            paediatrics: ['paediatric', 'pediatric', 'child', 'children', 'infant', 'baby', 'neonatal', 'newborn', 'developmental', 'growth', 'immunisation', 'vaccination', 'fever', 'rash', 'safeguarding', 'child protection', 'bronchiolitis', 'croup', 'febrile', 'otitis media'],
            
            // Obstetrics & Gynaecology
            obstetrics: ['obstetric', 'gynaecology', 'gynecology', 'pregnancy', 'pregnant', 'antenatal', 'postnatal', 'labour', 'delivery', 'caesarean', 'c-section', 'miscarriage', 'ectopic', 'pre-eclampsia', 'gestational', 'menstrual', 'menopause', 'contraception', 'fertility', 'ovarian', 'uterine', 'cervical', 'pelvic'],
            
            // Surgery
            surgery: ['surgery', 'surgical', 'operation', 'operative', 'pre-operative', 'post-operative', 'appendicitis', 'cholecystitis', 'hernia', 'bowel obstruction', 'laparoscopic', 'wound', 'incision', 'drainage', 'anastomosis', 'resection', 'consent', 'theatre'],
            
            // Oncology
            oncology: ['oncology', 'cancer', 'malignancy', 'tumour', 'tumor', 'chemotherapy', 'radiotherapy', 'metastasis', 'staging', 'palliative', 'hospice', 'terminal', 'biopsy', 'histology', 'carcinoma', 'sarcoma', 'lymphoma', 'leukaemia'],
            
            // Pharmacology
            pharmacology: ['pharmacology', 'drug', 'medication', 'prescribing', 'dose', 'side effect', 'adverse', 'interaction', 'contraindication', 'overdose', 'toxicity', 'therapeutic', 'mechanism', 'antibiotic', 'analgesic', 'opioid', 'nsaid', 'ace inhibitor', 'beta blocker', 'statin'],
            
            // Ethics & Law
            ethics: ['ethics', 'ethical', 'consent', 'capacity', 'confidentiality', 'gdpr', 'data protection', 'safeguarding', 'mental health act', 'deprivation of liberty', 'dols', 'best interests', 'advance directive', 'dnacpr', 'end of life', 'gmc', 'fitness to practise', 'duty of candour']
        };
        
        // Time tracking
        this.questionStartTime = null;
        this.questionTimes = {};
        this.quizEndTime = null;
        this.quizStartTime = null;
        this.totalStudyTime = 0;
        this.sessionStats = {
            questionsAnswered: 0,
            totalTime: 0,
            averageTimePerQuestion: 0
        };

        // Per-question correctness results (PSA-aware)
        this.correctResults = {};

        // Review mode flag
        this.isReviewMode = false;

        // Upload status element id (used to show V1-style persistent messages during file processing)
        this.uploadStatusId = 'upload-status';

        // Auto-save timer for quiz progress
        this.autoSaveTimer = null;
    }

    /**
     * Initialize the quiz manager
     */
    async initialize() {
        console.log('🎯 QuizManager initialized');
        
        // Load quiz length from storage
        this.selectedQuizLength = await storage.getItem(STORAGE_KEYS.QUIZ_LENGTH, QUIZ_CONFIG.DEFAULT_LENGTH);
        
        // Load feedback mode from storage
        this.feedbackMode = await storage.getItem(STORAGE_KEYS.FEEDBACK_MODE, 'immediate');
        
        // Update quiz length info display
        this.updateQuizLengthInfo();
        
        // Update feedback mode info display
        this.updateFeedbackModeInfo();
        
        return Promise.resolve();
    }

    /**
     * Load a quiz by name
     */
    async loadQuiz(quizName, isUploaded = false) {
        console.log(`📚 Loading quiz: ${quizName} (uploaded: ${isUploaded})`);
        
        try {
            let quizData;
            
            if (isUploaded) {
                // Load from uploaded quizzes with V1-compatible logic
                const uploadedQuizzes = await this.getUploadedQuizzes();
                const quiz = uploadedQuizzes.find(q => q.name === quizName);
                
                if (!quiz) {
                    throw new Error('Uploaded quiz not found. Please re-upload the file.');
                }
                
                // Check if this is a split storage quiz that needs reconstruction
                if (quiz.dataStored === 'split' && (!quiz.questions || quiz.questions.length === 0)) {
                    console.log('🔍 Reconstructing split storage quiz');
                    try {
                        const storageKey = quiz.storageKey || `quiz_${this.sanitizeStorageKey(quiz.name)}`;
                        const quizStoredData = await this.getStorageValueWithFallback(storageKey, {});
                        if (quizStoredData.questions && quizStoredData.questions.length > 0) {
                            quiz.questions = quizStoredData.questions;
                            quiz.images = quizStoredData.images || {};
                            console.log('✅ Successfully reconstructed quiz with', quiz.questions.length, 'questions');
                        } else {
                            throw new Error('No questions found in split storage');
                        }
                    } catch (error) {
                        console.error('❌ Failed to reconstruct quiz:', error);
                        throw new Error('Failed to load quiz data. Please re-upload the file.');
                    }
                }
                
                quizData = quiz;
            } else {
                // Load from API
                const response = await fetch(`/api/quiz/${encodeURIComponent(quizName)}`);
                if (!response.ok) {
                    throw new Error(`Failed to load quiz: ${response.statusText}`);
                }
                const result = await response.json();
                if (!result.success) {
                    throw new Error(result.error || 'Failed to load quiz');
                }
                quizData = result.quiz;
            }

            const normalizedQuestions = this.normalizeQuestionList(quizData.questions || [], { force: true });

            // Store current quiz for image lookups (V1 compatibility)
            this.currentQuiz = { ...quizData, questions: normalizedQuestions };
            this.quizName = quizName;
            this.fullQuestionBank = normalizedQuestions;
            this.questions = [...this.fullQuestionBank];
            
            // Filter questions based on selected length (V1 compatibility)
            this.questions = this.filterQuestionsByLength(this.questions);
            
            // Reset state
            this.currentQuestionIndex = 0;
            this.answers = {};
            this.submittedAnswers = {};
            this.ruledOutAnswers = {};
            this.flaggedQuestions = new Set();
            this.questionTimes = {};
            
            if (this.questions.length === 0) {
                throw new Error('This quiz contains no questions.');
            }
            
            eventBus.emit(EVENTS.QUIZ_LOADED, { name: quizName, questionCount: this.questions.length });
            console.log(`✅ Loaded quiz: ${quizName} (${this.questions.length} questions)`);
            
            return true;
        } catch (error) {
            console.error('❌ Error loading quiz:', error);
            eventBus.emit(EVENTS.ERROR_OCCURRED, { type: 'quiz_load', error: error.message });
            return false;
        }
    }

    /**
     * Get uploaded quizzes with V1-compatible reconstruction logic
     */
    async getUploadedQuizzes() {
        console.log('🔍 Retrieving uploaded quizzes');
        
        // Get quizzes from localStorage
        let quizzes = await this.getStorageValueWithFallback(STORAGE_KEYS.UPLOADED_QUIZZES, []);
        
        // Ensure quizzes is always an array (handle corrupted storage data)
        if (!Array.isArray(quizzes)) {
            console.warn('⚠️ Uploaded quizzes data is not an array, resetting to empty array:', quizzes);
            quizzes = [];
        }
        
        // Also check temporary storage (V1 compatibility)
        if (window.tempUploadedQuizzes && window.tempUploadedQuizzes.length > 0) {
            console.log('🔍 Found', window.tempUploadedQuizzes.length, 'quizzes in temporary storage');
            // Merge with persistent storage, removing duplicates
            const tempNames = window.tempUploadedQuizzes.map(q => q.name);
            quizzes = quizzes.filter(q => !tempNames.includes(q.name));
            quizzes = [...quizzes, ...window.tempUploadedQuizzes];
        }
        
        // For split storage quizzes, reconstruct the data
        const reconstructedQuizzes = [];
        
        // Ensure quizzes is still an array after merge
        if (!Array.isArray(quizzes)) {
            console.error('❌ Quizzes became non-array after merge, resetting');
            quizzes = [];
        }
        
        for (const quiz of quizzes) {
            // If this entry already contains full quiz data, accept it
            if (quiz.questions && Array.isArray(quiz.questions)) {
                reconstructedQuizzes.push(quiz);
                continue;
            }

            // Handle split storage reconstruction
            const storageKey = quiz.storageKey || `quiz_${this.sanitizeStorageKey(quiz.name)}`;

            if (quiz.dataStored === 'split') {
                console.log('🔍 Reconstructing split storage quiz:', quiz.name);
                try {
                    const quizData = await this.getStorageValueWithFallback(storageKey, {});
                    reconstructedQuizzes.push({
                        ...quiz,
                        storageKey,
                        questions: quizData.questions || [],
                        images: quizData.images || {}
                    });
                } catch (error) {
                    console.error('❌ Failed to reconstruct quiz:', quiz.name, error);
                    reconstructedQuizzes.push(quiz); // Return metadata only
                }
            } else {
                // For normally stored quizzes, try to read the full object
                try {
                    const stored = await this.getStorageValueWithFallback(storageKey, null);
                    if (stored) {
                        reconstructedQuizzes.push(stored);
                    } else {
                        reconstructedQuizzes.push(quiz);
                    }
                } catch (error) {
                    console.error('❌ Failed to read stored quiz:', quiz.name, error);
                    reconstructedQuizzes.push(quiz);
                }
            }
        }
        
        console.log(`📦 Retrieved ${reconstructedQuizzes.length} uploaded quizzes`);
        return reconstructedQuizzes;
    }

    /**
     * Read storage values with IndexedDB fallback for iOS/Safari localStorage limits.
     */
    async getStorageValueWithFallback(key, defaultValue = null) {
        const value = await storage.getItem(key, defaultValue);
        if (value !== defaultValue) {
            return value;
        }

        if (typeof storage.getItemFromDB === 'function') {
            try {
                const dbValue = await storage.getItemFromDB(key);
                if (dbValue !== null && dbValue !== undefined) {
                    return dbValue;
                }
            } catch (error) {
                console.debug(`Failed to read ${key} from IndexedDB fallback:`, error);
            }
        }

        return defaultValue;
    }

    /**
     * Sanitize storage key (V1 compatibility)
     */
    sanitizeStorageKey(name) {
        return name.replace(/[^a-zA-Z0-9_-]/g, '_');
    }

    /**
     * Ensure every question has a stable original index for cross-feature navigation
     */
    normalizeQuestionList(questions, { force = false, startIndex = 0 } = {}) {
        if (!Array.isArray(questions)) return [];
        return questions.map((question, idx) => this.applyOriginalIndex(question, startIndex + idx, { force }));
    }

    applyOriginalIndex(question, index, { force = false } = {}) {
        if (!question || typeof question !== 'object') return question;
        if (!force && Number.isInteger(question.__originalIndex)) {
            return question;
        }
        return { ...question, __originalIndex: index };
    }

    /**
     * Filter questions by selected length (V1 compatibility)
     */
    filterQuestionsByLength(questions) {
        const totalQuestions = questions.length;
        const shouldKeepAll = !this.selectedQuizLength
            || this.selectedQuizLength === 'all'
            || this.selectedQuizLength >= totalQuestions;

        // Always shuffle before deciding how many questions to use
        const shuffled = this.shuffleArray(questions);

        if (shouldKeepAll) {
            return shuffled;
        }

        return shuffled.slice(0, this.selectedQuizLength);
    }

    /**
     * Start the quiz
     */
    async startQuiz() {
        if (!this.currentQuiz || this.questions.length === 0) {
            console.error('❌ No quiz loaded');
            return;
        }

        // Reset quiz state before starting (clear previous answers, etc.)
        await this.clearProgress(this.quizName);
        this.resetQuiz();

        // Randomly select questions if needed
        const totalQuestions = this.questions.length;
        const shouldKeepAll = !this.selectedQuizLength
            || this.selectedQuizLength === 'all'
            || this.selectedQuizLength >= totalQuestions;

        const shuffledQuestions = this.shuffleArray(this.questions);

        this.questions = shouldKeepAll
            ? shuffledQuestions
            : shuffledQuestions.slice(0, this.selectedQuizLength);

        // Shuffle options for all questions to prevent pattern memorization (V1 compatibility)
        this.questions = this.questions.map(question => this.shuffleOptions(question));

        // Start timing
        this.quizStartTime = Date.now();
        this.quizEndTime = null;
        this.questionStartTime = Date.now();
        
        // Scroll to top when quiz starts
        this.scrollToTop();
        
        // Render first question
        this.currentQuestionIndex = 0;
        this.renderQuestion();
        
        // Start vibration feedback
        analytics.vibrateClick();
        
        eventBus.emit(EVENTS.QUIZ_STARTED, { 
            name: this.quizName, 
            questionCount: this.questions.length 
        });
        
        console.log(`🎯 Started quiz: ${this.quizName}`);
    }

    /**
     * Render current question
     */
    renderQuestion() {
        const question = this.questions[this.currentQuestionIndex];
        if (!question) {
            console.error('❌ Question not found at index:', this.currentQuestionIndex);
            console.error('❌ Total questions:', this.questions.length);
            console.error('❌ Questions array:', this.questions);
            return;
        }

        console.log('📝 Rendering question:', {
            index: this.currentQuestionIndex,
            total: this.questions.length,
            questionKeys: Object.keys(question),
            hasPrompt: !!question.prompt,
            hasScenario: !!question.scenario,
            hasText: !!question.text,
            hasOptions: !!question.options,
            optionCount: question.options?.length
        });

        // Track question start time
        this.questionStartTime = Date.now();

        // Emit event for UI to handle rendering
        // Use shouldShowFeedback to determine if feedback should be displayed
        eventBus.emit('quiz:renderQuestion', {
            question,
            index: this.currentQuestionIndex,
            total: this.questions.length,
            answer: this.answers[this.currentQuestionIndex],
            submitted: this.shouldShowFeedback(this.currentQuestionIndex),
            answerRecorded: this.submittedAnswers[this.currentQuestionIndex],
            ruledOut: this.ruledOutAnswers[this.currentQuestionIndex] || [],
            flagged: this.flaggedQuestions.has(this.currentQuestionIndex)
        });

        // Emit progress update event
        const progress = this.getProgress();
        eventBus.emit('quiz:progressUpdated', progress);
    }

    /**
     * Submit answer for current question
     */
    submitAnswer(selectedAnswer) {
        const questionIndex = this.currentQuestionIndex;
        const question = this.questions[questionIndex];

        if (!question) return;

        // Record answer
        this.answers[questionIndex] = selectedAnswer;
        this.submittedAnswers[questionIndex] = true;

        // Track time spent
        if (this.questionStartTime) {
            const timeSpent = Math.floor((Date.now() - this.questionStartTime) / 1000);
            this.questionTimes[questionIndex] = timeSpent;
            this.sessionStats.totalTime += timeSpent;
            this.sessionStats.questionsAnswered++;
            this.sessionStats.averageTimePerQuestion = 
                this.sessionStats.totalTime / this.sessionStats.questionsAnswered;
        }

        // Check if correct (PSA-aware)
        const qType = question.question_type || 'mcq';
        let isCorrect = false;
        let correctAnswerIdx;

        if (qType === 'calculation') {
            const userVal   = parseFloat(selectedAnswer);
            const correct   = parseFloat(question.answer_value);
            const tolerance = parseFloat(question.tolerance ?? 0);
            isCorrect = !isNaN(userVal) && Math.abs(userVal - correct) <= tolerance;
            correctAnswerIdx = '_calculation';
        } else if (qType === 'prescription') {
            const pFields = question.prescription_fields || [];
            isCorrect = pFields.length > 0 && pFields.every(f => {
                const userVal = ((selectedAnswer || {})[f.field] || '').trim().toLowerCase();
                return (f.accept && f.accept.length ? f.accept : [f.answer])
                    .some(a => a.trim().toLowerCase() === userVal);
            });
            correctAnswerIdx = '_prescription';
        } else if (qType === 'prescribing') {
            const grade = this._gradePrescribing(question, selectedAnswer);
            isCorrect = grade.drugOk || grade.doseOk;
            correctAnswerIdx = '_prescribing';
            // Store detailed result so calculateScore and the renderer can use it
            this.correctResults[questionIndex] = { drugOk: grade.drugOk, doseOk: grade.doseOk };
        } else if (qType === 'review') {
            // selectedAnswer = { a: indexOrNull, b: indexOrNull }
            const ua = selectedAnswer || {};
            const aOk = this.isReviewPartAnswerCorrect(question.part_a || {}, ua.a);
            const bOk = this.isReviewPartAnswerCorrect(question.part_b || {}, ua.b);
            isCorrect = aOk || bOk; // partial credit counts as attempted correct
            correctAnswerIdx = '_review';
        } else {
            correctAnswerIdx = this.getStoredCorrectAnswer(question);
            isCorrect = this.isSelectionAnswerCorrect(question, selectedAnswer);
        }

        // Store correctness result for this question
        // (prescribing stores a {drugOk, doseOk} object — don't overwrite it)
        if (qType !== 'prescribing') {
            this.correctResults[questionIndex] = isCorrect;
        }

        // Vibration feedback
        if (isCorrect) {
            analytics.vibrateSuccess();
        } else {
            analytics.vibrateError();
        }

        eventBus.emit(EVENTS.QUESTION_ANSWERED, {
            questionIndex,
            answer: selectedAnswer,
            isCorrect,
            timeSpent: this.questionTimes[questionIndex]
        });

        this.queueAutoSave();

        return { isCorrect, correctAnswer: correctAnswerIdx };
    }

    /**
     * Grade a prescribing question by comparing the user's drug/dose/route/frequency
     * against the question's drug_options.
     * Returns { drugOk: bool, doseOk: bool }
     */
    _gradePrescribing(question, answer) {
        const drugOpts = question.drug_options || [];
        if (!drugOpts.length) return { drugOk: false, doseOk: false };

        const ans       = answer || {};
        const userDrug  = (ans.drug      || '').trim();
        const userDose  = (ans.dose      || '').trim();
        const userRoute = (ans.route     || '').trim();
        const userFreq  = (ans.frequency || '').trim();

        // Extract base active ingredient name (strip dose/form suffixes)
        const normDrug = s => {
            let t = (s || '').toLowerCase();
            // Remove anything after the first dose number (e.g. "40mg", "20 mg/ml")
            t = t.replace(/\s+\d[\d./]*\s*(mg|mcg|microgram|g\b|ml\b|units?|iu\b|mmol).*$/i, '');
            // Remove common form words if they appear early
            t = t.replace(/\b(tablet|capsule|solution|injection|suspension|oral|cream|gel|ointment|spray|drops|patch|powder|inhaler|infusion|vial|ampoule|implant|lozenge|suppository|syrup|elixir|foam|shampoo|paste|buccal|sublingual|modified|prolonged|gastro|effervescent|dispersible|orodispersible|film|pre-filled|inhalation|aerosol|nebuliser|extended|release)\b.*$/i, '');
            return t.replace(/[^a-z0-9\s]/g, ' ').replace(/\s+/g, ' ').trim().split(/\s+/).slice(0, 2).join(' ');
        };

        // Normalise a dose/route/freq string for comparison
        const normAmt = s => (s || '').toLowerCase()
            .replace(/\([^)]*\)/g, '')          // remove "(IV)", "(PO)" etc.
            .replace(/\s+/g, ' ')
            .trim();
        const toTokens = s => normAmt(s).split(/\s+/).filter(Boolean);

        const routeAliases = {
            iv: ['iv', 'intravenous'],
            po: ['po', 'oral', 'by mouth'],
            im: ['im', 'intramuscular'],
            sc: ['sc', 'subcutaneous', 'subcut'],
            pr: ['pr', 'rectal'],
            sl: ['sl', 'sublingual'],
            neb: ['neb', 'nebulised', 'nebulized'],
            inh: ['inh', 'inhaled', 'inhalation']
        };
        const detectRoute = (text) => {
            const n = normAmt(text);
            for (const [routeKey, aliases] of Object.entries(routeAliases)) {
                if (aliases.some(a => n.includes(a))) return routeKey;
            }
            return '';
        };

        const userDrugNorm = normDrug(userDrug);

        // Drug is correct if the user's base name matches any accepted drug's base name
        const drugOk = !!userDrugNorm && drugOpts.some(opt => {
            const optNorm = normDrug(opt.drug || '');
            return !!optNorm && (
                optNorm === userDrugNorm ||
                optNorm.startsWith(userDrugNorm + ' ') ||
                userDrugNorm.startsWith(optNorm + ' ') ||
                optNorm.startsWith(userDrugNorm) ||
                userDrugNorm.startsWith(optNorm)
            );
        });

        // Dose is correct if the combined dose+route+freq matches an accepted dose option.
        // Also allow a structured fallback where dose amount + route are correct, even if
        // timing/frequency wording differs ("once only" vs "over 10 minutes").
        const userCombined = normAmt([userDose, userRoute, userFreq].filter(Boolean).join(' '));
        const userRouteNorm = detectRoute([userRoute, userDose, userFreq].join(' '));
        const userDoseTokens = toTokens(userDose).filter(t => /\d/.test(t));

        const doseOk = !!userCombined && drugOpts.some(opt =>
            (opt.dose_options || []).some((doseStr) => {
                const dNorm = normAmt(doseStr);
                if (dNorm === userCombined ||
                       dNorm.includes(userCombined) ||
                       userCombined.includes(dNorm)) {
                    return true;
                }

                // Fallback: exact dose quantity/unit token(s) and route match.
                // This prevents unfair 0 marks when the user enters correct IV dose
                // but different timing text.
                const dRoute = detectRoute(dNorm);
                const dTokens = toTokens(dNorm);
                const doseTokensMatch = userDoseTokens.length > 0 && userDoseTokens.every(t => dTokens.includes(t));
                const routeMatches = !!userRouteNorm && !!dRoute && userRouteNorm === dRoute;

                return doseTokensMatch && routeMatches;
            })
        );

        return { drugOk, doseOk };
    }

    /**
     * Navigate to next question
     */
    nextQuestion() {
        if (this.currentQuestionIndex < this.questions.length - 1) {
            this.currentQuestionIndex++;
            this.renderQuestion();
            this.scrollToTop();
            analytics.vibrateClick();
            this.queueAutoSave();
            return true;
        }
        return false;
    }

    /**
     * Search the current quiz questions for a term (used by GlobalSearch)
     */
    async searchQuestions(query, options = {}) {
        const { 
            includeUploaded = false,
            filters = {
                scenario: true,
                investigations: true,
                options: true,
                explanation: true,
                specialty: true
            }
        } = options;

        if (!query || typeof query !== 'string') return [];
        const term = query.trim().toLowerCase();
        if (term.length < 2) {
            return [];
        }

        const pools = await this.buildQuestionPools(includeUploaded);
        const results = [];

        pools.forEach((pool) => {
            (pool.questions || []).forEach((question, index) => {
                const haystack = this.buildFilteredSearchText(question, filters).toLowerCase();
                if (!haystack || !haystack.includes(term)) return;

                const snippetSource = question.prompt || question.text || question.scenario || question.title || question.question || '';
                const snippet = snippetSource.length > 140 ? `${snippetSource.slice(0, 140)}…` : snippetSource;

                results.push({
                    index,
                    quizName: pool.quizName,
                    snippet,
                    question,
                    isUploaded: pool.isUploaded,
                    images: pool.images || {} // Include source quiz images for later merging
                });
            });
        });

        return results;
    }

    /**
     * Build search text based on active filters
     */
    buildFilteredSearchText(question = {}, filters = {}) {
        const parts = [];

        // Question/Scenario text
        if (filters.scenario !== false) {
            parts.push(
                question.title,
                question.question,
                question.prompt,
                question.scenario,
                question.text
            );
        }

        // Investigations
        if (filters.investigations !== false) {
            parts.push(question.investigations);
        }

        // Answer options
        if (filters.options !== false) {
            if (question.options) parts.push(...question.options);
            parts.push(
                question.correctAnswer,
                question.answer,
                question.answerText,
                question.correct_answer,
                question.correct_answer_text
            );
            if (Array.isArray(question.answers)) parts.push(...question.answers);
            if (Array.isArray(question.correctAnswers)) parts.push(...question.correctAnswers);
            if (Array.isArray(question.acceptableAnswers)) parts.push(...question.acceptableAnswers);
        }

        // Explanations
        if (filters.explanation !== false) {
            parts.push(question.explanation);
            if (Array.isArray(question.explanations)) parts.push(...question.explanations);
        }

        // Specialty
        if (filters.specialty !== false) {
            parts.push(question.specialty);
        }

        return parts.filter(Boolean).join(' ');
    }

    buildAnswerSearchText(question = {}) {
        const correctAnswerOption =
            typeof question.correct_answer === 'number'
                ? question.options?.[question.correct_answer]
                : null;

        const parts = [
            ...(question.options || []),
            ...(Array.isArray(question.answers) ? question.answers : []),
            ...(Array.isArray(question.correctAnswers) ? question.correctAnswers : []),
            ...(Array.isArray(question.acceptableAnswers) ? question.acceptableAnswers : []),
            question.answer,
            question.answerText,
            question.correctAnswer,
            question.correct_answer,
            question.correct_answer_text,
            correctAnswerOption
        ].filter(Boolean);

        return parts.join(' ').toLowerCase();
    }

    buildSearchableText(question = {}) {
        const parts = [
            question.title,
            question.question,
            question.prompt,
            question.specialty,
            question.investigations,
            question.scenario,
            question.text,
            ...(question.options || []),
            question.correctAnswer,
            question.answer,
            question.explanation,
            ...(question.explanations || [])
        ].filter(Boolean);

        return parts.join(' ').toLowerCase();
    }

    async buildQuestionPools(includeUploaded = false) {
        const pools = [];

        const currentQuestions = Array.isArray(this.fullQuestionBank) && this.fullQuestionBank.length
            ? this.fullQuestionBank
            : (Array.isArray(this.questions) ? this.questions : []);

        if (currentQuestions.length) {
            pools.push({ 
                quizName: this.quizName || 'Current quiz', 
                questions: this.normalizeQuestionList(currentQuestions), 
                images: this.currentQuiz?.images || {},
                isUploaded: false 
            });
        }

        if (includeUploaded) {
            const uploadedQuizzes = await this.getUploadedQuizzes();
            uploadedQuizzes.forEach((quiz) => {
                if (quiz?.questions?.length) {
                    pools.push({ 
                        quizName: quiz.name || 'Uploaded quiz', 
                        questions: this.normalizeQuestionList(quiz.questions, { force: true }), 
                        images: quiz.images || {},
                        isUploaded: true 
                    });
                }
            });
        }

        return pools;
    }

    async startCategoryQuiz(category, lengthOverride = null) {
        const key = (category || '').toLowerCase();
        const keywords = this.categoryKeywords[key];

        if (!keywords || !keywords.length) {
            UIHelpers.showToast('⚠️ Unknown quiz category selected.', 'warning');
            return false;
        }

        // Read filter states from DOM checkboxes (same as search)
        const filters = {
            scenario: document.getElementById('filter-scenario')?.checked ?? true,
            investigations: document.getElementById('filter-investigations')?.checked ?? true,
            options: document.getElementById('filter-options')?.checked ?? true,
            explanation: document.getElementById('filter-explanation')?.checked ?? true,
            specialty: document.getElementById('filter-specialty')?.checked ?? true
        };

        const pools = await this.buildQuestionPools(true);
        const matches = [];
        const mergedImages = {}; // Collect images from all matched pools

        pools.forEach((pool) => {
            let poolHasMatch = false;
            (pool.questions || []).forEach((question) => {
                // Use filtered search text based on checkbox states
                const haystack = this.buildFilteredSearchText(question, filters).toLowerCase();
                if (!haystack) return;

                if (keywords.some(keyword => haystack.includes(keyword))) {
                    matches.push({ question, quizName: pool.quizName });
                    poolHasMatch = true;
                }
            });
            
            // If this pool contributed any questions, merge its images
            if (poolHasMatch && pool.images) {
                Object.assign(mergedImages, pool.images);
            }
        });

        if (!matches.length) {
            UIHelpers.showToast('No questions matched this category. Try uploading more quizzes.', 'warning');
            return false;
        }

        const lengthSetting = lengthOverride === 'all' ? 'all' : parseInt(lengthOverride || this.selectedQuizLength);
        await this.setQuizLength(Number.isNaN(lengthSetting) ? QUIZ_CONFIG.DEFAULT_LENGTH : lengthSetting);

        const shuffled = this.shuffleArray(matches.map(match => match.question));
        const filtered = this.filterQuestionsByLength(shuffled);

        // Include merged images from all contributing quizzes
        this.currentQuiz = { name: `${category} curated`, questions: shuffled, images: mergedImages };
        this.quizName = `${category} mix`;
        this.fullQuestionBank = shuffled;
        this.questions = [...filtered];

        console.log(`📚 Category quiz created with ${Object.keys(mergedImages).length} images from source quizzes`);

        await this.startQuiz();
        return true;
    }

    /**
     * Start a custom quiz from selected search matches
     */
    async startCustomQuizFromSearch(matches = [], query = '') {
        if (!Array.isArray(matches) || !matches.length) {
            UIHelpers.showToast('Select at least one question to start a custom quiz.', 'warning');
            return false;
        }

        const questions = matches
            .map((match, idx) => this.applyOriginalIndex(match?.question, Number.isInteger(match?.index) ? match.index : idx, { force: true }))
            .filter(Boolean);

        if (!questions.length) {
            UIHelpers.showToast('No valid questions were found in your selection.', 'warning');
            return false;
        }

        // Merge images from all source quizzes in the matches
        const mergedImages = {};
        matches.forEach(match => {
            if (match?.images) {
                Object.assign(mergedImages, match.images);
            }
        });

        const quizTitle = query ? `Search: ${query}` : 'Custom search quiz';
        const previousLength = this.selectedQuizLength;

        // Include merged images from all contributing quizzes
        this.currentQuiz = { name: quizTitle, questions, images: mergedImages };
        this.quizName = quizTitle;
        this.fullQuestionBank = [...questions];
        this.questions = [...questions];
        this.selectedQuizLength = 'all';

        console.log(`📚 Custom search quiz created with ${Object.keys(mergedImages).length} images from source quizzes`);

        await this.startQuiz();

        // Restore previous length preference for subsequent quizzes
        this.selectedQuizLength = previousLength;
        return true;
    }

    /**
     * Flag a set of questions (e.g., all search matches) for quick navigation
     */
    async ensureFullQuizForIndices(indices = []) {
        const targets = Array.from(new Set(indices.filter((idx) => Number.isInteger(idx) && idx >= 0)));
        if (!targets.length) return false;

        // Ensure the full question bank is normalized
        this.fullQuestionBank = this.normalizeQuestionList(this.fullQuestionBank, { force: true });

        // Bail early if any index is out of bounds
        if (targets.some((idx) => !this.fullQuestionBank[idx])) {
            return false;
        }

        const hasAllTargets = targets.every((originalIdx) => this.questions.some((q) => q.__originalIndex === originalIdx));

        // If the current session already includes the targets and has started, no need to rebuild
        if (hasAllTargets && this.quizStartTime) {
            return true;
        }

        // Expand to full set and restart quiz to make sure indices exist in the session
        this.selectedQuizLength = 'all';
        this.questions = [...this.fullQuestionBank];
        await this.startQuiz();

        return true;
    }

    async selectQuestionsByIndices(indices = []) {
        if (!Array.isArray(indices) || !indices.length) {
            return { count: 0, indices: [] };
        }

        const targets = Array.from(new Set(indices.filter((idx) => Number.isInteger(idx) && idx >= 0)));
        if (!targets.length) {
            return { count: 0, indices: [] };
        }

        const ready = await this.ensureFullQuizForIndices(targets);
        if (!ready) {
            return { count: 0, indices: [] };
        }

        const sessionIndices = targets
            .map((originalIdx) => this.questions.findIndex((q) => q.__originalIndex === originalIdx))
            .filter((idx) => idx >= 0);

        sessionIndices.forEach((idx) => this.flaggedQuestions.add(idx));

        // Update UI to reflect bulk flagging
        eventBus.emit(EVENTS.QUESTION_FLAGGED, { bulk: true, indices: sessionIndices });
        eventBus.emit('quiz:progressUpdated', this.getProgress());
        this.renderQuestion();

        return { count: sessionIndices.length, indices: sessionIndices };
    }

    /**
     * Navigate to previous question
     */
    previousQuestion() {
        if (this.currentQuestionIndex > 0) {
            this.currentQuestionIndex--;
            this.renderQuestion();
            this.scrollToTop();
            analytics.vibrateClick();
            this.queueAutoSave();
            return true;
        }
        return false;
    }

    /**
     * Go to specific question
     */
    goToQuestion(index) {
        if (index >= 0 && index < this.questions.length) {
            this.currentQuestionIndex = index;
            this.renderQuestion();
            this.scrollToTop();
            analytics.vibrateClick();
            this.queueAutoSave();
            return true;
        }
        return false;
    }

    async goToOriginalQuestion(originalIndex) {
        if (!Number.isInteger(originalIndex) || originalIndex < 0) {
            return false;
        }

        const ready = await this.ensureFullQuizForIndices([originalIndex]);
        if (!ready) {
            return false;
        }

        const targetIndex = this.questions.findIndex((q) => q.__originalIndex === originalIndex);
        if (targetIndex === -1) {
            return false;
        }

        this.currentQuestionIndex = targetIndex;
        this.renderQuestion();
        this.scrollToTop();
        analytics.vibrateClick();
        return true;
    }

    /**
     * Scroll to top helper
     */
    scrollToTop() {
        // Scroll main window with smooth behavior
        window.scrollTo({ top: 0, behavior: 'smooth' });
        
        // Also scroll quiz panel if it exists
        const quizPanel = document.getElementById('quiz-panel');
        if (quizPanel) {
            quizPanel.scrollTo({ top: 0, behavior: 'smooth' });
        }
        
        // Scroll main content area
        const mainContent = document.querySelector('main');
        if (mainContent) {
            mainContent.scrollTo({ top: 0, behavior: 'smooth' });
        }
    }

    /**
     * Toggle flag on current question
     */
    toggleFlag() {
        const index = this.currentQuestionIndex;
        if (this.flaggedQuestions.has(index)) {
            this.flaggedQuestions.delete(index);
        } else {
            this.flaggedQuestions.add(index);
        }
        
        eventBus.emit(EVENTS.QUESTION_FLAGGED, {
            questionIndex: index,
            flagged: this.flaggedQuestions.has(index)
        });
        
        // Re-render to update flag button
        this.renderQuestion();
        this.queueAutoSave();
        
        return this.flaggedQuestions.has(index);
    }

    /**
     * Select an answer (without submitting)
     */
    selectAnswer(optionIndex) {
        const questionIndex = this.currentQuestionIndex;
        const question = this.questions[questionIndex];
        const selectionCount = this.getQuestionSelectionCount(question);
        const currentAnswer = this.answers[questionIndex];

        if (selectionCount <= 1) {
            this.answers[questionIndex] = optionIndex;
        } else {
            const currentSelections = Array.isArray(currentAnswer) ? [...currentAnswer] : [];
            const existingIndex = currentSelections.indexOf(optionIndex);

            if (existingIndex >= 0) {
                currentSelections.splice(existingIndex, 1);
            } else if (currentSelections.length < selectionCount) {
                currentSelections.push(optionIndex);
            } else {
                UIHelpers.showToast(`This question requires ${selectionCount} answers. Deselect one option before choosing another.`, 'warning');
                return;
            }

            this.answers[questionIndex] = currentSelections;
        }
        
        eventBus.emit('quiz:answerSelected', {
            questionIndex,
            answer: this.answers[questionIndex]
        });
        
        // Re-render to show selection
        this.renderQuestion();
        this.queueAutoSave();
    }

    /**
     * Get current answer
     */
    getCurrentAnswer() {
        return this.answers[this.currentQuestionIndex];
    }

    getStoredCorrectAnswer(question = {}) {
        if (Array.isArray(question.correct_answer)) return [...question.correct_answer];
        if (Array.isArray(question.correctAnswer)) return [...question.correctAnswer];
        if (Array.isArray(question.correct_answers)) return [...question.correct_answers];
        if (Array.isArray(question.correctAnswers)) return [...question.correctAnswers];
        if (question.correct_answer !== undefined) return question.correct_answer;
        return question.correctAnswer;
    }

    getCorrectAnswerIndices(question = {}) {
        const raw = this.getStoredCorrectAnswer(question);
        if (Array.isArray(raw)) {
            return raw.filter(idx => Number.isInteger(idx));
        }
        return Number.isInteger(raw) ? [raw] : [];
    }

    getQuestionSelectionCount(question = {}) {
        const explicit = Number.parseInt(question.selection_count ?? question.selectionCount, 10);
        if (Number.isInteger(explicit) && explicit > 0) {
            return explicit;
        }

        const correctIndices = this.getCorrectAnswerIndices(question);
        if (correctIndices.length > 1) {
            return correctIndices.length;
        }

        const sourceText = [
            question.prompt,
            question.question,
            question.text,
            question.title,
            question.stem
        ].filter(Boolean).join(' ');

        if (!sourceText) return 1;

        const wordToNumber = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6
        };

        const match = sourceText.match(/\b(?:select|choose|pick|identify|mark)\s+(?:the\s+)?(one|two|three|four|five|six|\d+)\b/i)
            || sourceText.match(/\b(?:which|what)\s+(one|two|three|four|five|six|\d+)\b/i);

        if (!match) return 1;

        const token = match[1].toLowerCase();
        return wordToNumber[token] || Number.parseInt(token, 10) || 1;
    }

    getReviewPartSelectionCount(part = {}) {
        const explicit = Number.parseInt(part.selection_count ?? part.selectionCount, 10);
        if (Number.isInteger(explicit) && explicit > 0) {
            return explicit;
        }

        const correct = Array.isArray(part.correct)
            ? part.correct.filter(idx => Number.isInteger(idx))
            : (Number.isInteger(part.correct) ? [part.correct] : []);
        if (correct.length > 1) {
            return correct.length;
        }

        const sourceText = [
            part.prompt,
            part.question,
            part.text,
            part.title,
            part.stem
        ].filter(Boolean).join(' ');

        if (!sourceText) return 1;

        const wordToNumber = {
            one: 1,
            two: 2,
            three: 3,
            four: 4,
            five: 5,
            six: 6
        };

        const match = sourceText.match(/\b(?:select|choose|pick|identify|mark)\s+(?:the\s+)?(one|two|three|four|five|six|\d+)\b/i)
            || sourceText.match(/\b(?:which|what)\s+(one|two|three|four|five|six|\d+)\b/i);

        if (!match) return 1;

        const token = match[1].toLowerCase();
        return wordToNumber[token] || Number.parseInt(token, 10) || 1;
    }

    normalizeReviewPartAnswer(part = {}, selectedAnswer) {
        const selectionCount = this.getReviewPartSelectionCount(part);
        if (selectionCount <= 1) {
            return Number.isInteger(selectedAnswer) ? selectedAnswer : undefined;
        }

        if (!Array.isArray(selectedAnswer)) return [];
        return [...new Set(selectedAnswer.filter(idx => Number.isInteger(idx)))].sort((a, b) => a - b);
    }

    isReviewPartAnswerCorrect(part = {}, selectedAnswer) {
        const correct = Array.isArray(part.correct)
            ? part.correct.filter(idx => Number.isInteger(idx)).sort((a, b) => a - b)
            : (Number.isInteger(part.correct) ? [part.correct] : []);
        if (!correct.length) return false;

        const normalizedAnswer = this.normalizeReviewPartAnswer(part, selectedAnswer);
        if (Array.isArray(normalizedAnswer)) {
            if (normalizedAnswer.length !== correct.length) return false;
            return normalizedAnswer.every((idx, pos) => idx === correct[pos]);
        }

        return normalizedAnswer === correct[0];
    }

    normalizeSelectionAnswer(question = {}, selectedAnswer) {
        const selectionCount = this.getQuestionSelectionCount(question);
        if (selectionCount <= 1) {
            return Number.isInteger(selectedAnswer) ? selectedAnswer : undefined;
        }

        if (!Array.isArray(selectedAnswer)) return [];
        return selectedAnswer
            .filter(idx => Number.isInteger(idx))
            .sort((a, b) => a - b);
    }

    isSelectionAnswerCorrect(question = {}, selectedAnswer) {
        const correctIndices = this.getCorrectAnswerIndices(question).sort((a, b) => a - b);
        if (!correctIndices.length) return false;

        const normalizedAnswer = this.normalizeSelectionAnswer(question, selectedAnswer);
        if (Array.isArray(normalizedAnswer)) {
            if (normalizedAnswer.length !== correctIndices.length) return false;
            return normalizedAnswer.every((idx, pos) => idx === correctIndices[pos]);
        }

        return normalizedAnswer === correctIndices[0];
    }

    /**
     * Toggle rule out an answer option
     */
    toggleRuleOut(optionIndex) {
        const questionIndex = this.currentQuestionIndex;
        if (!this.ruledOutAnswers[questionIndex]) {
            this.ruledOutAnswers[questionIndex] = [];
        }
        
        const ruledOut = this.ruledOutAnswers[questionIndex];
        const index = ruledOut.indexOf(optionIndex);
        
        if (index > -1) {
            ruledOut.splice(index, 1);
        } else {
            ruledOut.push(optionIndex);
        }
        
        // Re-render to show ruled out state
        this.renderQuestion();
        this.queueAutoSave();
        
        return ruledOut.includes(optionIndex);
    }

    /**
     * Rule out an answer option
     */
    ruleOutAnswer(optionIndex) {
        return this.toggleRuleOut(optionIndex);
    }

    /**
     * Set quiz length preference
     */
    async setQuizLength(length) {
        this.selectedQuizLength = length === 'all' ? 'all' : parseInt(length);
        this.quizLength = this.selectedQuizLength; // Keep both for compatibility
        await storage.setItem(STORAGE_KEYS.QUIZ_LENGTH, this.selectedQuizLength);
        console.log(`🎯 Selected quiz length: ${this.selectedQuizLength}`);
        
        // Update UI display (V1 compatibility)
        this.updateQuizLengthInfo();
    }

    /**
     * Update quiz length info display (V1 compatibility)
     */
    updateQuizLengthInfo() {
        let infoText = '';
        if (this.selectedQuizLength === 'all') {
            infoText = '📝 Selected: All questions for comprehensive practice';
        } else if (this.selectedQuizLength === 100) {
            infoText = '📝 Selected: 100 questions for extended practice session';
        } else {
            infoText = `📝 Selected: ${this.selectedQuizLength} questions for quick practice session`;
        }
        
        // Update info display if element exists
        const infoElement = document.querySelector('.quiz-length-info');
        if (infoElement) {
            infoElement.textContent = infoText;
        }
        
        console.log(`🎯 Updated quiz length info: ${infoText}`);
    }

    /**
     * Set feedback mode preference
     */
    async setFeedbackMode(mode) {
        this.feedbackMode = mode;
        await storage.setItem(STORAGE_KEYS.FEEDBACK_MODE, this.feedbackMode);
        console.log(`💡 Selected feedback mode: ${this.feedbackMode}`);
        
        // Update UI display
        this.updateFeedbackModeInfo();
    }

    /**
     * Get feedback mode
     */
    getFeedbackMode() {
        return this.feedbackMode;
    }

    /**
     * Check if feedback should be shown for current question
     * Returns true if in immediate mode, or if quiz is complete (review mode)
     */
    shouldShowFeedback(questionIndex) {
        // Always show feedback in review mode
        if (this.isReviewMode) {
            return true;
        }
        
        // In immediate mode, show feedback as soon as submitted
        if (this.feedbackMode === 'immediate') {
            return this.submittedAnswers[questionIndex] === true;
        }
        
        // In end mode, don't show feedback until quiz is complete
        // Feedback will be shown in review mode after quiz completion
        return false;
    }

    /**
     * Update feedback mode info display
     */
    updateFeedbackModeInfo() {
        let infoText = '';
        if (this.feedbackMode === 'immediate') {
            infoText = '💡 Immediate: See if you\'re right or wrong after submitting each answer';
        } else {
            infoText = '📋 End of Quiz: Answers will be revealed when you finish the quiz';
        }
        
        // Update info display if element exists
        const infoElement = document.getElementById('feedback-mode-info');
        if (infoElement) {
            infoElement.textContent = infoText;
        }
        
        // Update button active states
        const buttons = document.querySelectorAll('.feedback-mode-btn');
        buttons.forEach(btn => {
            const mode = btn.getAttribute('data-mode');
            if (mode === this.feedbackMode) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        });
        
        console.log(`💡 Updated feedback mode info: ${infoText}`);
    }

    /**
     * Calculate score
     */
    calculateScore() {
        let correct = 0;        // number of questions answered correctly
        let marksEarned = 0;    // PSA-weighted marks earned
        let marksAvailable = 0; // PSA-weighted marks available
        let answered = 0;
        let isPsaMode = false;  // true when non-MCQ PSA question types are present

        // PSA mark weights per question type (Prescribing Safety Assessment scheme)
        const PSA_MARKS = { prescription: 10, prescribing: 10, calculation: 2, review: 4, mcq: 2 };

        this.questions.forEach((question, index) => {
            if (this.submittedAnswers[index]) {
                answered++;
                const qType = question.question_type || 'mcq';
                const stored = this.answers[index];

                if (qType !== 'mcq') isPsaMode = true;

                if (qType === 'calculation') {
                    const qMarks = PSA_MARKS.calculation;
                    marksAvailable += qMarks;
                    const userVal     = parseFloat(stored);
                    const targetValue = parseFloat(question.answer_value);
                    const tolerance   = parseFloat(question.tolerance ?? 0);
                    if (!isNaN(userVal) && Math.abs(userVal - targetValue) <= tolerance) {
                        correct++;
                        marksEarned += qMarks;
                    }
                } else if (qType === 'prescription') {
                    const qMarks = PSA_MARKS.prescription;
                    marksAvailable += qMarks;
                    const pFields = question.prescription_fields || [];
                    const allOk = pFields.length > 0 && pFields.every(f => {
                        const userVal = ((stored || {})[f.field] || '').trim().toLowerCase();
                        return (f.accept && f.accept.length ? f.accept : [f.answer])
                            .some(a => a.trim().toLowerCase() === userVal);
                    });
                    if (allOk) {
                        correct++;
                        marksEarned += qMarks;
                    }
                } else if (qType === 'prescribing') {
                    const drugMarks = question.drug_marks ?? 5;
                    const doseMarks = question.dose_marks ?? 5;
                    marksAvailable += drugMarks + doseMarks;
                    const grade = this._gradePrescribing(question, stored);
                    const earned = (grade.drugOk ? drugMarks : 0) + (grade.doseOk ? doseMarks : 0);
                    marksEarned += earned;
                    if (grade.drugOk || grade.doseOk) correct++;
                } else if (qType === 'review') {
                    const marks_a = question.marks_a ?? 2;
                    const marks_b = question.marks_b ?? 2;
                    marksAvailable += marks_a + marks_b;
                    const ua = stored || {};
                    const aOk = this.isReviewPartAnswerCorrect(question.part_a || {}, ua.a);
                    const bOk = this.isReviewPartAnswerCorrect(question.part_b || {}, ua.b);
                    marksEarned += (aOk ? marks_a : 0) + (bOk ? marks_b : 0);
                    if (aOk && bOk) correct++;
                } else {
                    const qMarks = PSA_MARKS.mcq;
                    marksAvailable += qMarks;
                    if (this.isSelectionAnswerCorrect(question, stored)) {
                        correct++;
                        marksEarned += qMarks;
                    }
                }
            }
        });

        const percentage = marksAvailable > 0 ? (marksEarned / marksAvailable) * 100 : 0;

        return {
            correct,
            marksEarned,
            marksAvailable,
            answered,
            total: this.questions.length,
            percentage: Math.round(percentage * 10) / 10,
            unanswered: this.questions.length - answered,
            isPsaMode
        };
    }

    /**
     * Finish quiz and show results
     */
    async finishQuiz() {
        const score = this.calculateScore();
        this.quizEndTime = Date.now();

        const totalTime = this.getTotalTime();

        const averageTime = score.answered > 0 ?
            Math.round(totalTime / score.answered) : 0;

        const results = {
            name: this.quizName,
            score: score.isPsaMode ? score.marksEarned : score.correct,
            correct: score.correct,
            marksEarned: score.marksEarned,
            marksAvailable: score.marksAvailable,
            isPsaMode: score.isPsaMode,
            answered: score.answered,
            total: score.total,
            totalQuestions: score.total,
            percentage: score.percentage,
            time: totalTime,
            totalTime,
            averageTime,
            questionTimes: this.questionTimes,
            flagged: Array.from(this.flaggedQuestions),
            completedAt: new Date().toISOString()
        };

        // Save results
        await storage.setItem(STORAGE_KEYS.LAST_QUIZ, results);
        await this.clearProgress(this.quizName);
        
        // Update session stats
        const sessionStats = await storage.getItem(STORAGE_KEYS.SESSION_STATS, {
            totalQuizzes: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            totalTime: 0
        });
        
        sessionStats.totalQuizzes++;
        sessionStats.totalQuestions += score.answered;
        sessionStats.totalCorrect += score.correct;
        sessionStats.totalTime += totalTime;
        
        await storage.setItem(STORAGE_KEYS.SESSION_STATS, sessionStats);

        // Track completion
        analytics.trackQuizCompletion(this.quizName, score.percentage, totalTime);
        analytics.vibrateSuccess();

        eventBus.emit(EVENTS.QUIZ_COMPLETED, results);
        
        console.log(score.isPsaMode
            ? `🎉 Quiz completed: ${score.marksEarned}/${score.marksAvailable} marks (${score.percentage}%)`
            : `🎉 Quiz completed: ${score.correct}/${score.answered} (${score.percentage}%)`
        );
        
        return results;
    }

    /**
     * Reset quiz
     */
    resetQuiz() {
        this.currentQuestionIndex = 0;
        this.answers = {};
        this.submittedAnswers = {};
        this.ruledOutAnswers = {};
        this.flaggedQuestions = new Set();
        this.questionTimes = {};
        this.quizEndTime = null;
        this.quizStartTime = null;
        this.questionStartTime = null;
        this.isReviewMode = false;

        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
            this.autoSaveTimer = null;
        }
        
        console.log('🔄 Quiz reset');
    }

    /**
     * Retry quiz (from V1)
     */
    retryQuiz() {
        console.log('🔄 Retrying quiz');
        this.resetQuiz();
        this.startQuiz();
    }

    /**
     * Get quiz progress
     */
    getProgress() {
        const answered = Object.keys(this.submittedAnswers).length;
        const percentage = this.questions.length > 0 ? 
            (answered / this.questions.length) * 100 : 0;

        // Calculate correct answers using stored per-question results (PSA-aware)
        let correct = 0;
        for (const [index, submitted] of Object.entries(this.submittedAnswers)) {
            if (submitted && this.correctResults[index] === true) {
                correct++;
            }
        }

        // Calculate total time spent (already in seconds)
        // Use elapsed time to provide live tracking during the quiz
        const totalTime = this.getTotalTime();

        return {
            current: this.currentQuestionIndex + 1,
            total: this.questions.length,
            answered,
            unanswered: this.questions.length - answered,
            percentage: Math.round(percentage),
            correct,
            incorrect: answered - correct,
            totalTime: Math.round(totalTime) // Already in seconds
        };
    }

    /**
     * Get current question
     */
    getCurrentQuestion() {
        return this.questions[this.currentQuestionIndex];
    }

    /**
     * Check if answer is submitted
     */
    isAnswerSubmitted(index = this.currentQuestionIndex) {
        return !!this.submittedAnswers[index];
    }

    /**
     * Get answer for question
     */
    getAnswer(index = this.currentQuestionIndex) {
        return this.answers[index];
    }

    /**
     * Check if question is flagged
     */
    isFlagged(index = this.currentQuestionIndex) {
        return this.flaggedQuestions.has(index);
    }

    /**
     * Get ruled out answers
     */
    getRuledOut(index = this.currentQuestionIndex) {
        return this.ruledOutAnswers[index] || [];
    }

    /**
     * Get time spent on question
     */
    getQuestionTime(index = this.currentQuestionIndex) {
        return this.questionTimes[index] || 0;
    }

    /**
     * Get total quiz time
     */
    getTotalTime() {
        if (!this.quizStartTime) return 0;
        const endTime = this.quizEndTime || Date.now();
        return Math.floor((endTime - this.quizStartTime) / 1000);
    }

    /**
     * Save progress (for resuming later)
     */
    async saveProgress() {
        if (!this.quizName || !this.questions.length || !this.hasUnsavedProgress()) {
            return null;
        }

        const progress = {
            quizName: this.quizName,
            isUploaded: !!this.currentQuiz?.isUploaded,
            questions: this.questions,
            currentQuestionIndex: this.currentQuestionIndex,
            answers: this.answers,
            submittedAnswers: this.submittedAnswers,
            ruledOutAnswers: this.ruledOutAnswers,
            flaggedQuestions: Array.from(this.flaggedQuestions),
            questionTimes: this.questionTimes,
            quizStartTime: this.quizStartTime,
            savedAt: Date.now()
        };

        const progressKey = `${STORAGE_KEYS.QUIZ_PROGRESS}_${this.quizName}`;
        await storage.setItem(progressKey, progress);
        await storage.setItem(STORAGE_KEYS.QUIZ_PROGRESS, {
            quizName: this.quizName,
            progressKey,
            savedAt: progress.savedAt
        });
        console.log('💾 Quiz progress saved');
        
        return progress;
    }

    /**
     * Load progress (to resume quiz)
     */
    async loadProgress(quizName = null) {
        let progressKey = quizName ? `${STORAGE_KEYS.QUIZ_PROGRESS}_${quizName}` : null;

        if (!progressKey) {
            const latestProgressMeta = await storage.getItem(STORAGE_KEYS.QUIZ_PROGRESS);
            progressKey = latestProgressMeta?.progressKey || null;
        }

        if (!progressKey) {
            return null;
        }

        const progress = await storage.getItem(progressKey);
        
        if (progress) {
            this.currentQuestionIndex = progress.currentQuestionIndex || 0;
            this.answers = progress.answers || {};
            this.submittedAnswers = progress.submittedAnswers || {};
            this.ruledOutAnswers = progress.ruledOutAnswers || {};
            this.flaggedQuestions = new Set(progress.flaggedQuestions || []);
            this.questionTimes = progress.questionTimes || {};
            this.quizStartTime = progress.quizStartTime || Date.now();
            this.quizEndTime = null;
            
            console.log('📂 Quiz progress loaded');
            return progress;
        }
        
        return null;
    }


    /**
     * Apply saved quiz progress after loading a quiz
     */
    applySavedProgress(progress) {
        if (!progress || !progress.quizName) {
            return false;
        }

        if (Array.isArray(progress.questions) && progress.questions.length > 0) {
            this.questions = progress.questions;
        }

        this.currentQuestionIndex = Math.min(
            Math.max(progress.currentQuestionIndex || 0, 0),
            Math.max(this.questions.length - 1, 0)
        );
        this.answers = progress.answers || {};
        this.submittedAnswers = progress.submittedAnswers || {};
        this.ruledOutAnswers = progress.ruledOutAnswers || {};
        this.flaggedQuestions = new Set(progress.flaggedQuestions || []);
        this.questionTimes = progress.questionTimes || {};
        this.quizStartTime = progress.quizStartTime || Date.now();
        this.quizEndTime = null;

        this.renderQuestion();
        eventBus.emit(EVENTS.QUIZ_STARTED, {
            name: this.quizName,
            questionCount: this.questions.length,
            resumed: true
        });

        console.log('✅ Restored quiz progress session');
        return true;
    }

    /**
     * Clear saved progress
     */
    async clearProgress(quizName = this.quizName) {
        const progressMeta = await storage.getItem(STORAGE_KEYS.QUIZ_PROGRESS);
        const progressKey = `${STORAGE_KEYS.QUIZ_PROGRESS}_${quizName}`;

        await storage.removeItem(progressKey);

        if (progressMeta?.progressKey === progressKey) {
            await storage.removeItem(STORAGE_KEYS.QUIZ_PROGRESS);
        }

        console.log('🗑️ Quiz progress cleared');
    }

    queueAutoSave() {
        if (this.autoSaveTimer) {
            clearTimeout(this.autoSaveTimer);
        }

        this.autoSaveTimer = setTimeout(() => {
            this.saveProgress();
        }, 400);
    }

    /**
     * Shuffle array (for random question selection)
     */
    shuffleArray(array) {
        const shuffled = [...array];
        for (let i = shuffled.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
        }
        return shuffled;
    }

    /**
     * Shuffle options for a question to prevent pattern memorization (V1 compatibility)
     * Updates the correct_answer index to match the new shuffled position
     */
    shuffleOptions(question) {
        // PSA non-MCQ types carry no options array — skip shuffling
        if (question.question_type && question.question_type !== 'mcq') {
            return question;
        }
        if (!question.options || question.options.length <= 1) {
            return question;
        }

        // Get correct answer index(es) - support both naming conventions
        const originalCorrectAnswers = this.getCorrectAnswerIndices(question);

        // Validate correct_answer indices are within bounds
        if (!originalCorrectAnswers.length || originalCorrectAnswers.some(idx => idx < 0 || idx >= question.options.length)) {
            console.warn('⚠️ Invalid correct_answer index:', originalCorrectAnswers, 'for question with', question.options.length, 'options');
            question.correct_answer = 0; // Default to first option as fallback
            return question;
        }
        
        // Create array of indices and their corresponding options
        const optionPairs = question.options.map((option, index) => ({ option, originalIndex: index }));
        
        // Fisher-Yates shuffle
        for (let i = optionPairs.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [optionPairs[i], optionPairs[j]] = [optionPairs[j], optionPairs[i]];
        }
        
        // Create the shuffled question
        const shuffledQuestion = { ...question };
        shuffledQuestion.options = optionPairs.map(pair => pair.option);
        
        // Update the correct answer index(es) to match the new position
        const newCorrectIndices = originalCorrectAnswers
            .map((originalIndex) => {
                const pair = optionPairs.find(optionPair => optionPair.originalIndex === originalIndex);
                return pair ? optionPairs.indexOf(pair) : -1;
            })
            .filter(idx => idx >= 0)
            .sort((a, b) => a - b);

        if (newCorrectIndices.length === originalCorrectAnswers.length) {
            if (newCorrectIndices.length === 1) {
                shuffledQuestion.correct_answer = newCorrectIndices[0];
                shuffledQuestion.correctAnswer = newCorrectIndices[0];
            } else {
                shuffledQuestion.correct_answer = [...newCorrectIndices];
                shuffledQuestion.correctAnswer = [...newCorrectIndices];
                shuffledQuestion.correct_answers = [...newCorrectIndices];
                shuffledQuestion.correctAnswers = [...newCorrectIndices];
            }
            console.log(`🔀 Shuffled question: original answer index ${originalCorrectAnswers.join(', ')} → new index ${newCorrectIndices.join(', ')}`);
        } else {
            console.error('❌ Failed to find correct option pair for question:', question.title);
            shuffledQuestion.correct_answer = 0; // Default to first option
            shuffledQuestion.correctAnswer = 0;
        }
        
        // Store the mapping for this question so we can maintain consistency
        shuffledQuestion.optionMapping = optionPairs.map(pair => pair.originalIndex);
        
        return shuffledQuestion;
    }

    /**
     * Get quiz statistics
     */
    getStatistics() {
        const score = this.calculateScore();
        const totalTime = this.getTotalTime();
        const avgTime = score.answered > 0 ? totalTime / score.answered : 0;

        return {
            score,
            totalTime,
            averageTimePerQuestion: Math.round(avgTime),
            flaggedCount: this.flaggedQuestions.size,
            ruledOutCount: Object.values(this.ruledOutAnswers)
                .reduce((sum, arr) => sum + arr.length, 0)
        };
    }

    /**
     * Export quiz results (for sharing or analysis) - ENHANCED V2 IMPLEMENTATION
     */
    exportResults(format = 'download') {
        const score = this.calculateScore();
        const totalQuestions = this.questions.length;
        const percentage = Math.round(score.percentage);
        
        const results = {
            quizName: this.quizName,
            score,
            totalQuestions,
            percentage,
            totalTime: this.getTotalTime(),
            averageTimePerQuestion: Math.round(this.getTotalTime() / totalQuestions),
            questionTimes: this.questionTimes,
            flaggedCount: this.flaggedQuestions.size,
            answers: this.questions.map((q, i) => {
                return {
                    questionNumber: i + 1,
                    question: q.question?.substring(0, 100) + '...', // Truncated for export
                    yourAnswer: this.answers[i],
                    correctAnswer: this.getStoredCorrectAnswer(q),
                    isCorrect: this.isSelectionAnswerCorrect(q, this.answers[i]),
                    timeSpent: this.questionTimes[i] || 0,
                    flagged: this.flaggedQuestions.has(i),
                    ruledOutOptions: this.ruledOutAnswers[i]?.length || 0
                };
            }),
            completedAt: new Date().toISOString(),
            sessionStats: this.getStatistics(),
            deviceInfo: {
                platform: navigator.platform,
                language: navigator.language,
                userAgent: navigator.userAgent.substring(0, 100) // Truncated
            }
        };

        if (format === 'download') {
            this.downloadResults(results);
        } else {
            return results;
        }
    }

    /**
     * Download results as file - NEW FEATURE
     */
    downloadResults(results, format = 'json') {
        let content, filename, mimeType;
        
        if (format === 'json') {
            content = JSON.stringify(results, null, 2);
            filename = `mla-quiz-${results.quizName}-${new Date().toISOString().slice(0, 10)}.json`;
            mimeType = 'application/json';
        } else if (format === 'csv') {
            content = this.convertToCSV(results);
            filename = `mla-quiz-${results.quizName}-${new Date().toISOString().slice(0, 10)}.csv`;
            mimeType = 'text/csv';
        }
        
        const blob = new Blob([content], { type: mimeType });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        
        a.href = url;
        a.download = filename;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
        
        console.log(`📤 Quiz results exported as ${format.toUpperCase()}: ${filename}`);
    }

    /**
     * Convert results to CSV format - NEW FEATURE
     */
    convertToCSV(results) {
        const headers = ['Question #', 'Correct', 'Time (s)', 'Flagged', 'Ruled Out'];
        const rows = [headers];
        
        // Add summary row
        rows.push(['SUMMARY', '', '', '', '']);
        rows.push(['Quiz', results.quizName, '', '', '']);
        rows.push(['Score', `${results.score}/${results.totalQuestions} (${results.percentage}%)`, '', '', '']);
        rows.push(['Total Time', `${Math.round(results.totalTime / 60)} minutes`, '', '', '']);
        rows.push(['Average/Question', `${results.averageTimePerQuestion}s`, '', '', '']);
        rows.push(['', '', '', '', '']); // Empty row
        
        // Add question details
        rows.push(headers); // Headers again
        results.answers.forEach(answer => {
            rows.push([
                answer.questionNumber,
                answer.isCorrect ? 'Yes' : 'No',
                answer.timeSpent,
                answer.flagged ? 'Yes' : 'No',
                answer.ruledOutOptions
            ]);
        });
        
        return rows.map(row => row.join(',')).join('\n');
    }

    /**
     * Get available quizzes
     */
    async getAvailableQuizzes() {
        try {
            const response = await fetch('/api/quizzes');
            if (!response.ok) {
                throw new Error('Failed to fetch quizzes');
            }
            const quizzes = await response.json();
            return quizzes;
        } catch (error) {
            console.error('❌ Error fetching quizzes:', error);
            return [];
        }
    }

    /**
     * Check if quiz has unsaved progress
     */
    hasUnsavedProgress() {
        return Object.keys(this.submittedAnswers).length > 0 && 
               Object.keys(this.submittedAnswers).length < this.questions.length;
    }

    /**
     * Clear all uploaded quizzes (expected by HTML template)
     */
    async clearAllUploaded() {
        try {
            console.log('🗑️ Clearing all uploaded quiz data...');
            
            // Clear from localStorage
            await storage.removeItem(STORAGE_KEYS.UPLOADED_QUIZZES);
            
            // Clear any temp uploaded data
            if (window.tempUploadedQuizzes) {
                window.tempUploadedQuizzes = [];
            }
            
            // Reset current quiz if it was uploaded
            if (this.currentQuiz && this.currentQuiz.isUploaded) {
                this.resetQuiz();
            }
            
            console.log('✅ All uploaded quiz data cleared successfully');
            return true;
        } catch (error) {
            console.error('❌ Error clearing uploaded quizzes:', error);
            throw error;
        }
    }

    /**
     * Generate study report (expected by HTML template)
     */
    generateStudyReport() {
        try {
            console.log('📊 Generating study report...');
            
            if (!this.questions || this.questions.length === 0) {
                console.warn('⚠️ No quiz data available for report generation');
                return;
            }
            
            const results = this.exportResults();
            const score = this.calculateScore();
            
            // Create a simple report (you can enhance this)
            const report = {
                quiz: this.quizName,
                totalQuestions: this.questions.length,
                answeredQuestions: Object.keys(this.submittedAnswers).length,
                correctAnswers: score.isPsaMode ? score.marksEarned : score.correct,
                marksAvailable: score.marksAvailable,
                isPsaMode: score.isPsaMode,
                percentage: Math.round(score.percentage),
                totalTime: this.getTotalTime(),
                averageTime: Math.round(this.getTotalTime() / Object.keys(this.submittedAnswers).length),
                flaggedQuestions: this.flaggedQuestions.size
            };
            
            // Log the report
            console.log('📈 Study Report:', report);
            
            // Show a simple alert with the report (you can enhance this with a modal)
            const scoreOutOf = report.isPsaMode
                ? `${report.correctAnswers}/${report.marksAvailable} marks`
                : `${report.correctAnswers}/${report.totalQuestions}`;
            const reportText = `📊 Study Report for ${report.quiz}\n\n` +
                `Questions: ${report.answeredQuestions}/${report.totalQuestions}\n` +
                `Score: ${scoreOutOf} (${report.percentage}%)\n` +
                `Time: ${report.totalTime}s total, ${report.averageTime}s avg\n` +
                `Flagged: ${report.flaggedQuestions} questions`;
            
            alert(reportText);
            
            return report;
        } catch (error) {
            console.error('❌ Error generating study report:', error);
            alert('❌ Error generating study report. Check console for details.');
        }
    }

    /**
     * Update quiz length info display (expected by HTML template)
     */
    updateQuizLengthInfo() {
        try {
            const infoEl = document.getElementById('quiz-length-info');
            if (!infoEl) {
                console.log('🎯 Quiz length info element not found');
                return;
            }
            
            let message = '';
            if (this.selectedQuizLength === 'all') {
                message = '📚 Selected: All available questions for comprehensive practice';
            } else if (this.selectedQuizLength === 100) {
                message = '🎯 Selected: 100 questions for standard test simulation';
            } else {
                message = `📝 Selected: ${this.selectedQuizLength} questions for quick practice session`;
            }
            
            infoEl.textContent = message;
            console.log('🎯 Updated quiz length info:', message);
        } catch (error) {
            console.error('❌ Error updating quiz length info:', error);
        }
    }

    /**
     * Handle file upload (for uploaded quizzes) - ENHANCED V2 IMPLEMENTATION
     */
    async handleFileUpload(files) {
        try {
            console.log('📁 Processing file upload...', files.length, 'files');

            // V2 Native Implementation with V1 fallback
            const uploadResults = [];

            for (let file of files) {
                console.log('📄 Processing file:', file.name, 'Size:', file.size, 'bytes');
                const detectedType = await this.detectQuizFileType(file);
                const isMarkdownFile = detectedType === 'md';
                const isZipFile = detectedType === 'zip';
                // Show a persistent status message for the current file (V1-style feedback)
                this.setUploadStatus(`Reading file: ${file.name}`);

                try {
                    // Client-side size limits: keep small limit for markdown files but
                    // allow larger ZIP uploads (images inside zips commonly exceed 5MB)
                    if (isMarkdownFile) {
                        if (file.size > 5 * 1024 * 1024) { // 5MB limit for .md
                            uploadResults.push({
                                filename: file.name,
                                success: false,
                                error: 'File too large (max 5MB for markdown files)'
                            });
                            continue;
                        }
                    } else if (isZipFile) {
                        // Allow larger zip uploads but enforce a reasonable cap client-side
                        // to avoid accidental huge uploads from mobile devices. Server still
                        // validates size and will reject if too large.
                        const ZIP_CLIENT_LIMIT = 50 * 1024 * 1024; // 50MB
                        if (file.size > ZIP_CLIENT_LIMIT) {
                            uploadResults.push({
                                filename: file.name,
                                success: false,
                                error: `ZIP file too large (max ${Math.round(ZIP_CLIENT_LIMIT / (1024*1024))}MB)`
                            });
                            continue;
                        }
                    } else {
                        // For unknown types, still enforce a reasonable cap
                        if (file.size > 50 * 1024 * 1024) {
                            uploadResults.push({
                                filename: file.name,
                                success: false,
                                error: 'File too large (max 50MB)'
                            });
                            continue;
                        }
                    }

                    if (isMarkdownFile) {
                        const result = await this.processMarkdownFile(file);
                        uploadResults.push(result);
                    } else if (isZipFile) {
                        const result = await this.processZipFile(file);
                        uploadResults.push(result);
                    } else {
                        uploadResults.push({
                            filename: file.name,
                            success: false,
                            error: 'Unsupported file type (only .md and .zip allowed)'
                        });
                    }
                } catch (error) {
                    console.error(`❌ Failed to process ${file.name}:`, error);
                    UIHelpers.showToast(`❌ Failed to process ${file.name}: ${error.message}`, 'error');
                    this.setUploadStatus(`Failed to process ${file.name}: ${error.message}`, 'error', 4000);

                    uploadResults.push({
                        filename: file.name,
                        name: file.name,
                        success: false,
                        error: error.message
                    });
                }

                // Clear transient status for this file after processing (keep final toast from processX methods)
                this.clearUploadStatus(1500);
            }

            // Persist successfully processed quizzes locally so they show up even if
            // the server upload fails (offline mode, network errors, etc.)
            await this.persistUploadedQuizzes(uploadResults);

            // Update quiz list and show results
            eventBus.emit(EVENTS.QUIZ_LIST_UPDATED);
            this.showUploadResults(uploadResults);

            // NOTE: ZIP files are already uploaded to server in processZipFile()
            // Only upload markdown files here (they are parsed client-side but may need server backup)
            for (let file of files) {
                const detectedType = await this.detectQuizFileType(file);
                // Skip ZIP files - already handled by processZipFile()
                if (detectedType === 'zip') {
                    continue;
                }
                
                if (detectedType === 'md') {
                    console.log('📄 Uploading markdown file to server:', file.name);

                    const formData = new FormData();
                    formData.append('quiz_file', file);

                    try {
                        // Show upload/transfer status
                        this.setUploadStatus(`Uploading ${file.name} to server...`);
                        const response = await fetch('/api/upload-quiz', {
                            method: 'POST',
                            body: formData
                        });

                        if (!response.ok) {
                            const errorText = await response.text();
                            throw new Error(`Upload failed: ${response.status} - ${errorText}`);
                        }

                        const data = await response.json();

                        if (!data.success) {
                            throw new Error(data.error || 'Upload failed');
                        }

                        // Store quiz data
                        const quizData = {
                            name: data.quiz_name,
                            questions: data.questions,
                            questionCount: data.total_questions,
                            isUploaded: true,
                            images: data.images || {},
                            uploadTimestamp: Date.now()
                        };

                        // Add to uploaded quizzes in storage
                        let uploadedQuizzes = await this.storage.getItem(STORAGE_KEYS.UPLOADED_QUIZZES, []);
                        uploadedQuizzes = uploadedQuizzes.filter(q => q.name !== quizData.name);
                        uploadedQuizzes.push(quizData);
                        const storageSuccess = await this.storage.setItem(STORAGE_KEYS.UPLOADED_QUIZZES, uploadedQuizzes);

                        if (!storageSuccess) {
                            UIHelpers.showToast(`⚠️ Quiz uploaded but storage failed. Quiz may not persist on page reload.`, 'warning');
                        }

                        console.log(`✅ Quiz uploaded: ${quizData.name} (${quizData.questionCount} questions)`);
                        this.setUploadStatus(`Uploaded ${quizData.name} (${quizData.questionCount} questions)`, 'success', 2500);
                    } catch (error) {
                        console.error(`❌ Failed to upload ${file.name} to server:`, error);
                        UIHelpers.showToast(`⚠️ Unable to upload ${file.name} to server. Saved locally for now.`, 'warning');
                        this.setUploadStatus(`Upload deferred for ${file.name}: ${error.message}`, 'warning', 4000);
                    }
                }
            }
            
            // Reload the quiz list after upload
            eventBus.emit(EVENTS.QUIZ_LIST_UPDATED);
            
        } catch (error) {
            console.error('❌ Error handling file upload:', error);
            UIHelpers.showToast(`❌ Upload failed: ${error.message}`, 'error');
            this.setUploadStatus(`Upload failed: ${error.message}`, 'error', 4000);
        }
    }

    async detectQuizFileType(file) {
        const lowerFileName = (file?.name || '').toLowerCase();
        const mimeType = (file?.type || '').toLowerCase();

        if (lowerFileName.endsWith('.zip')) {
            return 'zip';
        }

        if (lowerFileName.endsWith('.md')) {
            return 'md';
        }

        if (mimeType.includes('zip')) {
            return 'zip';
        }

        if (mimeType.includes('markdown') || mimeType.startsWith('text/')) {
            return 'md';
        }

        try {
            const header = new Uint8Array(await file.slice(0, 4).arrayBuffer());
            if (header.length >= 4 && header[0] === 0x50 && header[1] === 0x4b) {
                return 'zip';
            }
        } catch (error) {
            console.debug('Unable to inspect file header for type detection:', error);
        }

        return 'unknown';
    }

    /**
     * File processing helper methods - COMPREHENSIVE IMPLEMENTATIONS
     */
    
    async processMarkdownFile(file) {
        // Show loading feedback for markdown files (both toast and persistent status)
        UIHelpers.showToast(`📄 Processing markdown file: ${file.name}...`, 'info', 0);
        this.setUploadStatus(`Parsing markdown: ${file.name}`);
        
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    const questions = this.parseMarkdownQuiz(content);
                    
                    if (questions.length === 0) {
                        UIHelpers.showToast(`❌ No valid questions found in ${file.name}`, 'error');
                        reject(new Error('No valid questions found in markdown file'));
                        return;
                    }
                    
                    const quizName = file.name.replace('.md', '');
                    
                    // Clear loading toast and show success
                    UIHelpers.showToast(`✅ Markdown file processed: ${quizName} (${questions.length} questions)`, 'success');
                    this.setUploadStatus(`Parsed ${quizName} — ${questions.length} question(s)`, 'success', 2000);
                    
                    resolve({
                        name: quizName,
                        questions,
                        questionCount: questions.length,
                        isUploaded: true,
                        uploadTimestamp: Date.now()
                    });
                } catch (error) {
                    // Clear loading toast and show error
                    UIHelpers.showToast(`❌ Failed to parse markdown file: ${error.message}`, 'error');
                    this.setUploadStatus(`Failed to parse ${file.name}: ${error.message}`, 'error', 4000);
                    reject(new Error(`Failed to parse markdown: ${error.message}`));
                }
            };
            
            reader.onerror = () => {
                UIHelpers.showToast(`❌ Failed to read file: ${file.name}`, 'error');
                this.setUploadStatus(`Failed to read ${file.name}`, 'error', 4000);
                reject(new Error('Failed to read file'));
            };
            
            reader.readAsText(file);
        });
    }

    parseMarkdownQuiz(content) {
        // PSA format detection: ### Q1 | TYPE | ... headers
        if (/^###\s+Q\d+\s*\|/m.test(content)) {
            return this.parsePsaMarkdown(content);
        }

        const questions = [];
        const questionBlocks = content.split(/\n(?=\d+\.\s)/);
        
        for (const block of questionBlocks) {
            if (!block.trim()) continue;
            
            const lines = block.split('\n').filter(l => l.trim());
            if (lines.length < 2) continue;
            
            const questionMatch = lines[0].match(/^\d+\.\s+(.+)/);
            if (!questionMatch) continue;
            
            const question = questionMatch[1];
            const options = [];
            let correctAnswer = null;
            let explanation = '';
            
            for (let i = 1; i < lines.length; i++) {
                const line = lines[i].trim();
                
                if (line.match(/^[A-D]\.\s/)) {
                    const optionText = line.substring(3);
                    options.push(optionText);
                    
                    if (line.includes('*') || line.includes('**') || lines[i+1]?.includes('Correct')) {
                        correctAnswer = String.fromCharCode(65 + options.length - 1);
                    }
                } else if (line.toLowerCase().startsWith('explanation:')) {
                    explanation = line.substring(12).trim();
                } else if (line.toLowerCase().startsWith('answer:')) {
                    const answerMatch = line.match(/answer:\s*([A-D])/i);
                    if (answerMatch) correctAnswer = answerMatch[1].toUpperCase();
                }
            }
            
            if (question && options.length >= 2 && correctAnswer) {
                questions.push({
                    question,
                    options,
                    correctAnswer,
                    explanation: explanation || `The correct answer is ${correctAnswer}.`
                });
            }
        }
        
        return questions;
    }

    /* ─── PSA (Prescribing Safety Assessment) format parser ─────────────
     * Parses a markdown file that uses ### Q{n} | TYPE | SECTION | Specialty
     * headers.  Supports three question types:
     *   MCQ          – standard A-E multiple choice (✓ marks correct option)
     *   CALCULATION  – numeric answer with tolerance (UNIT / ANSWER / TOLERANCE)
     *   PRESCRIPTION – multi-field drug chart entry (DRUG / DOSE / ROUTE /
     *                  FREQUENCY / INDICATION — pipe-separated accepted values)
     */
    parsePsaMarkdown(content) {
        // Strip optional YAML frontmatter (--- ... ---)
        let meta = {};
        const fmMatch = content.match(/^---\s*\n([\s\S]*?)\n---\s*\n/);
        if (fmMatch) {
            content = content.slice(fmMatch[0].length);
            fmMatch[1].split('\n').forEach(line => {
                const m = line.match(/^(\w+)\s*:\s*(.+)$/);
                if (m) meta[m[1].trim()] = m[2].trim();
            });
        }

        const questions = [];
        // Split on ### Q{n} headers (keep the header in the block)
        const blocks = content.split(/\n(?=###\s+Q\d+)/);

        for (const block of blocks) {
            const trimmed = block.trim();
            if (!trimmed) continue;

            // ### Q1 | MCQ | Adverse Drug Reactions | Cardiology
            const headerMatch = trimmed.match(
                /^###\s+Q\d+\s*\|\s*(\w+)\s*\|\s*([^|\n]+?)(?:\|\s*([^\n]+))?\s*\n/i
            );
            if (!headerMatch) continue;

            const qType      = headerMatch[1].trim().toLowerCase(); // mcq | calculation | prescription
            const psaSection = headerMatch[2].trim();
            const specialty  = headerMatch[3]?.trim() || meta.specialty || 'Pharmacology';

            const bodyStart = trimmed.indexOf('\n') + 1;
            const qBody     = trimmed.slice(bodyStart).trim();

            let q = null;
            if      (qType === 'mcq')          q = this._parsePsaMcq(qBody, psaSection, specialty);
            else if (qType === 'calculation')  q = this._parsePsaCalculation(qBody, psaSection, specialty);
            else if (qType === 'prescription') q = this._parsePsaPrescription(qBody, psaSection, specialty);
            else if (qType === 'prescribing')  q = this._parsePsaPrescribing(qBody, psaSection, specialty);
            else if (qType === 'review')       q = this._parsePsaReview(qBody, psaSection, specialty);

            if (q) questions.push(q);
        }

        return questions;
    }

    /** Parse a PSA MCQ block — options marked A. ... with ✓ on correct option(s) */
    _parsePsaMcq(body, psaSection, specialty) {
        // Extract blockquote explanation (> lines at end)
        const expMatch = body.match(/\n(>\s+[\s\S]+)$/);
        const explanation = expMatch
            ? expMatch[1].replace(/^>\s*/gm, '').trim()
            : '';
        const bodyNoExp = expMatch ? body.slice(0, expMatch.index) : body;

        // Collect options
        const lines = bodyNoExp.split('\n');
        const options = [];
        const correctIndices = [];
        const questionLines = [];
        let inOptions = false;

        for (const line of lines) {
            const optMatch = line.match(/^([A-E])\.\s+(.+)/);
            if (optMatch) {
                inOptions = true;
                const hasCheck = optMatch[2].includes('✓');
                const optText  = optMatch[2].replace(/\s*✓\s*/g, '').trim();
                if (hasCheck) correctIndices.push(options.length);
                options.push(optText);
            } else if (!inOptions) {
                questionLines.push(line);
            }
        }

        if (!options.length || !correctIndices.length) return null;

        // Split scenario from direct question — use the LAST meaningful bold element as the prompt
        const allText = questionLines.join('\n').trim();
        const PSA_HEADINGS = new Set(['question', 'calculation', 'case presentation', 'on examination', 'investigations', 'question a', 'question b']);
        const boldMatches = [...allText.matchAll(/\*\*([^*]+)\*\*/g)];
        const boldMatch   = boldMatches.length ? boldMatches[boldMatches.length - 1] : null;
        let prompt   = boldMatch ? boldMatch[1].trim() : '';
        let scenario = boldMatch ? allText.slice(0, boldMatch.index).trim() : allText;
        // If last bold is a section heading, use the plain text after it as the real prompt
        if (boldMatch && PSA_HEADINGS.has(prompt.toLowerCase().replace(/:$/, ''))) {
            const afterHeading = allText.slice(boldMatch.index + boldMatch[0].length).trim();
            const firstLine = (afterHeading.split('\n')[0] || '').trim().replace(/\*(.+?)\*/g, '$1');
            if (firstLine) { prompt = firstLine; }
            else { prompt = allText; scenario = ''; }
        }
        if (!prompt) { prompt = allText; scenario = ''; }

        const selectionCount = correctIndices.length;

        return {
            question_type: 'mcq',
            psa_section:   psaSection,
            specialty,
            scenario:      scenario || undefined,
            prompt,
            options,
            correct_answer: selectionCount > 1 ? [...correctIndices] : correctIndices[0],
            correctAnswer:  selectionCount > 1 ? [...correctIndices] : correctIndices[0],
            correct_answers: selectionCount > 1 ? [...correctIndices] : undefined,
            correctAnswers: selectionCount > 1 ? [...correctIndices] : undefined,
            selection_count: selectionCount,
            explanation,
        };
    }

    /** Parse a PSA CALCULATION block — numeric answer within tolerance */
    _parsePsaCalculation(body, psaSection, specialty) {
        const get = (key) => {
            const m = body.match(new RegExp(`^${key}\\s*:\\s*(.+)$`, 'im'));
            return m ? m[1].trim() : null;
        };

        const unitRaw     = get('UNIT');
        const answerRaw   = get('ANSWER');
        const tolRaw      = get('TOLERANCE');
        // WORKING: everything after the WORKING: line until the blockquote or end-of-string.
        // NOTE: JS regex `$` with the `m` flag matches end-of-LINE, which would stop the
        // non-greedy match at the end of the "WORKING:" line itself and leave all the step
        // lines in qText. To avoid this, we extract WORKING content greedily to end-of-string
        // and then strip the trailing explanation blockquote from the captured group.
        const workingMatch = body.match(/^WORKING\s*:\s*\n([\s\S]*)/im);
        const rawWorking   = workingMatch ? workingMatch[1] : '';
        const working      = rawWorking.replace(/\n>[\s\S]+/, '').trim();

        if (!answerRaw) return null;
        const correctValue = parseFloat(answerRaw);
        if (isNaN(correctValue)) return null;

        // Explanation
        const expMatch = body.match(/\n(>\s+[\s\S]+)$/);
        const explanation = expMatch ? expMatch[1].replace(/^>\s*/gm, '').trim() : '';

        // Strip directives from question text.
        // Use a greedy [\s\S]* for the WORKING removal so the `m`-flag `$` issue
        // (which only matches end-of-line) cannot prematurely terminate the match.
        let qText = body
            .replace(/^UNIT\s*:.*$/im, '')
            .replace(/^ANSWER\s*:.*$/im, '')
            .replace(/^TOLERANCE\s*:.*$/im, '')
            .replace(/^WORKING\s*:[\s\S]*/im, '')   // greedy — removes WORKING: and everything after
            .replace(/\n(>\s+[\s\S]+)$/, '')
            .trim();

        const CALC_HEADINGS = new Set(['question', 'calculation', 'case presentation', 'on examination', 'investigations']);
        const calcBoldMatches = [...qText.matchAll(/\*\*([^*]+)\*\*/g)];
        const calcBoldMatch   = calcBoldMatches.length ? calcBoldMatches[calcBoldMatches.length - 1] : null;
        let prompt   = calcBoldMatch ? calcBoldMatch[1].trim() : '';
        let scenario = calcBoldMatch ? qText.slice(0, calcBoldMatch.index).trim() : qText;
        if (calcBoldMatch && CALC_HEADINGS.has(prompt.toLowerCase().replace(/:$/, ''))) {
            const afterHeading = qText.slice(calcBoldMatch.index + calcBoldMatch[0].length).trim();
            const firstLine = (afterHeading.split('\n')[0] || '').trim().replace(/\*(.+?)\*/g, '$1');
            if (firstLine) { prompt = firstLine; }
            else { prompt = qText; scenario = ''; }
        }
        if (!prompt) { prompt = qText; scenario = ''; }

        return {
            question_type:  'calculation',
            psa_section:    psaSection,
            specialty,
            scenario:       scenario || undefined,
            prompt,
            answer_value:   correctValue,
            tolerance:      tolRaw ? parseFloat(tolRaw) : 0,
            unit:           unitRaw || '',
            working,
            explanation,
            options:        undefined,
            correct_answer: '_calculation',
        };
    }

    /** Parse a PSA PRESCRIPTION block — multi-field drug chart entry */
    /** Parse a PSA REVIEW block — two linked MCQ sub-questions (Part A + Part B) */
    _parsePsaReview(body, psaSection, specialty) {
        const inferSelectionCount = (stem, correctIndices = []) => {
            if (Array.isArray(correctIndices) && correctIndices.length > 1) {
                return correctIndices.length;
            }

            if (!stem) return 1;

            const wordToNumber = {
                one: 1,
                two: 2,
                three: 3,
                four: 4,
                five: 5,
                six: 6
            };

            const match = stem.match(/\b(?:select|choose|pick|identify|mark)\s+(?:the\s+)?(one|two|three|four|five|six|\d+)\b/i)
                || stem.match(/\b(?:which|what)\s+(one|two|three|four|five|six|\d+)\b/i);

            if (!match) return 1;

            const token = match[1].toLowerCase();
            return wordToNumber[token] || Number.parseInt(token, 10) || 1;
        };

        // Extract MARKS_A / MARKS_B directives
        const getDir = (key) => {
            const m = body.match(new RegExp(`^${key}\\s*:\\s*(\\d+)`, 'im'));
            return m ? parseInt(m[1], 10) : 2;
        };
        const marks_a = getDir('MARKS_A');
        const marks_b = getDir('MARKS_B');

        // Blockquote explanation
        const expMatch = body.match(/\n(>[\s\S]+)$/);
        let explanation = expMatch ? expMatch[1].replace(/^>\s*/gm, '').trim() : '';
        const bodyNoExp = expMatch ? body.slice(0, expMatch.index) : body;

        // Split into lines and identify Part A / Part B boundaries
        const lines = bodyNoExp.split('\n');
        let phase = 'scenario';
        const scenarioLines = [];
        let stem_a = '', stem_b = '';
        const opts_a = [], opts_b = [];
        const correct_a = [], correct_b = [];

        for (const rawLine of lines) {
            const line = rawLine.trimEnd();
            const trimmed = line.trim();

            // Directives — skip
            if (/^MARKS_[AB]\s*:/i.test(trimmed)) continue;
            if (/^CORRECT_[AB]\s*:/i.test(trimmed)) continue;

            // Part A heading: **Part A:** text  OR  **Part A: text**
            const partAMatch = trimmed.match(/^\*\*Part A:\*\*\s*(.+)$/) || trimmed.match(/^\*\*Part A:\s*(.+?)\*\*\s*$/);
            if (partAMatch) { phase = 'part_a'; stem_a = partAMatch[1].trim(); continue; }

            // Part B heading
            const partBMatch = trimmed.match(/^\*\*Part B:\*\*\s*(.+)$/) || trimmed.match(/^\*\*Part B:\s*(.+?)\*\*\s*$/);
            if (partBMatch) { phase = 'part_b'; stem_b = partBMatch[1].trim(); continue; }

            if (phase === 'scenario') {
                scenarioLines.push(line);
            } else if (phase === 'part_a') {
                const m = trimmed.match(/^([A-Z])\.\s+(.+)/);
                if (m) {
                    const hasCheck = m[2].includes('✓');
                    if (hasCheck) correct_a.push(opts_a.length);
                    opts_a.push(m[2].replace(/\s*✓\s*/g, '').trim());
                }
            } else if (phase === 'part_b') {
                const m = trimmed.match(/^([A-Z])\.\s+(.+)/);
                if (m) {
                    const hasCheck = m[2].includes('✓');
                    if (hasCheck) correct_b.push(opts_b.length);
                    opts_b.push(m[2].replace(/\s*✓\s*/g, '').trim());
                }
            }
        }

        // Table-based format fallback (| Medicine | Dose | Route | Freq | A | B |)
        if (!opts_a.length || !opts_b.length) {
            const tableRows = [];
            for (const rawLine of bodyNoExp.split('\n')) {
                const t = rawLine.trim();
                if (!t.startsWith('|')) continue;
                if (/^\|\s*-/.test(t)) continue;           // separator row
                if (/^\|\s*medicine/i.test(t)) continue;   // header row
                const cols = t.split('|').map(c => c.trim()).slice(1, -1);
                if (cols.length < 5) continue;
                const optText = [cols[0], cols[1], cols[2], cols[3]].filter(Boolean).join(' | ');
                const tickA   = cols[4] ? cols[4].includes('✓') : false;
                const tickB   = cols.length > 5 && cols[5] ? cols[5].includes('✓') : false;
                tableRows.push({ optText, tickA, tickB });
            }
            if (tableRows.length > 0) {
                tableRows.forEach((row, idx) => {
                    opts_a.push(row.optText);
                    opts_b.push(row.optText);
                    if (row.tickA) correct_a.push(idx);
                    if (row.tickB) correct_b.push(idx);
                });
            }
        }

        if (!opts_a.length || !opts_b.length) return null;

        // CORRECT_A / CORRECT_B directive lines — append to explanation
        const correctAM = bodyNoExp.match(/^CORRECT_A:\s*(.+)$/im);
        const correctBM = bodyNoExp.match(/^CORRECT_B:\s*(.+)$/im);
        if (correctAM || correctBM) {
            const hints = [];
            if (correctAM) hints.push(`Part A correct: ${correctAM[1].trim()}`);
            if (correctBM) hints.push(`Part B correct: ${correctBM[1].trim()}`);
            const hint = hints.join('\n');
            explanation = explanation ? explanation + '\n\n' + hint : hint;
        }

        // Scenario: strip leading MARKS directives from display text
        let scenario = scenarioLines.join('\n')
            .replace(/^MARKS_[AB]\s*:\s*\d+\s*\n?/gim, '').trim();

        return {
            question_type: 'review',
            psa_section:   psaSection,
            specialty,
            scenario,
            marks_a,
            marks_b,
            part_a: {
                stem: stem_a,
                options: opts_a,
                correct: correct_a.length <= 1 ? (correct_a[0] ?? null) : [...correct_a],
                selection_count: inferSelectionCount(stem_a, correct_a)
            },
            part_b: {
                stem: stem_b,
                options: opts_b,
                correct: correct_b.length <= 1 ? (correct_b[0] ?? null) : [...correct_b],
                selection_count: inferSelectionCount(stem_b, correct_b)
            },
            explanation,
            options:        undefined,
            correct_answer: '_review',
        };
    }

    /** Parse an official PSA PRESCRIBING block — multi-option drug/dose with tiered scoring */
    _parsePsaPrescribing(body, psaSection, specialty) {
        const drugMarksM = body.match(/^DRUG_MARKS\s*:\s*(\d+)/im);
        const doseMarksM = body.match(/^DOSE_MARKS\s*:\s*(\d+)/im);
        const drug_marks = drugMarksM ? parseInt(drugMarksM[1]) : 5;
        const dose_marks = doseMarksM ? parseInt(doseMarksM[1]) : 5;

        // Strip directives
        let cleaned = body.replace(/^(?:DRUG_MARKS|DOSE_MARKS)\s*:.*\n?/gim, '').trim();

        // Split at **Drug choice** to separate case text from feedback
        const drugChoiceIdx = cleaned.search(/\n\*\*Drug choice\*\*/i);
        const caseText  = drugChoiceIdx > -1 ? cleaned.slice(0, drugChoiceIdx).trim() : cleaned;
        const afterCase = drugChoiceIdx > -1 ? cleaned.slice(drugChoiceIdx) : '';

        // Drug choice feedback (blockquote lines under **Drug choice**)
        const drugFbM = afterCase.match(/\*\*Drug choice\*\*\s*\n((?:>.*\n?)+)/i);
        const drug_feedback = drugFbM ? drugFbM[1].replace(/^>\s*/gm, '').trim() : '';

        // Dose/route/frequency feedback
        const doseFbM = afterCase.match(/\*\*Dose \/ route[^*]*\*\*\s*\n((?:>.*\n?)+)/i);
        const dose_feedback = doseFbM ? doseFbM[1].replace(/^>\s*/gm, '').trim() : '';

        // Optimal drug options: DRUG_OPTION / DOSE lines
        const drug_options = [];
        const optM = afterCase.match(/\*\*Optimal answers\*\*\s*\n([\s\S]+)/i);
        if (optM) {
            let currentDrug = null;
            for (const rawLine of optM[1].split('\n')) {
                const line = rawLine.trim();
                if (line.startsWith('DRUG_OPTION:')) {
                    currentDrug = { drug: line.slice('DRUG_OPTION:'.length).trim(), dose_options: [] };
                    drug_options.push(currentDrug);
                } else if (line.startsWith('DOSE:') && currentDrug) {
                    currentDrug.dose_options.push(line.slice('DOSE:'.length).trim());
                }
            }
        }

        if (!drug_options.length) return null;

        // Split case text into scenario (case) and prompt (prescribing request)
        const prIdx   = caseText.search(/\n\*\*Prescribing request\*\*/i);
        const scenario = prIdx > -1 ? caseText.slice(0, prIdx).trim() : caseText;
        const prompt   = prIdx > -1 ? caseText.slice(prIdx).trim() : '';

        return {
            question_type:  'prescribing',
            psa_section:    psaSection,
            specialty,
            scenario:       scenario || undefined,
            prompt:         prompt || scenario,
            drug_marks,
            dose_marks,
            drug_feedback,
            dose_feedback,
            drug_options,
            correct_answer: '_prescribing',
            options:        undefined,
        };
    }

    /** Parse a PSA PRESCRIPTION block — multi-field drug chart entry */
    _parsePsaPrescription(body, psaSection, specialty) {
        const FIELD_NAMES = ['DRUG', 'DOSE', 'ROUTE', 'FREQUENCY', 'INDICATION'];
        const fields = [];

        for (const fn of FIELD_NAMES) {
            const m = body.match(new RegExp(`^${fn}\\s*:\\s*(.+)$`, 'im'));
            if (!m) continue;
            // Pipe-separated accepted synonyms
            const accepted = m[1].split('|').map(s => s.trim()).filter(Boolean);
            fields.push({ field: fn, answer: accepted[0], accept: accepted });
        }

        if (!fields.length) return null;

        // Explanation
        const expMatch = body.match(/\n(>\s+[\s\S]+)$/);
        const explanation = expMatch ? expMatch[1].replace(/^>\s*/gm, '').trim() : '';

        // Strip directives
        let qText = body
            .replace(new RegExp(`^(${FIELD_NAMES.join('|')})\\s*:.*$`, 'igm'), '')
            .replace(/\n(>\s+[\s\S]+)$/, '')
            .trim();

        const boldMatch = qText.match(/\*\*([^*]+)\*\*/);
        let prompt   = boldMatch ? boldMatch[1].trim() : '';
        let scenario = boldMatch
            ? qText.slice(0, qText.lastIndexOf(`**${boldMatch[1]}**`)).trim()
            : qText;
        if (!prompt) { prompt = qText; scenario = ''; }

        return {
            question_type:       'prescription',
            psa_section:         psaSection,
            specialty,
            scenario:            scenario || undefined,
            prompt,
            prescription_fields: fields,
            explanation,
            options:             undefined,
            correct_answer:      '_prescription',
        };
    }

    async processZipFile(file) {
        // Show loading feedback for zip files (persistent status + toast)
        UIHelpers.showToast(`📦 Processing ZIP file: ${file.name}...`, 'info', 0);
        this.setUploadStatus(`Uploading ZIP: ${file.name}`);
        
        try {
            // For zip files, we'll need JSZip library or send to server
            // This is a placeholder for server-side processing
            const formData = new FormData();
            formData.append('quiz_file', file);
            
            const response = await this.fetchWithTimeout('/api/upload-quiz', {
                method: 'POST',
                body: formData
            }, 120000);
            
            if (!response.ok) {
                throw new Error(`Upload failed: ${response.status}`);
            }
            
            const data = await response.json();
            
            if (!data.success) {
                throw new Error(data.error || 'Upload failed');
            }
            
            // Clear loading toast and show success
            UIHelpers.showToast(`✅ ZIP file processed successfully: ${data.quiz_name}`, 'success');
            this.setUploadStatus(`ZIP processed: ${data.quiz_name}`, 'success', 2500);
            
            return {
                name: data.quiz_name,
                questions: data.questions,
                questionCount: data.total_questions,
                isUploaded: true,
                images: data.images || {},
                uploadTimestamp: Date.now()
            };
        } catch (error) {
            // Clear loading toast and show error
            UIHelpers.showToast(`❌ Failed to process ZIP file: ${error.message}`, 'error');
            this.setUploadStatus(`Failed to process ZIP: ${error.message}`, 'error', 4000);
            return {
                filename: file.name,
                name: file.name,
                success: false,
                error: error.message,
                uploadTimestamp: Date.now()
            };
        }
    }

    async fetchWithTimeout(url, options = {}, timeoutMs = 120000) {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

        try {
            return await fetch(url, {
                ...options,
                signal: controller.signal
            });
        } catch (error) {
            if (error?.name === 'AbortError') {
                throw new Error('Upload timed out. Please try a smaller ZIP or a stronger connection.');
            }
            throw error;
        } finally {
            clearTimeout(timeoutId);
        }
    }

    /**
     * Show a small persistent upload status message (V1-style)
     * level: 'info' | 'success' | 'error'
     * duration: milliseconds to auto-clear (if omitted or 0, persistent until cleared)
     */
    setUploadStatus(message, level = 'info', duration = 0) {
        try {
            let el = document.getElementById(this.uploadStatusId);
            if (!el) {
                el = document.createElement('div');
                el.id = this.uploadStatusId;
                el.style.cssText = 'position:fixed;bottom:18px;left:18px;z-index:9999;padding:10px 14px;border-radius:8px;box-shadow:0 6px 18px rgba(0,0,0,0.12);font-size:13px;color:#fff;max-width:80%;backdrop-filter: blur(4px);';
                document.body.appendChild(el);
            }

            const bg = level === 'success' ? '#059669' : (level === 'error' ? '#dc2626' : '#0ea5e9');
            el.style.background = bg;
            el.textContent = message;

            // If duration provided, auto-clear after duration ms
            if (duration && duration > 0) {
                setTimeout(() => this.clearUploadStatus(), duration);
            }
        } catch (e) {
            console.debug('Failed to show upload status element:', e);
        }
    }

    /**
     * Clear the upload status element. optional delay in ms before clearing.
     */
    clearUploadStatus(delay = 0) {
        try {
            if (delay && delay > 0) {
                setTimeout(() => this.clearUploadStatus(0), delay);
                return;
            }
            const el = document.getElementById(this.uploadStatusId);
            if (el && el.parentNode) el.parentNode.removeChild(el);
        } catch (e) {
            console.debug('Failed to clear upload status element:', e);
        }
    }

    /**
     * Persist locally processed quizzes so they appear in the list even if
     * server upload fails or the app is offline.
     */
    async persistUploadedQuizzes(uploadResults) {
        try {
            const successfulResults = (uploadResults || []).filter(result => {
                return result && result.success !== false && Array.isArray(result.questions) && result.questions.length > 0;
            });

            if (successfulResults.length === 0) {
                console.log('ℹ️ No successful quiz uploads to persist');
                return;
            }

            let uploadedQuizzes = await this.storage.getItem(STORAGE_KEYS.UPLOADED_QUIZZES, []);
            if (!Array.isArray(uploadedQuizzes)) {
                console.warn('⚠️ Uploaded quizzes storage corrupted, resetting');
                uploadedQuizzes = [];
            }

            for (const quizData of successfulResults) {
                const normalizedQuiz = {
                    name: quizData.name,
                    questions: quizData.questions,
                    questionCount: quizData.questionCount || (quizData.questions?.length ?? 0),
                    isUploaded: true,
                    images: quizData.images || {},
                    uploadTimestamp: quizData.uploadTimestamp || Date.now(),
                    dataStored: quizData.dataStored,
                    storageKey: quizData.storageKey
                };

                // Remove any existing quiz with the same name before adding the new one
                uploadedQuizzes = uploadedQuizzes.filter(q => q.name !== normalizedQuiz.name);
                uploadedQuizzes.push(normalizedQuiz);
            }

            const storageSuccess = await this.storage.setItem(STORAGE_KEYS.UPLOADED_QUIZZES, uploadedQuizzes);
            if (!storageSuccess) {
                UIHelpers.showToast('⚠️ Uploaded quiz saved temporarily. It may not persist after reload.', 'warning');
            }

            console.log(`✅ Persisted ${successfulResults.length} uploaded quiz(es) locally`);
        } catch (error) {
            console.error('❌ Failed to persist uploaded quizzes locally:', error);
        }
    }

    showUploadResults(results) {
        if (!results || results.length === 0) {
            UIHelpers.showToast('No quizzes uploaded', 'warning');
            return;
        }

        const successfulResults = results.filter(r => r && r.success !== false);

        if (successfulResults.length === 0) {
            UIHelpers.showToast('❌ Upload failed. No quizzes were saved.', 'error');
            return;
        }

        const totalQuestions = successfulResults.reduce((sum, r) => {
            return sum + (r.questionCount || (r.questions?.length ?? 0));
        }, 0);
        const quizNames = successfulResults.map(r => r.name).join(', ');

        UIHelpers.showToast(
            `Successfully uploaded ${successfulResults.length} quiz(es): ${quizNames} (${totalQuestions} questions total)`,
            'success'
        );
        
        // Update UI to show new quizzes
        eventBus.emit(EVENTS.QUIZ_LIST_UPDATED);
    }

    /**
     * Analytics helper methods - COMPREHENSIVE IMPLEMENTATIONS
     */
    
    async getSessionCount() {
        const history = await this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        return history.length;
    }

    async getAverageScore() {
        const history = await this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        
        if (history.length === 0) return 0;
        
        const totalPercentage = history.reduce((sum, session) => {
            return sum + (session.percentage || 0);
        }, 0);
        
        return Math.round(totalPercentage / history.length);
    }

    async getImprovementTrend() {
        const history = await this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        
        if (history.length < 2) return { trend: 'insufficient_data', change: 0 };
        
        // Get last 5 sessions vs previous 5 sessions
        const recentSessions = history.slice(-5);
        const previousSessions = history.slice(-10, -5);
        
        if (previousSessions.length === 0) {
            return { trend: 'new', change: 0 };
        }
        
        const recentAvg = recentSessions.reduce((sum, s) => sum + (s.percentage || 0), 0) / recentSessions.length;
        const previousAvg = previousSessions.reduce((sum, s) => sum + (s.percentage || 0), 0) / previousSessions.length;
        
        const change = Math.round(recentAvg - previousAvg);
        
        let trend;
        if (change > 5) trend = 'improving';
        else if (change < -5) trend = 'declining';
        else trend = 'stable';
        
        return { trend, change };
    }

    async getTotalStudyTime() {
        const history = await this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        
        if (history.length === 0) return 0;
        
        return history.reduce((total, session) => {
            return total + (session.totalTime || 0);
        }, 0);
    }

    async getStrengthsAndWeaknesses() {
        const history = await this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        
        const topicPerformance = {};
        
        for (const session of history) {
            const topic = session.quizName || 'Unknown';
            
            if (!topicPerformance[topic]) {
                topicPerformance[topic] = {
                    attempts: 0,
                    totalScore: 0,
                    avgScore: 0
                };
            }
            
            topicPerformance[topic].attempts++;
            topicPerformance[topic].totalScore += session.percentage || 0;
            topicPerformance[topic].avgScore = Math.round(
                topicPerformance[topic].totalScore / topicPerformance[topic].attempts
            );
        }
        
        const topics = Object.entries(topicPerformance)
            .sort((a, b) => b[1].avgScore - a[1].avgScore);
        
        const strengths = topics.slice(0, 3).map(([name, data]) => ({
            topic: name,
            avgScore: data.avgScore,
            attempts: data.attempts
        }));
        
        const weaknesses = topics.slice(-3).reverse().map(([name, data]) => ({
            topic: name,
            avgScore: data.avgScore,
            attempts: data.attempts
        }));
        
        return { strengths, weaknesses };
    }

    /**
     * Generate study report (from V1)
     */
    generateStudyReport() {
        const reportData = this.calculateReportData();
        const includeExplanationsEl = document.getElementById('include-explanations-toggle');
        const includeExplanations = includeExplanationsEl ? includeExplanationsEl.checked : true;
        
        if (reportData.totalQuestions === 0) {
            alert('No questions answered yet. Please answer at least one question to generate a report.');
            return;
        }
        
        const reportHTML = this.generateReportHTML(reportData, includeExplanations);
        
        // Create a printable window
        const printWindow = window.open('', '_blank');
        printWindow.document.write(`
            <!DOCTYPE html>
            <html>
            <head>
                <title>MLA Quiz Study Report</title>
                <style>
                    body { font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; margin: 20px; }
                    .report-header { text-align: center; margin-bottom: 30px; border-bottom: 2px solid #007AFF; padding-bottom: 20px; }
                    .stats-grid { display: grid; grid-template-columns: repeat(2, 1fr); gap: 20px; margin: 20px 0; }
                    .stat-card { border: 1px solid #ddd; padding: 15px; border-radius: 8px; }
                    .weak-areas { margin: 20px 0; }
                    .question-list { margin: 20px 0; }
                    .incorrect-question {
                        margin: 20px 0;
                        padding: 15px;
                        border: 1px solid #e2e8f0;
                        border-radius: 8px;
                        background: #f8fafc;
                        page-break-inside: avoid;
                    }
                    .question-header {
                        margin-bottom: 10px;
                        color: #dc2626;
                        font-size: 16px;
                        font-weight: bold;
                    }
                    .question-scenario {
                        margin: 10px 0;
                        padding: 10px;
                        background: #f0f9ff;
                        border-left: 4px solid #0ea5e9;
                        border-radius: 4px;
                    }
                    .scenario-text {
                        margin-top: 5px;
                        font-size: 14px;
                        line-height: 1.5;
                        color: #0f172a;
                    }
                    .question-investigations {
                        margin: 10px 0;
                        padding: 10px;
                        background: #f0fdf4;
                        border-left: 4px solid #22c55e;
                        border-radius: 4px;
                    }
                    .investigations-text {
                        margin-top: 5px;
                        font-size: 14px;
                        line-height: 1.5;
                        color: #0f172a;
                    }
                    .question-prompt {
                        margin: 10px 0;
                        padding: 10px;
                        background: #fefce8;
                        border-left: 4px solid #eab308;
                        border-radius: 4px;
                    }
                    .prompt-text {
                        margin-top: 5px;
                        font-size: 14px;
                        line-height: 1.5;
                        color: #0f172a;
                        font-weight: 500;
                    }
                    .question-text {
                        margin: 10px 0;
                        padding: 8px;
                        background: white;
                        border-left: 3px solid #007AFF;
                        font-size: 14px;
                        line-height: 1.5;
                    }
                    .question-options {
                        margin: 10px 0;
                    }
                    .question-options ol {
                        margin: 5px 0;
                        padding-left: 25px;
                    }
                    .question-options li {
                        margin: 5px 0;
                        padding: 5px;
                        line-height: 1.4;
                    }
                    .your-answer {
                        background: #fee2e2;
                        border-radius: 4px;
                    }
                    .correct-answer {
                        background: #dcfce7;
                        border-radius: 4px;
                        font-weight: 500;
                    }
                    .answer-analysis {
                        margin: 10px 0;
                        padding: 10px;
                        background: #f8fafc;
                        border-radius: 4px;
                    }
                    .answer-analysis p {
                        margin: 5px 0;
                    }
                    .explanation-section {
                        margin: 10px 0;
                        padding: 10px;
                        background: #f0f9ff;
                        border-left: 4px solid #0ea5e9;
                        border-radius: 4px;
                        font-weight: normal; /* ensure explanation block uses normal weight */
                    }
                    .explanation-section strong { font-weight: normal; } /* label inside section should not be bold */
                    .explanation-text {
                        margin-top: 5px;
                        font-size: 14px;
                        line-height: 1.6;
                        white-space: pre-wrap;
                        font-weight: normal; /* force normal weight for explanation content */
                    }
                    .progress-note {
                        background: #fef3c7;
                        border: 1px solid #fbbf24;
                        border-radius: 8px;
                        padding: 15px;
                        margin: 20px 0;
                    }
                    .answered-questions {
                        margin: 30px 0;
                    }
                    @media print {
                        body { margin: 0; }
                        .incorrect-question { page-break-inside: avoid; }
                    }
                </style>
            </head>
            <body>
                ${reportHTML}
                <script>
                    window.onload = function() {
                        window.print();
                    };
                </script>
            </body>
            </html>
        `);
        printWindow.document.close();
        
        console.log('📊 Study report generated');
    }

    /**
     * Calculate report data
     */
    calculateReportData() {
        // Only consider questions that have been submitted (submittedAnswers holds boolean flags)
        const totalQuestions = Object.keys(this.submittedAnswers).length;
        let correctAnswers = 0;

        Object.keys(this.submittedAnswers).forEach(questionIndex => {
            const question = this.questions[questionIndex];
            const selected = this.answers[questionIndex];
            if (question && selected !== undefined && this.isSelectionAnswerCorrect(question, selected)) {
                correctAnswers++;
            }
        });
        
        const incorrectAnswers = totalQuestions - correctAnswers;
        const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        
        // Calculate total time and average
        const totalTime = this.getTotalTime();
        const averageTime = totalQuestions > 0 ? totalTime / totalQuestions : 0;
        
        return {
            quizName: this.quizName,
            totalQuestions,
            correctAnswers,
            incorrectAnswers,
            accuracy,
            totalTime,
            averageTime,
            questionsAnswered: totalQuestions,
            date: new Date().toLocaleDateString(),
            incorrectQuestionsList: this.getIncorrectQuestions(),
            answeredQuestionsList: this.getAnsweredQuestions(),
            timePerQuestion: this.questionTimes
        };
    }

    /**
     * Get incorrect questions list
     */
    getIncorrectQuestions() {
        const incorrectQuestions = [];
        
        // Iterate over submitted answers (keys) but read the chosen option index from this.answers
        Object.keys(this.submittedAnswers).forEach(questionIndex => {
            const index = parseInt(questionIndex);
            const question = this.questions[index];
            const selectedAnswer = this.answers[questionIndex];
            const correctIdx = question ? this.getStoredCorrectAnswer(question) : undefined;

            if (question && selectedAnswer !== undefined && !this.isSelectionAnswerCorrect(question, selectedAnswer)) {
                incorrectQuestions.push({
                    index: index,
                    question: question,
                    yourAnswer: selectedAnswer,
                    correctAnswer: correctIdx
                });
            }
        });
        
        return incorrectQuestions;
    }

    /**
     * Get all answered questions list
     */
    getAnsweredQuestions() {
        const answered = [];
        
        Object.keys(this.submittedAnswers).forEach(questionIndex => {
            const index = parseInt(questionIndex);
            const question = this.questions[index];
            const selectedAnswer = this.answers[questionIndex];
            const correctIdx = question ? this.getStoredCorrectAnswer(question) : undefined;

            if (question) {
                answered.push({
                    index: index,
                    question: question,
                    yourAnswer: selectedAnswer,
                    correctAnswer: correctIdx
                });
            }
        });
        
        return answered;
    }

    /**
     * Generate report HTML
     */
    generateReportHTML(data, includeExplanations = true) {
        const isPartialReport = data.totalQuestions < (this.questions?.length || 0);
        const totalQuizQuestions = this.questions?.length || data.totalQuestions;
        
        return `
            <div class="report-header">
                <h1>📊 MLA Quiz Study Report</h1>
                <h2>${data.quizName}</h2>
                <p>Generated on ${data.date}</p>
                ${isPartialReport ? '<p><em>⚠️ Partial Report - Quiz in progress</em></p>' : ''}
            </div>
            
            ${isPartialReport ? `
                <div class="progress-note">
                    <h3>📈 Progress Status</h3>
                    <p><strong>Questions Answered:</strong> ${data.totalQuestions} of ${totalQuizQuestions}</p>
                    <p><strong>Completion:</strong> ${Math.round((data.totalQuestions / totalQuizQuestions) * 100)}%</p>
                </div>
            ` : ''}
            
            <div class="stats-grid">
                <div class="stat-card">
                    <h3>📈 Performance</h3>
                    <p><strong>Accuracy:</strong> ${data.accuracy}%</p>
                    <p><strong>Correct:</strong> ${data.correctAnswers}</p>
                    <p><strong>Incorrect:</strong> ${data.incorrectAnswers}</p>
                    <p><strong>Questions Answered:</strong> ${data.totalQuestions}</p>
                    ${isPartialReport ? `<p><strong>Total Quiz Questions:</strong> ${totalQuizQuestions}</p>` : ''}
                </div>
                
                <div class="stat-card">
                    <h3>⏱️ Time Analysis</h3>
                    <p><strong>Total Time:</strong> ${this.formatTime(data.totalTime)}</p>
                    <p><strong>Average per Question:</strong> ${Math.round(data.averageTime)}s</p>
                    <p><strong>Questions Timed:</strong> ${data.questionsAnswered}</p>
                    ${isPartialReport ? '<p><em>Note: Times for answered questions only</em></p>' : ''}
                </div>
            </div>

            <div class="answered-questions">
                <h3>📝 Question Review</h3>
                ${data.answeredQuestionsList.length > 0 ? data.answeredQuestionsList.map(q => {
                    const yourAnswerIndices = Array.isArray(q.yourAnswer) ? q.yourAnswer : (Number.isInteger(q.yourAnswer) ? [q.yourAnswer] : []);
                    const correctAnswerIndices = Array.isArray(q.correctAnswer) ? q.correctAnswer : (Number.isInteger(q.correctAnswer) ? [q.correctAnswer] : []);
                    const isCorrect = this.isSelectionAnswerCorrect(q.question, q.yourAnswer);
                    const answerLabel = (indices) => {
                        if (!indices.length || !Array.isArray(q.question.options)) return 'N/A';
                        return indices.map(idx => q.question.options[idx]).filter(Boolean).map(option => this.cleanTextForPDF(option)).join('; ') || 'N/A';
                    };

                    return `
                    <div class="incorrect-question">
                        <div class="question-header" style="color: ${isCorrect ? '#059669' : '#dc2626'};">
                            <strong>Question ${q.index + 1}:</strong> ${isCorrect ? '✅ Correct' : '❌ Incorrect'}
                        </div>
                        ${q.question.scenario ? `
                            <div class="question-scenario">
                                <strong>Scenario:</strong>
                                <div class="scenario-text">${this.cleanTextForPDF(q.question.scenario)}</div>
                            </div>
                        ` : ''}
                        ${q.question.investigations ? `
                            <div class="question-investigations">
                                <strong>Investigations:</strong>
                                <div class="investigations-text">${this.cleanTextForPDF(q.question.investigations)}</div>
                            </div>
                        ` : ''}
                        ${q.question.prompt ? `
                            <div class="question-prompt">
                                <strong>Question:</strong>
                                <div class="prompt-text">${this.cleanTextForPDF(q.question.prompt)}</div>
                            </div>
                        ` : ''}
                        ${q.question.options ? `
                            <div class="question-options">
                                <strong>Options:</strong>
                                <ol type="A">
                                    ${q.question.options.map((option, idx) => `
                                        <li class="${yourAnswerIndices.includes(idx) ? 'your-answer' : ''} ${correctAnswerIndices.includes(idx) ? 'correct-answer' : ''}">${this.cleanTextForPDF(option)}</li>
                                    `).join('')}
                                </ol>
                            </div>
                        ` : ''}
                        <div class="answer-analysis">
                            <p><strong>Your Answer:</strong> ${answerLabel(yourAnswerIndices)}</p>
                            <p><strong>Correct Answer:</strong> ${answerLabel(correctAnswerIndices)}</p>
                        </div>
                        ${includeExplanations && ((q.question.explanations && q.question.explanations.length) || q.question.explanation) ? `
                            <div class="explanation-section">
                                <strong>Explanation:</strong>
                                <div class="explanation-text">${this.cleanTextForPDF(Array.isArray(q.question.explanations) && q.question.explanations.length ? q.question.explanations.join('\n') : (q.question.explanation || ''))}</div>
                            </div>
                        ` : ''}
                    </div>
                `;
                }).join('') : '<p>No answered questions available.</p>'}
                ${isPartialReport ? '<p><em>Note: Only showing answered questions. Continue the quiz for complete analysis.</em></p>' : ''}
            </div>
        `;
    }

    /**
     * Clean text for PDF output
     */
    cleanTextForPDF(text) {
        if (!text) return 'N/A';
        
        let cleanText = text
            .replace(/<strong>(.*?)<\/strong>/gi, '**$1**')
            .replace(/<em>(.*?)<\/em>/gi, '*$1*')
            .replace(/<[^>]*>/g, '')
            .replace(/&nbsp;/g, ' ')
            .replace(/&amp;/g, '&')
            .replace(/&lt;/g, '<')
            .replace(/&gt;/g, '>')
            .replace(/&quot;/g, '"')
            .trim();
            
        if (cleanText.length > 800) {
            cleanText = cleanText.substring(0, 800) + '...';
        }
        
        return cleanText;
    }

    /**
     * Format time helper
     */
    formatTime(seconds) {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`;
    }
}

// Export singleton instance
export const quizManager = new QuizManager();
