// Controller for review-related operations
const ReviewModel = require("../Models/Review");
const BookModel = require("../Models/Book");

// Submit a review (Authenticated users only, one review per user per book)
const addReview = async (req, res) => {
  try {
    const { bookId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    // Check if book exists
    const book = await BookModel.findById(bookId);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }

    // Check if user already reviewed this book
    const existingReview = await ReviewModel.findOne({
      book: bookId,
      user: userId,
    });
    if (existingReview) {
      return res.status(400).json({
        success: false,
        message: "You have already reviewed this book",
      });
    }

    // Create and save new review
    const review = new ReviewModel({
      book: bookId,
      user: userId,
      rating,
      comment,
    });

    await review.save();

    // Update book's average rating and total reviews
    const allReviews = await ReviewModel.find({ book: bookId });
    const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
    const averageRating = totalRating / allReviews.length;

    await BookModel.findByIdAndUpdate(bookId, {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: allReviews.length,
    });

    // Populate user info for response
    await review.populate("user", "_id name");

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      data: review,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding review",
      error: error.message,
    });
  }
};

// Update your own review
const updateReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const { rating, comment } = req.body;
    const userId = req.user._id;

    console.log("Update Review Request:", { reviewId, rating, comment, userId });

    // Find review by ID
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      console.log("Review not found:", reviewId);
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    console.log("Found review:", {
      reviewId: review._id,
      reviewUserId: review.user,
      requestUserId: userId,
    });

    // Check if user owns this review
    if (review.user.toString() !== userId.toString()) {
      console.log("User does not own review:", {
        reviewUserId: review.user.toString(),
        requestUserId: userId.toString(),
      });
      return res.status(403).json({
        success: false,
        message: "You can only update your own reviews",
      });
    }

    // Update review fields
    review.rating = rating;
    review.comment = comment;
    await review.save();

    // Update book's average rating
    const allReviews = await ReviewModel.find({ book: review.book });
    const totalRating = allReviews.reduce((sum, rev) => sum + rev.rating, 0);
    const averageRating = totalRating / allReviews.length;

    await BookModel.findByIdAndUpdate(review.book, {
      averageRating: Math.round(averageRating * 10) / 10,
    });

    await review.populate("user", "_id name");

    console.log("Review updated successfully:", review._id);

    res.json({
      success: true,
      message: "Review updated successfully",
      data: review,
    });
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({
      success: false,
      message: "Error updating review",
      error: error.message,
    });
  }
};

// Delete your own review
const deleteReview = async (req, res) => {
  try {
    const { reviewId } = req.params;
    const userId = req.user._id;

    console.log("Delete Review Request:", { reviewId, userId });

    // Find review by ID
    const review = await ReviewModel.findById(reviewId);
    if (!review) {
      console.log("Review not found:", reviewId);
      return res.status(404).json({
        success: false,
        message: "Review not found",
      });
    }

    console.log("Found review:", {
      reviewId: review._id,
      reviewUserId: review.user,
      requestUserId: userId,
    });

    // Check if user owns this review
    if (review.user.toString() !== userId.toString()) {
      console.log("User does not own review:", {
        reviewUserId: review.user.toString(),
        requestUserId: userId.toString(),
      });
      return res.status(403).json({
        success: false,
        message: "You can only delete your own reviews",
      });
    }

    const bookId = review.book;
    await ReviewModel.findByIdAndDelete(reviewId);

    // Update book's average rating and total reviews
    const remainingReviews = await ReviewModel.find({ book: bookId });
    let averageRating = 0;
    if (remainingReviews.length > 0) {
      const totalRating = remainingReviews.reduce(
        (sum, rev) => sum + rev.rating,
        0
      );
      averageRating = totalRating / remainingReviews.length;
    }

    await BookModel.findByIdAndUpdate(bookId, {
      averageRating: Math.round(averageRating * 10) / 10,
      totalReviews: remainingReviews.length,
    });

    console.log("Review deleted successfully:", reviewId);

    res.json({
      success: true,
      message: "Review deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({
      success: false,
      message: "Error deleting review",
      error: error.message,
    });
  }
};

module.exports = {
  addReview,
  updateReview,
  deleteReview,
};
