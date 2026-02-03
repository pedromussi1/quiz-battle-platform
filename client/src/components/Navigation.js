import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navigation.css';

function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <Link to="/" className="navbar-brand">
          <h1>Quiz Battle</h1>
        </Link>

        <div className="navbar-menu">
          <Link to="/" className="nav-link">
            Home
          </Link>

          {isAuthenticated ? (
            <>
              <Link to="/create" className="nav-link">
                Create Quiz
              </Link>
              <Link to="/profile" className="nav-link">
                {user?.username || 'Profile'}
              </Link>
              <button onClick={logout} className="nav-link logout-btn">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="nav-link login-btn">
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
}

export default Navigation;
