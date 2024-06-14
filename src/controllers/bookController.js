const Book = require("../models/Book");

// Add Book
exports.addBook = async (req, res) => {
  const { title, author, ISBN, publication_date, genre, copies } = req.body;
  try {
    const book = new Book({
      title,
      author,
      ISBN,
      publication_date,
      genre,
      copies,
    });
    await book.save();
    res.status(201).json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Update Book
exports.updateBook = async (req, res) => {
  const { id } = req.params;
  const { title, author, ISBN, publication_date, genre, copies } = req.body;
  try {
    const book = await Book.findByIdAndUpdate(
      id,
      { title, author, ISBN, publication_date, genre, copies },
      { new: true }
    );
    res.json(book);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Delete Book
exports.deleteBook = async (req, res) => {
  const { id } = req.params;
  try {
    await Book.findByIdAndDelete(id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// List Books
exports.listBooks = async (req, res) => {
  const { page = 1, limit = 10, genre, author } = req.query;
  const query = {};
  if (genre) query.genre = genre;
  if (author) query.author = author;
  try {
    const books = await Book.find(query)
      .skip((page - 1) * limit)
      .limit(Number(limit));
    res.json(books);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};
