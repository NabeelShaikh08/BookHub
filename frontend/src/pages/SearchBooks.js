import React, { useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import "./SearchBooks.css";

const SearchBooks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [genre, setGenre] = useState("");
  const [books, setBooks] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append("search", searchTerm);
      if (genre) params.append("genre", genre);

      const response = await api.get(`/books/search?${params}`);
      // Backend returns { success: true, data: books, ... }
      setBooks(response.data.data || []);
    } catch (error) {
      console.error("Error searching books:", error);
      setBooks([]); // Set empty array on error
    } finally {
      setLoading(false);
    }
  };

  const handleClear = () => {
    setSearchTerm("");
    setGenre("");
    setBooks([]);
  };

  return (
    <div className="search-books">
      <div className="search-container">
        <h2>Search Books</h2>

        <form onSubmit={handleSearch} className="search-form">
          <div className="search-inputs">
            <div className="form-group">
              <label htmlFor="searchTerm">Search by title or author</label>
              <input
                type="text"
                id="searchTerm"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Enter book title or author..."
              />
            </div>

            <div className="form-group">
              <label htmlFor="genre">Filter by genre</label>
              <select
                id="genre"
                value={genre}
                onChange={(e) => setGenre(e.target.value)}
              >
                <option value="">All genres</option>
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Mystery">Mystery</option>
                <option value="Romance">Romance</option>
                <option value="Science Fiction">Science Fiction</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
                <option value="History">History</option>
                <option value="Self-Help">Self-Help</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="search-actions">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? "Searching..." : "Search"}
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              onClick={handleClear}
            >
              Clear
            </button>
          </div>
        </form>

        {books.length > 0 && (
          <div className="search-results">
            <h3>Search Results ({books.length} books found)</h3>
            <div className="books-grid">
              {books.map((book) => (
                <div key={book._id} className="book-card">
                  <img
                    src={book.coverImage || "/default-book-cover.jpg"}
                    alt={book.title}
                  />
                  <div className="book-info">
                    <h3>{book.title}</h3>
                    <p className="author">by {book.author}</p>
                    <p className="genre">{book.genre}</p>
                    <p className="rating">
                      ★ {book.averageRating || "No ratings"}
                    </p>
                    <Link to={`/book/${book._id}`} className="btn btn-outline">
                      View Details
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {books.length === 0 && !loading && searchTerm && (
          <div className="no-results">
            <p>No books found matching your search criteria.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchBooks;
