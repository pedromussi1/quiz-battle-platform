import React from 'react';
import { Link } from 'react-router-dom';
import './QuizCard.css';

function QuizCard({ quiz }) {
  const createdAt = new Date(quiz.createdAt);
  const timeAgo = getTimeAgo(createdAt);

  function getTimeAgo(date) {
    const seconds = Math.floor((new Date() - date) / 1000);
    let interval = seconds / 31536000;

    if (interval > 1) return Math.floor(interval) + ' years ago';
    interval = seconds / 2592000;
    if (interval > 1) return Math.floor(interval) + ' months ago';
    interval = seconds / 86400;
    if (interval > 1) return Math.floor(interval) + ' days ago';
    interval = seconds / 3600;
    if (interval > 1) return Math.floor(interval) + ' hours ago';
    interval = seconds / 60;
    if (interval > 1) return Math.floor(interval) + ' minutes ago';
    return Math.floor(seconds) + ' seconds ago';
  }

  return (
    <Link to={`/quiz/${quiz._id}`} className="quiz-card">
      <div className="quiz-card-image">
        {quiz.questions?.[0]?.imageUrl || quiz.bracketData?.imageUrl ? (
          <img
            src={quiz.questions?.[0]?.imageUrl || quiz.bracketData?.imageUrl}
            alt={quiz.title}
          />
        ) : (
          <div className="placeholder-image">No Image</div>
        )}
      </div>

      <div className="quiz-card-content">
        <h3 className="quiz-title">{quiz.title}</h3>

        <div className="quiz-meta">
          <span className="quiz-creator">by {quiz.creatorUsername}</span>
          <span className="quiz-time">{timeAgo}</span>
        </div>

        <div className="quiz-stats">
          <span className="quiz-type">{quiz.type === 'multiple-choice' ? '❓' : '🏆'}</span>
          <span className="quiz-category">{quiz.categoryName}</span>
          <span className="quiz-plays">▶️ {quiz.playCount}</span>
        </div>
      </div>
    </Link>
  );
}

export default QuizCard;
