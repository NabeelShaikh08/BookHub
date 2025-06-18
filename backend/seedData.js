const mongoose = require("mongoose");
const BookModel = require("./Models/Book");
require("dotenv").config();

const sampleBooks = [
  {
    title: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    genre: "Classic",
    description:
      "A story of the fabulously wealthy Jay Gatsby and his love for the beautiful Daisy Buchanan.",
    publicationYear: 1925,
    coverImage:
      "https://images.unsplash.com/photo-1544947950-fa07a98d237f?w=300&h=400&fit=crop",
  },
  {
    title: "To Kill a Mockingbird",
    author: "Harper Lee",
    genre: "Fiction",
    description:
      "The story of young Scout Finch and her father Atticus in a racially divided Alabama town.",
    publicationYear: 1960,
    coverImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=300&h=400&fit=crop",
  },
  {
    title: "1984",
    author: "George Orwell",
    genre: "Dystopian",
    description:
      "A dystopian novel about totalitarianism and surveillance society.",
    publicationYear: 1949,
    coverImage:
      "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=300&h=400&fit=crop",
  },
  {
    title: "Pride and Prejudice",
    author: "Jane Austen",
    genre: "Romance",
    description:
      "The story of Elizabeth Bennet and Mr. Darcy in 19th century England.",
    publicationYear: 1813,
    coverImage:
      "https://images.unsplash.com/photo-1516979187457-637abb4f9353?w=300&h=400&fit=crop",
  },
  {
    title: "The Hobbit",
    author: "J.R.R. Tolkien",
    genre: "Fantasy",
    description:
      "Bilbo Baggins embarks on an adventure with thirteen dwarves to reclaim their homeland.",
    publicationYear: 1937,
    coverImage:
      "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop",
  },
  {
    title: "The Catcher in the Rye",
    author: "J.D. Salinger",
    genre: "Coming-of-age",
    description:
      "Holden Caulfield's journey through New York City and his struggle with adolescence.",
    publicationYear: 1951,
    coverImage:
      "https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=300&h=400&fit=crop",
  },
  {
    title: "Lord of the Flies",
    author: "William Golding",
    genre: "Allegory",
    description: "A group of boys stranded on an island descend into savagery.",
    publicationYear: 1954,
    coverImage:
      "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=300&h=400&fit=crop",
  },
  {
    title: "Animal Farm",
    author: "George Orwell",
    genre: "Political Satire",
    description:
      "An allegorical novella about farm animals who rebel against their human farmer.",
    publicationYear: 1945,
    coverImage:
      "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=300&h=400&fit=crop",
  },
];

const seedDatabase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_CONN);
    console.log("Connected to MongoDB");

    // Clear existing books
    await BookModel.deleteMany({});
    console.log("Cleared existing books");

    // Insert sample books
    const insertedBooks = await BookModel.insertMany(sampleBooks);
    console.log(`Inserted ${insertedBooks.length} books`);

    console.log("Database seeded successfully!");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
};

seedDatabase();
