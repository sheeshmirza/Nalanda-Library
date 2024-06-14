const mongoose = require("mongoose");

const borrowingSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  book_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "books",
    required: true,
  },
  borrow_date: {
    type: Date,
    default: Date.now,
  },
  return_date: {
    type: Date,
  },
  status: {
    type: String,
    enum: ["borrowed", "returned"],
    default: "borrowed",
  },
});

const Borrowing = mongoose.model("borrowings", borrowingSchema);

module.exports = Borrowing;
