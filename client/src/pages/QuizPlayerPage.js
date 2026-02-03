import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { quizAPI, playHistoryAPI } from '../services/api';
import './QuizPlayerPage.css';

function QuizPlayerPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [finished, setFinished] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await quizAPI.getQuizById(id);
      setQuiz(response.data);
      setSelectedAnswers(new Array(response.data.questions.length).fill(null));
    } catch (error) {
      console.error('Failed to load quiz:', error);
      navigate('/');
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading quiz...</div>;
  if (!quiz || !quiz.questions.length) return <div className="error">Quiz not found</div>;

  const currentQuestion = quiz.questions[currentQuestionIndex];
  const isLastQuestion = currentQuestionIndex === quiz.questions.length - 1;

  const handleAnswerClick = (optionIndex) => {
    const newAnswers = [...selectedAnswers];
    newAnswers[currentQuestionIndex] = optionIndex;
    setSelectedAnswers(newAnswers);
  };

  const handleNext = () => {
    if (isLastQuestion) {
      finishQuiz();
    } else {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const finishQuiz = async () => {
    // Calculate score
    let correctCount = 0;
    const answers = selectedAnswers.map((answer, idx) => ({
      questionIndex: idx,
      selectedAnswerIndex: answer,
      isCorrect: answer === quiz.questions[idx].correctAnswerIndex,
    }));

    correctCount = answers.filter((a) => a.isCorrect).length;
    const finalScore = Math.round((correctCount / quiz.questions.length) * 100);

    try {
      await playHistoryAPI.recordPlay({
        quizId: id,
        answers,
        score: finalScore,
        totalQuestions: quiz.questions.length,
      });
    } catch (error) {
      console.error('Failed to record play history:', error);
    }

    setScore(finalScore);
    setFinished(true);
  };

  if (finished) {
    const percentage = score;
    let resultMessage = '';
    if (percentage >= 80) resultMessage = '🎉 Excellent!';
    else if (percentage >= 60) resultMessage = '👏 Good Job!';
    else if (percentage >= 40) resultMessage = '📈 Keep Practicing!';
    else resultMessage = '💪 Try Again!';

    return (
      <div className="quiz-result-page">
        <div className="result-card">
          <h1>{resultMessage}</h1>
          <div className="score-display">
            <span className="score-value">{score}%</span>
            <span className="score-label">Your Score</span>
          </div>

          <div className="result-details">
            <p>Quiz: {quiz.title}</p>
            <p>Questions: {quiz.questions.length}</p>
            <p>Correct Answers: {selectedAnswers.filter((answer, idx) => answer === quiz.questions[idx].correctAnswerIndex).length}</p>
          </div>

          <div className="result-buttons">
            <button onClick={() => navigate(`/quiz/${id}`)} className="detail-btn">
              Back to Quiz
            </button>
            <button onClick={() => navigate('/')} className="home-btn">
              Home
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="quiz-player-page">
      <div className="player-header">
        <h2>{quiz.title}</h2>
        <div className="progress">
          <div className="progress-bar">
            <div
              className="progress-fill"
              style={{ width: `${((currentQuestionIndex + 1) / quiz.questions.length) * 100}%` }}
            ></div>
          </div>
          <span className="progress-text">
            Question {currentQuestionIndex + 1} of {quiz.questions.length}
          </span>
        </div>
      </div>

      <div className="player-content">
        <div className="question-section">
          <h3 className="question-text">{currentQuestion.question}</h3>

          {currentQuestion.imageUrl && (
            <img src={currentQuestion.imageUrl} alt="Question" className="question-image" />
          )}

          <div className="options">
            {currentQuestion.options.map((option, index) => (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={`option-button ${selectedAnswers[currentQuestionIndex] === index ? 'selected' : ''}`}
              >
                <span className="option-letter">{String.fromCharCode(65 + index)}</span>
                <span className="option-text">{option}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="player-controls">
          <button onClick={handlePrevious} disabled={currentQuestionIndex === 0} className="control-btn">
            ← Previous
          </button>

          <button onClick={handleNext} className="control-btn next-btn">
            {isLastQuestion ? 'Finish' : 'Next'} →
          </button>
        </div>
      </div>
    </div>
  );
}

export default QuizPlayerPage;
