import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { quizAPI, playHistoryAPI, authAPI } from '../services/api';
import './UserProfilePage.css';

function UserProfilePage() {
  const { user } = useAuth();
  const [myQuizzes, setMyQuizzes] = useState([]);
  const [playHistory, setPlayHistory] = useState([]);
  const [stats, setStats] = useState(null);
  const [activeTab, setActiveTab] = useState('quizzes');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchUserData();
  }, []);

  const fetchUserData = async () => {
    try {
      setLoading(true);
      const quizzesResponse = await quizAPI.getUserQuizzes();
      const historyResponse = await playHistoryAPI.getUserHistory({ limit: 10 });

      setMyQuizzes(quizzesResponse.data);
      setPlayHistory(historyResponse.data.history);

      // Calculate stats
      if (historyResponse.data.history.length > 0) {
        const totalPlays = historyResponse.data.total;
        const avgScore =
          historyResponse.data.history.reduce((sum, play) => sum + play.score, 0) /
          historyResponse.data.history.length;

        setStats({
          totalPlays,
          averageScore: Math.round(avgScore),
          quizzesCreated: quizzesResponse.data.length,
        });
      } else {
        setStats({
          totalPlays: 0,
          averageScore: 0,
          quizzesCreated: quizzesResponse.data.length,
        });
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <div className="loading">Loading profile...</div>;

  return (
    <div className="user-profile-page">
      <div className="profile-header">
        <div className="profile-info">
          <h1>{user?.displayName || user?.username}</h1>
          <p>@{user?.username}</p>
          <p className="join-date">Member since {new Date(user?.createdAt).toLocaleDateString()}</p>
        </div>
      </div>

      {stats && (
        <div className="stats-grid">
          <div className="stat-card">
            <span className="stat-value">{stats.quizzesCreated}</span>
            <span className="stat-label">Quizzes Created</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.totalPlays}</span>
            <span className="stat-label">Times Played</span>
          </div>
          <div className="stat-card">
            <span className="stat-value">{stats.averageScore}%</span>
            <span className="stat-label">Average Score</span>
          </div>
        </div>
      )}

      <div className="tabs">
        <button
          className={`tab-button ${activeTab === 'quizzes' ? 'active' : ''}`}
          onClick={() => setActiveTab('quizzes')}
        >
          My Quizzes ({myQuizzes.length})
        </button>
        <button
          className={`tab-button ${activeTab === 'history' ? 'active' : ''}`}
          onClick={() => setActiveTab('history')}
        >
          Play History ({playHistory.length})
        </button>
      </div>

      <div className="tab-content">
        {activeTab === 'quizzes' && (
          <div className="quizzes-list">
            {myQuizzes.length === 0 ? (
              <p className="empty-message">You haven't created any quizzes yet.</p>
            ) : (
              myQuizzes.map((quiz) => (
                <div key={quiz._id} className="quiz-item">
                  <div className="quiz-item-info">
                    <h3>{quiz.title}</h3>
                    <p>{quiz.categoryName}</p>
                  </div>
                  <div className="quiz-item-stats">
                    <span>{quiz.questions?.length || 0} questions</span>
                    <span>{quiz.playCount} plays</span>
                  </div>
                  <a href={`/quiz/${quiz._id}`} className="view-btn">
                    View
                  </a>
                </div>
              ))
            )}
          </div>
        )}

        {activeTab === 'history' && (
          <div className="history-list">
            {playHistory.length === 0 ? (
              <p className="empty-message">You haven't played any quizzes yet.</p>
            ) : (
              playHistory.map((play, idx) => (
                <div key={idx} className="history-item">
                  <div className="history-info">
                    <h3>{play.quiz?.title}</h3>
                    <p>{new Date(play.createdAt).toLocaleDateString()}</p>
                  </div>
                  <div className="history-score">
                    <span className="score">{play.score}%</span>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfilePage;
