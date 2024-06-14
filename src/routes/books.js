const express = require("express");
const {
  addBook,
  updateBook,
  deleteBook,
  listBooks,
} = require("../controllers/bookController");
const auth = require("../middlewares/auth");
const router = express.Router();

router.post("/", auth("admin"), addBook);
router.put("/:id", auth("admin"), updateBook);
router.delete("/:id", auth("admin"), deleteBook);
router.get("/", auth(), listBooks);

module.exports = router;
