import React from 'react';
import PropTypes from 'prop-types';
import RatingSelect from './RatingSelect';
import './Components.css';

/**
 * EditReviewForm component for editing existing reviews
 * @param {Object} reviewData - Current review data being edited
 * @param {function} onReviewChange - Callback for review data changes
 * @param {function} onSubmit - Callback for form submission
 * @param {function} onCancel - Callback for canceling edit
 * @param {boolean} isSubmitting - Loading state for form submission
 */
const EditReviewForm = ({ 
  reviewData, 
  onReviewChange, 
  onSubmit, 
  onCancel, 
  isSubmitting = false 
}) => {
  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit();
  };

  const handleRatingChange = (rating) => {
    onReviewChange({ ...reviewData, rating });
  };

  const handleCommentChange = (e) => {
    onReviewChange({ ...reviewData, comment: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="edit-review-form">
      <div className="form-group">
        <label htmlFor="edit-rating" className="form-label">
          Rating:
        </label>
        <RatingSelect
          name="edit-rating"
          value={reviewData.rating}
          onChange={handleRatingChange}
        />
      </div>

      <div className="form-group">
        <label htmlFor="edit-comment" className="form-label">
          Comment:
        </label>
        <textarea
          id="edit-comment"
          name="comment"
          value={reviewData.comment}
          onChange={handleCommentChange}
          required
          className="form-textarea"
          rows="4"
        />
      </div>

      <div className="form-actions">
        <button 
          type="submit" 
          className="btn btn-primary"
          disabled={isSubmitting || !reviewData.comment.trim()}
        >
          {isSubmitting ? 'Updating...' : 'Update Review'}
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="btn btn-secondary"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </div>
    </form>
  );
};

EditReviewForm.propTypes = {
  reviewData: PropTypes.shape({
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
  }).isRequired,
  onReviewChange: PropTypes.func.isRequired,
  onSubmit: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

export default EditReviewForm;
