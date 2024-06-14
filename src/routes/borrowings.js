const express = require("express");
const {
  borrowBook,
  returnBook,
  borrowHistory,
  getMostBorrowedBooks,
  getMostActiveMembers,
  getBookAvailability,
} = require("../controllers/borrowingController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/borrow", auth("member"), borrowBook);
router.post("/return", auth("member"), returnBook);
router.get("/history", auth("member"), borrowHistory);
router.get("/most-borrowed-books", auth("admin"), getMostBorrowedBooks);
router.get("/most-active-members", auth("admin"), getMostActiveMembers);
router.get("/book-availability", auth("admin"), getBookAvailability);

module.exports = router;
