import React from 'react';
import PropTypes from 'prop-types';
import EditReviewForm from './EditReviewForm';
import './Components.css';

/**
 * ReviewCard component for displaying individual reviews
 * @param {Object} review - Review object containing user, rating, comment, etc.
 * @param {Object} currentUser - Current logged-in user object
 * @param {string} editingReviewId - ID of review currently being edited
 * @param {Object} editReviewData - Data for review being edited
 * @param {function} onEdit - Callback when user clicks edit button
 * @param {function} onDelete - Callback when user clicks delete button
 * @param {function} onEditSubmit - Callback for submitting edited review
 * @param {function} onEditCancel - Callback for canceling edit
 * @param {function} onEditChange - Callback for changing edit data
 * @param {boolean} isSubmitting - Loading state for submissions
 */
const ReviewCard = ({
  review,
  currentUser,
  editingReviewId,
  editReviewData,
  onEdit,
  onDelete,
  onEditSubmit,
  onEditCancel,
  onEditChange,
  isSubmitting = false
}) => {
  const isOwnReview = currentUser && currentUser._id === review.user._id;
  const isEditing = editingReviewId === review._id;

  const handleEdit = () => {
    onEdit(review._id);
  };

  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      onDelete(review._id);
    }
  };

  return (
    <div className="review-card">
      <div className="review-header">
        <div className="reviewer-info">
          <strong>{review.user.username}</strong>
          <div className="review-rating">
            {'★'.repeat(review.rating)}{'☆'.repeat(5 - review.rating)}
            <span className="rating-number">({review.rating}/5)</span>
          </div>
        </div>
        {isOwnReview && (
          <div className="review-actions">
            <button 
              onClick={handleEdit} 
              className="btn btn-edit"
              disabled={isSubmitting}
            >
              Edit
            </button>
            <button 
              onClick={handleDelete} 
              className="btn btn-delete"
              disabled={isSubmitting}
            >
              Delete
            </button>
          </div>
        )}
      </div>

      <div className="review-content">
        {isEditing ? (
          <EditReviewForm
            reviewData={editReviewData}
            onReviewChange={onEditChange}
            onSubmit={onEditSubmit}
            onCancel={onEditCancel}
            isSubmitting={isSubmitting}
          />
        ) : (
          <p className="review-comment">{review.comment}</p>
        )}
      </div>

      {review.createdAt && (
        <div className="review-date">
          {new Date(review.createdAt).toLocaleDateString()}
        </div>
      )}
    </div>
  );
};

ReviewCard.propTypes = {
  review: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    user: PropTypes.shape({
      _id: PropTypes.string.isRequired,
      username: PropTypes.string.isRequired,
    }).isRequired,
    rating: PropTypes.number.isRequired,
    comment: PropTypes.string.isRequired,
    createdAt: PropTypes.string,
  }).isRequired,
  currentUser: PropTypes.shape({
    _id: PropTypes.string.isRequired,
  }),
  editingReviewId: PropTypes.string,
  editReviewData: PropTypes.shape({
    rating: PropTypes.number,
    comment: PropTypes.string,
  }),
  onEdit: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired,
  onEditSubmit: PropTypes.func.isRequired,
  onEditCancel: PropTypes.func.isRequired,
  onEditChange: PropTypes.func.isRequired,
  isSubmitting: PropTypes.bool,
};

export default ReviewCard;
