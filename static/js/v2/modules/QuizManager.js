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
        this.quizName = '';
        this.flaggedQuestions = new Set();
        this.selectedQuizLength = QUIZ_CONFIG.DEFAULT_LENGTH;
        
        // Time tracking
        this.questionStartTime = null;
        this.questionTimes = {};
        this.quizStartTime = null;
        this.totalStudyTime = 0;
        this.sessionStats = {
            questionsAnswered: 0,
            totalTime: 0,
            averageTimePerQuestion: 0
        };
    }

    /**
     * Initialize the quiz manager
     */
    initialize() {
        console.log('🎯 QuizManager initialized');
        
        // Load quiz length from storage
        this.selectedQuizLength = storage.getItem(STORAGE_KEYS.QUIZ_LENGTH, QUIZ_CONFIG.DEFAULT_LENGTH);
        
        // Update quiz length info display
        this.updateQuizLengthInfo();
        
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
                        const quizStoredData = JSON.parse(localStorage.getItem(storageKey) || '{}');
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

            // Store current quiz for image lookups (V1 compatibility)
            this.currentQuiz = quizData;
            this.quizName = quizName;
            this.questions = quizData.questions || [];
            
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
        let quizzes = storage.getItem(STORAGE_KEYS.UPLOADED_QUIZZES, []);
        
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
                    const quizData = JSON.parse(localStorage.getItem(storageKey) || '{}');
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
                    const stored = JSON.parse(localStorage.getItem(storageKey) || 'null');
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
     * Sanitize storage key (V1 compatibility)
     */
    sanitizeStorageKey(name) {
        return name.replace(/[^a-zA-Z0-9_-]/g, '_');
    }

    /**
     * Filter questions by selected length (V1 compatibility)
     */
    filterQuestionsByLength(questions) {
        if (!this.selectedQuizLength || this.selectedQuizLength === 'all' || this.selectedQuizLength >= questions.length) {
            return questions;
        }
        
        // Use proper Fisher-Yates shuffle instead of biased sort
        const shuffled = this.shuffleArray([...questions]);
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

        // Randomly select questions if needed
        if (this.selectedQuizLength && this.selectedQuizLength < this.questions.length) {
            this.questions = this.shuffleArray([...this.questions])
                .slice(0, this.selectedQuizLength);
        }

        // Shuffle options for all questions to prevent pattern memorization (V1 compatibility)
        this.questions = this.questions.map(question => this.shuffleOptions(question));

        // Start timing
        this.quizStartTime = Date.now();
        this.questionStartTime = Date.now();
        
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
        eventBus.emit('quiz:renderQuestion', {
            question,
            index: this.currentQuestionIndex,
            total: this.questions.length,
            answer: this.answers[this.currentQuestionIndex],
            submitted: this.submittedAnswers[this.currentQuestionIndex],
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

        // Check if correct
        const correctAnswerIdx = question.correct_answer !== undefined ? question.correct_answer : question.correctAnswer;
        const isCorrect = selectedAnswer === correctAnswerIdx;
        
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

        return { isCorrect, correctAnswer: correctAnswerIdx };
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
            return true;
        }
        return false;
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
            return true;
        }
        return false;
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
        
        return this.flaggedQuestions.has(index);
    }

    /**
     * Select an answer (without submitting)
     */
    selectAnswer(optionIndex) {
        const questionIndex = this.currentQuestionIndex;
        this.answers[questionIndex] = optionIndex;
        
        eventBus.emit('quiz:answerSelected', {
            questionIndex,
            answer: optionIndex
        });
        
        // Re-render to show selection
        this.renderQuestion();
    }

    /**
     * Get current answer
     */
    getCurrentAnswer() {
        return this.answers[this.currentQuestionIndex];
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
    setQuizLength(length) {
        this.selectedQuizLength = length === 'all' ? 'all' : parseInt(length);
        this.quizLength = this.selectedQuizLength; // Keep both for compatibility
        storage.setItem(STORAGE_KEYS.QUIZ_LENGTH, this.selectedQuizLength);
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
     * Calculate score
     */
    calculateScore() {
        let correct = 0;
        let answered = 0;

        this.questions.forEach((question, index) => {
            if (this.submittedAnswers[index]) {
                answered++;
                const correctAnswerIdx = question.correct_answer !== undefined ? question.correct_answer : question.correctAnswer;
                if (this.answers[index] === correctAnswerIdx) {
                    correct++;
                }
            }
        });

        const percentage = answered > 0 ? (correct / answered) * 100 : 0;
        
        return {
            correct,
            answered,
            total: this.questions.length,
            percentage: Math.round(percentage * 10) / 10,
            unanswered: this.questions.length - answered
        };
    }

    /**
     * Finish quiz and show results
     */
    async finishQuiz() {
        const score = this.calculateScore();
        const totalTime = this.quizStartTime ? 
            Math.floor((Date.now() - this.quizStartTime) / 1000) : 0;

        const results = {
            name: this.quizName,
            score: score.percentage,
            correct: score.correct,
            answered: score.answered,
            total: score.total,
            time: totalTime,
            questionTimes: this.questionTimes,
            flagged: Array.from(this.flaggedQuestions),
            completedAt: new Date().toISOString()
        };

        // Save results
        storage.setItem(STORAGE_KEYS.LAST_QUIZ, results);
        
        // Update session stats
        const sessionStats = storage.getItem(STORAGE_KEYS.SESSION_STATS, {
            totalQuizzes: 0,
            totalQuestions: 0,
            totalCorrect: 0,
            totalTime: 0
        });
        
        sessionStats.totalQuizzes++;
        sessionStats.totalQuestions += score.answered;
        sessionStats.totalCorrect += score.correct;
        sessionStats.totalTime += totalTime;
        
        storage.setItem(STORAGE_KEYS.SESSION_STATS, sessionStats);

        // Track completion
        analytics.trackQuizCompletion(this.quizName, score.percentage, totalTime);
        analytics.vibrateSuccess();

        eventBus.emit(EVENTS.QUIZ_COMPLETED, results);
        
        console.log(`🎉 Quiz completed: ${score.correct}/${score.answered} (${score.percentage}%)`);
        
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
        this.quizStartTime = null;
        this.questionStartTime = null;
        
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

        // Calculate correct answers
        let correct = 0;
        for (const [index, submitted] of Object.entries(this.submittedAnswers)) {
            if (submitted) {
                const question = this.questions[parseInt(index)];
                const userAnswer = this.answers[index];
                const correctAnswer = question.correct_answer || question.correctAnswer;
                if (userAnswer === correctAnswer) {
                    correct++;
                }
            }
        }

        // Calculate total time spent (already in seconds)
        const totalTime = this.sessionStats?.totalTime || 0;

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
        return Math.floor((Date.now() - this.quizStartTime) / 1000);
    }

    /**
     * Save progress (for resuming later)
     */
    saveProgress() {
        const progress = {
            quizName: this.quizName,
            currentQuestionIndex: this.currentQuestionIndex,
            answers: this.answers,
            submittedAnswers: this.submittedAnswers,
            ruledOutAnswers: this.ruledOutAnswers,
            flaggedQuestions: Array.from(this.flaggedQuestions),
            questionTimes: this.questionTimes,
            quizStartTime: this.quizStartTime,
            savedAt: Date.now()
        };

        storage.setItem(`${STORAGE_KEYS.QUIZ_PROGRESS}_${this.quizName}`, progress);
        console.log('💾 Quiz progress saved');
        
        return progress;
    }

    /**
     * Load progress (to resume quiz)
     */
    loadProgress(quizName) {
        const progress = storage.getItem(`${STORAGE_KEYS.QUIZ_PROGRESS}_${quizName}`);
        
        if (progress) {
            this.currentQuestionIndex = progress.currentQuestionIndex || 0;
            this.answers = progress.answers || {};
            this.submittedAnswers = progress.submittedAnswers || {};
            this.ruledOutAnswers = progress.ruledOutAnswers || {};
            this.flaggedQuestions = new Set(progress.flaggedQuestions || []);
            this.questionTimes = progress.questionTimes || {};
            this.quizStartTime = progress.quizStartTime || Date.now();
            
            console.log('📂 Quiz progress loaded');
            return true;
        }
        
        return false;
    }

    /**
     * Clear saved progress
     */
    clearProgress(quizName = this.quizName) {
        storage.removeItem(`${STORAGE_KEYS.QUIZ_PROGRESS}_${quizName}`);
        console.log('🗑️ Quiz progress cleared');
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
        if (!question.options || question.options.length <= 1) {
            return question;
        }

        // Get correct answer index - support both naming conventions
        const originalCorrectAnswer = question.correct_answer !== undefined ? question.correct_answer : question.correctAnswer;
        
        // Validate correct_answer index is within bounds
        if (originalCorrectAnswer === null || originalCorrectAnswer === undefined || 
            originalCorrectAnswer < 0 || originalCorrectAnswer >= question.options.length) {
            console.warn('⚠️ Invalid correct_answer index:', originalCorrectAnswer, 'for question with', question.options.length, 'options');
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
        
        // Update the correct answer index to match the new position
        const correctOptionPair = optionPairs.find(pair => pair.originalIndex === originalCorrectAnswer);
        if (correctOptionPair) {
            shuffledQuestion.correct_answer = optionPairs.indexOf(correctOptionPair);
            console.log(`🔀 Shuffled question: original answer index ${originalCorrectAnswer} → new index ${shuffledQuestion.correct_answer}`);
        } else {
            console.error('❌ Failed to find correct option pair for question:', question.title);
            shuffledQuestion.correct_answer = 0; // Default to first option
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
        const percentage = Math.round((score / totalQuestions) * 100);
        
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
                const correctAnswerIdx = q.correct_answer !== undefined ? q.correct_answer : q.correctAnswer;
                return {
                    questionNumber: i + 1,
                    question: q.question?.substring(0, 100) + '...', // Truncated for export
                    yourAnswer: this.answers[i],
                    correctAnswer: correctAnswerIdx,
                    isCorrect: this.answers[i] === correctAnswerIdx,
                    timeSpent: Math.round((this.questionTimes[i] || 0) / 1000), // Convert to seconds
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
            storage.removeItem(STORAGE_KEYS.UPLOADED_QUIZZES);
            
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
                correctAnswers: score.correct,
                percentage: Math.round((score.correct / score.total) * 100),
                totalTime: this.getTotalTime(),
                averageTime: Math.round(this.getTotalTime() / Object.keys(this.submittedAnswers).length),
                flaggedQuestions: this.flaggedQuestions.size
            };
            
            // Log the report
            console.log('📈 Study Report:', report);
            
            // Show a simple alert with the report (you can enhance this with a modal)
            const reportText = `📊 Study Report for ${report.quiz}\n\n` +
                `Questions: ${report.answeredQuestions}/${report.totalQuestions}\n` +
                `Score: ${report.correctAnswers}/${report.totalQuestions} (${report.percentage}%)\n` +
                `Time: ${Math.round(report.totalTime / 1000)}s total, ${Math.round(report.averageTime / 1000)}s avg\n` +
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
                
                if (file.size > 5 * 1024 * 1024) { // 5MB limit
                    uploadResults.push({
                        filename: file.name,
                        success: false,
                        error: 'File too large (max 5MB)'
                    });
                    continue;
                }
                
                if (file.name.endsWith('.md')) {
                    const result = await this.processMarkdownFile(file);
                    uploadResults.push(result);
                } else if (file.name.endsWith('.zip')) {
                    const result = await this.processZipFile(file);
                    uploadResults.push(result);
                } else {
                    uploadResults.push({
                        filename: file.name,
                        success: false,
                        error: 'Unsupported file type (only .md and .zip allowed)'
                    });
                }
            }
            
            // Update quiz list and show results
            eventBus.emit(EVENTS.QUIZ_LIST_UPDATED);
            this.showUploadResults(uploadResults);
            
            // Use V1 compatibility layer as fallback
            if (window.quizApp && typeof window.quizApp.handleFileUpload === 'function') {
                console.log('📤 Also running V1 upload handler for compatibility');
                await window.quizApp.handleFileUpload(files);
            }
            
            // V2 implementation: upload to server
            for (let file of files) {
                if (file.name.endsWith('.md') || file.name.endsWith('.zip')) {
                    console.log('📄 Processing file:', file.name);
                    
                    const formData = new FormData();
                    formData.append('quiz_file', file);
                    
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
                    let uploadedQuizzes = this.storage.getItem('uploadedQuizzes', []);
                    uploadedQuizzes = uploadedQuizzes.filter(q => q.name !== quizData.name);
                    uploadedQuizzes.push(quizData);
                    this.storage.setItem('uploadedQuizzes', uploadedQuizzes);
                    
                    console.log(`✅ Quiz uploaded: ${quizData.name} (${quizData.questionCount} questions)`);
                }
            }
            
            // Reload the quiz list after upload
            eventBus.emit(EVENTS.QUIZ_LIST_UPDATED);
            
        } catch (error) {
            console.error('❌ Error handling file upload:', error);
            throw error;
        }
    }

    /**
     * File processing helper methods - COMPREHENSIVE IMPLEMENTATIONS
     */
    
    async processMarkdownFile(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            
            reader.onload = (e) => {
                try {
                    const content = e.target.result;
                    const questions = this.parseMarkdownQuiz(content);
                    
                    if (questions.length === 0) {
                        reject(new Error('No valid questions found in markdown file'));
                        return;
                    }
                    
                    const quizName = file.name.replace('.md', '');
                    resolve({
                        name: quizName,
                        questions,
                        questionCount: questions.length,
                        isUploaded: true,
                        uploadTimestamp: Date.now()
                    });
                } catch (error) {
                    reject(new Error(`Failed to parse markdown: ${error.message}`));
                }
            };
            
            reader.onerror = () => reject(new Error('Failed to read file'));
            reader.readAsText(file);
        });
    }

    parseMarkdownQuiz(content) {
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

    async processZipFile(file) {
        // For zip files, we'll need JSZip library or send to server
        // This is a placeholder for server-side processing
        const formData = new FormData();
        formData.append('quiz_file', file);
        
        const response = await fetch('/api/upload-quiz', {
            method: 'POST',
            body: formData
        });
        
        if (!response.ok) {
            throw new Error(`Upload failed: ${response.status}`);
        }
        
        const data = await response.json();
        
        if (!data.success) {
            throw new Error(data.error || 'Upload failed');
        }
        
        return {
            name: data.quiz_name,
            questions: data.questions,
            questionCount: data.total_questions,
            isUploaded: true,
            images: data.images || {},
            uploadTimestamp: Date.now()
        };
    }

    showUploadResults(results) {
        if (!results || results.length === 0) {
            UIHelpers.showToast('No quizzes uploaded', 'warning');
            return;
        }
        
        const totalQuestions = results.reduce((sum, r) => sum + r.questionCount, 0);
        const quizNames = results.map(r => r.name).join(', ');
        
        UIHelpers.showToast(
            `Successfully uploaded ${results.length} quiz(es): ${quizNames} (${totalQuestions} questions total)`,
            'success'
        );
        
        // Update UI to show new quizzes
        eventBus.emit(EVENTS.QUIZ_LIST_UPDATED);
    }

    /**
     * Analytics helper methods - COMPREHENSIVE IMPLEMENTATIONS
     */
    
    getSessionCount() {
        const history = this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        return history.length;
    }

    getAverageScore() {
        const history = this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        
        if (history.length === 0) return 0;
        
        const totalPercentage = history.reduce((sum, session) => {
            return sum + (session.percentage || 0);
        }, 0);
        
        return Math.round(totalPercentage / history.length);
    }

    getImprovementTrend() {
        const history = this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        
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

    getTotalStudyTime() {
        const history = this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        
        if (history.length === 0) return 0;
        
        return history.reduce((total, session) => {
            return total + (session.totalTime || 0);
        }, 0);
    }

    getStrengthsAndWeaknesses() {
        const history = this.storage.getItem(STORAGE_KEYS.QUIZ_HISTORY, []);
        
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
                    }
                    .explanation-text {
                        margin-top: 5px;
                        font-size: 14px;
                        line-height: 1.6;
                        white-space: pre-wrap;
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
        const totalQuestions = Object.keys(this.submittedAnswers).length;
        let correctAnswers = 0;
        
        Object.keys(this.submittedAnswers).forEach(questionIndex => {
            const question = this.questions[questionIndex];
            if (question && this.submittedAnswers[questionIndex] === question.correct_answer) {
                correctAnswers++;
            }
        });
        
        const incorrectAnswers = totalQuestions - correctAnswers;
        const accuracy = totalQuestions > 0 ? Math.round((correctAnswers / totalQuestions) * 100) : 0;
        
        // Calculate total time and average
        let totalTime = 0;
        Object.values(this.questionTimes).forEach(time => {
            totalTime += time;
        });
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
        
        Object.keys(this.submittedAnswers).forEach(questionIndex => {
            const index = parseInt(questionIndex);
            const question = this.questions[index];
            const selectedAnswer = this.submittedAnswers[questionIndex];
            
            if (question && selectedAnswer !== question.correct_answer) {
                incorrectQuestions.push({
                    index: index,
                    question: question,
                    yourAnswer: selectedAnswer,
                    correctAnswer: question.correct_answer
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
            
            if (question) {
                answered.push({
                    index: index,
                    question: question,
                    yourAnswer: this.submittedAnswers[questionIndex],
                    correctAnswer: question.correct_answer
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
                    <p><strong>Total Time:</strong> ${this.formatTime(Math.round(data.totalTime / 1000))}</p>
                    <p><strong>Average per Question:</strong> ${Math.round(data.averageTime / 1000)}s</p>
                    <p><strong>Questions Timed:</strong> ${data.questionsAnswered}</p>
                    ${isPartialReport ? '<p><em>Note: Times for answered questions only</em></p>' : ''}
                </div>
            </div>
            
            <div class="weak-areas">
                <h3>🎯 Areas for Improvement</h3>
                ${data.incorrectQuestionsList.length > 0 ? 
                    data.incorrectQuestionsList.map(q => `
                        <div class="incorrect-question">
                            <div class="question-header">
                                <strong>Question ${q.index + 1}:</strong>
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
                                            <li class="${idx === q.yourAnswer ? 'your-answer' : ''} ${idx === q.correctAnswer ? 'correct-answer' : ''}">${this.cleanTextForPDF(option)}</li>
                                        `).join('')}
                                    </ol>
                                </div>
                            ` : ''}
                            <div class="answer-analysis">
                                <p><strong>Your Answer:</strong> Option ${String.fromCharCode(65 + q.yourAnswer)} - ${this.cleanTextForPDF(q.question.options[q.yourAnswer] || 'N/A')}</p>
                                <p><strong>Correct Answer:</strong> Option ${String.fromCharCode(65 + q.correctAnswer)} - ${this.cleanTextForPDF(q.question.options[q.correctAnswer] || 'N/A')}</p>
                            </div>
                            ${includeExplanations && ((q.question.explanations && q.question.explanations.length) || q.question.explanation) ? `
                                <div class="explanation-section">
                                    <strong>Explanation:</strong>
                                    <div class="explanation-text">${this.cleanTextForPDF(Array.isArray(q.question.explanations) && q.question.explanations.length ? q.question.explanations.join('\n') : (q.question.explanation || ''))}</div>
                                </div>
                            ` : ''}
                        </div>
                    `).join('') : 
                    '<p>🎉 Great job! No incorrect answers to review so far.</p>'
                }
                ${isPartialReport ? '<p><em>Note: Only showing answered questions. Continue the quiz for complete analysis.</em></p>' : ''}
            </div>

            <div class="answered-questions">
                <h3>📝 All Answered Questions & Explanations</h3>
                ${includeExplanations && data.answeredQuestionsList.length > 0 ? data.answeredQuestionsList.map(q => `
                    <div class="incorrect-question">
                        <div class="question-header" style="color: ${q.yourAnswer === q.correctAnswer ? '#059669' : '#dc2626'};">
                            <strong>Question ${q.index + 1}:</strong> ${q.yourAnswer === q.correctAnswer ? '✅ Correct' : '❌ Incorrect'}
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
                                        <li class="${idx === q.yourAnswer ? 'your-answer' : ''} ${idx === q.correctAnswer ? 'correct-answer' : ''}">${this.cleanTextForPDF(option)}</li>
                                    `).join('')}
                                </ol>
                            </div>
                        ` : ''}
                        <div class="answer-analysis">
                            <p><strong>Your Answer:</strong> ${q.yourAnswer != null ? 'Option ' + String.fromCharCode(65 + q.yourAnswer) + ' - ' + this.cleanTextForPDF(q.question.options[q.yourAnswer] || 'N/A') : 'N/A'}</p>
                            <p><strong>Correct Answer:</strong> ${q.correctAnswer != null ? 'Option ' + String.fromCharCode(65 + q.correctAnswer) + ' - ' + this.cleanTextForPDF(q.question.options[q.correctAnswer] || 'N/A') : 'N/A'}</p>
                        </div>
                        ${includeExplanations && ((q.question.explanations && q.question.explanations.length) || q.question.explanation) ? `
                            <div class="explanation-section">
                                <strong>Explanation:</strong>
                                <div class="explanation-text">${this.cleanTextForPDF(Array.isArray(q.question.explanations) && q.question.explanations.length ? q.question.explanations.join('\n') : (q.question.explanation || ''))}</div>
                            </div>
                        ` : ''}
                    </div>
                `).join('') : '<p>No answered questions available.</p>'}
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
