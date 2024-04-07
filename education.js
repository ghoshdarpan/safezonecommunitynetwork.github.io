function gradeAssessment() {
    const correctAnswers = ['B', 'B', 'C', 'D', 'C', 'D', 'C', 'C', 'C', 'B'];
    let score = 0;

    for (let i = 1; i <= 10; i++) {
        const selectedAnswer = document.querySelector(`input[name="q${i}"]:checked`);
        if (selectedAnswer) {
            const userAnswer = selectedAnswer.value;
            if (userAnswer === correctAnswers[i - 1]) {
                score++;
            }
        }
    }

    alert(`Your score: ${score}/10`);
}
