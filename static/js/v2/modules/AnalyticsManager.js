/**
 * Analytics Module - Handles tracking and vibration feedback
 */

export class AnalyticsManager {
    constructor() {
        this.vibrationEnabled = this.getVibrationSetting();
    }

    /**
     * Get vibration setting from localStorage
     */
    getVibrationSetting() {
        try {
            const setting = localStorage.getItem('vibrationEnabled');
            return setting === null ? true : setting === 'true';
        } catch (error) {
            return true;
        }
    }

    /**
     * Set vibration setting
     */
    setVibrationSetting(enabled) {
        this.vibrationEnabled = enabled;
        try {
            localStorage.setItem('vibrationEnabled', enabled.toString());
        } catch (error) {
            console.error('Error saving vibration setting:', error);
        }
    }

    /**
     * Trigger haptic feedback
     */
    vibrate(pattern = 50) {
        if (!this.vibrationEnabled) return;
        
        if ('vibrate' in navigator) {
            try {
                navigator.vibrate(pattern);
            } catch (error) {
                console.warn('Vibration not supported:', error);
            }
        }
    }

    /**
     * Success vibration pattern
     */
    vibrateSuccess() {
        this.vibrate([50, 50, 50]);
    }

    /**
     * Error vibration pattern
     */
    vibrateError() {
        this.vibrate([100, 50, 100]);
    }

    /**
     * Warning vibration pattern
     */
    vibrateWarning() {
        this.vibrate([50, 30, 50, 30, 50]);
    }

    /**
     * Click vibration pattern
     */
    vibrateClick() {
        this.vibrate(10);
    }

    /**
     * Track page view (if analytics is implemented)
     */
    trackPageView(page) {
        console.log(`📊 Page view: ${page}`);
        // Placeholder for future analytics integration
    }

    /**
     * Track event (if analytics is implemented)
     */
    trackEvent(category, action, label = '', value = 0) {
        console.log(`📊 Event: ${category} - ${action}`, { label, value });
        // Placeholder for future analytics integration
    }

    /**
     * Track quiz completion
     */
    trackQuizCompletion(quizName, score, timeSpent) {
        this.trackEvent('Quiz', 'Completed', quizName, score);
        console.log(`📊 Quiz completed: ${quizName} - Score: ${score}% - Time: ${timeSpent}s`);
    }

    /**
     * Track calculator usage
     */
    trackCalculatorUse(calculatorName) {
        this.trackEvent('Calculator', 'Used', calculatorName);
    }

    /**
     * Track anatomy view
     */
    trackAnatomyView(layer, view) {
        this.trackEvent('Anatomy', 'Viewed', `${layer}-${view}`);
    }

    /**
     * Enhanced session tracking - NEW FEATURE
     */
    trackSessionStart() {
        this.sessionData = {
            startTime: Date.now(),
            pageViews: 0,
            interactions: 0,
            quizzesCompleted: 0,
            calculatorsUsed: 0,
            timeSpent: 0
        };
        
        this.trackEvent('session', 'start', navigator.platform, 1);
        console.log('📊 Session tracking started');
    }

    /**
     * Track session end with comprehensive data - NEW FEATURE
     */
    trackSessionEnd() {
        if (!this.sessionData) return;
        
        const sessionDuration = Date.now() - this.sessionData.startTime;
        this.sessionData.timeSpent = Math.round(sessionDuration / 1000);
        
        // Store session data
        const sessions = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
        sessions.push({
            ...this.sessionData,
            endTime: Date.now(),
            duration: this.sessionData.timeSpent,
            date: new Date().toISOString().slice(0, 10)
        });
        
        // Keep last 30 sessions
        if (sessions.length > 30) {
            sessions.splice(0, sessions.length - 30);
        }
        
        localStorage.setItem('sessionHistory', JSON.stringify(sessions));
        this.trackEvent('session', 'end', 'duration_seconds', this.sessionData.timeSpent);
        console.log(`📊 Session ended: ${this.sessionData.timeSpent}s`);
    }

    /**
     * Get comprehensive analytics summary - NEW FEATURE
     */
    getAnalyticsSummary() {
        const sessions = JSON.parse(localStorage.getItem('sessionHistory') || '[]');
        const totalSessions = sessions.length;
        const totalTime = sessions.reduce((sum, s) => sum + s.timeSpent, 0);
        
        return {
            sessions: {
                total: totalSessions,
                totalTimeSpent: Math.round(totalTime / 60), // minutes
                averageSessionTime: totalSessions > 0 ? Math.round(totalTime / totalSessions / 60) : 0
            },
            vibration: {
                enabled: this.vibrationEnabled,
                supported: 'vibrate' in navigator
            }
        };
    }
}

// Export singleton instance
export const analytics = new AnalyticsManager();
