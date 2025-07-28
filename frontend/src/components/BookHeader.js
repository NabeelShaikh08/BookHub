import React from 'react';
import PropTypes from 'prop-types';
import './Components.css';

/**
 * BookHeader component displays the main book information
 * @param {Object} book - Book object containing title, author, genre, etc.
 * @param {Array} reviews - Array of reviews for calculating review count
 */
const BookHeader = ({ book, reviews }) => {
  const reviewCount = reviews?.length || 0;
  const averageRating = book?.averageRating || 0;

  return (
    <div className="book-header">
      <img
        src={book.coverImage || "/default-book-cover.jpg"}
        alt={`Cover of ${book.title}`}
        className="book-cover"
      />
      <div className="book-info">
        <h1 className="book-title">{book.title}</h1>
        <p className="book-author">by {book.author}</p>
        <span className="book-genre">{book.genre}</span>
        <div className="book-rating">
          <span className="rating-stars">★</span>
          <span className="rating-value">
            {averageRating > 0 ? averageRating.toFixed(1) : "No ratings"}
          </span>
          <span className="rating-count">({reviewCount} reviews)</span>
        </div>
        <p className="book-description">{book.description}</p>
      </div>
    </div>
  );
};

BookHeader.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
    genre: PropTypes.string.isRequired,
    description: PropTypes.string,
    coverImage: PropTypes.string,
    averageRating: PropTypes.number,
  }).isRequired,
  reviews: PropTypes.array.isRequired,
};

export default BookHeader;
