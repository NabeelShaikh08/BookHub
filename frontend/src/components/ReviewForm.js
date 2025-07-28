import React from 'react';
import PropTypes from 'prop-types';
import RatingSelect from './RatingSelect';
import './Components.css';

/**
 * ReviewForm component for adding new reviews
 * @param {Object} reviewData - Current review data (rating, comment)
 * @param {function} onReviewChange - Callback for review data changes
 * @param {function} onSubmit - Callback for form submission
 * @param {boolean} isSubmitting - Loading state for form submission
 */
const ReviewForm = ({ reviewData, onReviewChange, onSubmit, isSubmitting = false }) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(reviewData);
  };

  const handleRatingChange = (rating) => {
    onReviewChange({ ...reviewData, rating });
  };

  const handleCommentChange = (e) => {
    onReviewChange({ ...reviewData, comment: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="review-form">
      <h3 className="form-title">Write a Review</h3>
      
      <div className="form-group">
        <label htmlFor="review-rating" className="form-label">
          Rating:
        </label>
        <RatingSelect
          name="review-rating"
          value={reviewData.rating}
          onChange={handleRatingChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="review-comment" className="form-label">
          Comment:
        </label>
        <textarea
          id="review-comment"
          name="comment"
          value={reviewData.comment}
          onChange={handleCommentChange}
          required
          placeholder="Share your thoughts about this book..."
          className="form-textarea"
          rows="4"
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting || !reviewData.comment.trim()}
      >
        {isSubmitting ? 'Submitting...' : 'Submit Review'}
      </button>
    </form>
  );
};

ReviewForm.propTypes = {
  reviewData: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
  onReviewChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

export default ReviewForm;
