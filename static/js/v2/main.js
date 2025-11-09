/**
 * Main Application Entry Point
 * Initializes all managers and wires up the modular architecture
 */

// Foundation Modules
import { eventBus } from './modules/EventBus.js';
import { storage, storageManager } from './modules/StorageManager.js';
import { orientationManager } from './modules/OrientationManager.js';
import { analytics } from './modules/AnalyticsManager.js';
import { EVENTS, STORAGE_KEYS, UI_CONFIG } from './modules/Constants.js';
import UIHelpers from './modules/UIHelpers.js';

// Feature Modules
import { anatomyManager } from './modules/AnatomyManager.js';
import { quizManager } from './modules/QuizManager.js';
import { uiManager } from './modules/UIManager.js';
import { calculatorManager } from './modules/CalculatorManager.js';

// Reference Modules (require external database files)
import { DrugReferenceManager } from './modules/DrugReferenceManager.js';
import { LabValuesManager } from './modules/LabValuesManager.js';
import { GuidelinesManager } from './modules/GuidelinesManager.js';
import { mnemonicsManager } from './modules/MnemonicsManager.js';
import { interpretationToolsManager } from './modules/InterpretationToolsManager.js';
import { laddersManager } from './modules/LaddersManager.js';

// Clinical Feature Modules (bridge to V1)
import { differentialDxManager } from './modules/DifferentialDxManager.js';
import { triadsManager } from './modules/TriadsManager.js';
import { examinationManager } from './modules/ExaminationManager.js';
import { emergencyProtocolsManager } from './modules/EmergencyProtocolsManager.js';

// V2 Integration Layer
import { v2Integration } from './modules/V2Integration.js';
import calculatorBridge from './modules/CalculatorBridge.js';

/**
 * Main Application Class
 */
class MLAQuizApp {
    constructor() {
        this.initialized = false;
        this.drugManager = new DrugReferenceManager();
        this.labManager = new LabValuesManager();
        this.guidelinesManager = new GuidelinesManager();
        this.mnemonicsManager = mnemonicsManager;
        this.interpretationToolsManager = interpretationToolsManager;
        this.laddersManager = laddersManager;
        this.differentialDxManager = differentialDxManager;
        this.triadsManager = triadsManager;
        this.examinationManager = examinationManager;
        this.emergencyProtocolsManager = emergencyProtocolsManager;
        this.v2Integration = v2Integration;
        this.calculatorBridge = calculatorBridge;
        this.setupEventListeners();
    }

    /**
     * Initialize the application
     */
    async initialize() {
        if (this.initialized) {
            console.warn('App already initialized');
            return;
        }

        console.log('🚀 Initializing MLA Quiz PWA...');

        try {
            // Show loading
            uiManager.showLoadingOverlay('Initializing app...');

            // Initialize managers in order
            await this.initializeManagers();

            // Wire up cross-module communication
            this.setupCrossModuleCommunication();

            // Initialize UI
            await this.initializeUI();

            // Load any saved state
            await this.restoreState();

            this.initialized = true;
            console.log('✅ MLA Quiz PWA initialized successfully');

            // Hide loading
            uiManager.hideLoadingOverlay();

            // Emit ready event
            eventBus.emit(EVENTS.APP_READY);

        } catch (error) {
            console.error('❌ Failed to initialize app:', error);
            uiManager.hideLoadingOverlay();
            uiManager.showToast('Failed to initialize app. Please refresh.', 'error');
        }
    }

    /**
     * Initialize all managers
     */
    async initializeManagers() {
        console.log('📦 Initializing managers...');

        // Initialize storage first (needed by others)
        await storageManager.initIndexedDB();

        // Initialize UI manager (theme, settings)
        uiManager.initialize();

        // Initialize orientation manager
        orientationManager.initialize();

        // Initialize anatomy manager
        anatomyManager.initialize();

        // Initialize quiz manager
        quizManager.initialize();

        // Initialize calculator manager (auto-registers all calculators)
        calculatorManager.initialize();

        // Calculator bridge will be initialized after all other managers are ready

        // Initialize drug reference manager (requires drugDatabase.js to be loaded)
        await this.drugManager.initialize();

        // Initialize lab values manager (requires labDatabase.js to be loaded)
        await this.labManager.initialize();

        // Initialize guidelines manager (requires guidelinesDatabase.js to be loaded)
        await this.guidelinesManager.initialize();

        // Initialize mnemonics manager
        await this.mnemonicsManager.initialize();

        // Initialize interpretation tools manager
        await this.interpretationToolsManager.initialize();

        // Initialize ladders manager
        await this.laddersManager.initialize();

        // Initialize calculator bridge at the end to ensure all dependencies are ready
        console.log('🔗 Initializing calculator bridge...');
        await this.initializeCalculatorBridge(eventBus, storageManager, analytics);
        
        console.log('✅ All managers initialized');
        console.log(`   - Calculators: ${calculatorManager.getCalculatorCount()}`);
        console.log(`   - Drugs: ${this.drugManager.getDrugCount()}`);
        console.log(`   - Lab panels: ${this.labManager.getPanelCount()}, Tests: ${this.labManager.getTestCount()}`);
        console.log(`   - Guidelines: ${this.guidelinesManager.getGuidelinesCount()}`);
        console.log(`   - Mnemonics: ${this.mnemonicsManager.getStatistics().totalMnemonics}`);
        console.log(`   - Interpretation Tools: ${this.interpretationToolsManager.getStatistics().totalTools}`);
        console.log(`   - Treatment Ladders: ${this.laddersManager.getStatistics().totalLadders}`);
        
        // Initialize V2 Integration Layer (must happen AFTER V1 app exists)
        // This will be called from index.html after V1's app.js loads
        console.log('✅ V2 Integration ready (awaiting V1 app instance)');
    }

    /**
     * Initialize calculator bridge with retry mechanism
     */
    async initializeCalculatorBridge(eventBus, storageManager, analytics) {
        const maxRetries = 10;
        let retryCount = 0;
        
        const tryInitialize = () => {
            if (window.ExtractedCalculators) {
                console.log('✅ ExtractedCalculators found, initializing bridge...');
                this.calculatorBridge.initialize(eventBus, storageManager, analytics);
                return true;
            } else {
                retryCount++;
                if (retryCount < maxRetries) {
                    console.log(`⏳ Waiting for ExtractedCalculators... (attempt ${retryCount}/${maxRetries})`);
                    return false;
                } else {
                    console.error('❌ ExtractedCalculators failed to load after maximum retries');
                    return true; // Stop retrying
                }
            }
        };
        
        // Try immediately first
        if (!tryInitialize()) {
            // Use a retry mechanism with exponential backoff
            return new Promise((resolve) => {
                const retryInterval = setInterval(() => {
                    if (tryInitialize()) {
                        clearInterval(retryInterval);
                        resolve();
                    }
                }, 100);
            });
        }
    }

