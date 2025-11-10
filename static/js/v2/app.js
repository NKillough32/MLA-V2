        const totalQuestions = questions.length;
        const shouldKeepAll = this.selectedQuizLength === 'all'
            || !this.selectedQuizLength
            || this.selectedQuizLength >= totalQuestions;

        const shuffled = this.shuffleArray(questions);

        if (shouldKeepAll) {
            return shuffled;

