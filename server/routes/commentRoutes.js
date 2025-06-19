const express = require("express");
const router = express.Router();

const {
  addComment,
  getCommentsByPost,
  deleteComment,
  getAllComments,
} = require("../controllers/commentController");
const { protect } = require("../middleware/authMiddleware");

router.get("/", getAllComments);
router.get("/:postId", getCommentsByPost);

// Admin only privileges
router.post("/:postId", protect, addComment);
router.delete("/:commentId", protect, deleteComment);

module.exports = router;
