import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import "./Home.css";

const Home = () => {
  const { user } = useAuth();
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await api.get("/books");
      // Backend returns { success: true, data: books, ... }
      setBooks(response.data.data || []);
    } catch (error) {
      console.error("Error fetching books:", error);
      setBooks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading your book universe</div>;
  }

  return (
    <div className="home">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="hero-content">
          <h1 className="hero-title">
            {user ? `Welcome back, ${user.name}!` : 'Welcome to BookHub'}
          </h1>
          <p className="hero-subtitle">
            {user 
              ? 'Ready to discover your next favorite book? Explore, review, and share amazing stories with our community.'
              : 'Discover, review, and share your favorite books with a passionate community of readers.'
            }
          </p>

          {/* Stats Section */}
          <div className="hero-stats">
            <div className="stat-item">
              <span className="stat-number">{books.length}+</span>
              <span className="stat-label">Books</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">1K+</span>
              <span className="stat-label">Reviews</span>
            </div>
            <div className="stat-item">
              <span className="stat-number">500+</span>
              <span className="stat-label">Readers</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="hero-actions">
            {user ? (
              <>
                <Link to="/add-book" className="btn btn-primary">
                  📚 Add a Book
                </Link>
                <Link to="/search" className="btn btn-secondary">
                  🔍 Search Books
                </Link>
              </>
            ) : (
              <>
                <Link to="/signup" className="btn btn-primary">
                  🚀 Join BookHub
                </Link>
                <Link to="/login" className="btn btn-secondary">
                  👋 Sign In
                </Link>
              </>
            )}
          </div>
        </div>
      </section>

      {/* Content Section */}
      <div className="content-section">
        <div className="container">
          {/* Welcome Message for Logged Users */}
          {user && (
            <div className="welcome-message">
              <h2 className="welcome-title">Your Reading Journey Continues</h2>
              <p className="welcome-subtitle">
                Discover new books, share your thoughts, and connect with fellow book lovers
              </p>
            </div>
          )}

          {/* Featured Books Section */}
          <section className="featured-books">
            <div className="section-header">
              <h2 className="section-title">Featured Books</h2>
              <p className="section-subtitle">
                Discover the most popular and highly rated books in our collection
              </p>
            </div>

            <div className="books-grid">
              {Array.isArray(books) && books.length > 0 ? (
                books.slice(0, 6).map((book) => (
                  <div key={book._id} className="book-card">
                    <img
                      src={book.coverImage || "https://via.placeholder.com/300x400/667eea/ffffff?text=No+Cover"}
                      alt={book.title}
                      className="book-image"
                    />
                    <div className="book-info">
                      <h3 className="book-title">{book.title}</h3>
                      <p className="book-author">by {book.author}</p>
                      <div className="book-rating">
                        <span>⭐</span>
                        <span>{book.averageRating || "No ratings yet"}</span>
                      </div>
                      <Link to={`/book/${book._id}`} className="btn-outline">
                        View Details
                      </Link>
                    </div>
                  </div>
                ))
              ) : (
                <div className="empty-state">
                  <div className="empty-state-icon">📚</div>
                  <h3 className="empty-state-title">No Books Yet</h3>
                  <p className="empty-state-description">
                    Be the first to add a book to our collection!
                  </p>
                  {user && (
                    <Link to="/add-book" className="btn btn-primary">
                      Add First Book
                    </Link>
                  )}
                </div>
              )}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Home;
