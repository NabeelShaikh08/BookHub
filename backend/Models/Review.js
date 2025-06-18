const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ReviewSchema = new Schema({
  book: {
    type: Schema.Types.ObjectId,
    ref: "books",
    required: true,
  },
  user: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5,
  },
  comment: {
    type: String,
    required: true,
    trim: true,
    maxlength: 1000,
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
ReviewSchema.pre("save", function (next) {
  this.updatedAt = Date.now();
  next();
});

// Ensure one review per user per book
ReviewSchema.index({ book: 1, user: 1 }, { unique: true });

const ReviewModel = mongoose.model("reviews", ReviewSchema);
module.exports = ReviewModel;
