// Controller for book-related operations
const BookModel = require("../Models/Book");
const ReviewModel = require("../Models/Review");

// Add a new book (Authenticated users only)
const addBook = async (req, res) => {
  try {
    const { title, author, genre, description, publicationYear, coverImage } =
      req.body;
    // Create new book document
    const book = new BookModel({
      title,
      author,
      genre,
      description,
      publicationYear,
      coverImage: coverImage || undefined,
    });
    await book.save();
    res.status(201).json({
      success: true,
      message: "Book added successfully",
      data: book,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error adding book",
      error: error.message,
    });
  }
};

// Get all books with pagination and filters
const getAllBooks = async (req, res) => {
  try {
    const {
      page = 1,
      limit = 10,
      author,
      genre,
      sortBy = "createdAt",
      sortOrder = "desc",
    } = req.query;
    // Build filter and sort objects
    const filter = {};
    if (author) filter.author = { $regex: author, $options: "i" };
    if (genre) filter.genre = { $regex: genre, $options: "i" };
    const sort = {};
    sort[sortBy] = sortOrder === "desc" ? -1 : 1;
    // Query books
    const books = await BookModel.find(filter)
      .sort(sort)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const total = await BookModel.countDocuments(filter);
    res.json({
      success: true,
      data: books,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBooks: total,
        booksPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching books",
      error: error.message,
    });
  }
};

// Get book details by ID with reviews
const getBookById = async (req, res) => {
  try {
    const { id } = req.params;
    const { page = 1, limit = 5 } = req.query;
    // Find book by ID
    const book = await BookModel.findById(id);
    if (!book) {
      return res.status(404).json({
        success: false,
        message: "Book not found",
      });
    }
    // Get reviews for the book, paginated
    const reviews = await ReviewModel.find({ book: id })
      .populate("user", "_id name")
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const totalReviews = await ReviewModel.countDocuments({ book: id });
    res.json({
      success: true,
      data: {
        book,
        reviews,
        pagination: {
          currentPage: parseInt(page),
          totalPages: Math.ceil(totalReviews / limit),
          totalReviews,
          reviewsPerPage: parseInt(limit),
        },
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching book",
      error: error.message,
    });
  }
};

// Search books by title or author
const searchBooks = async (req, res) => {
  try {
    const { q, page = 1, limit = 10 } = req.query;
    if (!q) {
      return res.status(400).json({
        success: false,
        message: "Search query is required",
      });
    }
    // Build search filter
    const searchRegex = { $regex: q, $options: "i" };
    const filter = {
      $or: [{ title: searchRegex }, { author: searchRegex }],
    };
    // Query books
    const books = await BookModel.find(filter)
      .sort({ createdAt: -1 })
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .exec();
    const total = await BookModel.countDocuments(filter);
    res.json({
      success: true,
      data: books,
      pagination: {
        currentPage: parseInt(page),
        totalPages: Math.ceil(total / limit),
        totalBooks: total,
        booksPerPage: parseInt(limit),
      },
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error searching books",
      error: error.message,
    });
  }
};

module.exports = {
  addBook,
  getAllBooks,
  getBookById,
  searchBooks,
};
