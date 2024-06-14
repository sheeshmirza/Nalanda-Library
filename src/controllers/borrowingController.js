const Book = require("../models/Book");
const Borrowing = require("../models/Borrowing");

// Borrow Book
exports.borrowBook = async (req, res) => {
  const { book_id } = req.body;
  const user_id = req.user.userId;
  try {
    const book = await Book.findById(book_id);
    if (book.copies < 1) {
      return res.status(400).json({ error: "No copies available" });
    }
    const borrowing = new Borrowing({ user_id, book_id });
    await borrowing.save();
    book.copies -= 1;
    await book.save();
    res.status(201).json({ message: "Book borrowed successfully", borrowing });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Return Book
exports.returnBook = async (req, res) => {
  const { borrowing_id } = req.body;
  try {
    const borrowing = await Borrowing.findById(borrowing_id);
    if (!borrowing) {
      return res.status(404).json({ error: "Borrowing record not found" });
    }
    borrowing.return_date = new Date();
    borrowing.status = "returned";
    await borrowing.save();
    const book = await Book.findById(borrowing.book_id);
    book.copies += 1;
    await book.save();
    res.json({ message: "Book returned successfully" });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Borrow History
exports.borrowHistory = async (req, res) => {
  const user_id = req.user.userId;
  try {
    const history = await Borrowing.find({ user_id }).populate(
      "book_id",
      "title author"
    );
    res.json(history);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

// Most Borrowed Books
exports.getMostBorrowedBooks = async (req, res) => {
  try {
    const mostBorrowedBooks = await Borrowing.aggregate([
      { $group: { _id: "$book_id", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "books",
          localField: "_id",
          foreignField: "_id",
          as: "bookDetails",
        },
      },
      { $unwind: "$bookDetails" },
      {
        $project: {
          _id: 0,
          title: "$bookDetails.title",
          author: "$bookDetails.author",
          borrowCount: 1,
        },
      },
    ]);
    res.json(mostBorrowedBooks);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Most Active Members
exports.getMostActiveMembers = async (req, res) => {
  try {
    const mostActiveMembers = await Borrowing.aggregate([
      { $group: { _id: "$user_id", borrowCount: { $sum: 1 } } },
      { $sort: { borrowCount: -1 } },
      { $limit: 10 },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userDetails",
        },
      },
      { $unwind: "$userDetails" },
      {
        $project: {
          _id: 0,
          name: "$userDetails.name",
          email: "$userDetails.email",
          borrowCount: 1,
        },
      },
    ]);
    res.json(mostActiveMembers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Book Availability
exports.getBookAvailability = async (req, res) => {
  try {
    const totalBooks = await Book.countDocuments({});
    const borrowedBooks = await Borrowing.countDocuments({
      status: "borrowed",
    });
    const availableBooks = totalBooks - borrowedBooks;
    res.json({
      totalBooks,
      borrowedBooks,
      availableBooks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
