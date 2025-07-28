import React, { useState, useEffect, useCallback } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import api from "../services/api";
import { BookHeader, ReviewForm, ReviewList } from "../components";
import "./BookDetails.css";

const BookDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const [editingReviewId, setEditingReviewId] = useState(null);
  const [editReviewData, setEditReviewData] = useState({ rating: 5, comment: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const fetchBookDetails = useCallback(async () => {
    try {
      setLoading(true);
      const bookResponse = await api.get(`/books/${id}`);
      // Backend returns { success: true, data: { book, reviews, pagination } }
      const { book, reviews } = bookResponse.data.data;
      setBook(book);
      setReviews(reviews || []);
    } catch (error) {
      console.error("Error fetching book details:", error);
    } finally {
      setLoading(false);
    }
  }, [id]);

  useEffect(() => {
    fetchBookDetails();
  }, [fetchBookDetails]);

  const handleReviewSubmit = async (reviewData) => {
    try {
      setIsSubmitting(true);
      await api.post(`/books/${id}/reviews`, reviewData);
      setNewReview({ rating: 5, comment: "" });
      await fetchBookDetails(); // Refresh reviews
    } catch (error) {
      console.error("Error submitting review:", error);
      alert("Failed to submit review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleEditReview = (reviewId) => {
    const review = reviews.find(r => r._id === reviewId);
    if (review) {
      setEditingReviewId(reviewId);
      setEditReviewData({ rating: review.rating, comment: review.comment });
    }
  };

  const handleUpdateReview = async () => {
    try {
      setIsSubmitting(true);
      await api.put(`/books/${id}/reviews/${editingReviewId}`, editReviewData);
      setEditingReviewId(null);
      setEditReviewData({ rating: 5, comment: "" });
      await fetchBookDetails(); // Refresh reviews
    } catch (error) {
      console.error("Error updating review:", error);
      alert("Failed to update review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDeleteReview = async (reviewId) => {
    try {
      setIsSubmitting(true);
      await api.delete(`/books/${id}/reviews/${reviewId}`);
      await fetchBookDetails(); // Refresh reviews
    } catch (error) {
      console.error("Error deleting review:", error);
      alert("Failed to delete review. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCancelEdit = () => {
    setEditingReviewId(null);
    setEditReviewData({ rating: 5, comment: "" });
  };

  if (loading) {
    return <div className="loading">Loading...</div>;
  }

  if (!book) {
    return <div className="error">Book not found</div>;
  }

  return (
    <div className="book-details">
      <BookHeader book={book} reviewCount={reviews.length} />

      <div className="reviews-section">
        <h2>Reviews</h2>

        {user && (
          <ReviewForm
            reviewData={newReview}
            onReviewChange={setNewReview}
            onSubmit={handleReviewSubmit}
            isSubmitting={isSubmitting}
          />
        )}

        <ReviewList
          reviews={reviews}
          currentUser={user}
          editingReviewId={editingReviewId}
          editReviewData={editReviewData}
          onEdit={handleEditReview}
          onDelete={handleDeleteReview}
          onEditSubmit={handleUpdateReview}
          onEditCancel={handleCancelEdit}
          onEditChange={setEditReviewData}
          isSubmitting={isSubmitting}
        />
      </div>
    </div>
  );
};

export default BookDetails;
