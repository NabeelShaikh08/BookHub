import React from 'react';
import PropTypes from 'prop-types';
import ReviewCard from './ReviewCard';
import './Components.css';

/**
 * ReviewList component for displaying a list of reviews
 * @param {Array} reviews - Array of review objects
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
const ReviewList = ({
  reviews,
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
  if (!reviews || reviews.length === 0) {
    return (
      <div className="no-reviews">
        <p>No reviews yet. Be the first to review this book!</p>
      </div>
    );
  }

  return (
    <div className="reviews-list">
      <h3>Reviews ({reviews.length})</h3>
      <div className="reviews-container">
        {reviews.map((review) => (
          <ReviewCard
            key={review._id}
            review={review}
            currentUser={currentUser}
            editingReviewId={editingReviewId}
            editReviewData={editReviewData}
            onEdit={onEdit}
            onDelete={onDelete}
            onEditSubmit={onEditSubmit}
            onEditCancel={onEditCancel}
            onEditChange={onEditChange}
            isSubmitting={isSubmitting}
          />
        ))}
      </div>
    </div>
  );
};

ReviewList.propTypes = {
  reviews: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      user: PropTypes.shape({
        _id: PropTypes.string.isRequired,
        username: PropTypes.string.isRequired,
      }).isRequired,
      rating: PropTypes.number.isRequired,
      comment: PropTypes.string.isRequired,
      createdAt: PropTypes.string,
    })
  ).isRequired,
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

export default ReviewList;
