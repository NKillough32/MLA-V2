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
        
        // Shuffle and take selected number
        const shuffled = [...questions].sort(() => Math.random() - 0.5);
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
        const isCorrect = selectedAnswer === question.correctAnswer;
        
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

        return { isCorrect, correctAnswer: question.correctAnswer };
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
                if (this.answers[index] === question.correctAnswer) {
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
     * Get quiz progress
     */
    getProgress() {
        const answered = Object.keys(this.submittedAnswers).length;
        const percentage = this.questions.length > 0 ? 
            (answered / this.questions.length) * 100 : 0;

        return {
            current: this.currentQuestionIndex + 1,
            total: this.questions.length,
            answered,
            unanswered: this.questions.length - answered,
            percentage: Math.round(percentage)
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
            answers: this.questions.map((q, i) => ({
                questionNumber: i + 1,
                question: q.question?.substring(0, 100) + '...', // Truncated for export
                yourAnswer: this.answers[i],
                correctAnswer: q.correctAnswer,
                isCorrect: this.answers[i] === q.correctAnswer,
                timeSpent: Math.round((this.questionTimes[i] || 0) / 1000), // Convert to seconds
                flagged: this.flaggedQuestions.has(i),
                ruledOutOptions: this.ruledOutAnswers[i]?.length || 0
            })),
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
}

// Export singleton instance
export const quizManager = new QuizManager();
