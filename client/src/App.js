import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider, useAuth } from './context/AuthContext';
import LoginPage from './pages/LoginPage';
import AuthSuccessPage from './pages/AuthSuccessPage';
import HomePage from './pages/HomePage';
import QuizDetailPage from './pages/QuizDetailPage';
import QuizPlayerPage from './pages/QuizPlayerPage';
import CreateQuizPage from './pages/CreateQuizPage';
import UserProfilePage from './pages/UserProfilePage';
import Navigation from './components/Navigation';
import './App.css';

function ProtectedRoute({ children }) {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  return isAuthenticated ? children : <Navigate to="/login" />;
}

function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Navigation />
        <main className="main-content">
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route path="/auth-success" element={<AuthSuccessPage />} />
            <Route path="/" element={<HomePage />} />
            <Route path="/quiz/:id" element={<QuizDetailPage />} />
            <Route
              path="/quiz/:id/play"
              element={
                <ProtectedRoute>
                  <QuizPlayerPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/create"
              element={
                <ProtectedRoute>
                  <CreateQuizPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <UserProfilePage />
                </ProtectedRoute>
              }
            />
          </Routes>
        </main>
      </BrowserRouter>
    </AuthProvider>
  );
}

export default App;
