import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './LoginPage.css';

function LoginPage() {
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) {
    navigate('/');
    return null;
  }

  const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

  const handleGoogleLogin = () => {
    window.location.href = `${API_URL}/auth/google`;
  };

  const handleDiscordLogin = () => {
    window.location.href = `${API_URL}/auth/discord`;
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h1>Welcome to Quiz Battle</h1>
        <p>Sign in to create and play quizzes</p>

        <div className="login-buttons">
          <button onClick={handleGoogleLogin} className="login-btn google-btn">
            <span>🔵 Sign in with Google</span>
          </button>
          <button onClick={handleDiscordLogin} className="login-btn discord-btn">
            <span>⚫ Sign in with Discord</span>
          </button>
        </div>

        <div className="login-info">
          <p>Create and share quizzes with the community!</p>
          <ul>
            <li>Create multiple-choice quizzes and bracket battles</li>
            <li>Share quizzes with friends and track play stats</li>
            <li>Discover quizzes by category or search</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
