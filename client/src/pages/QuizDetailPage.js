import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { quizAPI } from '../services/api';
import './QuizDetailPage.css';

function QuizDetailPage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [quiz, setQuiz] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  const fetchQuiz = async () => {
    try {
      setLoading(true);
      const response = await quizAPI.getQuizById(id);
      setQuiz(response.data);
    } catch (err) {
      setError('Failed to load quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading quiz...</div>;
  if (error) return <div className="error">{error}</div>;
  if (!quiz) return <div className="error">Quiz not found</div>;

  const handlePlayClick = () => {
    if (!isAuthenticated) {
      navigate('/login');
    } else {
      navigate(`/quiz/${id}/play`);
    }
  };

  return (
    <div className="quiz-detail-page">
      <div className="quiz-detail-header">
        {quiz.questions?.[0]?.imageUrl || quiz.bracketData?.imageUrl ? (
          <img
            src={quiz.questions?.[0]?.imageUrl || quiz.bracketData?.imageUrl}
            alt={quiz.title}
            className="quiz-header-image"
          />
        ) : (
          <div className="quiz-header-placeholder">No Image</div>
        )}
      </div>

      <div className="quiz-detail-content">
        <h1>{quiz.title}</h1>

        <div className="quiz-info">
          <div className="info-item">
            <span className="info-label">Creator:</span>
            <span className="info-value">{quiz.creatorUsername}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Category:</span>
            <span className="info-value">{quiz.categoryName}</span>
          </div>
          <div className="info-item">
            <span className="info-label">Type:</span>
            <span className="info-value">
              {quiz.type === 'multiple-choice' ? 'Multiple Choice' : 'Bracket Battle'}
            </span>
          </div>
          <div className="info-item">
            <span className="info-label">Times Played:</span>
            <span className="info-value">{quiz.playCount}</span>
          </div>
        </div>

        {quiz.description && (
          <div className="quiz-description">
            <h3>Description</h3>
            <p>{quiz.description}</p>
          </div>
        )}

        {quiz.type === 'multiple-choice' && (
          <div className="quiz-questions-preview">
            <h3>Questions ({quiz.questions.length})</h3>
            <div className="questions-list">
              {quiz.questions.map((q, idx) => (
                <div key={idx} className="question-preview">
                  <span className="question-number">{idx + 1}.</span>
                  <span className="question-text">{q.question}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {quiz.type === 'bracket-battle' && (
          <div className="bracket-preview">
            <h3>Tournament Structure</h3>
            <p>This is a bracket battle tournament with multiple rounds.</p>
          </div>
        )}

        <button onClick={handlePlayClick} className="play-button">
          ▶️ Play Quiz
        </button>
      </div>
    </div>
  );
}

export default QuizDetailPage;
