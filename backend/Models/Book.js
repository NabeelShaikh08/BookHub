const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const BookSchema = new Schema({
  title: {
    type: String,
    required: true,
    trim: true,
  },
  author: {
    type: String,
    required: true,
    trim: true,
  },
  genre: {
    type: String,
    required: true,
    trim: true,
  },
  description: {
    type: String,
    required: true,
    trim: true,
  },
  publicationYear: {
    type: Number,
    required: true,
  },
  coverImage: {
    type: String,
    default: "https://via.placeholder.com/300x400?text=Book+Cover",
  },
  averageRating: {
    type: Number,
    default: 0,
  },
  totalReviews: {
    type: Number,
    default: 0,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// Update the updatedAt field before saving
BookSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

const BookModel = mongoose.model("books", BookSchema);
module.exports = BookModel;