    /**
     * Setup cross-module communication
     */
    setupCrossModuleCommunication() {
        console.log('🔗 Setting up cross-module communication...');

        // Tool navigation button clicks (event delegation on medical tools panel)
        const medicalToolsPanel = document.getElementById('medical-tools-panel');
        if (medicalToolsPanel) {
            medicalToolsPanel.addEventListener('click', (e) => {
                const toolBtn = e.target.closest('.tool-nav-btn');
                if (toolBtn) {
                    const toolType = toolBtn.getAttribute('data-tool');
                    if (toolType) {
                        console.log(`🔧 Tool navigation button clicked: ${toolType}`);
                        this.switchTool(toolType);
                        
                        // Update active state
                        medicalToolsPanel.querySelectorAll('.tool-nav-btn').forEach(btn => {
                            btn.classList.remove('active');
                        });
                        toolBtn.classList.add('active');
                    }
                }
            });
            console.log('✅ Tool navigation event delegation setup');
        }

        // Medical tools toggle button
        const medicalToolsToggle = document.getElementById('medical-tools-toggle');
        if (medicalToolsToggle) {
            medicalToolsToggle.addEventListener('click', () => {
                console.log('🔧 Medical tools toggle clicked');
                if (medicalToolsPanel) {
                    const isOpen = medicalToolsPanel.classList.contains('open');
                    
                    if (isOpen) {
                        medicalToolsPanel.classList.remove('open');
                    } else {
                        medicalToolsPanel.classList.add('open');
                        
                        // Auto-switch to the currently active tool or default to calculators
                        const activeBtn = medicalToolsPanel.querySelector('.tool-nav-btn.active');
                        if (activeBtn) {
                            const toolType = activeBtn.getAttribute('data-tool');
                            this.switchTool(toolType);
                        } else {
                            // Default to calculators
                            this.switchTool('calculators');
                            const calcBtn = medicalToolsPanel.querySelector('[data-tool="calculators"]');
                            if (calcBtn) calcBtn.classList.add('active');
                        }
                    }
                }
            });
            console.log('✅ Medical tools toggle button setup');
        }

        // Tools close button
        const toolsCloseBtn = document.getElementById('tools-close-btn');
        if (toolsCloseBtn) {
            toolsCloseBtn.addEventListener('click', () => {
                console.log('🔧 Tools close button clicked');
                if (medicalToolsPanel) {
                    medicalToolsPanel.classList.remove('open');
                }
            });
            console.log('✅ Tools close button setup');
        }

        // Back button handler
        const backBtn = document.getElementById('backBtn');
        if (backBtn) {
            backBtn.addEventListener('click', () => {
                console.log('🔧 Back button clicked');
                if (window.history.length > 1) {
                    window.history.back();
                } else {
                    // Fallback to home screen
                    const quizSelection = document.getElementById('quizSelection');
                    if (quizSelection) {
                        this.showScreen('quizSelection');
                    }
                }
            });
            console.log('✅ Back button setup');
        }

        // Upload button handler
        const uploadBtn = document.getElementById('uploadBtn');
        const quizFileInput = document.getElementById('quizFileInput');
        if (uploadBtn && quizFileInput) {
            uploadBtn.addEventListener('click', () => {
                console.log('🔧 Upload button clicked');
                quizFileInput.click();
            });
            
            quizFileInput.addEventListener('change', async (e) => {
                console.log('🔧 Quiz files selected');
                if (e.target.files && e.target.files.length > 0) {
                    // Pass files to quiz manager for processing
                    await quizManager.handleFileUpload(e.target.files);
                    // Reload quiz list
                    this.loadQuizList();
                }
            });
            console.log('✅ Upload controls setup');
        }

        // Quiz selection screen - quiz length buttons
        const quizLengthBtns = document.querySelectorAll('.quiz-length-btn');
        quizLengthBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                // Remove active from all
                quizLengthBtns.forEach(b => b.classList.remove('active'));
                // Add to clicked
                btn.classList.add('active');
                
                const length = btn.getAttribute('data-length');
                quizManager.setQuizLength(length === 'all' ? 'all' : parseInt(length));
                console.log(`📝 Quiz length set to: ${length}`);
            });
        });

        // Quiz list item clicks (event delegation)
        const quizList = document.getElementById('quiz-list');
        if (quizList) {
            quizList.addEventListener('click', async (e) => {
                const quizItem = e.target.closest('.quiz-item');
                if (quizItem) {
                    const quizName = quizItem.getAttribute('data-quiz-name');
                    const isUploaded = quizItem.getAttribute('data-is-uploaded') === 'true';
                    
                    console.log(`📚 Loading quiz: ${quizName} (uploaded: ${isUploaded})`);
                    uiManager.showToast(`Loading ${quizName}...`, 'info');
                    
                    const success = await quizManager.loadQuiz(quizName, isUploaded);
                    if (success) {
                        await quizManager.startQuiz();
                        this.showScreen('quizScreen');
                    } else {
                        uiManager.showToast('Failed to load quiz', 'error');
                    }
                }
            });
            console.log('✅ Quiz list event delegation setup');
        }

        // Quiz screen - answer submission
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) {
            submitBtn.addEventListener('click', () => {
                console.log('✅ Submit button clicked');
                this.handleSubmitAnswer();
            });
        }

        // Quiz screen - navigation buttons
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const nextBtnTop = document.getElementById('nextBtnTop');
        const prevBtnTop = document.getElementById('prevBtnTop');

        if (nextBtn) {
            nextBtn.addEventListener('click', async () => {
                console.log('➡️ Next button clicked');
                const moved = quizManager.nextQuestion();
                if (!moved) {
                    // Reached the end
                    if (quizManager.isReviewMode) {
                        // Exit review mode, return to results
                        quizManager.isReviewMode = false;
                        this.showResults();
                    } else {
                        // Finish the quiz
                        console.log('🏁 Quiz finished via Next button');
                        await quizManager.finishQuiz();
                    }
                } else if (quizManager.isReviewMode) {
                    // Auto-show answer in review mode
                    setTimeout(() => this.showAnswer(true), 100);
                }
            });
        }

        if (prevBtn) {
            prevBtn.addEventListener('click', () => {
                console.log('⬅️ Previous button clicked');
                quizManager.previousQuestion();
                if (quizManager.isReviewMode) {
                    // Auto-show answer in review mode
                    setTimeout(() => this.showAnswer(true), 100);
                }
            });
        }

        if (nextBtnTop) {
            let nextBtnDebounce = false;
            nextBtnTop.addEventListener('click', async (e) => {
                e.preventDefault();
                if (nextBtnDebounce) {
                    console.log('➡️ Next button debounced');
                    return;
                }
                nextBtnDebounce = true;
                console.log('➡️ Next (top) button clicked');
                const moved = quizManager.nextQuestion();
                if (!moved) {
                    // Reached the end
                    if (quizManager.isReviewMode) {
                        // Exit review mode, return to results
                        quizManager.isReviewMode = false;
                        this.showResults();
                    } else {
                        // Finish the quiz
                        console.log('🏁 Quiz finished via Next (top) button');
                        await quizManager.finishQuiz();
                    }
                } else if (quizManager.isReviewMode) {
                    // Auto-show answer in review mode
                    setTimeout(() => this.showAnswer(true), 100);
                }
                setTimeout(() => {
                    nextBtnDebounce = false;
                }, 300);
            });
        }

        if (prevBtnTop) {
            let prevBtnDebounce = false;
            prevBtnTop.addEventListener('click', (e) => {
                e.preventDefault();
                if (prevBtnDebounce) {
                    console.log('⬅️ Previous button debounced');
                    return;
                }
                prevBtnDebounce = true;
                console.log('⬅️ Previous (top) button clicked');
                quizManager.previousQuestion();
                if (quizManager.isReviewMode) {
                    // Auto-show answer in review mode
                    setTimeout(() => this.showAnswer(true), 100);
                }
                setTimeout(() => {
                    prevBtnDebounce = false;
                }, 300);
            });
        }

        // Flag button
        const flagBtn = document.getElementById('flagBtn');
        if (flagBtn) {
            flagBtn.addEventListener('click', () => {
                console.log('🚩 Flag button clicked');
                quizManager.toggleFlag();
            });
        }

        // Finish quiz button
        const finishBtn = document.getElementById('finishBtn');
        if (finishBtn) {
            finishBtn.addEventListener('click', async () => {
                console.log('🏁 Finish quiz clicked');
                const confirm = window.confirm('Are you sure you want to finish the quiz?');
                if (confirm) {
                    await quizManager.finishQuiz();
                    this.showResults();
                }
            });
        }

        // Results screen - retry button
        const retryBtn = document.getElementById('retryBtn');
        if (retryBtn) {
            retryBtn.addEventListener('click', () => {
                console.log('🔄 Retry button clicked');
                quizManager.retryQuiz();
            });
        }

        // Review Answers button
        const reviewAnswersBtn = document.getElementById('reviewAnswersBtn');
        if (reviewAnswersBtn) {
            reviewAnswersBtn.addEventListener('click', () => {
                console.log('📖 Review answers button clicked');
                this.reviewAnswers();
            });
        }

        // Home button
        const homeBtn = document.getElementById('homeBtn');
        if (homeBtn) {
            homeBtn.addEventListener('click', () => {
                console.log('🏠 Home button clicked');
                this.showScreen('quizSelection');
            });
        }

        // Generate Report button
        const generateReportBtn = document.getElementById('generate-report-btn');
        if (generateReportBtn) {
            generateReportBtn.addEventListener('click', () => {
                console.log('📊 Generate report button clicked');
                quizManager.generateStudyReport();
            });
        }

        // Floating PDF button
        const floatingPdfBtn = document.getElementById('floating-pdf-btn');
        if (floatingPdfBtn) {
            floatingPdfBtn.addEventListener('click', () => {
                console.log('📊 Floating PDF button clicked');
                quizManager.generateStudyReport();
            });
        }

        // Calculator button clicks (event delegation on calculator panel)
        const calculatorPanel = document.getElementById('calculator-panel');
        if (calculatorPanel) {
            calculatorPanel.addEventListener('click', (e) => {
                const calcBtn = e.target.closest('.calculator-btn');
                if (calcBtn) {
                    const calcId = calcBtn.getAttribute('data-calc');
                    if (calcId) {
                        console.log(`🧮 Calculator button clicked: ${calcId}`);
                        const calculator = calculatorManager.getCalculator(calcId);
                        if (calculator) {
                            calculatorManager.loadCalculator(calcId);
                        } else {
                            console.warn(`⚠️ Calculator not found: ${calcId}. Available:`, 
                                calculatorManager.getAllCalculators().map(c => c.id).join(', '));
                            uiManager.showToast(`Calculator "${calcId}" is not yet implemented in V2`, 'info');
                        }
                    }
                }
            });
            console.log('✅ Calculator panel event delegation setup');
        }

        // Quiz completion → Show results in UI
        eventBus.on(EVENTS.QUIZ_COMPLETED, (data) => {
            const score = data.score;
            const total = data.totalQuestions;
            const percentage = Math.round((score / total) * 100);
            
            uiManager.showToast(
                `Quiz completed! Score: ${score}/${total} (${percentage}%)`,
                'success'
            );
            
            analytics.vibrateSuccess();
            
            // Show results screen
            this.showScreen('resultsScreen');
            this.renderResults(data);
        });

        // Quiz started → Update UI
        eventBus.on(EVENTS.QUIZ_STARTED, (data) => {
            console.log('📝 Quiz started:', data.quizName);
            this.showScreen('quizScreen');
            document.getElementById('navTitle').textContent = data.quizName || 'Quiz';
        });

        // Question rendered → Update UI
        eventBus.on('quiz:renderQuestion', (data) => {
            console.log('📄 Rendering question:', data.index + 1);
            this.renderQuestion(data);
        });

        // Quiz progress updated → Update progress bar
        eventBus.on('quiz:progressUpdated', (data) => {
            this.updateProgressBar(data);
        });

        // Quiz answer → Feedback
        eventBus.on(EVENTS.QUESTION_ANSWERED, (data) => {
            if (data.isCorrect) {
                analytics.vibrateSuccess();
            } else {
                analytics.vibrateError();
            }
            // Re-render question to show feedback
            quizManager.renderQuestion();
        });

        // Anatomy structure clicked → Show info
        eventBus.on(EVENTS.ANATOMY_STRUCTURE_CLICKED, (data) => {
            analytics.vibrateClick();
        });

        // Calculator opened → Track
        eventBus.on(EVENTS.CALCULATOR_OPENED, (data) => {
            console.log(`📊 Calculator opened: ${data.name}`);
            analytics.vibrateClick();
        });

        // Theme changed → Update everywhere
        eventBus.on(EVENTS.THEME_CHANGED, (data) => {
            console.log(`🎨 Theme changed to: ${data.darkMode ? 'dark' : 'light'}`);
        });

        // UI tool switching (for calculators, etc.)
        eventBus.on(EVENTS.UI_SWITCH_TOOL, (data) => {
            console.log(`🔧 Switching to tool: ${data.tool}`);
            this.switchTool(data.tool);
        });

        // Error handling
        eventBus.on(EVENTS.ERROR_OCCURRED, (data) => {
            console.error('Error occurred:', data);
            uiManager.showToast(`Error: ${data.error?.message || 'Unknown error'}`, 'error');
        });

        console.log('✅ Cross-module communication setup complete');
    }

    /**
     * Setup global event listeners
     */
    setupEventListeners() {
        // Service Worker registration
        if ('serviceWorker' in navigator) {
            window.addEventListener('load', () => {
                navigator.serviceWorker.register('/static/sw.js')
                    .then(registration => {
                        console.log('✅ Service Worker registered:', registration);
                    })
                    .catch(error => {
                        console.warn('⚠️ Service Worker registration failed:', error);
                    });
            });
        }

        // Online/Offline status
        window.addEventListener('online', () => {
            console.log('🌐 App is online');
            uiManager.showToast('Connection restored', 'success');
        });

        window.addEventListener('offline', () => {
            console.log('📡 App is offline');
            uiManager.showToast('You are offline. Some features may be limited.', 'warning');
        });

        // Visibility change (tab focus)
        document.addEventListener('visibilitychange', () => {
            if (document.hidden) {
                console.log('👋 App hidden');
                // Save state when user leaves
                this.saveState();
            } else {
                console.log('👀 App visible');
            }
        });

        // Before unload (save state)
        window.addEventListener('beforeunload', () => {
            this.saveState();
        });
    }

    /**
     * Initialize UI
     */
    async initializeUI() {
        console.log('🎨 Initializing UI...');

        // Setup navigation
        this.setupNavigation();

        // Setup global keyboard shortcuts
        this.setupKeyboardShortcuts();

        console.log('✅ UI initialized');
    }

    /**
     * Setup navigation
     */
    setupNavigation() {
        // Handle browser back button
        window.addEventListener('popstate', (event) => {
            if (event.state && event.state.view) {
                uiManager.showView(event.state.view, false);
            }
        });
    }

    /**
     * Setup keyboard shortcuts
     */
    setupKeyboardShortcuts() {
        document.addEventListener('keydown', (e) => {
            // Ctrl/Cmd + D: Toggle dark mode
            if ((e.ctrlKey || e.metaKey) && e.key === 'd') {
                e.preventDefault();
                uiManager.toggleDarkMode();
            }

            // Ctrl/Cmd + F: Focus search (if search exists)
            if ((e.ctrlKey || e.metaKey) && e.key === 'f') {
                const searchInput = document.querySelector('#search-input, .search-input');
                if (searchInput) {
                    e.preventDefault();
                    searchInput.focus();
                }
            }

            // Escape: Close modals
            if (e.key === 'Escape') {
                uiManager.hideModal();
            }
        });
    }

    /**
     * Save application state
     */
    saveState() {
        const state = {
            timestamp: Date.now(),
            theme: uiManager.isDarkMode(),
            fontSize: uiManager.currentFontSize
        };

        storage.setItem(STORAGE_KEYS.APP_STATE, state);
        console.log('💾 App state saved');
    }

    /**
     * Restore application state
     */
    async restoreState() {
        console.log('🔄 Restoring app state...');

        const state = storage.getItem(STORAGE_KEYS.APP_STATE);
        if (state) {
            console.log('✅ Previous state found, restoring...');
            // State already restored by individual managers
        }

        // Load quiz list (shows uploaded quizzes)
        await this.loadQuizList();

        // Check for saved quiz progress
        const quizProgress = await quizManager.loadProgress();
        if (quizProgress) {
            const resume = await uiManager.confirm(
                'You have an unfinished quiz. Would you like to resume?'
            );
            
            if (resume) {
                // Emit event to show quiz view
                eventBus.emit(EVENTS.QUIZ_RESUME_REQUESTED, quizProgress);
            }
        }

        console.log('✅ State restoration complete');
    }

    /**
     * Switch between tools/panels (V1 compatibility method)
     */
    switchTool(toolType) {
        const toolPanels = document.querySelectorAll('.tool-panel');
        const navButtons = document.querySelectorAll('.tool-nav-btn');
        
        // Remove active class from all nav buttons
        navButtons.forEach(btn => btn.classList.remove('active'));
        
        // Add active class to clicked nav button
        const activeNavBtn = document.querySelector(`[data-tool="${toolType}"]`);
        if (activeNavBtn) {
            activeNavBtn.classList.add('active');
        }
        
        // Hide all panels
        toolPanels.forEach(panel => {
            panel.classList.remove('active');
        });
        
        // Map navigation data-tool values to actual panel IDs
        const panelIdMap = {
            'drug-reference': 'drug-panel',
            'calculators': 'calculator-panel',
            'calculator-detail': 'calculator-detail',
            'lab-values': 'lab-panel',
            'guidelines': 'guidelines-panel',
            'differential-dx': 'differential-panel',
            'triads': 'triads-panel',
            'examination': 'examination-panel',
            'emergency-protocols': 'emergency-protocols-panel',
            'interpretation': 'interpretation-panel',
            'anatomy': 'anatomy-panel',
            'ladders': 'ladders-panel',
            'mnemonics': 'mnemonics-panel',
            'quiz-practice': 'quiz-panel',
            'case-studies': 'case-studies-panel',
            'learning-pathways': 'learning-pathways-panel'
        };
        
        // Show selected panel
        const panelId = panelIdMap[toolType] || `${toolType}-panel`;
        const targetPanel = document.getElementById(panelId);
        if (targetPanel) {
            targetPanel.classList.add('active');
            console.log(`✅ Switched to panel: ${panelId}`);
            
            // Load content for the selected tool using V2 managers
            this.loadToolContent(toolType, targetPanel);
        } else {
            console.warn(`⚠️ Panel not found: ${panelId}`);
        }
    }

    /**
     * Load content for a specific tool using V2 managers
     */
    loadToolContent(toolType, panel) {
        switch(toolType) {
            case 'drug-reference':
                this.loadDrugReferenceContent(panel);
                break;
            case 'calculators':
                this.loadCalculatorsContent(panel);
                break;
            case 'lab-values':
                this.loadLabValuesContent(panel);
                break;
            case 'guidelines':
                this.loadGuidelinesContent(panel);
                break;
            case 'mnemonics':
                this.loadMnemonicsContent(panel);
                break;
            case 'differential-dx':
                this.loadDifferentialDxContent(panel);
                break;
            case 'triads':
                this.loadTriadsContent(panel);
                break;
            case 'examination':
                this.loadExaminationContent(panel);
                break;
            case 'emergency-protocols':
                this.loadEmergencyProtocolsContent(panel);
                break;
            case 'interpretation':
                this.loadInterpretationToolsContent(panel);
                break;
            case 'anatomy':
                anatomyManager.initialize();
                break;
            case 'ladders':
                this.loadLaddersContent(panel);
                break;
        }
    }

    /**
     * Load drug reference content
     */
    loadDrugReferenceContent(panel) {
        if (!panel) {
            console.error('loadDrugReferenceContent: panel is null');
            return;
        }
        const container = panel.querySelector('#drug-reference-container') || panel;
        const categories = this.drugManager.getCategories();
        
        // Check if Web Speech API is supported
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        const voiceSupported = !!SpeechRecognition;
        
        let html = `
            <div class="search-container" style="display: flex; gap: 10px; margin-bottom: 20px;">
                <input type="text" id="drug-search-v2" placeholder="🔍 Search medications..." class="tool-search" style="flex: 1;">
                <button id="drug-search-btn-v2" class="btn-primary">Search</button>
                ${voiceSupported ? `
                    <button id="drug-voice-btn-v2" class="btn-voice" title="Voice Search">
                        🎤 Voice
                    </button>
                ` : ''}
            </div>
            <div id="drug-voice-status-v2" style="display: none; padding: 10px; margin-bottom: 15px; background: var(--card-bg); border-left: 3px solid var(--accent); border-radius: 8px; font-size: 0.95em;">
                🎤 Listening... Speak the drug name clearly.
            </div>
            <div class="drug-categories" style="display: flex; flex-wrap: wrap; gap: 8px; margin-bottom: 20px;">
                ${categories.map(cat => `
                    <button class="category-btn ${cat.id === 'alphabetical' ? 'active' : ''}" 
                            data-category="${cat.id}"
                            style="padding: 8px 16px; border: 1px solid var(--border); background: var(--card-bg); border-radius: 20px; cursor: pointer; transition: all 0.2s; font-size: 0.9em;">
                        ${cat.icon} ${cat.name}
                    </button>
                `).join('')}
            </div>
            <div id="drug-list-v2"></div>
        `;
        
        container.innerHTML = html;
        
        // Set up event listeners
        const searchInput = container.querySelector('#drug-search-v2');
        const searchBtn = container.querySelector('#drug-search-btn-v2');
        const voiceBtn = container.querySelector('#drug-voice-btn-v2');
        const voiceStatus = container.querySelector('#drug-voice-status-v2');
        const drugListContainer = container.querySelector('#drug-list-v2');
        
        // Search functionality with TTS buttons
        const handleSearch = () => {
            const query = searchInput.value;
            if (query.length < 2) {
                this.showDrugCategory('alphabetical', container);
                return;
            }
            
            const results = this.drugManager.searchDrugs(query);
            if (results.length === 0) {
                drugListContainer.innerHTML = '<div class="no-results" style="text-align: center; padding: 40px; color: var(--text-secondary);">No medications found</div>';
                return;
            }
            
            drugListContainer.innerHTML = results.map(drug => `
                <div class="drug-card" onclick="event.stopPropagation(); window.quizApp.showDrugDetail('${drug.key}');" style="cursor: pointer; padding: 15px; margin-bottom: 10px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; transition: all 0.2s;">
                    <div style="display: flex; justify-content: space-between; align-items: center;">
                        <div>
                            <div class="drug-name" style="font-weight: 600; font-size: 1.1em; color: var(--text-primary); margin-bottom: 4px;">${drug.name}</div>
                            <div class="drug-class" style="color: var(--text-secondary); font-size: 0.9em;">${drug.class}</div>
                        </div>
                        <button class="speak-btn" onclick="event.stopPropagation(); window.quizApp.speakDrugName('${drug.name.replace(/'/g, "\\'")}');" title="Hear pronunciation" style="padding: 8px 12px; background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em;">
                            🔊
                        </button>
                    </div>
                </div>
            `).join('');
        };
        
        searchInput.addEventListener('input', handleSearch);
        searchBtn.addEventListener('click', handleSearch);
        searchInput.addEventListener('keypress', (e) => {
            if (e.key === 'Enter') handleSearch();
        });
        
        // Voice search
        if (voiceBtn) {
            voiceBtn.addEventListener('click', () => {
                if (voiceBtn.classList.contains('listening')) {
                    this.drugManager.stopVoiceSearch();
                    voiceBtn.classList.remove('listening');
                    voiceBtn.textContent = '🎤 Voice';
                    voiceStatus.style.display = 'none';
                } else {
                    this.drugManager.startVoiceSearch();
                }
            });
            
            // Listen for voice events
            eventBus.on('DRUG_VOICE_STARTED', () => {
                voiceBtn.classList.add('listening');
                voiceBtn.textContent = '⏹️ Stop';
                voiceBtn.style.background = 'linear-gradient(135deg, #ef4444 0%, #dc2626 100%)';
                voiceStatus.style.display = 'block';
            });
            
            eventBus.on('DRUG_VOICE_RESULT', ({ transcript }) => {
                searchInput.value = transcript;
                voiceBtn.classList.remove('listening');
                voiceBtn.textContent = '🎤 Voice';
                voiceBtn.style.background = '';
                voiceStatus.style.display = 'none';
                handleSearch();
            });
            
            eventBus.on('DRUG_VOICE_ERROR', ({ error }) => {
                voiceBtn.classList.remove('listening');
                voiceBtn.textContent = '🎤 Voice';
                voiceBtn.style.background = '';
                voiceStatus.style.display = 'none';
                voiceStatus.innerHTML = `⚠️ Voice search error: ${error}`;
                voiceStatus.style.borderColor = '#ef4444';
                setTimeout(() => {
                    voiceStatus.style.display = 'none';
                    voiceStatus.style.borderColor = 'var(--accent)';
                }, 3000);
            });
            
            eventBus.on('DRUG_VOICE_ENDED', () => {
                voiceBtn.classList.remove('listening');
                voiceBtn.textContent = '🎤 Voice';
                voiceBtn.style.background = '';
                voiceStatus.style.display = 'none';
            });
        }
        
        // Category buttons
        container.querySelectorAll('.category-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const category = btn.dataset.category;
                this.showDrugCategory(category, container);
            });
        });
        
        // Load initial category (alphabetical)
        this.showDrugCategory('alphabetical', container);
        
        console.log('🏥 Drug reference content loaded with voice search');
    }
    
    showDrugCategory(category, container) {
        // Update active button
        container.querySelectorAll('.category-btn').forEach(b => b.classList.remove('active'));
        const activeBtn = container.querySelector(`[data-category="${category}"]`);
        if (activeBtn) activeBtn.classList.add('active');
        
        const drugs = this.drugManager.getDrugsByCategory(category);
        const drugListContainer = container.querySelector('#drug-list-v2');
        
        drugListContainer.innerHTML = drugs.map(drug => `
            <div class="drug-card" onclick="event.stopPropagation(); window.quizApp.showDrugDetail('${drug.key}');" style="cursor: pointer; padding: 15px; margin-bottom: 10px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                <div style="display: flex; justify-content: space-between; align-items: center;">
                    <div>
                        <div class="drug-name" style="font-weight: 600; font-size: 1.1em; color: var(--text-primary); margin-bottom: 4px;">${drug.name}</div>
                        <div class="drug-class" style="color: var(--text-secondary); font-size: 0.9em;">${drug.class}</div>
                    </div>
                    <button class="speak-btn" onclick="event.stopPropagation(); window.quizApp.speakDrugName('${drug.name.replace(/'/g, "\\'")}');" title="Hear pronunciation" style="padding: 8px 12px; background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1.1em;">
                        🔊
                    </button>
                </div>
            </div>
        `).join('');
    }
    
    showDrugDetail(drugKey) {
        const drug = this.drugManager.getDrug(drugKey);
        if (!drug) {
            console.error('Drug not found:', drugKey);
            return;
        }
        
        const panel = document.querySelector('#drug-reference-container') || 
                     document.querySelector('[data-panel="drug-reference"]');
        if (!panel) return;
        
        panel.innerHTML = `
            <button class="back-btn" onclick="event.stopPropagation(); window.quizApp.loadDrugReferenceContent(document.getElementById('drug-panel'));" style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer; font-size: 0.95em;">
                ← Back to Drug List
            </button>
            <div class="drug-detail" style="background: var(--card-bg); border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <div style="display: flex; align-items: center; gap: 15px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--border);">
                    <h3 style="margin: 0; font-size: 1.8em; color: var(--text-primary); flex: 1;">${drug.name}</h3>
                    <button class="speak-name-btn" onclick="event.stopPropagation(); window.quizApp.speakDrugName('${drug.name.replace(/'/g, "\\'")}')" style="padding: 10px 16px; background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%); color: white; border: none; border-radius: 8px; cursor: pointer; font-size: 1em; box-shadow: 0 2px 4px rgba(0,0,0,0.2);">
                        🔊 Hear pronunciation
                    </button>
                </div>
                <div class="drug-info">
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">🏷️ Classification</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.class}</p>
                    </div>
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">⚙️ Mechanism of Action</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.mechanism}</p>
                    </div>
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">💊 Dosing & Administration</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.dosing}</p>
                        ${drug.maxDose ? `<p style="margin: 10px 0 0 0; color: var(--text-primary); line-height: 1.6;"><strong>Maximum Dose:</strong> ${drug.maxDose}</p>` : ''}
                    </div>
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid #ef4444;">
                        <h4 style="margin: 0 0 10px 0; color: #ef4444; font-size: 1.1em;">⚠️ Contraindications</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.contraindications}</p>
                    </div>
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid #f59e0b;">
                        <h4 style="margin: 0 0 10px 0; color: #f59e0b; font-size: 1.1em;">🔄 Drug Interactions</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.interactions}</p>
                    </div>
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">📊 Monitoring Parameters</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.monitoring}</p>
                    </div>
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid #8b5cf6;">
                        <h4 style="margin: 0 0 10px 0; color: #8b5cf6; font-size: 1.1em;">🤰 Pregnancy Safety</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.pregnancy}</p>
                    </div>
                    ${drug.sideEffects ? `
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid #ef4444;">
                        <h4 style="margin: 0 0 10px 0; color: #ef4444; font-size: 1.1em;">🚨 Side Effects</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.sideEffects}</p>
                    </div>` : ''}
                    ${drug.pharmacokinetics ? `
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">⏱️ Pharmacokinetics</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.pharmacokinetics}</p>
                    </div>` : ''}
                    ${drug.clinicalPearls ? `
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid #10b981;">
                        <h4 style="margin: 0 0 10px 0; color: #10b981; font-size: 1.1em;">💎 Clinical Pearls</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.clinicalPearls}</p>
                    </div>` : ''}
                    ${drug.coverage ? `
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">🦠 Antimicrobial Coverage</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.coverage}</p>
                    </div>` : ''}
                    ${drug.targets ? `
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">🎯 Treatment Targets</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.targets}</p>
                    </div>` : ''}
                    ${drug.efficacy ? `
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">📈 Clinical Efficacy</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.efficacy}</p>
                    </div>` : ''}
                    ${drug.indications ? `
                    <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                        <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">🎯 Indications</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${drug.indications}</p>
                    </div>` : ''}
                </div>
            </div>
        `;
        
        // Scroll to top
        panel.scrollTop = 0;
        window.scrollTo(0, 0);
    }
    
    speakDrugName(drugName) {
        this.drugManager.speakDrugName(drugName);
    }

    /**
     * Load calculators list
     */
    loadCalculatorsContent(panel) {
        const calculators = calculatorManager.getAllCalculators();
        // Calculators should already be rendered in the HTML panel
        console.log(`🧮 Calculators content loaded: ${calculators.length} calculators available`);
    }

    /**
     * Load lab values content
     */
    loadLabValuesContent(panel) {
        const container = panel.querySelector('#lab-values-container') || panel;
        
        // Access lab panels directly from the manager's data
        const labData = this.labManager.labDatabase || {};
        const panels = Object.keys(labData);
        
        if (panels.length === 0) {
            container.innerHTML = '<div class="no-content">Lab values database not loaded</div>';
            return;
        }
        
        // Create modern lab interface with search
        let html = `
            <div class="search-container">
                <input type="text" id="lab-search" placeholder="Search lab tests..." class="tool-search">
                <button id="lab-search-btn">🔍</button>
            </div>
            <div id="lab-panels" class="lab-grid">
        `;
        
        panels.forEach(panelKey => {
            const panel = labData[panelKey];
            const testCount = Object.keys(panel.values || {}).length;
            
            html += `
                <button class="lab-value-btn" onclick="window.quizApp.showLabPanel('${panelKey}'); event.stopPropagation();">
                    <div class="lab-name">${panel.name || panelKey}</div>
                    <div class="lab-count">${testCount} test${testCount !== 1 ? 's' : ''}</div>
                </button>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        // Add search functionality
        const searchInput = document.getElementById('lab-search');
        const searchBtn = document.getElementById('lab-search-btn');
        if (searchInput && searchBtn) {
            const performSearch = () => {
                const query = searchInput.value.toLowerCase();
                if (!query) {
                    const panelsContainer = document.getElementById('lab-panels');
                    if (panelsContainer) {
                        panelsContainer.innerHTML = panels.map(panelKey => {
                            const panel = labData[panelKey];
                            const testCount = Object.keys(panel.values || {}).length;
                            return `
                                <button class="lab-value-btn" onclick="window.quizApp.showLabPanel('${panelKey}'); event.stopPropagation();">
                                    <div class="lab-name">${panel.name || panelKey}</div>
                                    <div class="lab-count">${testCount} test${testCount !== 1 ? 's' : ''}</div>
                                </button>
                            `;
                        }).join('');
                    }
                    return;
                }
                
                const results = [];
                panels.forEach(panelKey => {
                    const panel = labData[panelKey];
                    const panelName = (panel.name || panelKey).toLowerCase();
                    
                    if (panelName.includes(query)) {
                        results.push({
                            type: 'panel',
                            key: panelKey,
                            name: panel.name || panelKey,
                            count: Object.keys(panel.values || {}).length
                        });
                    }
                    
                    Object.entries(panel.values || {}).forEach(([testKey, test]) => {
                        const testName = (test.name || testKey).toLowerCase();
                        if (testName.includes(query)) {
                            results.push({
                                type: 'test',
                                panel: panelKey,
                                key: testKey,
                                name: test.name || testKey,
                                range: test.range || test.normalRange
                            });
                        }
                    });
                });
                
                const panelsContainer = document.getElementById('lab-panels');
                if (panelsContainer) {
                    if (results.length === 0) {
                        panelsContainer.innerHTML = '<div class="no-results"><h3>No lab tests found</h3><p>Try a different search term.</p></div>';
                    } else {
                        panelsContainer.innerHTML = results.map(result => {
                            if (result.type === 'panel') {
                                return `
                                    <button class="lab-value-btn" onclick="window.quizApp.showLabPanel('${result.key}'); event.stopPropagation();">
                                        <div class="lab-name">${result.name}</div>
                                        <div class="lab-count">${result.count} test${result.count !== 1 ? 's' : ''}</div>
                                    </button>
                                `;
                            } else {
                                return `
                                    <button class="lab-value-btn" onclick="window.quizApp.showLabPanel('${result.panel}'); event.stopPropagation();">
                                        <div class="lab-name">${result.name}</div>
                                        <div class="lab-count">${result.panel} • ${result.range || 'See details'}</div>
                                    </button>
                                `;
                            }
                        }).join('');
                    }
                }
            };
            
            searchInput.addEventListener('input', performSearch);
            searchBtn.addEventListener('click', performSearch);
        }
        
        console.log('🧪 Lab values content loaded');
    }

    /**
     * Show lab panel details
     */
    showLabPanel(panelKey) {
        const container = document.getElementById('lab-values-container');
        if (!container) return;
        
        const labData = this.labManager.labDatabase || {};
        const panel = labData[panelKey];
        if (!panel) return;
        
        let html = `
            <button class="back-btn" onclick="window.quizApp.loadLabValuesContent(document.getElementById('lab-panel')); event.stopPropagation();" style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer;">
                ← Back to Lab Panels
            </button>
            <div class="lab-panel-detail">
                <h3 style="margin-bottom: 20px; font-size: 1.6em; color: var(--text-primary);">${panel.name || panelKey}</h3>
                <div class="lab-grid" style="display: grid; grid-template-columns: repeat(auto-fill, minmax(280px, 1fr)); gap: 15px;">
        `;
        
        Object.entries(panel.values || {}).forEach(([testKey, test]) => {
            html += `
                <button class="lab-value-btn" onclick="window.quizApp.showLabTest('${panelKey}', '${testKey}'); event.stopPropagation();" style="cursor: pointer; padding: 15px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 12px; text-align: left; transition: all 0.2s; box-shadow: 0 2px 4px rgba(0,0,0,0.05);">
                    <div class="lab-name" style="font-weight: 600; font-size: 1.05em; color: var(--text-primary); margin-bottom: 6px;">${testKey}</div>
                    <div class="lab-count" style="font-size: 0.9em; color: var(--text-secondary);">${test.normal || test.range || test.normalRange || 'Click for details'}</div>
                </button>
            `;
        });
        
        html += '</div></div>';
        container.innerHTML = html;
        
        // Scroll to top
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }
    
    /**
     * Show lab test detail with all clinical information
     */
    showLabTest(panelKey, testKey) {
        const container = document.getElementById('lab-values-container');
        if (!container) return;
        
        const labData = this.labManager.labDatabase || {};
        const panel = labData[panelKey];
        if (!panel) return;
        
        const test = panel.values[testKey];
        if (!test) return;
        
        container.innerHTML = `
            <button class="back-btn" onclick="window.quizApp.showLabPanel('${panelKey}'); event.stopPropagation();" style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer;">
                ← Back to ${panel.name}
            </button>
            <div class="lab-test-detail" style="background: var(--card-bg); border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 25px 0; padding-bottom: 20px; border-bottom: 2px solid var(--border); font-size: 1.8em; color: var(--text-primary);">📊 ${testKey}</h3>
                <div class="test-info">
                    <div class="info-section" style="margin-bottom: 15px; padding: 12px; background: var(--bg-tertiary); border-left: 4px solid #0ea5e9; border-radius: 6px;">
                        <h4 style="margin: 0 0 8px 0; color: #0ea5e9; font-size: 1.05em;">🎯 Normal Range</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6; font-weight: 600;">${test.normal || test.range || test.normalRange || 'Not specified'}</p>
                    </div>
                    ${test.ageVariations ? `
                    <div class="info-section" style="margin-bottom: 15px; padding: 12px; background: var(--bg-tertiary); border-left: 4px solid #22c55e; border-radius: 6px;">
                        <h4 style="margin: 0 0 8px 0; color: #22c55e; font-size: 1.05em;">👶🧓 Age Variations</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${test.ageVariations}</p>
                    </div>` : ''}
                    ${test.low ? `
                    <div class="info-section" style="margin-bottom: 15px; padding: 12px; background: var(--bg-tertiary); border-left: 4px solid #eab308; border-radius: 6px;">
                        <h4 style="margin: 0 0 8px 0; color: #eab308; font-size: 1.05em;">📉 Low Values - Causes</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${test.low}</p>
                    </div>` : ''}
                    ${test.high ? `
                    <div class="info-section" style="margin-bottom: 15px; padding: 12px; background: var(--bg-tertiary); border-left: 4px solid #eab308; border-radius: 6px;">
                        <h4 style="margin: 0 0 8px 0; color: #eab308; font-size: 1.05em;">📈 High Values - Causes</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${test.high}</p>
                    </div>` : ''}
                    ${test.critical ? `
                    <div class="info-section" style="margin-bottom: 15px; padding: 12px; background: var(--bg-tertiary); border-left: 4px solid #dc2626; border-radius: 6px;">
                        <h4 style="margin: 0 0 8px 0; color: #ef4444; font-size: 1.05em;">🚨 Critical Values</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6; font-weight: 600;">${test.critical}</p>
                    </div>` : ''}
                    ${test.clinicalSignificance ? `
                    <div class="info-section" style="margin-bottom: 15px; padding: 12px; background: var(--bg-tertiary); border-left: 4px solid #f59e0b; border-radius: 6px;">
                        <h4 style="margin: 0 0 8px 0; color: #f59e0b; font-size: 1.05em;">💡 Clinical Significance</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${test.clinicalSignificance}</p>
                    </div>` : ''}
                    ${test.unit ? `
                    <div class="info-section" style="margin-bottom: 15px; padding: 12px; background: var(--bg-tertiary); border-left: 4px solid #64748b; border-radius: 6px;">
                        <h4 style="margin: 0 0 8px 0; color: #94a3b8; font-size: 1.05em;">📏 Unit</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${test.unit}</p>
                    </div>` : ''}
                    ${test.description ? `
                    <div class="info-section" style="margin-bottom: 15px; padding: 12px; background: var(--bg-tertiary); border-left: 4px solid #64748b; border-radius: 6px;">
                        <h4 style="margin: 0 0 8px 0; color: #94a3b8; font-size: 1.05em;">ℹ️ Description</h4>
                        <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${test.description}</p>
                    </div>` : ''}
                </div>
            </div>
        `;
        
        // Scroll to top
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    /**
     * Load guidelines content
     */
    loadGuidelinesContent(panel) {
        if (!panel) {
            console.error('loadGuidelinesContent: panel is null');
            return;
        }
        const container = panel.querySelector('#guidelines-container') || panel;
        
        // Access guidelines directly from the manager's data
        const guidelinesData = this.guidelinesManager.guidelinesDatabase || {};
        const guidelineKeys = Object.keys(guidelinesData);
        
        if (guidelineKeys.length === 0) {
            container.innerHTML = '<div class="no-content">Guidelines database not loaded</div>';
            return;
        }
        
        // Create modern guidelines interface
        let html = `
            <div class="search-container">
                <input type="text" id="guidelines-search" placeholder="Search guidelines..." class="tool-search">
                <button id="guidelines-search-btn">🔍</button>
            </div>
            <div id="guidelines-list" class="lab-grid">
        `;
        
        guidelineKeys.forEach(key => {
            const guideline = guidelinesData[key];
            const title = guideline.title || guideline.name || key;
            const org = guideline.organisation || guideline.organization || '';
            const updated = guideline.lastUpdated || guideline.year || '';
            
            html += `
                <button class="lab-value-btn" onclick="window.quizApp.showGuidelineDetail('${key}'); event.stopPropagation();" style="cursor: pointer; text-align: left; transition: all 0.2s;">
                    <div class="lab-name">${title}</div>
                    <div class="lab-count">${org}${updated ? ' • ' + updated : ''}</div>
                    ${guideline.summary || guideline.description || guideline.category ? `<p style="font-size: 12px; margin-top: 8px; opacity: 0.9;">${(guideline.summary || guideline.description || guideline.category)}</p>` : ''}
                </button>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        // Add search functionality
        const searchInput = document.getElementById('guidelines-search');
        const searchBtn = document.getElementById('guidelines-search-btn');
        if (searchInput && searchBtn) {
            const performSearch = () => {
                const query = searchInput.value.toLowerCase();
                const filtered = query ? guidelineKeys.filter(key => {
                    const g = guidelinesData[key];
                    return (g.title || '').toLowerCase().includes(query) ||
                           (g.name || '').toLowerCase().includes(query) ||
                           (g.organisation || '').toLowerCase().includes(query) ||
                           (g.organization || '').toLowerCase().includes(query) ||
                           (g.category || '').toLowerCase().includes(query) ||
                           (g.summary || '').toLowerCase().includes(query);
                }) : guidelineKeys;
                
                const listContainer = document.getElementById('guidelines-list');
                if (listContainer) {
                    if (filtered.length === 0) {
                        listContainer.innerHTML = '<div class="no-results"><h3>No guidelines found</h3><p>Try a different search term.</p></div>';
                    } else {
                        listContainer.innerHTML = filtered.map(key => {
                            const guideline = guidelinesData[key];
                            const title = guideline.title || guideline.name || key;
                            const org = guideline.organisation || guideline.organization || '';
                            const updated = guideline.lastUpdated || guideline.year || '';
                            
                            return `
                                <button class="lab-value-btn" onclick="window.quizApp.showGuidelineDetail('${key}'); event.stopPropagation();" style="cursor: pointer; text-align: left; transition: all 0.2s;">
                                    <div class="lab-name">${title}</div>
                                    <div class="lab-count">${org}${updated ? ' • ' + updated : ''}</div>
                                    ${guideline.summary || guideline.description || guideline.category ? `<p style="font-size: 12px; margin-top: 8px; opacity: 0.9;">${(guideline.summary || guideline.description || guideline.category)}</p>` : ''}
                                </button>
                            `;
                        }).join('');
                    }
                }
            };
            
            searchInput.addEventListener('input', performSearch);
            searchBtn.addEventListener('click', performSearch);
        }
        
        console.log('📋 Guidelines content loaded');
    }
    
    /**
     * Show guideline detail with all sections
     */
    showGuidelineDetail(guidelineKey) {
        const container = document.getElementById('guidelines-container') || 
                         document.getElementById('guidelines-panel');
        if (!container) return;
        
        const guidelinesData = this.guidelinesManager.guidelinesDatabase || {};
        const guideline = guidelinesData[guidelineKey];
        if (!guideline) return;
        
        let contentHtml = `
            <button class="back-btn" onclick="window.quizApp.loadGuidelinesContent(document.getElementById('guidelines-panel')); event.stopPropagation();" style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer;">
                ← Back to Guidelines
            </button>
            <div class="guideline-detail" style="background: var(--card-bg); border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 15px 0; font-size: 1.8em; color: var(--text-primary);">${guideline.title || guideline.name || guidelineKey}</h3>
                <div class="guideline-meta" style="display: flex; gap: 15px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--border); flex-wrap: wrap;">
                    ${guideline.evidenceLevel ? `<span class="evidence-level" style="padding: 6px 12px; background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%); color: white; border-radius: 20px; font-size: 0.85em;">📋 ${guideline.evidenceLevel}</span>` : ''}
                    ${guideline.lastUpdated ? `<span class="last-updated" style="padding: 6px 12px; background: var(--bg); border: 1px solid var(--border); border-radius: 20px; font-size: 0.85em; color: var(--text-secondary);">🗓️ ${guideline.lastUpdated}</span>` : ''}
                    ${guideline.organisation ? `<span style="padding: 6px 12px; background: var(--bg); border: 1px solid var(--border); border-radius: 20px; font-size: 0.85em; color: var(--text-secondary);">🏥 ${guideline.organisation}</span>` : ''}
                </div>
        `;
        
        // Helper function to render sections
        const renderSection = (title, icon, data, color = 'var(--accent)') => {
            if (!data) return '';
            
            let content = '';
            if (typeof data === 'string') {
                content = `<p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${data}</p>`;
            } else if (typeof data === 'object') {
                content = Object.entries(data).map(([key, value]) => `
                    <div style="margin-bottom: 12px;">
                        <strong style="color: var(--text-primary);">${key}:</strong>
                        <span style="color: var(--text-primary); margin-left: 8px;">${value}</span>
                    </div>
                `).join('');
            }
            
            return `
                <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid ${color};">
                    <h4 style="margin: 0 0 12px 0; color: ${color}; font-size: 1.1em;">${icon} ${title}</h4>
                    ${content}
                </div>
            `;
        };
        
        // Render all possible sections
        contentHtml += renderSection('Diagnosis', '🔍', guideline.diagnosis);
        contentHtml += renderSection('Stages/Classification', '📊', guideline.stages);
        contentHtml += renderSection('Patient Groups', '👥', guideline.groups);
        contentHtml += renderSection('Treatment Targets', '🎯', guideline.targets, '#10b981');
        contentHtml += renderSection('Treatment Recommendations', '💊', guideline.treatment);
        contentHtml += renderSection('Treatment Algorithm', '🔄', guideline.algorithm);
        contentHtml += renderSection('Medication Classes', '💊', guideline.medications);
        contentHtml += renderSection('First-line Therapy', '🥇', guideline.firstLine, '#10b981');
        contentHtml += renderSection('Second-line Options', '🥈', guideline.secondLine);
        contentHtml += renderSection('Acute Management', '🚨', guideline.acute, '#ef4444');
        contentHtml += renderSection('Exacerbations', '⚠️', guideline.exacerbations, '#f59e0b');
        contentHtml += renderSection('Lifestyle Modifications', '🏃‍♂️', guideline.lifestyle);
        contentHtml += renderSection('Monitoring', '📊', guideline.monitoring);
        contentHtml += renderSection('Special Populations', '👥', guideline.specialPopulations);
        contentHtml += renderSection('Investigations', '🔬', guideline.investigations);
        contentHtml += renderSection('Inhalers', '💨', guideline.inhalers);
        contentHtml += renderSection('Triggers', '⚡', guideline.triggers);
        contentHtml += renderSection('Complications', '⚠️', guideline.complications, '#ef4444');
        contentHtml += renderSection('Red Flags', '🚩', guideline.redFlags, '#ef4444');
        contentHtml += renderSection('Follow-up', '📅', guideline.followUp);
        contentHtml += renderSection('Criteria', '📋', guideline.criteria);
        contentHtml += renderSection('Prevention', '�️', guideline.prevention);
        
        contentHtml += '</div>';
        
        container.innerHTML = contentHtml;
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    /**
     * Load mnemonics content
     */
    loadMnemonicsContent(panel) {
        if (!panel) {
            console.error('loadMnemonicsContent: panel is null');
            return;
        }
        const container = panel.querySelector('#mnemonics-container') || panel;
        
        // Access mnemonics directly from the manager's data  
        const mnemonicsData = this.mnemonicsManager.mnemonicsDatabase || {};
        const mnemonicKeys = Object.keys(mnemonicsData);
        
        if (mnemonicKeys.length === 0) {
            container.innerHTML = '<div class="no-content">Mnemonics database not loaded</div>';
            return;
        }
        
        // Create modern mnemonics interface with categories
        let html = `
            <div class="search-container">
                <input type="text" id="mnemonics-search" placeholder="Search mnemonics..." class="tool-search">
                <button id="mnemonics-search-btn">🔍</button>
            </div>
            <div class="mnemonics-categories">
                <button class="category-btn active" data-category="all">All</button>
                <button class="category-btn" data-category="cardiovascular">Cardiovascular</button>
                <button class="category-btn" data-category="respiratory">Respiratory</button>
                <button class="category-btn" data-category="neurology">Neurology</button>
                <button class="category-btn" data-category="emergency">Emergency</button>
                <button class="category-btn" data-category="general">General</button>
            </div>
            <div id="mnemonics-grid" class="lab-grid">
        `;
        
        mnemonicKeys.forEach(key => {
            const mnemonic = mnemonicsData[key];
            const details = mnemonic.details || [];
            html += `
                <button class="lab-value-btn" data-category="${mnemonic.category || 'general'}" onclick="window.quizApp.showMnemonicDetail('${key}'); event.stopPropagation();" style="cursor: pointer; text-align: left; transition: all 0.2s;">
                    <div class="lab-name">${mnemonic.mnemonic || mnemonic.acronym}</div>
                    <div class="lab-count">${mnemonic.title || mnemonic.meaning || ''}</div>
                    <p style="font-size: 11px; margin-top: 8px; opacity: 0.8;">${mnemonic.usage || 'Click for details'}</p>
                </button>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        // Add search and filter functionality
        const searchInput = document.getElementById('mnemonics-search');
        const searchBtn = document.getElementById('mnemonics-search-btn');
        const categoryBtns = document.querySelectorAll('.mnemonics-categories .category-btn');
        
        const filterMnemonics = () => {
            const query = searchInput ? searchInput.value.toLowerCase() : '';
            const activeCategory = document.querySelector('.mnemonics-categories .category-btn.active')?.dataset.category || 'all';
            
            let filtered = mnemonicKeys;
            
            // Filter by category
            if (activeCategory !== 'all') {
                filtered = filtered.filter(key => mnemonicsData[key].category === activeCategory);
            }
            
            // Filter by search
            if (query) {
                filtered = filtered.filter(key => {
                    const m = mnemonicsData[key];
                    return (m.mnemonic || '').toLowerCase().includes(query) ||
                           (m.acronym || '').toLowerCase().includes(query) ||
                           (m.title || '').toLowerCase().includes(query) ||
                           (m.meaning || '').toLowerCase().includes(query) ||
                           (m.usage || '').toLowerCase().includes(query) ||
                           (m.details || []).some(d => d.toLowerCase().includes(query));
                });
            }
            
            const gridContainer = document.getElementById('mnemonics-grid');
            if (gridContainer) {
                if (filtered.length === 0) {
                    gridContainer.innerHTML = '<div class="no-results"><h3>No mnemonics found</h3><p>Try adjusting your search or category filter.</p></div>';
                } else {
                    gridContainer.innerHTML = filtered.map(key => {
                        const mnemonic = mnemonicsData[key];
                        return `
                            <button class="lab-value-btn" data-category="${mnemonic.category || 'general'}" onclick="window.quizApp.showMnemonicDetail('${key}'); event.stopPropagation();" style="cursor: pointer; text-align: left; transition: all 0.2s;">
                                <div class="lab-name">${mnemonic.mnemonic || mnemonic.acronym}</div>
                                <div class="lab-count">${mnemonic.title || mnemonic.meaning || ''}</div>
                                <p style="font-size: 11px; margin-top: 8px; opacity: 0.8;">${mnemonic.usage || 'Click for details'}</p>
                            </button>
                        `;
                    }).join('');
                }
            }
        };
        
        if (searchInput && searchBtn) {
            searchInput.addEventListener('input', filterMnemonics);
            searchBtn.addEventListener('click', filterMnemonics);
        }
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterMnemonics();
            });
        });
        
        console.log('🧠 Mnemonics content loaded');
    }
    
    /**
     * Show mnemonic detail with full breakdown
     */
    showMnemonicDetail(mnemonicKey) {
        const container = document.getElementById('mnemonics-container') || 
                         document.getElementById('mnemonics-panel');
        if (!container) return;
        
        const mnemonicsData = this.mnemonicsManager.mnemonicsDatabase || {};
        const mnemonic = mnemonicsData[mnemonicKey];
        if (!mnemonic) return;
        
        let html = `
            <button class="back-btn" onclick="window.quizApp.loadMnemonicsContent(document.getElementById('mnemonics-panel')); event.stopPropagation();" style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer;">
                ← Back to Mnemonics
            </button>
            <div class="guideline-detail" style="background: var(--card-bg); border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 25px 0; font-size: 1.8em; color: var(--text-primary);">🧠 ${mnemonic.title}</h3>
                
                <div class="info-section" style="margin-bottom: 25px;">
                    <div style="text-align: center; padding: 25px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white; border-radius: 12px; box-shadow: 0 4px 12px rgba(102, 126, 234, 0.3);">
                        <div style="font-size: 2.5em; font-weight: bold; letter-spacing: 4px; margin-bottom: 12px; text-shadow: 2px 2px 4px rgba(0,0,0,0.2);">${mnemonic.mnemonic || mnemonic.acronym}</div>
                        <div style="font-size: 1.15em; opacity: 0.95; font-weight: 500;">${mnemonic.meaning}</div>
                    </div>
                </div>
                
                <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                    <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">📋 Clinical Use</h4>
                    <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${mnemonic.usage}</p>
                </div>
                
                <div class="info-section" style="margin-bottom: 20px; padding: 20px; background: var(--bg); border-radius: 8px; border-left: 3px solid #8b5cf6;">
                    <h4 style="margin: 0 0 15px 0; color: #8b5cf6; font-size: 1.1em;">🔍 Breakdown</h4>
                    <div style="display: flex; flex-direction: column; gap: 8px;">
                        ${(mnemonic.details || []).map(detail => {
                            if (!detail || detail.trim() === '') {
                                return '';
                            }
                            // Clean up the detail text
                            const cleanDetail = detail.replace(/\n/g, ' ').replace(/\s+/g, ' ').trim();
                            return `<div style="padding: 12px 16px; border-left: 3px solid #8b5cf6; background: var(--card-bg); border-radius: 6px; color: var(--text-primary); line-height: 1.5;">${cleanDetail}</div>`;
                        }).filter(item => item !== '').join('')}
                    </div>
                </div>
            </div>
        `;
        
        container.innerHTML = html;
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    /**
     * Load differential dx content
     */
    loadDifferentialDxContent(panel) {
        const container = panel.querySelector('#differential-dx-container') || panel;
        
        // Access differentials database from manager
        const ddxDatabase = this.differentialDxManager.differentialDatabase || {};
        
        if (Object.keys(ddxDatabase).length === 0) {
            container.innerHTML = '<div class="no-content">Differential diagnosis database not loaded</div>';
            return;
        }
        
        // Create full V1-style interface with search and categories
        container.innerHTML = `
            <div class="search-container">
                <input type="text" id="ddx-search" placeholder="Search symptoms or diagnoses..." class="tool-search">
                <button id="ddx-search-btn">🔍</button>
            </div>
            <div id="ddx-search-results" class="lab-grid"></div>
            <div class="ddx-categories">
                <button class="category-btn active" onclick="window.quizApp.showDdxCategory('all'); event.stopPropagation();">All Symptoms</button>
                <button class="category-btn" onclick="window.quizApp.showDdxCategory('cardiovascular'); event.stopPropagation();">CV/Pulm</button>
                <button class="category-btn" onclick="window.quizApp.showDdxCategory('gastroenterology'); event.stopPropagation();">GI/Surgery</button>
                <button class="category-btn" onclick="window.quizApp.showDdxCategory('neurology'); event.stopPropagation();">Neurology</button>
                <button class="category-btn" onclick="window.quizApp.showDdxCategory('emergency'); event.stopPropagation();">Emergency</button>
                <button class="category-btn" onclick="window.quizApp.showDdxCategory('general'); event.stopPropagation();">General Med</button>
            </div>
            <div id="ddx-list" class="lab-grid"></div>
        `;
        
        // Setup search event listeners
        const searchInput = document.getElementById('ddx-search');
        const searchBtn = document.getElementById('ddx-search-btn');
        searchInput.addEventListener('input', () => this.searchDdx(ddxDatabase));
        searchBtn.addEventListener('click', () => this.searchDdx(ddxDatabase));
        
        // Store database reference
        this.ddxDatabase = ddxDatabase;
        
        // Show all symptoms initially
        this.showDdxCategory('all');
        
        console.log('🔍 Differential diagnosis content loaded');
    }

    /**
     * Search differential diagnoses (V1 compatibility)
     */
    searchDdx(ddxDatabase) {
        const query = document.getElementById('ddx-search').value.toLowerCase();
        const resultsContainer = document.getElementById('ddx-search-results');
        
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }
        
        const matches = [];
        Object.keys(ddxDatabase).forEach(symptom => {
            if (ddxDatabase[symptom].title.toLowerCase().includes(query) ||
                ddxDatabase[symptom].category.toLowerCase().includes(query)) {
                matches.push({ type: 'symptom', key: symptom, name: ddxDatabase[symptom].title });
            }
            Object.keys(ddxDatabase[symptom].presentations).forEach(dx => {
                if (dx.toLowerCase().includes(query)) {
                    matches.push({ type: 'diagnosis', symptom: symptom, key: dx, name: dx });
                }
            });
        });
        
        if (matches.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
            return;
        }
        
        resultsContainer.innerHTML = matches.map(match => `
            <button class="lab-value-btn" onclick="${match.type === 'symptom' ? `console.log('🔍 DDX search result clicked:', '${match.key}'); window.quizApp.showDdxDetail('${match.key}'); event.stopPropagation();` : `console.log('🔍 Diagnosis search result clicked:', '${match.key}'); window.quizApp.showDiagnosisDetail('${match.symptom}', '${match.key}'); event.stopPropagation();`}">
                <div class="lab-name">${match.name}</div>
                <div class="lab-count">${match.type === 'symptom' ? 'Symptom Complex' : 'Diagnosis'}</div>
            </button>
        `).join('');
    }

    /**
     * Show differential diagnoses by category (V1 compatibility)
     */
    showDdxCategory(category) {
        const ddxDatabase = this.ddxDatabase;
        const ddxList = document.getElementById('ddx-list');
        
        // Update active button state
        document.querySelectorAll('.ddx-categories .category-btn').forEach(btn => btn.classList.remove('active'));
        const targetButton = Array.from(document.querySelectorAll('.ddx-categories .category-btn')).find(btn => 
            btn.textContent.toLowerCase().includes(category.toLowerCase()) ||
            (category === 'all' && btn.textContent === 'All Symptoms')
        );
        if (targetButton) targetButton.classList.add('active');
        
        let symptoms = Object.keys(ddxDatabase);
        
        if (category !== 'all') {
            symptoms = symptoms.filter(symptom => 
                ddxDatabase[symptom].category.toLowerCase().includes(category)
            );
        }
        
        ddxList.innerHTML = symptoms.map(symptom => `
            <button class="lab-value-btn" onclick="console.log('🔍 DDX card clicked:', '${symptom}'); window.quizApp.showDdxDetail('${symptom}'); event.stopPropagation();">
                <div class="lab-name">${ddxDatabase[symptom].title}</div>
                <div class="lab-count">${Object.keys(ddxDatabase[symptom].presentations).length} differentials</div>
            </button>
        `).join('');
    }

    /**
     * Show differential diagnosis detail view (V1 compatibility)
     */
    showDdxDetail(symptomKey) {
        const symptom = this.ddxDatabase[symptomKey];
        const container = document.getElementById('differential-dx-container');
        
        const presentationsHtml = Object.entries(symptom.presentations).map(([dx, data]) => `
            <button class="lab-value-btn" onclick="console.log('🔍 Diagnosis clicked:', '${dx}'); window.quizApp.showDiagnosisDetail('${symptomKey}', '${dx}'); event.stopPropagation();">
                <div class="lab-name">${dx}</div>
                <div class="lab-count">${data.urgency}</div>
            </button>
        `).join('');
        
        container.innerHTML = `
            <button class="back-btn" onclick="window.quizApp.loadDifferentialDxContent(document.getElementById('differential-panel')); event.stopPropagation();">← Back to Symptoms</button>
            <div class="ddx-detail">
                <h3>🔍 ${symptom.title}</h3>
                <p class="ddx-category">📋 ${symptom.category}</p>
                ${symptom.redFlags ? `
                <div class="red-flags-banner">
                    <h4>🚨 RED FLAGS</h4>
                    <p>${symptom.redFlags}</p>
                </div>` : ''}
                <h4>📋 Differential Diagnoses:</h4>
                <div class="lab-grid">
                    ${presentationsHtml}
                </div>
            </div>
        `;
        
        // Scroll to top
        const ddxPanel = document.getElementById('differential-panel');
        if (ddxPanel) ddxPanel.scrollTop = 0;
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    /**
     * Show specific diagnosis detail (V1 compatibility)
     */
    showDiagnosisDetail(symptomKey, dxKey) {
        const diagnosis = this.ddxDatabase[symptomKey].presentations[dxKey];
        const container = document.getElementById('differential-dx-container');
        
        container.innerHTML = `
            <button class="back-btn" onclick="window.quizApp.showDdxDetail('${symptomKey}'); event.stopPropagation();">← Back to ${this.ddxDatabase[symptomKey].title}</button>
            <div class="diagnosis-detail">
                <h3>🔍 ${dxKey}</h3>
                <div class="urgency-banner ${diagnosis.urgency.toLowerCase()}">
                    <span class="urgency-level">⚡ ${diagnosis.urgency.toUpperCase()}</span>
                    ${diagnosis.timeToTreat ? `<span class="time-to-treat">⏱️ ${diagnosis.timeToTreat}</span>` : ''}
                </div>
                <div class="diagnosis-info">
                    <div class="info-section info-section-features" style="border-left: 4px solid #0ea5e9; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                        <h4 style="color: #0ea5e9;">🎯 Clinical Features</h4>
                        <p>${diagnosis.features}</p>
                    </div>
                    <div class="info-section info-section-tests" style="border-left: 4px solid #22c55e; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                        <h4 style="color: #22c55e;">🔬 Diagnostic Tests</h4>
                        <p>${diagnosis.tests}</p>
                    </div>
                    ${diagnosis.differentiatingFeatures ? `
                    <div class="info-section info-section-diff" style="border-left: 4px solid #eab308; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                        <h4 style="color: #eab308;">🔍 Key Differentiating Features</h4>
                        <p>${diagnosis.differentiatingFeatures}</p>
                    </div>` : ''}
                    ${diagnosis.clinicalPearls ? `
                    <div class="info-section info-section-pearls" style="border-left: 4px solid #ffa726; padding: 12px; border-radius: 6px; margin-bottom: 12px;">
                        <h4 style="color: #ffa726;">💎 Clinical Pearls</h4>
                        <p>${diagnosis.clinicalPearls}</p>
                    </div>` : ''}
                </div>
            </div>
        `;
        
        // Scroll to top
        const ddxPanel = document.getElementById('differential-panel');
        if (ddxPanel) ddxPanel.scrollTop = 0;
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    /**
     * Load triads content (V1 compatibility with full features)
     */
    loadTriadsContent(panel) {
        const resultsContainer = panel.querySelector('#triads-results');
        if (!resultsContainer) {
            console.log('🔺 Triads results container not found');
            return;
        }
        
        // Check if already initialized
        if (this.triadsInitialized) {
            console.log('🔺 Clinical triads already initialized');
            return;
        }
        
        // Setup search and category filtering
        this.setupTriadsSearch();
        
        // Display all triads initially
        const triadsData = this.triadsManager.clinicalTriads || {};
        this.displayTriads(Object.keys(triadsData));
        
        // Mark as initialized
        this.triadsInitialized = true;
        
        console.log('🔺 Clinical triads content loaded');
    }

    /**
     * Setup triads search functionality (V1 compatibility)
     */
    setupTriadsSearch() {
        const searchInput = document.getElementById('triads-search');
        const searchBtn = document.getElementById('triads-search-btn');
        const categoryBtns = document.querySelectorAll('.triad-categories .category-btn');
        
        const performTriadsSearch = () => {
            const searchTerm = searchInput ? searchInput.value.toLowerCase() : '';
            const activeCategory = document.querySelector('.triad-categories .category-btn.active')?.dataset.category || 'all';
            
            const triadsData = this.triadsManager.clinicalTriads || {};
            let filteredTriads = Object.keys(triadsData);
            
            // Filter by category
            if (activeCategory !== 'all') {
                filteredTriads = filteredTriads.filter(triadId => 
                    triadsData[triadId].category === activeCategory
                );
            }
            
            // Filter by search term
            if (searchTerm) {
                filteredTriads = filteredTriads.filter(triadId => {
                    const triad = triadsData[triadId];
                    return (
                        triad.name.toLowerCase().includes(searchTerm) ||
                        triad.condition.toLowerCase().includes(searchTerm) ||
                        triad.components.some(comp => comp.toLowerCase().includes(searchTerm))
                    );
                });
            }
            
            this.displayTriads(filteredTriads);
        };
        
        // Event listeners
        if (searchInput) {
            searchInput.addEventListener('input', performTriadsSearch);
            searchInput.addEventListener('keypress', (e) => {
                if (e.key === 'Enter') performTriadsSearch();
            });
        }
        
        if (searchBtn) {
            searchBtn.addEventListener('click', performTriadsSearch);
        }
        
        // Category buttons
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                performTriadsSearch();
            });
        });
        
        // Set 'all' as active initially
        const allBtn = document.querySelector('.triad-categories .category-btn[data-category="all"]');
        if (allBtn) allBtn.classList.add('active');
    }

    /**
     * Display filtered triads (V1 compatibility)
     */
    displayTriads(triadIds) {
        const triadsResults = document.getElementById('triads-results');
        if (!triadsResults) return;
        
        const triadsData = this.triadsManager.clinicalTriads || {};
        
        if (triadIds.length === 0) {
            triadsResults.innerHTML = `
                <div class="no-results">
                    <h3>🔍 No triads found</h3>
                    <p>Try adjusting your search terms or category filter.</p>
                </div>
            `;
            return;
        }
        
        // Sort triads by urgency (emergency first) then alphabetically
        const urgencyOrder = { 'emergency': 0, 'high': 1, 'moderate': 2, 'low': 3 };
        const sortedTriadIds = triadIds.sort((a, b) => {
            const triadA = triadsData[a];
            const triadB = triadsData[b];
            
            // First sort by urgency
            const urgencyDiff = urgencyOrder[triadA.urgency] - urgencyOrder[triadB.urgency];
            if (urgencyDiff !== 0) return urgencyDiff;
            
            // Then alphabetically
            return triadA.name.localeCompare(triadB.name);
        });
        
        const triadsHtml = sortedTriadIds.map(triadId => {
            const triad = triadsData[triadId];
            return this.createTriadCard(triad);
        }).join('');
        
        triadsResults.innerHTML = `
            <div class="triads-grid">
                ${triadsHtml}
            </div>
        `;
        
        console.log('🔺 Displayed triads:', triadIds.length);
    }

    /**
     * Create triad card HTML (V1 compatibility)
     */
    createTriadCard(triad) {
        const urgencyColors = {
            'emergency': '#D32F2F',
            'high': '#F57C00',
            'moderate': '#1976D2',
            'low': '#388E3C'
        };
        
        const urgencyIcons = {
            'emergency': '🚨',
            'high': '⚠️',
            'moderate': 'ℹ️',
            'low': '✅'
        };
        
        const categoryIcons = {
            'cardiovascular': '❤️',
            'respiratory': '🫁',
            'neurologic': '🧠',
            'emergency': '🚨',
            'infectious': '🦠',
            'endocrine': '⚗️',
            'rheumatologic': '🦴',
            'psychiatric': '🧭'
        };
        
        return `
            <div class="triad-card" style="border-left: 4px solid ${urgencyColors[triad.urgency]}">
                <div class="triad-header">
                    <h3>
                        ${categoryIcons[triad.category] || '🔺'} ${triad.name}
                        <span class="urgency-badge" style="background: ${urgencyColors[triad.urgency]}">
                            ${urgencyIcons[triad.urgency]} ${triad.urgency.toUpperCase()}
                        </span>
                    </h3>
                    <div class="condition-name">${triad.condition}</div>
                </div>
                
                <div class="triad-components">
                    <h4>🔺 Classic Triad:</h4>
                    <div class="components-list">
                        ${triad.components.map(comp => `<span class="component-item">${comp}</span>`).join('')}
                    </div>
                </div>
                
                <div class="triad-details">
                    <div class="detail-section">
                        <h4>🔬 Mechanism:</h4>
                        <p>${triad.mechanism}</p>
                    </div>
                    
                    <div class="detail-section">
                        <h4>🎯 Clinical Significance:</h4>
                        <p>${triad.clinicalSignificance}</p>
                    </div>
                    
                    <div class="detail-section uk-guidelines">
                        <h4>🇬🇧 UK Guidelines:</h4>
                        <p>${triad.ukGuidelines}</p>
                    </div>
                </div>
            </div>
        `;
    }

    /**
     * Load examination content (V1 compatibility with full features)
     */
    loadExaminationContent(panel) {
        const container = panel.querySelector('#examination-container');
        if (!container) return;
        
        // Access examinations database from manager
        const examinationDatabase = this.examinationManager.examinationGuides || {};
        
        if (Object.keys(examinationDatabase).length === 0) {
            container.innerHTML = '<div class="no-content">Examination guides database not loaded</div>';
            return;
        }
        
        // Create full V1-style interface with search and categories
        container.innerHTML = `
            <div class="search-container">
                <input type="text" id="examination-search" placeholder="Search examination techniques..." class="tool-search">
                <button id="examination-search-btn">🔍</button>
            </div>
            <div id="examination-search-results" class="lab-grid"></div>
            <div class="examination-categories">
                <button class="category-btn active" onclick="window.quizApp.showExaminationCategory('all'); event.stopPropagation();">All Systems</button>
                <button class="category-btn" onclick="window.quizApp.showExaminationCategory('systemic'); event.stopPropagation();">Systemic</button>
                <button class="category-btn" onclick="window.quizApp.showExaminationCategory('musculoskeletal'); event.stopPropagation();">MSK</button>
                <button class="category-btn" onclick="window.quizApp.showExaminationCategory('specialized'); event.stopPropagation();">Specialized</button>
                <button class="category-btn" onclick="window.quizApp.showExaminationCategory('psychiatric'); event.stopPropagation();">Psychiatric</button>
                <button class="category-btn" onclick="window.quizApp.showExaminationCategory('emergency'); event.stopPropagation();">Emergency</button>
                <button class="category-btn" onclick="window.quizApp.showExaminationCategory('primary_care'); event.stopPropagation();">Primary Care</button>
            </div>
            <div id="examination-list" class="lab-grid"></div>
        `;
        
        // Setup search event listeners
        const searchInput = document.getElementById('examination-search');
        const searchBtn = document.getElementById('examination-search-btn');
        searchInput.addEventListener('input', () => this.searchExamination(examinationDatabase));
        searchBtn.addEventListener('click', () => this.searchExamination(examinationDatabase));
        
        // Store database reference
        this.examinationDatabase = examinationDatabase;
        
        // Show all examinations initially
        this.showExaminationCategory('all');
        
        console.log('🩺 Examination guides content loaded');
    }

    /**
     * Search examinations (V1 compatibility)
     */
    searchExamination(examinationDatabase) {
        const query = document.getElementById('examination-search').value.toLowerCase();
        const resultsContainer = document.getElementById('examination-search-results');
        
        if (query.length < 2) {
            resultsContainer.innerHTML = '';
            return;
        }
        
        const matches = [];
        Object.keys(examinationDatabase).forEach(system => {
            if (examinationDatabase[system].title.toLowerCase().includes(query)) {
                matches.push({ type: 'system', key: system, name: examinationDatabase[system].title });
            }
            Object.keys(examinationDatabase[system].sections).forEach(section => {
                const sectionData = examinationDatabase[system].sections[section];
                if (sectionData.name.toLowerCase().includes(query) ||
                    sectionData.technique.toLowerCase().includes(query)) {
                    matches.push({ type: 'section', system: system, key: section, name: `${sectionData.name} (${examinationDatabase[system].title})` });
                }
            });
        });
        
        if (matches.length === 0) {
            resultsContainer.innerHTML = '<div class="no-results">No results found</div>';
            return;
        }
        
        resultsContainer.innerHTML = matches.map(match => `
            <button class="lab-value-btn" onclick="${match.type === 'system' ? `console.log('🩺 Examination system clicked:', '${match.key}'); window.quizApp.showExaminationDetail('${match.key}'); event.stopPropagation();` : `console.log('🩺 Examination section clicked:', '${match.key}'); window.quizApp.showSectionDetail('${match.system}', '${match.key}'); event.stopPropagation();`}">
                <div class="lab-name">${match.name}</div>
                <div class="lab-count">${match.type === 'system' ? 'System' : 'Technique'}</div>
            </button>
        `).join('');
    }

    /**
     * Show examinations by category (V1 compatibility)
     */
    showExaminationCategory(category) {
        const examinationDatabase = this.examinationDatabase;
        const examinationList = document.getElementById('examination-list');
        
        if (!examinationList || !examinationDatabase) {
            console.log('⚠️ Examination list or database not ready, reloading...');
            setTimeout(() => this.showExaminationCategory(category), 100);
            return;
        }
        
        // Update active button state
        const categoryButtons = document.querySelectorAll('.examination-categories .category-btn');
        categoryButtons.forEach(btn => {
            btn.classList.remove('active');
            const btnText = btn.textContent.trim();
            if ((category === 'all' && btnText === 'All Systems') ||
                (category === 'systemic' && btnText === 'Systemic') ||
                (category === 'musculoskeletal' && btnText === 'MSK') ||
                (category === 'specialized' && btnText === 'Specialized') ||
                (category === 'psychiatric' && btnText === 'Psychiatric') ||
                (category === 'emergency' && btnText === 'Emergency') ||
                (category === 'primary_care' && btnText === 'Primary Care')) {
                btn.classList.add('active');
            }
        });
        
        let systems = Object.keys(examinationDatabase);
        
        if (category !== 'all') {
            systems = systems.filter(system => examinationDatabase[system].category === category);
        }
        
        examinationList.innerHTML = systems.map(system => `
            <button class="lab-value-btn" onclick="console.log('🩺 Examination system clicked:', '${system}'); window.quizApp.showExaminationDetail('${system}'); event.stopPropagation();">
                <div class="lab-name">${examinationDatabase[system].title}</div>
                <div class="lab-count">${Object.keys(examinationDatabase[system].sections).length} sections</div>
            </button>
        `).join('');
    }

    /**
     * Show examination detail view (V1 compatibility)
     */
    showExaminationDetail(systemKey) {
        if (!this.examinationDatabase) {
            console.log('⚠️ Examination database not loaded, reloading...');
            this.loadToolContent('examination', document.getElementById('examination-panel'));
            return;
        }
        
        const system = this.examinationDatabase[systemKey];
        if (!system) {
            console.log('⚠️ System not found:', systemKey);
            return;
        }
        
        const container = document.getElementById('examination-container');
        if (!container) return;
        
        const sectionsHtml = Object.entries(system.sections).map(([sectionKey, section]) => `
            <button class="lab-value-btn" onclick="window.quizApp.showSectionDetail('${systemKey}', '${sectionKey}'); event.stopPropagation();">
                <div class="lab-name">${section.name}</div>
                <div class="lab-count">${Object.keys(section.abnormal).length} abnormal findings</div>
            </button>
        `).join('');
        
        container.innerHTML = `
            <button class="back-btn" onclick="window.quizApp.loadExaminationContent(document.getElementById('examination-panel')); event.stopPropagation();">← Back to Examinations</button>
            <div class="examination-detail">
                <h3>🩺 ${system.title}</h3>
                <p class="exam-category">📋 ${system.category}</p>
                <div class="approach-banner">
                    <h4>🔄 Systematic Approach</h4>
                    <p>${system.approach}</p>
                </div>
                <h4>📋 Examination Sections:</h4>
                <div class="lab-grid">
                    ${sectionsHtml}
                </div>
            </div>
        `;
        
        // Scroll to top
        const examPanel = document.getElementById('examination-panel');
        if (examPanel) examPanel.scrollTop = 0;
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    /**
     * Show examination section detail (V1 compatibility)
     */
    showSectionDetail(systemKey, sectionKey) {
        if (!this.examinationDatabase) {
            console.log('⚠️ Examination database not loaded, reloading...');
            return;
        }
        
        const system = this.examinationDatabase[systemKey];
        if (!system) return;
        
        const section = system.sections[sectionKey];
        if (!section) {
            this.showExaminationDetail(systemKey);
            return;
        }
        
        const container = document.getElementById('examination-container');
        if (!container) return;
        
        const abnormalHtml = Object.entries(section.abnormal).map(([finding, description]) => `
            <div class="finding-item abnormal">
                <div class="finding-name">⚠️ ${finding}</div>
                <div class="finding-description">${description}</div>
            </div>
        `).join('');
        
        container.innerHTML = `
            <button class="back-btn" onclick="window.quizApp.showExaminationDetail('${systemKey}'); event.stopPropagation();">← Back to ${system.title}</button>
            <div class="section-detail">
                <h3>🔍 ${section.name}</h3>
                <div class="technique-banner">
                    <h4>🛠️ Technique</h4>
                    <p>${section.technique}</p>
                </div>
                <div class="findings-section">
                    <div class="normal-findings">
                        <h4>✅ Normal Findings</h4>
                        <div class="normal-box">
                            ${section.normal}
                        </div>
                    </div>
                    <div class="abnormal-findings">
                        <h4>⚠️ Abnormal Findings</h4>
                        <div class="abnormal-list">
                            ${abnormalHtml}
                        </div>
                    </div>
                </div>
                ${section.clinicalPearls ? `
                <div class="clinical-pearls">
                    <h4>💎 Clinical Pearls</h4>
                    <p>${section.clinicalPearls}</p>
                </div>` : ''}
            </div>
        `;
        
        // Scroll to top
        const examPanel = document.getElementById('examination-panel');
        if (examPanel) examPanel.scrollTop = 0;
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    /**
     * Load emergency protocols content (V1 compatibility with full features)
     */
    loadEmergencyProtocolsContent(panel) {
        const container = panel.querySelector('#emergency-protocols-container');
        if (!container) return;
        
        // Store protocols reference from manager
        const emergencyProtocolsData = this.emergencyProtocolsManager.emergencyProtocols || {};
        
        if (Object.keys(emergencyProtocolsData).length === 0) {
            container.innerHTML = '<div class="no-content">Emergency protocols database not loaded</div>';
            return;
        }
        
        // Store reference for later use
        this.emergencyProtocolsData = emergencyProtocolsData;
        
        // Setup category filtering
        this.setupEmergencyProtocolsSearch();
        
        // Display all protocols initially
        this.displayEmergencyProtocols(Object.keys(emergencyProtocolsData));
        
        console.log('🚨 Emergency protocols content loaded');
    }

    /**
     * Setup emergency protocols search (V1 compatibility)
     */
    setupEmergencyProtocolsSearch() {
        const categoryBtns = document.querySelectorAll('.emergency-categories .category-btn');
        
        const filterProtocols = () => {
            const activeCategory = document.querySelector('.emergency-categories .category-btn.active')?.dataset.category || 'all';
            
            let filteredProtocols = Object.keys(this.emergencyProtocolsData);
            
            if (activeCategory !== 'all') {
                filteredProtocols = filteredProtocols.filter(protocolId => 
                    this.emergencyProtocolsData[protocolId].category === activeCategory
                );
            }
            
            this.displayEmergencyProtocols(filteredProtocols);
        };
        
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                categoryBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                filterProtocols();
            });
        });
    }

    /**
     * Display emergency protocols list (V1 compatibility)
     */
    displayEmergencyProtocols(protocolIds) {
        const container = document.getElementById('emergency-protocols-container');
        if (!container) return;
        
        if (protocolIds.length === 0) {
            container.innerHTML = `
                <div class="no-results">
                    <h3>🚨 No protocols found</h3>
                    <p>Try adjusting your category filter.</p>
                </div>
            `;
            return;
        }
        
        // Sort by urgency (emergency first) then alphabetically
        const urgencyOrder = { 'emergency': 0, 'high': 1, 'moderate': 2, 'low': 3 };
        const sortedProtocolIds = protocolIds.sort((a, b) => {
            const protocolA = this.emergencyProtocolsData[a];
            const protocolB = this.emergencyProtocolsData[b];
            
            const urgencyDiff = urgencyOrder[protocolA.urgency] - urgencyOrder[protocolB.urgency];
            if (urgencyDiff !== 0) return urgencyDiff;
            
            return protocolA.name.localeCompare(protocolB.name);
        });
        
        const protocolsHtml = sortedProtocolIds.map(protocolId => {
            const protocol = this.emergencyProtocolsData[protocolId];
            const urgencyClass = protocol.urgency === 'emergency' ? 'emergency' : 'standard';
            
            return `
                <div class="protocol-item ${urgencyClass}" onclick="window.quizApp.showProtocolDetail('${protocolId}'); event.stopPropagation();">
                    <div class="protocol-header">
                        <h4>${protocol.name}</h4>
                        <span class="protocol-urgency ${protocol.urgency}">${protocol.urgency.toUpperCase()}</span>
                    </div>
                    <div class="protocol-meta">
                        <span class="protocol-category">${protocol.category}</span>
                        <span class="protocol-guideline">${protocol.ukGuideline}</span>
                    </div>
                    <div class="protocol-actions">
                        ${protocol.criticalActions.slice(0, 2).map(action => 
                            `<span class="action-tag">${action}</span>`
                        ).join('')}
                    </div>
                </div>
            `;
        }).join('');
        
        container.innerHTML = protocolsHtml;
    }

    /**
     * Show protocol detail view (V1 compatibility)
     */
    showProtocolDetail(protocolId) {
        const protocol = this.emergencyProtocolsData[protocolId];
        if (!protocol) return;
        
        const container = document.getElementById('emergency-protocols-container');
        if (!container) return;
        
        const detailHtml = `
            <div class="protocol-detail" onclick="event.stopPropagation();">
                <div class="protocol-detail-header">
                    <button class="back-btn" onclick="window.quizApp.loadEmergencyProtocolsContent(document.getElementById('emergency-protocols-panel')); event.stopPropagation();">← Back to Protocols</button>
                    <h3>${protocol.name}</h3>
                    <span class="protocol-urgency ${protocol.urgency}">${protocol.urgency.toUpperCase()}</span>
                </div>
                
                <div class="protocol-steps">
                    <h4>📋 Protocol Steps</h4>
                    <ol class="step-list">
                        ${protocol.steps.map(step => `<li>${step}</li>`).join('')}
                    </ol>
                </div>
                
                <div class="protocol-drugs">
                    <h4>💊 Key Medications</h4>
                    <ul class="drug-list">
                        ${protocol.drugs.map(drug => `<li>${drug}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="protocol-actions">
                    <h4>⚠️ Critical Actions</h4>
                    <ul class="action-list">
                        ${protocol.criticalActions.map(action => `<li>${action}</li>`).join('')}
                    </ul>
                </div>
                
                <div class="protocol-guideline">
                    <h4>📚 UK Guideline</h4>
                    <p>${protocol.ukGuideline}</p>
                </div>
            </div>
        `;
        
        container.innerHTML = detailHtml;
        
        // Scroll to top
        const protocolPanel = document.getElementById('emergency-protocols-panel');
        if (protocolPanel) protocolPanel.scrollTop = 0;
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    /**
     * Load interpretation tools content
     */
    loadInterpretationToolsContent(panel) {
        if (!panel) {
            console.error('loadInterpretationToolsContent: panel is null');
            return;
        }
        const container = panel.querySelector('#interpretation-container') || panel;
        if (!container) return;
        
        // Access interpretation tools directly from the manager's data
        const toolsData = this.interpretationToolsManager.interpretationTools || {};
        const toolKeys = Object.keys(toolsData);
        
        if (toolKeys.length === 0) {
            container.innerHTML = '<div class="no-content">Interpretation tools database not loaded</div>';
            return;
        }
        
        // Create modern interpretation tools interface
        let html = `
            <div class="search-container">
                <input type="text" id="interp-search" placeholder="Search interpretation tools..." class="tool-search">
                <button id="interp-search-btn">🔍</button>
            </div>
            <div id="interp-grid" class="lab-grid">
        `;
        
        toolKeys.forEach(toolKey => {
            const tool = toolsData[toolKey];
            const criteria = tool.criteria || tool.components || tool.steps || [];
            html += `
                <button class="lab-value-btn" onclick="window.quizApp.showInterpretationDetail('${toolKey}'); event.stopPropagation();" style="cursor: pointer; text-align: left; transition: all 0.2s;">
                    <div class="lab-name">${tool.name || tool.title || toolKey}</div>
                    <div class="lab-count">${tool.category || tool.type || 'Interpretation'}</div>
                    ${tool.description ? `<p style="font-size: 11px; margin-top: 8px; opacity: 0.9;">${tool.description.substring(0, 100)}${tool.description.length > 100 ? '...' : ''}</p>` : ''}
                </button>
            `;
        });
        
        html += '</div>';
        container.innerHTML = html;
        
        // Add search functionality
        const searchInput = document.getElementById('interp-search');
        const searchBtn = document.getElementById('interp-search-btn');
        if (searchInput && searchBtn) {
            const performSearch = () => {
                const query = searchInput.value.toLowerCase();
                const filtered = query ? toolKeys.filter(toolKey => {
                    const t = toolsData[toolKey];
                    return (t.name || '').toLowerCase().includes(query) ||
                           (t.title || '').toLowerCase().includes(query) ||
                           (t.category || '').toLowerCase().includes(query) ||
                           (t.type || '').toLowerCase().includes(query) ||
                           (t.description || '').toLowerCase().includes(query);
                }) : toolKeys;
                
                const gridContainer = document.getElementById('interp-grid');
                if (gridContainer) {
                    if (filtered.length === 0) {
                        gridContainer.innerHTML = '<div class="no-results"><h3>No tools found</h3><p>Try a different search term.</p></div>';
                    } else {
                        gridContainer.innerHTML = filtered.map(toolKey => {
                            const tool = toolsData[toolKey];
                            return `
                                <button class="lab-value-btn" onclick="window.quizApp.showInterpretationDetail('${toolKey}'); event.stopPropagation();" style="cursor: pointer; text-align: left; transition: all 0.2s;">
                                    <div class="lab-name">${tool.name || tool.title || toolKey}</div>
                                    <div class="lab-count">${tool.category || tool.type || 'Interpretation'}</div>
                                    ${tool.description ? `<p style="font-size: 11px; margin-top: 8px; opacity: 0.9;">${tool.description.substring(0, 100)}${tool.description.length > 100 ? '...' : ''}</p>` : ''}
                                </button>
                            `;
                        }).join('');
                    }
                }
            };
            
            searchInput.addEventListener('input', performSearch);
            searchBtn.addEventListener('click', performSearch);
        }
        
        console.log('📊 Interpretation tools content loaded');
    }
    
    /**
     * Show interpretation tool detail with full criteria and scoring
     */
    showInterpretationDetail(toolKey) {
        const container = document.getElementById('interpretation-container') || 
                         document.getElementById('interpretation-panel');
        if (!container) return;
        
        const toolsData = this.interpretationToolsManager.interpretationTools || {};
        const tool = toolsData[toolKey];
        if (!tool) return;
        
        let html = `
            <button class="back-btn" onclick="window.quizApp.loadInterpretationToolsContent(document.getElementById('interpretation-panel')); event.stopPropagation();" style="margin-bottom: 20px; padding: 10px 20px; background: var(--card-bg); border: 1px solid var(--border); border-radius: 8px; cursor: pointer;">
                ← Back to Interpretation Tools
            </button>
            <div class="guideline-detail" style="background: var(--card-bg); border-radius: 12px; padding: 25px; box-shadow: 0 4px 6px rgba(0,0,0,0.1);">
                <h3 style="margin: 0 0 15px 0; font-size: 1.8em; color: var(--text-primary);">📊 ${tool.name || tool.title || toolKey}</h3>
                <div class="guideline-meta" style="display: flex; gap: 15px; margin-bottom: 25px; padding-bottom: 20px; border-bottom: 2px solid var(--border); flex-wrap: wrap;">
                    ${tool.category ? `<span style="padding: 6px 12px; background: linear-gradient(135deg, var(--accent) 0%, var(--accent-dark) 100%); color: white; border-radius: 20px; font-size: 0.85em;">${tool.category}</span>` : ''}
                    ${tool.type ? `<span style="padding: 6px 12px; background: var(--bg); border: 1px solid var(--border); border-radius: 20px; font-size: 0.85em; color: var(--text-secondary);">${tool.type}</span>` : ''}
                </div>
                
                ${tool.description ? `
                <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                    <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">📋 Description</h4>
                    <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${tool.description}</p>
                </div>` : ''}
                
                ${tool.steps && tool.steps.length > 0 ? `
                <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid #10b981;">
                    <h4 style="margin: 0 0 15px 0; color: #10b981; font-size: 1.1em;">📋 Steps</h4>
                    <div style="line-height: 1.8;">
                        ${tool.steps.map((step, idx) => `
                            <div style="padding: 12px; margin-bottom: 8px; background: var(--card-bg); border-left: 3px solid #10b981; border-radius: 4px;">
                                <strong style="color: var(--text-primary);">Step ${idx + 1}:</strong>
                                <span style="color: var(--text-primary); margin-left: 8px;">${step}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
                
                ${tool.criteria && tool.criteria.length > 0 ? `
                <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid #8b5cf6;">
                    <h4 style="margin: 0 0 15px 0; color: #8b5cf6; font-size: 1.1em;">✓ Criteria</h4>
                    <div style="line-height: 1.8;">
                        ${tool.criteria.map((criterion, idx) => {
                            const text = typeof criterion === 'string' ? criterion : 
                                       (criterion.description || criterion.name || criterion.criteria || '');
                            const points = criterion.points || criterion.score;
                            return `
                                <div style="padding: 12px; margin-bottom: 8px; background: var(--card-bg); border-left: 3px solid #8b5cf6; border-radius: 4px; display: flex; justify-content: space-between; align-items: center;">
                                    <span style="color: var(--text-primary);">${text}</span>
                                    ${points ? `<span style="padding: 4px 10px; background: linear-gradient(135deg, #8b5cf6 0%, #7c3aed 100%); color: white; border-radius: 12px; font-size: 0.85em; font-weight: 600;">${points} pt${points !== 1 ? 's' : ''}</span>` : ''}
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>` : ''}
                
                ${tool.components && tool.components.length > 0 ? `
                <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                    <h4 style="margin: 0 0 15px 0; color: var(--accent); font-size: 1.1em;">🧩 Components</h4>
                    <div style="line-height: 1.8;">
                        ${tool.components.map(component => {
                            const text = typeof component === 'string' ? component : 
                                       (component.description || component.name || '');
                            return `
                                <div style="padding: 12px; margin-bottom: 8px; background: var(--card-bg); border-left: 3px solid var(--accent); border-radius: 4px;">
                                    <span style="color: var(--text-primary);">${text}</span>
                                </div>
                            `;
                        }).join('')}
                    </div>
                </div>` : ''}
                
                ${tool.interpretation && typeof tool.interpretation === 'object' ? `
                <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid #f59e0b;">
                    <h4 style="margin: 0 0 15px 0; color: #f59e0b; font-size: 1.1em;">💡 Interpretation</h4>
                    <div style="line-height: 1.8;">
                        ${Object.entries(tool.interpretation).map(([score, meaning]) => `
                            <div style="padding: 12px; margin-bottom: 8px; background: var(--card-bg); border-left: 3px solid #f59e0b; border-radius: 4px;">
                                <strong style="color: var(--text-primary);">${score}:</strong>
                                <span style="color: var(--text-primary); margin-left: 8px;">${meaning}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
                
                ${tool.normalValues && typeof tool.normalValues === 'object' ? `
                <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid #10b981;">
                    <h4 style="margin: 0 0 15px 0; color: #10b981; font-size: 1.1em;">📊 Normal Values</h4>
                    <div style="line-height: 1.8;">
                        ${Object.entries(tool.normalValues).map(([key, value]) => `
                            <div style="padding: 8px 0; border-bottom: 1px solid var(--border);">
                                <strong style="color: var(--text-primary);">${key}:</strong>
                                <span style="color: var(--text-primary); margin-left: 8px;">${value}</span>
                            </div>
                        `).join('')}
                    </div>
                </div>` : ''}
                
                ${tool.notes ? `
                <div class="info-section" style="margin-bottom: 20px; padding: 15px; background: var(--bg); border-radius: 8px; border-left: 3px solid var(--accent);">
                    <h4 style="margin: 0 0 10px 0; color: var(--accent); font-size: 1.1em;">📝 Notes</h4>
                    <p style="margin: 0; color: var(--text-primary); line-height: 1.6;">${tool.notes}</p>
                </div>` : ''}
            </div>
        `;
        
        container.innerHTML = html;
        container.scrollTop = 0;
        window.scrollTo(0, 0);
    }

    /**
     * Load ladders content
     */
    loadLaddersContent(panel) {
        // Load dynamic ladders content from LaddersManager
        console.log('🪜 Loading treatment ladders content...');
        
        // Make sure laddersManager is available
        if (this.laddersManager && typeof this.laddersManager.loadLadders === 'function') {
            this.laddersManager.loadLadders();
        } else if (window.laddersManager && typeof window.laddersManager.loadLadders === 'function') {
            window.laddersManager.loadLadders();
        } else {
            console.error('❌ LaddersManager not available');
        }
    }

    /**
     * Show screen (main navigation between quiz, results, etc.)
     */
    showScreen(screenId) {
        const screens = document.querySelectorAll('.screen');
        screens.forEach(screen => {
            if (screen.id === screenId) {
                screen.classList.add('active');
                screen.style.display = 'block';
            } else {
                screen.classList.remove('active');
                screen.style.display = 'none';
            }
        });
        console.log(`📄 Showing screen: ${screenId}`);
    }

    /**
     * Load and render quiz list
     */
    async loadQuizList() {
        console.log('📋 Loading quiz list...');
        const quizList = document.getElementById('quiz-list');
        if (!quizList) {
            console.error('❌ Quiz list container not found');
            return;
        }

        // Get uploaded quizzes with V1-compatible reconstruction
        const uploadedQuizzes = await quizManager.getUploadedQuizzes();
        console.log(`📂 Found ${uploadedQuizzes.length} uploaded quizzes:`, uploadedQuizzes);
        
        // Get server quizzes (if available)
        let serverQuizzes = [];
        try {
            const response = await fetch('/api/quizzes');
            if (response.ok) {
                const data = await response.json();
                if (data.success) {
                    serverQuizzes = data.quizzes || [];
                    console.log(`📡 Fetched ${serverQuizzes.length} server quizzes`);
                } else {
                    console.log('📝 No server quizzes available:', data.error);
                }
            }
        } catch (error) {
            console.log('📝 Server quizzes not available (offline or local mode)');
            serverQuizzes = [];
        }

        // Check if no quizzes found
        if (uploadedQuizzes.length === 0 && serverQuizzes.length === 0) {
            quizList.innerHTML = `
                <div style="padding: 20px; text-align: center; color: #8e8e93;">
                    <p>No quizzes found. Upload quiz files using the button above.</p>
                </div>
            `;
            return;
        }

        // Render list
        let html = '';

        // Add uploaded quizzes first (with special styling)
        uploadedQuizzes.forEach(quiz => {
            const questionCount = quiz.questions?.length || quiz.questionCount || quiz.total_questions || 0;
            html += `
                <div class="quiz-item uploaded-quiz" data-quiz-name="${quiz.name}" data-is-uploaded="true">
                    <div class="quiz-info">
                        <h3 class="quiz-name">📁 ${quiz.name}</h3>
                        <p class="quiz-details">Uploaded • ${questionCount} questions</p>
                    </div>
                    <span class="chevron">›</span>
                </div>
            `;
        });

        // Add server quizzes
        serverQuizzes.forEach(quiz => {
            const sizeKB = Math.round((quiz.size || 0) / 1024);
            html += `
                <div class="quiz-item" data-quiz-name="${quiz.name}" data-is-uploaded="false">
                    <div class="quiz-info">
                        <h3 class="quiz-name">${quiz.name}</h3>
                        <p class="quiz-details">${sizeKB}KB • ${quiz.filename || ''}</p>
                    </div>
                    <span class="chevron">›</span>
                </div>
            `;
        });

        console.log(`✅ Rendering ${uploadedQuizzes.length + serverQuizzes.length} quizzes to list`);
        quizList.innerHTML = html;
    }

    /**
     * Render current question
     */
    renderQuestion(data) {
        const { question, index, total, answer, submitted, ruledOut, flagged } = data;
        
        // Update existing header elements
        const questionTitle = document.getElementById('questionTitle');
        const questionProgress = document.getElementById('questionProgress');
        
        if (questionTitle) {
            questionTitle.textContent = `Question ${index + 1}`;
        }
        
        if (questionProgress) {
            questionProgress.textContent = `${index + 1} of ${total}`;
        }
        
        const questionContainer = document.getElementById('questionContainer');
        if (!questionContainer) {
            console.error('❌ Question container not found in DOM');
            return;
        }

        // Build question content (no header since we update the existing one)
        let html = '';

        // Add scenario if present and different from prompt (V1-style blue background)
        if (question.scenario && question.scenario !== question.prompt && question.scenario !== question.text) {
            html += `<div class="q-text" style="background: #f0f9ff; border-left: 4px solid #0ea5e9; padding: 12px; border-radius: 6px; margin-bottom: 8px;"><h4 style="margin: 0 0 8px 0; color: #0369a1;">Scenario:</h4><div>${this.formatText(question.scenario)}</div></div>`;
        }

        // Add image if present (after scenario/stem, matching V1 order)
        if (question.image) {
            html += this.formatText(question.image);
        }

        // Add investigations if present (V1-style green background)
        if (question.investigations) {
            const formattedInvestigations = this.formatInvestigations(question.investigations);
            html += `<div class="investigations" style="background: #f0fdf4; border-left: 4px solid #22c55e; padding: 12px; border-radius: 6px; margin-bottom: 8px;"><h4 style="margin: 0 0 8px 0; color: #15803d;">Investigations:</h4><div>${formattedInvestigations}</div></div>`;
        }

        // Add question prompt (V1-style yellow background)
        const questionText = question.prompt || (question.scenario ? '' : question.text) || '';
        if (questionText) {
            html += `<div class="prompt" style="background: #fefce8; border-left: 4px solid #eab308; padding: 12px; border-radius: 6px; margin-bottom: 8px; font-weight: 500;"><h4 style="margin: 0 0 8px 0; color: #a16207;">Question:</h4><div>${this.formatText(questionText)}</div></div>`;
        }

        // Add options
        if (question.options && question.options.length > 0) {
            html += '<div class="new-options">';
            question.options.forEach((option, idx) => {
                const isSelected = answer === idx;
                const isCorrect = (question.correct_answer || question.correctAnswer) === idx;
                const isRuledOut = ruledOut && ruledOut.includes(idx);
                
                let optionClass = 'new-option option';
                if (isSelected) optionClass += ' selected';
                if (submitted && isCorrect) optionClass += ' correct';
                if (submitted && isSelected && !isCorrect) optionClass += ' incorrect';
                if (isRuledOut) optionClass += ' ruled-out';

                // Remove leading option letters (A., B., etc.) if present
                let cleanOption = option.replace(/^[\(\[]?[A-Z][\)\.]\s*/i, '').trim();

                html += `
                    <div class="${optionClass}" data-option="${idx}">
                        <span class="option-letter badge">${String.fromCharCode(65 + idx)}</span>
                        <span class="option-text label">${cleanOption}</span>
                    </div>
                `;
            });
            html += '</div>';
        }

        // Add feedback if submitted
        if (submitted) {
            const correctAnswerIdx = question.correct_answer || question.correctAnswer;
            const isCorrect = answer === correctAnswerIdx;
            const correctLetter = String.fromCharCode(65 + correctAnswerIdx);
            
            html += `
                <div class="feedback-container ${isCorrect ? 'correct' : 'incorrect'}">
                    ${isCorrect ? '✅ Correct!' : `❌ Incorrect. The correct answer is ${correctLetter}.`}
                </div>
            `;

            // Add explanation if available (handle both array and string)
            let explanationText = '';
            if (question.explanations && Array.isArray(question.explanations)) {
                explanationText = question.explanations
                    .map(exp => this.formatText(exp))
                    .join('<br><br>');
            } else if (question.explanation) {
                explanationText = this.formatText(question.explanation);
            }
            
            if (explanationText) {
                // Strip <strong> and <b> tags from explanations so they render with normal weight
                // Keep other HTML (links, <em>, <p>, <br>) intact.
                try {
                    explanationText = explanationText.replace(/<\/?(strong|b)(\s[^>]*)?>/gi, '');
                } catch (err) {
                    console.warn('Could not sanitize explanationText', err);
                }

                html += `
                    <div class="explanation-container">
                        <div class="explanation-title">📚 Explanation</div>
                        <div class="explanation-content">${explanationText}</div>
                    </div>
                `;
            }
        }

        // Ensure explanation text is rendered with normal font weight (not bold)
        try {
            if (!document.getElementById('explanation-styles')) {
                const style = document.createElement('style');
                style.id = 'explanation-styles';
                style.textContent = `
                    /* Force normal weight for explanation blocks to avoid bolding from rich text */
                    .explanation-container .explanation-title,
                    .explanation-container .explanation-content,
                    .explanation-container strong,
                    .explanation-container b {
                        font-weight: normal !important;
                    }
                `;
                document.head.appendChild(style);
            }
        } catch (e) {
            console.warn('Could not inject explanation styles', e);
        }

        questionContainer.innerHTML = html;

        // Bind option click events
        const options = questionContainer.querySelectorAll('.option, .new-option');
        console.log(`🔗 Found ${options.length} options to bind for question ${data.index + 1}`);
        
        options.forEach((option, optionIndex) => {
            const optionIdx = parseInt(option.dataset.option);
            console.log(`📌 Binding option ${optionIdx}, element index ${optionIndex}, dataset:`, option.dataset);
            
            // Left click - select option
            option.addEventListener('click', () => {
                console.log(`👆 Option ${optionIdx} clicked (question ${data.index + 1})`);
                // Check if answer is already submitted
                const isSubmitted = quizManager.isAnswerSubmitted();
                console.log(`   Submitted: ${isSubmitted}`);
                if (!isSubmitted) {
                    console.log(`   ✅ Calling selectAnswer(${optionIdx})`);
                    quizManager.selectAnswer(optionIdx);
                } else {
                    console.log(`   ❌ Already submitted, ignoring`);
                }
            });

            // Right click - rule out option
            option.addEventListener('contextmenu', (e) => {
                e.preventDefault();
                if (!quizManager.isAnswerSubmitted()) {
                    quizManager.toggleRuleOut(optionIdx);
                    analytics.vibrateClick();
                }
            });

            // Touch events for long-press (mobile) - always bind, check state on execution
            let pressTimer = null;
            let startPos = null;
            
            option.addEventListener('touchstart', (e) => {
                if (quizManager.isAnswerSubmitted()) return;
                
                const touch = e.touches[0];
                startPos = { x: touch.clientX, y: touch.clientY };
                
                pressTimer = setTimeout(() => {
                    quizManager.toggleRuleOut(optionIdx);
                    analytics.vibrateClick();
                    pressTimer = null;
                }, 800);
            }, { passive: true });
            
            option.addEventListener('touchmove', (e) => {
                if (startPos && pressTimer) {
                    const touch = e.touches[0];
                    const deltaX = Math.abs(touch.clientX - startPos.x);
                    const deltaY = Math.abs(touch.clientY - startPos.y);
                    
                    if (deltaX > 15 || deltaY > 15) {
                        clearTimeout(pressTimer);
                        pressTimer = null;
                    }
                }
            }, { passive: true });
            
            option.addEventListener('touchend', () => {
                if (pressTimer) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
                startPos = null;
            }, { passive: true });
            
            option.addEventListener('touchcancel', () => {
                if (pressTimer) {
                    clearTimeout(pressTimer);
                    pressTimer = null;
                }
                startPos = null;
            }, { passive: true });
        });

        this.updateQuizButtons(data);
        // Update button states
        this.updateQuizButtons(data);
        // Render the V1-style question progress grid in the sidebar
        try {
            this.renderQuestionProgressGrid?.(data);
        } catch (err) {
            console.warn('Could not render question progress grid:', err);
        }
    }

    /**
     * Update quiz navigation button states
     */
    updateQuizButtons(data) {
        const submitBtn = document.getElementById('submitBtn');
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        const prevBtnTop = document.getElementById('prevBtnTop');
        const nextBtnTop = document.getElementById('nextBtnTop');
        const flagBtn = document.getElementById('flagBtn');

        if (submitBtn && nextBtn) {
            if (data.submitted) {
                submitBtn.style.display = 'none';
                nextBtn.style.display = 'inline-block';
            } else if (data.answer !== undefined) {
                submitBtn.style.display = 'inline-block';
                nextBtn.style.display = 'none';
            } else {
                submitBtn.style.display = 'none';
                nextBtn.style.display = 'inline-block';
            }
        }

        // Show/hide prev button
        if (prevBtn) {
            if (data.index === 0) {
                prevBtn.style.display = 'none';
                prevBtn.disabled = true;
            } else {
                prevBtn.style.display = 'inline-block';
                prevBtn.disabled = false;
            }
        }

        // Update top navigation buttons
        if (prevBtnTop) {
            if (data.index === 0) {
                prevBtnTop.style.display = 'none';
            } else {
                prevBtnTop.style.display = 'inline-block';
            }
        }

        if (nextBtnTop) {
            nextBtnTop.style.display = 'inline-block';
        }

        if (flagBtn) {
            if (data.flagged) {
                flagBtn.classList.add('flagged');
                flagBtn.title = 'Remove flag';
            } else {
                flagBtn.classList.remove('flagged');
                flagBtn.title = 'Flag question';
            }
        }

        // Update next button text
        if (nextBtn) {
            nextBtn.textContent = (data.index === data.total - 1) ? 'Finish Quiz' : 'Next →';
        }
        
        if (nextBtnTop) {
            nextBtnTop.textContent = (data.index === data.total - 1) ? 'Finish →' : 'Next →';
        }
    }

    /**
     * Update progress bar
     */
    updateProgressBar(data) {
        // Update progress bar fill
        const progressFill = document.getElementById('progressFill');
        if (progressFill) {
            const percentage = (data.answered / data.total) * 100;
            progressFill.style.setProperty('--w', `${percentage}%`);
        }

        // Update completed count
        const completedCount = document.getElementById('completedCount');
        if (completedCount) {
            completedCount.textContent = `${data.answered}/${data.total}`;
        }

        // Update correct count
        const correctCount = document.getElementById('correctCount');
        if (correctCount) {
            const correctPercentage = data.answered > 0 ? Math.round((data.correct / data.answered) * 100) : 0;
            correctCount.textContent = `${data.correct} (${correctPercentage}%)`;
        }

        // Update time display
        const timeDisplay = document.getElementById('time-display');
        if (timeDisplay && data.totalTime > 0) {
            const minutes = Math.floor(data.totalTime / 60);
            const seconds = data.totalTime % 60;
            const avgTime = data.answered > 0 ? Math.round(data.totalTime / data.answered) : 0;
            
            timeDisplay.innerHTML = `
                <div class="time-stats" style="font-size: 0.9rem;">
                    <div style="margin-bottom: 4px;">
                        <strong>Total Time:</strong> ${minutes}m ${seconds}s
                    </div>
                    <div>
                        <strong>Avg/Question:</strong> ${avgTime}s
                    </div>
                </div>
            `;
        }
    }

    /**
     * Render a V1-style clickable question-number grid in the sidebar
     * Shows per-question state: unanswered / correct / incorrect / flagged
     */
    renderQuestionProgressGrid(data) {
        try {
            const container = document.getElementById('sidebarContent');
            if (!container) return;

            const total = data.total || quizManager.questions.length || 0;
            if (total === 0) {
                container.innerHTML = '';
                return;
            }

            // Build grid
            let html = '<div id="questionProgressGrid" class="question-progress-grid" style="display:grid; grid-template-columns: repeat(5, 1fr); gap:6px;">';

            for (let i = 0; i < total; i++) {
                const isSubmitted = !!quizManager.submittedAnswers[i];
                const yourAnswer = quizManager.answers[i];
                const q = quizManager.questions[i];
                const correctIdx = q ? (q.correct_answer !== undefined ? q.correct_answer : q.correctAnswer) : undefined;
                const isFlagged = quizManager.isFlagged?.(i) || false;

                let classes = 'pq-cell';
                let title = `Question ${i + 1}`;
                if (isFlagged) {
                    classes += ' pq-flagged';
                    title += ' • Flagged';
                }
                if (isSubmitted) {
                    if (yourAnswer !== undefined && correctIdx !== undefined) {
                        if (yourAnswer === correctIdx) {
                            classes += ' pq-correct';
                            title += ' • Correct';
                        } else {
                            classes += ' pq-incorrect';
                            title += ' • Incorrect';
                        }
                    } else {
                        classes += ' pq-answered';
                        title += ' • Answered';
                    }
                } else {
                    classes += ' pq-unanswered';
                    title += ' • Unanswered';
                }

                html += `
                    <button class="${classes}" data-qindex="${i}" title="${title}" style="padding:8px; border-radius:6px; border:1px solid var(--border); cursor:pointer;">${i + 1}</button>
                `;
            }

            html += '</div>';
            container.innerHTML = html;

            // Bind clicks
            const cells = container.querySelectorAll('#questionProgressGrid .pq-cell');
            cells.forEach(cell => {
                const idx = parseInt(cell.getAttribute('data-qindex'));
                cell.addEventListener('click', (e) => {
                    e.preventDefault();
                    if (typeof quizManager.goToQuestion === 'function') {
                        quizManager.goToQuestion(idx);
                    }
                });
            });

            // Small inline styles for state classes (only added once)
            if (!document.getElementById('pq-grid-styles')) {
                const style = document.createElement('style');
                style.id = 'pq-grid-styles';
                style.textContent = `
                    /* Progress grid cells */
                    #questionProgressGrid { margin-top: 8px; }
                    .pq-cell { font-weight: 700; position: relative; height: 40px; display: inline-flex; align-items: center; justify-content: center; }

                    /* Correct = green */
                    .pq-correct { background: #16a34a !important; border-color: #15803d !important; color: #ffffff !important; }

                    /* Incorrect = red */
                    .pq-incorrect { background: #ef4444 !important; border-color: #dc2626 !important; color: #ffffff !important; }

                    /* Answered but unknown (fallback) - darker blue */
                    .pq-answered { background: #1D4ED8 !important; border-color: #1e40af !important; color: #ffffff !important; }

                    /* Unanswered neutral (even darker blue) */
                    .pq-unanswered { background: #0b3d91 !important; border-color: #06224a !important; color: #ffffff !important; }

                    /* Flagged: pronounced red border + subtle glow + flag icon */
                    .pq-flagged { border-width: 2px !important; border-style: solid !important; border-color: #ef4444 !important; box-shadow: 0 0 0 4px rgba(239,68,68,0.06); }
                    .pq-flagged::after { content: "🚩"; position: absolute; top: -8px; right: -8px; font-size: 12px; }

                    /* Ensure flagged+state combinations still show the correct fill color */
                    .pq-flagged.pq-correct, .pq-correct.pq-flagged { background: #16a34a !important; color: #ffffff !important; }
                    .pq-flagged.pq-incorrect, .pq-incorrect.pq-flagged { background: #ef4444 !important; color: #ffffff !important; }

                    /* Make buttons visually consistent */
                    #questionProgressGrid .pq-cell { padding: 6px 8px; border-radius: 8px; border: 1px solid var(--border); cursor: pointer; transition: transform 120ms ease, box-shadow 120ms ease; }
                    #questionProgressGrid .pq-cell:hover { transform: translateY(-2px); box-shadow: 0 6px 18px rgba(0,0,0,0.08); }
                `;
                document.head.appendChild(style);
            }
        } catch (error) {
            console.warn('renderQuestionProgressGrid error:', error);
        }
    }

    /**
     * Handle submit answer
     */
    handleSubmitAnswer() {
        const currentAnswer = quizManager.getCurrentAnswer();
        if (currentAnswer === undefined) {
            uiManager.showToast('Please select an answer', 'warning');
            return;
        }

        quizManager.submitAnswer(currentAnswer);
    }

    /**
     * Render quiz results
     */
    renderResults(data) {
        const resultsContainer = document.getElementById('results-summary');
        if (!resultsContainer) return;

        const percentage = Math.round((data.score / data.totalQuestions) * 100);
        
        let html = `
            <div class="results-header">
                <h2>Quiz Complete!</h2>
                <div class="score-display">
                    <div class="score-big">${percentage}%</div>
                    <div class="score-detail">${data.score} / ${data.totalQuestions} correct</div>
                </div>
            </div>
        `;

        // Add time statistics if available
        if (data.totalTime) {
            const minutes = Math.floor(data.totalTime / 60);
            const seconds = data.totalTime % 60;
            html += `
                <div class="time-stats">
                    <strong>Total Time:</strong> ${minutes}m ${seconds}s<br>
                    <strong>Average per Question:</strong> ${data.averageTime}s
                </div>
            `;
        }

        resultsContainer.innerHTML = html;
    }

    /**
     * Show results screen (from V1)
     */
    showResults() {
        const score = quizManager.calculateScore();
        
        this.showScreen('resultsScreen');
        document.getElementById('navTitle').textContent = 'Results';
        
        const scorePercentage = document.getElementById('scorePercentage');
        const scoreDetails = document.getElementById('scoreDetails');
        
        if (scorePercentage) {
            scorePercentage.textContent = `${score.percentage}%`;
        }
        
        if (scoreDetails) {
            scoreDetails.textContent = `${score.correct} out of ${score.total} questions correct`;
        }
        
        // Update score card color based on performance
        const scoreCard = document.querySelector('.score-card');
        if (scoreCard) {
            if (score.percentage >= 80) {
                scoreCard.style.background = 'linear-gradient(135deg, #34C759 0%, #00C957 100%)';
            } else if (score.percentage >= 60) {
                scoreCard.style.background = 'linear-gradient(135deg, #FF9500 0%, #FF8C00 100%)';
            } else {
                scoreCard.style.background = 'linear-gradient(135deg, #FF3B30 0%, #FF2D1C 100%)';
            }
        }
    }

    /**
     * Review answers mode - go through all questions showing answers
     */
    reviewAnswers() {
        // Switch to review mode
        quizManager.currentQuestionIndex = 0;
        quizManager.isReviewMode = true;
        
        // Show quiz screen
        this.showScreen('quizScreen');
        document.getElementById('navTitle').textContent = 'Review Answers';
        
        // Hide submit button, show answer immediately
        const submitBtn = document.getElementById('submitBtn');
        if (submitBtn) submitBtn.style.display = 'none';
        
        // Show next/prev buttons
        const nextBtn = document.getElementById('nextBtn');
        const prevBtn = document.getElementById('prevBtn');
        if (nextBtn) nextBtn.style.display = 'block';
        if (prevBtn) prevBtn.style.display = 'block';
        
        // Render first question in review mode
        this.renderQuestion();
        
        // Auto-show the answer
        setTimeout(() => {
            this.showAnswer(true);
        }, 100);
    }

    /**
     * Format investigations text with proper line breaks
     */
    formatInvestigations(investigationsText) {
        if (!investigationsText) return '';
        
        let formatted = investigationsText.trim();
        
        // First, handle lines that start with "- " to ensure they stay on separate lines
        // Replace newlines followed by "- " with a placeholder that won't be collapsed
        formatted = formatted.replace(/\n-\s+/g, '<br>- ');
        
        // Split investigations at natural break points:
        // 1. After reference ranges in parentheses followed by any letter (capital or lowercase)
        // 2. After test results with colons followed by a capital letter
        formatted = formatted
            // Pattern: "Value unit (range) nextTest" -> "Value unit (range)<br>nextTest"
            // Updated to handle both uppercase and lowercase letters after closing bracket
            .replace(/(\([^)]+\))\s+([A-Za-z])/g, '$1<br>$2')
            // Pattern: "Test: result NextTest" -> "Test: result<br>NextTest" 
            .replace(/(:\s*[a-z][^:]*?)\s+([A-Z][A-Za-z])/g, '$1<br>$2')
            // Collapse multiple spaces but preserve <br> tags
            .replace(/\s+/g, ' ')
            .trim();
            
        return this.formatText(formatted);
    }

    /**
     * Format text with markdown, images, and links
     */
    formatText(text) {
        if (!text) return '';
        
        // Convert markdown-style formatting to HTML
        let formattedText = text
            .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') // Bold
            .replace(/\*(.*?)\*/g, '<em>$1</em>') // Italic
            .replace(/- (.*?)(?=\n|$)/g, '• $1') // Bullet points
            .trim();
        
        // Handle [IMAGE: filename] format first - improved handling with better path resolution
        formattedText = formattedText.replace(/\[IMAGE:\s*([^\]]+)\]/gi, (match, filename) => {
            console.log('🖼️ IMAGE DEBUG - Processing image:', filename);
            
            // Check if we have a data URL already embedded in the text
            const dataUrlPattern = /data:[^;]+;base64,[A-Za-z0-9+/=]+/;
            if (dataUrlPattern.test(filename)) {
                console.log('🖼️ IMAGE DEBUG - Found data URL, displaying directly');
                // It's already a data URL, display it as an image
                return `<div class="image-container"><img src="${filename}" alt="Image" loading="lazy" onclick="window.openImageModal && openImageModal('${filename}', 'Image')"></div>`;
            } else {
                // It's a filename, try to find it in currentQuiz.images
                let imagePath = filename.trim();
                console.log('🖼️ IMAGE DEBUG - Looking for image file:', imagePath);
                
                // Use currentQuiz images if available (try both imported and window reference)
                const activeQuizManager = quizManager || window.quizManager;
                if (activeQuizManager && activeQuizManager.currentQuiz && activeQuizManager.currentQuiz.images) {
                    console.log('🖼️ IMAGE DEBUG - Searching in currentQuiz.images');
                    
                    // Try multiple possible keys for the image
                    const possibleKeys = [
                        imagePath, // Original filename
                        imagePath.toLowerCase(), // Lowercase
                        imagePath.replace(/\.[^.]+$/, ''), // Without extension
                        imagePath.replace(/\.[^.]+$/, '').toLowerCase(), // Without extension, lowercase
                        `MLA_images/${imagePath}`, // With folder prefix
                        `MLA_images/${imagePath.toLowerCase()}`, // With folder prefix, lowercase
                    ];
                    
                    let imageData = null;
                    let foundKey = null;
                    
                    for (const key of possibleKeys) {
                        if (activeQuizManager.currentQuiz.images[key]) {
                            imageData = activeQuizManager.currentQuiz.images[key];
                            foundKey = key;
                            console.log('🖼️ IMAGE DEBUG - Found image with key:', key);
                            break;
                        }
                    }
                    
                    if (imageData) {
                        console.log('🖼️ IMAGE DEBUG - Found embedded image data for:', foundKey);
                        
                        // Handle reference-based storage (resolve references)
                        if (typeof imageData === 'string' && imageData.startsWith('__REF__:')) {
                            const refKey = imageData.substring(8);
                            imageData = activeQuizManager.currentQuiz.images[refKey];
                            console.log('🖼️ IMAGE DEBUG - Resolved reference from', foundKey, 'to', refKey);
                        }
                        
                        if (imageData && imageData.startsWith('data:')) {
                            // Found actual image data
                            return `<div class="image-container"><img src="${imageData}" alt="Image" loading="lazy" onclick="window.openImageModal && openImageModal('${imageData}', 'Image')"></div>`;
                        } else {
                            console.log('🖼️ IMAGE DEBUG - Image data after resolution:', typeof imageData, imageData?.substring(0, 50) + '...');
                        }
                    } else {
                        console.log('⚠️ Image not found in currentQuiz.images. Available keys:', Object.keys(activeQuizManager.currentQuiz.images).slice(0, 10));
                    }
                } else {
                    console.log('⚠️ activeQuizManager.currentQuiz or currentQuiz.images not available');
                    console.log('⚠️ Debug - quizManager:', !!quizManager);
                    console.log('⚠️ Debug - window.quizManager:', !!window.quizManager);
                }
                
                console.log('🖼️ IMAGE DEBUG - No embedded image found, showing as link');
                // Default: show as a link
                return `<a href="#" class="image-link" onclick="alert('Image not available: ${imagePath}'); return false;">🖼️ View Image: ${imagePath}</a>`;
            }
        });
        
        // Handle markdown-style images: ![alt text](url) or ![alt text](url "caption")
        formattedText = formattedText.replace(/!\[([^\]]*)\]\(([^)]+?)(?:\s+"([^"]+)")?\)/g, (match, alt, url, caption) => {
            let actualUrl = url;
            
            // Handle reference-based storage (resolve references)
            if (typeof url === 'string' && url.startsWith('__REF__:')) {
                console.log('🖼️ IMAGE DEBUG - Found reference in markdown image:', url);
                const refKey = url.substring(8); // Remove '__REF__:' prefix (8 characters)
                console.log('�️ IMAGE DEBUG - Looking for refKey:', refKey);
                
                // Use currentQuiz images if available (try both imported and window reference)
                const activeQuizManager = quizManager || window.quizManager;
                if (activeQuizManager && activeQuizManager.currentQuiz && activeQuizManager.currentQuiz.images) {
                    console.log('🖼️ IMAGE DEBUG - Using currentQuiz.images for lookup');
                    
                    // Check if the reference key exists directly
                    if (activeQuizManager.currentQuiz.images[refKey]) {
                        let imageData = activeQuizManager.currentQuiz.images[refKey];
                        console.log('�️ IMAGE DEBUG - Found direct match for key:', refKey);
                        
                        // If it's another reference, resolve it
                        if (typeof imageData === 'string' && imageData.startsWith('__REF__:')) {
                            const secondRefKey = imageData.substring(8);
                            imageData = activeQuizManager.currentQuiz.images[secondRefKey];
                            console.log('🖼️ IMAGE DEBUG - Resolved nested reference from', refKey, 'to', secondRefKey);
                        }
                        
                        if (imageData && imageData.startsWith('data:')) {
                            actualUrl = imageData;
                            console.log('✅ Resolved markdown reference to base64 data');
                        } else {
                            console.log('⚠️ Found data but not base64:', typeof imageData, imageData?.substring(0, 50));
                        }
                    } else {
                        console.log('⚠️ Key not found:', refKey, 'Available keys:', Object.keys(activeQuizManager.currentQuiz.images).slice(0, 10));
                    }
                } else {
                    console.log('⚠️ activeQuizManager.currentQuiz or currentQuiz.images not available');
                    console.log('⚠️ Debug - quizManager available:', !!quizManager);
                    console.log('⚠️ Debug - window.quizManager available:', !!window.quizManager);
                    if (window.quizManager) {
                        console.log('⚠️ Debug - window.quizManager.currentQuiz:', !!window.quizManager.currentQuiz);
                    }
                }
                
                if (actualUrl === url) {
                    console.log('❌ Failed to resolve reference:', refKey);
                }
            }
            
            const imageHtml = `<img src="${actualUrl}" alt="${alt}" loading="lazy" onclick="window.openImageModal && openImageModal('${actualUrl}', '${alt}')">`;
            if (caption) {
                return `<div class="image-container">${imageHtml}<div class="image-caption">${caption}</div></div>`;
            }
            return `<div class="image-container">${imageHtml}</div>`;
        });
        
        // Handle simple image URLs (common formats)
        formattedText = formattedText.replace(/https?:\/\/[^\s]+\.(jpg|jpeg|png|gif|webp|svg)(\?[^\s]*)?/gi, (url) => {
            return `<div class="image-container"><img src="${url}" alt="Image" loading="lazy" onclick="window.openImageModal && openImageModal('${url}', 'Image')"></div>`;
        });
        
        // Handle image links with "View Image" button: [View Image](url)
        formattedText = formattedText.replace(/\[(View Image|view image|IMAGE|Image)\]\(([^)]+)\)/gi, (match, text, url) => {
            return `<a href="#" class="image-link" onclick="window.openImageModal && openImageModal('${url}', 'Image'); return false;">🖼️ View Image</a>`;
        });
        
        // Convert plain URLs to clickable links with proper wrapping attributes
        formattedText = formattedText.replace(
            /(https?:\/\/[^\s<>"']+)/gi,
            '<a href="$1" target="_blank" rel="noopener noreferrer" class="explanation-link">$1</a>'
        );
        
        // Convert www.domain.com to clickable links
        formattedText = formattedText.replace(
            /(?<!https?:\/\/)\b(www\.[^\s<>"']+)/gi,
            '<a href="http://$1" target="_blank" rel="noopener noreferrer" class="explanation-link">$1</a>'
        );
        
        // Convert line breaks to paragraphs
        if (formattedText.includes('\n\n')) {
            formattedText = formattedText
                .replace(/\n\s*\n/g, '</p><p>')
                .replace(/\n/g, ' ')
                .replace(/^/, '<p>')
                .replace(/$/, '</p>');
        } else {
            formattedText = formattedText.replace(/\n/g, ' ');
        }
        
        return formattedText;
    }

    /**
     * Escape HTML to prevent XSS (fallback for untrusted content)
     */
    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    /**
     * Get app info
     */
    getInfo() {
        return {
            initialized: this.initialized,
            managers: {
                ui: uiManager.getInfo?.() || 'initialized',
                quiz: quizManager.getStatistics(),
                anatomy: 'initialized',
                calculator: calculatorManager.getStatistics(),
                storage: 'initialized',
                orientation: 'initialized',
                analytics: 'initialized',
                drug: this.drugManager.getStatistics(),
                lab: this.labManager.getStatistics(),
                guidelines: this.guidelinesManager.getStatistics(),
                mnemonics: this.mnemonicsManager.getStatistics(),
                interpretation: this.interpretationToolsManager.getStatistics(),
                ladders: this.laddersManager.getStatistics()
            }
        };
    }

    /**
     * Fallback calculator methods - delegates to ExtractedCalculators if available
     * These ensure window.quizApp always has calculator methods
     */
    calculateBMI() {
        if (window.ExtractedCalculators && window.ExtractedCalculators.calculateBMI) {
            return window.ExtractedCalculators.calculateBMI();
        }
        console.warn('⚠️ BMI calculator not available');
    }

    calculateFrailty() {
        if (window.ExtractedCalculators && window.ExtractedCalculators.calculateFrailty) {
            return window.ExtractedCalculators.calculateFrailty();
        }
        console.warn('⚠️ Frailty calculator not available');
    }

    calculateGCS() {
        if (window.ExtractedCalculators && window.ExtractedCalculators.calculateGCS) {
            return window.ExtractedCalculators.calculateGCS();
        }
        console.warn('⚠️ GCS calculator not available');
    }

    calculateWells() {
        if (window.ExtractedCalculators && window.ExtractedCalculators.calculateWells) {
            return window.ExtractedCalculators.calculateWells();
        }
        console.warn('⚠️ Wells calculator not available');
    }

    // Generic calculator delegator for any missing methods
    _delegateCalculator(methodName) {
        if (window.ExtractedCalculators && window.ExtractedCalculators[methodName]) {
            return window.ExtractedCalculators[methodName]();
        }
        console.warn(`⚠️ Calculator method ${methodName} not available`);
    }

    /**
     * Show calculator list (back button functionality)
     */
    showCalculatorList() {
        console.log('🔙 Showing calculator list');
        // Switch back to the main calculator panel
        this.switchTool('calculators');
    }
}

// Create app instance and wrap it with a proxy for calculator method delegation
const appInstance = new MLAQuizApp();

// Create a proxy that automatically delegates calculate* methods to ExtractedCalculators
const app = new Proxy(appInstance, {
    get(target, prop, receiver) {
        // If the property exists on the target, return it
        if (prop in target) {
            return Reflect.get(target, prop, receiver);
        }
        
        // If it's a calculate method and ExtractedCalculators has it, delegate
        if (typeof prop === 'string' && prop.startsWith('calculate') && 
            window.ExtractedCalculators && typeof window.ExtractedCalculators[prop] === 'function') {
            console.log(`🔄 Delegating ${prop} to ExtractedCalculators`);
            return window.ExtractedCalculators[prop].bind(window.ExtractedCalculators);
        }
        
        // If it's a get*Calculator method and ExtractedCalculators has it, delegate
        if (typeof prop === 'string' && prop.startsWith('get') && prop.includes('Calculator') && 
            window.ExtractedCalculators && typeof window.ExtractedCalculators[prop] === 'function') {
            return window.ExtractedCalculators[prop].bind(window.ExtractedCalculators);
        }
        
        // Delegate any other helper methods (e.g. updateUnitConverter, convertUnits)
        // that exist on the extracted V1 calculators object but are not calculate*/get* methods.
        if (typeof prop === 'string' && window.ExtractedCalculators && typeof window.ExtractedCalculators[prop] === 'function') {
            console.log(`🔄 Delegating helper ${prop} to ExtractedCalculators`);
            return window.ExtractedCalculators[prop].bind(window.ExtractedCalculators);
        }
        // Otherwise return undefined
        return undefined;
    }
});

// Initialize when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => app.initialize());
} else {
    app.initialize();
}

// Export for global access if needed
window.MLAQuizApp = app;

// Set window.quizApp to reference the main app (needed for onclick handlers)
window.quizApp = app;

// Safe wrappers for legacy templates that call unit converter helpers directly.
// These try the main app proxy first, then fall back to ExtractedCalculators, and finally warn.
window.callUpdateUnitConverter = function() {
    try {
        console.debug('callUpdateUnitConverter() invoked');
        // Avoid calling back into this wrapper via the proxy which may return the same
        // wrapper function (causing infinite recursion). Read the property and
        // only invoke it if it's a different function.
        if (window.quizApp) {
            try {
                const qaMethod = window.quizApp.updateUnitConverter;
                if (typeof qaMethod === 'function' && qaMethod !== window.callUpdateUnitConverter) {
                    console.debug('-> calling updateUnitConverter on window.quizApp (native implementation)');
                    return qaMethod.call(window.quizApp);
                }
            } catch (e) {
                // Accessing the proxy may throw or return the wrapper; fall through to other fallbacks
                console.debug('-> unable to call updateUnitConverter on window.quizApp directly:', e && e.message);
            }
        }
        if (window.ExtractedCalculators && typeof window.ExtractedCalculators.updateUnitConverter === 'function') {
            console.debug('-> calling updateUnitConverter on window.ExtractedCalculators');
            return window.ExtractedCalculators.updateUnitConverter();
        }
        if (typeof window.updateUnitConverter === 'function') {
            console.debug('-> calling global updateUnitConverter');
            return window.updateUnitConverter();
        }
        console.warn('updateUnitConverter not available on quizApp, ExtractedCalculators, or global scope');
    } catch (e) {
        console.error('Error calling updateUnitConverter:', e);
    }
};

window.callConvertUnits = function(unitType, sourceUnit) {
    try {
        console.debug('callConvertUnits() invoked for', unitType, sourceUnit);
        if (window.quizApp) {
            try {
                const qaMethod = window.quizApp.convertUnits;
                if (typeof qaMethod === 'function' && qaMethod !== window.callConvertUnits) {
                    console.debug('-> calling convertUnits on window.quizApp (native implementation)');
                    return qaMethod.call(window.quizApp, unitType, sourceUnit);
                }
            } catch (e) {
                console.debug('-> unable to call convertUnits on window.quizApp directly:', e && e.message);
            }
        }
        if (window.ExtractedCalculators && typeof window.ExtractedCalculators.convertUnits === 'function') {
            console.debug('-> calling convertUnits on window.ExtractedCalculators');
            return window.ExtractedCalculators.convertUnits(unitType, sourceUnit);
        }
        if (typeof window.convertUnits === 'function') {
            console.debug('-> calling global convertUnits');
            return window.convertUnits(unitType, sourceUnit);
        }
        console.warn('convertUnits not available on quizApp, ExtractedCalculators, or global scope');
    } catch (e) {
        console.error('Error calling convertUnits:', e);
    }
};

// Backwards-compatibility: expose simple global functions that older inline handlers may call
window.updateUnitConverter = window.callUpdateUnitConverter;
window.convertUnits = window.callConvertUnits;

// Make sure quizManager is available on MLAQuizApp for template compatibility
app.quizManager = quizManager;

// Export managers for backward compatibility with existing app.js
window.eventBus = eventBus;
window.storage = storage;
window.uiManager = uiManager;
window.quizManager = quizManager;
window.anatomyManager = anatomyManager;
window.calculatorManager = calculatorManager;
window.orientationManager = orientationManager;
window.analytics = analytics;
window.drugManager = app.drugManager;
window.labManager = app.labManager;
window.guidelinesManager = app.guidelinesManager;
window.mnemonicsManager = app.mnemonicsManager;
window.interpretationToolsManager = app.interpretationToolsManager;
window.laddersManager = app.laddersManager;
window.differentialDxManager = differentialDxManager;
window.triadsManager = triadsManager;
window.examinationManager = examinationManager;
window.emergencyProtocolsManager = emergencyProtocolsManager;
window.v2Integration = v2Integration;

// Helper function to initialize V2 integration after V1 app is ready
window.initializeV2Integration = function(v1AppInstance) {
    if (v1AppInstance && window.v2Integration) {
        window.v2Integration.initialize(v1AppInstance);
        console.log('✅ V2 Integration initialized with V1 app');
        
        // Make drugManager, labManager, guidelinesManager available globally
        window.drugReferenceManager = app.drugManager;
        window.labValuesManager = app.labManager;
        window.guidelinesManager = app.guidelinesManager;
        window.mnemonicsManager = app.mnemonicsManager;
        window.interpretationToolsManager = app.interpretationToolsManager;
        window.laddersManager = app.laddersManager;
        
        return true;
    }
    console.error('❌ Failed to initialize V2 integration - missing V1 app or V2 integration');
    return false;
};

// Image Modal Functions (V1 compatibility)
function openImageModal(imageUrl, altText) {
    // Remove existing modal if any
    const existingModal = document.getElementById('imageModal');
    if (existingModal) {
        existingModal.remove();
    }
    
    // Handle case where imageUrl might be a filename that needs to be resolved
    let actualUrl = imageUrl;
    
    // If it's not a data URL or http URL, try to find it in the document
    if (!imageUrl.startsWith('data:') && !imageUrl.startsWith('http')) {
        // Look for an image with this filename in the document
        const images = document.querySelectorAll('img');
        for (let img of images) {
            if (img.src.includes(imageUrl) || img.alt === imageUrl) {
                actualUrl = img.src;
                break;
            }
        }
        
        // If still not found, show error
        if (actualUrl === imageUrl && !imageUrl.startsWith('data:')) {
            console.warn('Image not found:', imageUrl);
            alert('Image not found: ' + imageUrl);
            return;
        }
    }
    
    // Create modal with zoom container
    const modal = document.createElement('div');
    modal.id = 'imageModal';
    modal.className = 'image-modal';
    modal.innerHTML = `
        <span class="image-modal-close" onclick="closeImageModal()">&times;</span>
        <div class="image-zoom-container">
            <img src="${actualUrl}" alt="${altText}" loading="lazy" class="zoomable-image">
        </div>
    `;
    
    document.body.appendChild(modal);
    
    // Initialize pinch zoom functionality
    const img = modal.querySelector('.zoomable-image');
    const container = modal.querySelector('.image-zoom-container');
    initPinchZoom(img, container);
    
    // Close modal when clicking on background (but not on image)
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeImageModal();
        }
    });
    
    // Close modal with Escape key
    document.addEventListener('keydown', handleEscapeKey);
}

function closeImageModal() {
    const modal = document.getElementById('imageModal');
    if (modal) {
        modal.remove();
    }
    document.removeEventListener('keydown', handleEscapeKey);
}

function handleEscapeKey(e) {
    if (e.key === 'Escape') {
        closeImageModal();
    }
}

function initPinchZoom(img, container) {
    let scale = 1;
    let startDistance = 0;
    let startScale = 1;
    let startX = 0, startY = 0;
    let translateX = 0, translateY = 0;
    let startTranslateX = 0, startTranslateY = 0;

    img.style.transition = 'transform 0.1s ease-out';
    
    // Touch events for pinch zoom
    container.addEventListener('touchstart', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            img.style.transition = 'none';
            
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            startDistance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            startScale = scale;
            
            // Record center point for zooming
            const rect = container.getBoundingClientRect();
            startX = (touch1.clientX + touch2.clientX) / 2 - rect.left;
            startY = (touch1.clientY + touch2.clientY) / 2 - rect.top;
            startTranslateX = translateX;
            startTranslateY = translateY;
        } else if (e.touches.length === 1 && scale > 1) {
            e.preventDefault();
            img.style.transition = 'none';
            
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            startX = touch.clientX - rect.left;
            startY = touch.clientY - rect.top;
            startTranslateX = translateX;
            startTranslateY = translateY;
        }
    });

    container.addEventListener('touchmove', (e) => {
        if (e.touches.length === 2) {
            e.preventDefault();
            
            const touch1 = e.touches[0];
            const touch2 = e.touches[1];
            const distance = Math.hypot(
                touch2.clientX - touch1.clientX,
                touch2.clientY - touch1.clientY
            );
            
            scale = Math.min(Math.max(0.5, startScale * (distance / startDistance)), 4);
            
            img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        } else if (e.touches.length === 1 && scale > 1) {
            e.preventDefault();
            
            const touch = e.touches[0];
            const rect = container.getBoundingClientRect();
            const deltaX = (touch.clientX - rect.left) - startX;
            const deltaY = (touch.clientY - rect.top) - startY;
            
            translateX = startTranslateX + deltaX / scale;
            translateY = startTranslateY + deltaY / scale;
            
            img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
        }
    });

    container.addEventListener('touchend', (e) => {
        if (e.touches.length === 0) {
            img.style.transition = 'transform 0.1s ease-out';
            
            // Reset if zoomed out too much
            if (scale < 1) {
                scale = 1;
                translateX = 0;
                translateY = 0;
                img.style.transform = 'scale(1) translate(0px, 0px)';
            }
        }
    });

    // Mouse wheel zoom for desktop
    container.addEventListener('wheel', (e) => {
        e.preventDefault();
        
        const rect = container.getBoundingClientRect();
        const mouseX = e.clientX - rect.left;
        const mouseY = e.clientY - rect.top;
        
        const zoom = e.deltaY < 0 ? 1.1 : 0.9;
        const newScale = Math.min(Math.max(0.5, scale * zoom), 4);
        
        if (newScale !== scale) {
            const scaleChange = newScale / scale;
            translateX = (translateX - mouseX / scale) * scaleChange + mouseX / newScale;
            translateY = (translateY - mouseY / scale) * scaleChange + mouseY / newScale;
            scale = newScale;
            
            img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            
            // Reset if zoomed out to normal
            if (scale <= 1) {
                scale = 1;
                translateX = 0;
                translateY = 0;
                img.style.transform = 'scale(1) translate(0px, 0px)';
            }
        }
    });

    // Double tap to zoom
    let lastTap = 0;
    container.addEventListener('touchend', (e) => {
        const currentTime = new Date().getTime();
        const tapLength = currentTime - lastTap;
        
        if (tapLength < 500 && tapLength > 0) {
            e.preventDefault();
            
            if (scale === 1) {
                scale = 2;
                img.style.transform = `scale(${scale}) translate(${translateX}px, ${translateY}px)`;
            } else {
                scale = 1;
                translateX = 0;
                translateY = 0;
                img.style.transform = 'scale(1) translate(0px, 0px)';
            }
        }
        
        lastTap = currentTime;
    });
}

// Make functions globally available
window.openImageModal = openImageModal;
window.closeImageModal = closeImageModal;
window.handleEscapeKey = handleEscapeKey;

// Enhanced section functionality
function initializeEnhancedSections() {
    // Quiz Practice functionality
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('start-quiz-btn')) {
            const category = e.target.getAttribute('data-category');
            const length = document.getElementById('quiz-length')?.value || '25';
            const difficulty = document.getElementById('quiz-difficulty')?.value || 'mixed';
            
            console.log(`Starting ${category} quiz: ${length} questions, ${difficulty} difficulty`);
            
            // Integration with existing quiz system
            if (window.QuizManager && window.QuizManager.startCategoryQuiz) {
                window.QuizManager.startCategoryQuiz(category, parseInt(length), difficulty);
            } else {
                // Fallback to general quiz functionality
                alert(`Starting ${category} quiz with ${length} questions at ${difficulty} difficulty level!`);
            }
        }
        
        // Case Studies functionality
        if (e.target.classList.contains('case-btn')) {
            const caseCard = e.target.closest('.case-card');
            const caseTitle = caseCard.querySelector('h4')?.textContent || 'Unknown Case';
            
            console.log(`Opening case study: ${caseTitle}`);
            alert(`Opening case study: ${caseTitle}\n\nThis would launch an interactive clinical case with patient history, examination findings, and decision points.`);
        }
        
        // Learning Pathways functionality
        if (e.target.classList.contains('pathway-btn')) {
            const pathwayCard = e.target.closest('.pathway-card');
            const pathwayTitle = pathwayCard.querySelector('h3')?.textContent || 'Unknown Pathway';
            
            console.log(`Opening learning pathway: ${pathwayTitle}`);
            alert(`Opening learning pathway: ${pathwayTitle}\n\nThis would launch a structured learning journey with modules, assessments, and progress tracking.`);
        }
    });
    
    // Update progress bars dynamically (example)
    const progressBars = document.querySelectorAll('.progress-fill');
    progressBars.forEach(bar => {
        // Simulate some progress for demo purposes
        setTimeout(() => {
            const randomProgress = Math.floor(Math.random() * 30);
            bar.style.width = `${randomProgress}%`;
            
            const progressText = bar.parentNode.parentNode.querySelector('.progress-text');
            if (progressText) {
                const totalModules = progressText.textContent.split('/')[1]?.split(' ')[0] || '0';
                const completedModules = Math.floor((randomProgress / 100) * parseInt(totalModules));
                progressText.textContent = `${completedModules}/${totalModules} modules completed`;
            }
        }, 1000);
    });
}

// Initialize enhanced sections when DOM is loaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeEnhancedSections);
} else {
    initializeEnhancedSections();
}

console.log('📦 MLA Quiz PWA modules loaded');

export default app;
