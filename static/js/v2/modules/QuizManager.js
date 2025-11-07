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
        try {
            let quizData;
            
            if (isUploaded) {
                // Load from uploaded quizzes
                const uploadedQuizzes = storage.getItem(STORAGE_KEYS.UPLOADED_QUIZZES, []);
                const quiz = uploadedQuizzes.find(q => q.name === quizName);
                if (!quiz) {
                    throw new Error('Uploaded quiz not found');
                }
                quizData = quiz;
            } else {
                // Load from API
                const response = await fetch(`/api/quizzes/${encodeURIComponent(quizName)}`);
                if (!response.ok) {
                    throw new Error(`Failed to load quiz: ${response.statusText}`);
                }
                quizData = await response.json();
            }

            this.currentQuiz = quizData;
            this.quizName = quizName;
            this.questions = quizData.questions || [];
            
            // Reset state
            this.currentQuestionIndex = 0;
            this.answers = {};
            this.submittedAnswers = {};
            this.ruledOutAnswers = {};
            this.flaggedQuestions = new Set();
            this.questionTimes = {};
            
            eventBus.emit(EVENTS.QUIZ_LOADED, { name: quizName, questionCount: this.questions.length });
            console.log(`✅ Loaded quiz: ${quizName} (${this.questions.length} questions)`);
            
            return quizData;
        } catch (error) {
            console.error('❌ Error loading quiz:', error);
            eventBus.emit(EVENTS.ERROR_OCCURRED, { type: 'quiz_load', error });
            throw error;
        }
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
            analytics.vibrateClick();
            return true;
        }
        return false;
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
        this.quizLength = length;
        storage.setItem('quizLength', length);
        console.log(`📝 Quiz length preference set to: ${length}`);
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
     * Export quiz results (for sharing or analysis)
     */
    exportResults() {
        const score = this.calculateScore();
        const results = {
            quizName: this.quizName,
            score,
            totalTime: this.getTotalTime(),
            questionTimes: this.questionTimes,
            answers: this.questions.map((q, i) => ({
                question: q.question,
                yourAnswer: this.answers[i],
                correctAnswer: q.correctAnswer,
                isCorrect: this.answers[i] === q.correctAnswer,
                timeSpent: this.questionTimes[i] || 0,
                flagged: this.flaggedQuestions.has(i)
            })),
            completedAt: new Date().toISOString()
        };

        return results;
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
     * Handle file upload (for uploaded quizzes)
     */
    async handleFileUpload(files) {
        try {
            console.log('📁 Processing file upload...', files.length, 'files');
            
            // Use V1 compatibility layer if available
            if (window.quizApp && typeof window.quizApp.handleFileUpload === 'function') {
                console.log('📤 Using V1 upload handler');
                await window.quizApp.handleFileUpload(files);
                eventBus.emit(EVENTS.QUIZ_LIST_UPDATED);
                return;
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
}

// Export singleton instance
export const quizManager = new QuizManager();
