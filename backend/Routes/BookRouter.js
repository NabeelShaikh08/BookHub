const express = require("express");
const router = express.Router();
const BookController = require("../Controllers/BookController");
const ReviewController = require("../Controllers/ReviewController");
const authMiddleware = require("../Middlewares/AuthMiddleware");

// Book routes
router.post("/", authMiddleware, BookController.addBook);
router.get("/", BookController.getAllBooks);
router.get("/search", BookController.searchBooks);
router.get("/:id", BookController.getBookById);

// Review routes - these should match the frontend API calls
router.post("/:bookId/reviews", authMiddleware, ReviewController.addReview);
router.put("/:bookId/reviews/:reviewId", authMiddleware, ReviewController.updateReview);
router.delete("/:bookId/reviews/:reviewId", authMiddleware, ReviewController.deleteReview);

module.exports = router;
