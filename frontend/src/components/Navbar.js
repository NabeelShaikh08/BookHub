import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import './Navbar.css';

const Navbar = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    navigate('/');
    setIsMenuOpen(false);
  };

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* Logo */}
        <Link to="/" className="nav-logo">
          <span className="logo-icon">📚</span>
          BookHub
        </Link>

        {/* Desktop Navigation */}
        <div className="nav-menu">
          <Link to="/" className="nav-link">Home</Link>
          <Link to="/search" className="nav-link">Search</Link>
          {user && (
            <Link to="/add-book" className="nav-link">Add Book</Link>
          )}
        </div>

        {/* User Actions */}
        <div className="nav-actions">
          {user ? (
            <div className="user-menu">
              <div className="user-info">
                <span className="user-avatar">
                  {user.name.charAt(0).toUpperCase()}
                </span>
                <span className="user-name">{user.name}</span>
              </div>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="auth-buttons">
              <Link to="/login" className="nav-btn nav-btn-outline">Login</Link>
              <Link to="/signup" className="nav-btn nav-btn-primary">Sign Up</Link>
            </div>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button 
          className={`mobile-menu-btn ${isMenuOpen ? 'active' : ''}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </button>
      </div>

      {/* Mobile Menu */}
      <div className={`mobile-menu ${isMenuOpen ? 'active' : ''}`}>
        <Link to="/" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
          Home
        </Link>
        <Link to="/search" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
          Search
        </Link>
        {user && (
          <Link to="/add-book" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
            Add Book
          </Link>
        )}
        {user ? (
          <button onClick={handleLogout} className="mobile-link logout">
            Logout
          </button>
        ) : (
          <>
            <Link to="/login" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              Login
            </Link>
            <Link to="/signup" className="mobile-link" onClick={() => setIsMenuOpen(false)}>
              Sign Up
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
