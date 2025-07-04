const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware");
const {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  getPostByTag,
  searchPosts,
  incrementViews,
  likePost,
  getTopPosts,
} = require("../controllers/blogPostController");

//admin only
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({ message: "Access denied, admin only" });
  }
};

//admin only privileges
router.post("/", protect, adminOnly, createPost);
router.put("/:id", protect, adminOnly, updatePost);
router.delete("/:id", protect, adminOnly, deletePost);

// //public routes
router.post("/:id/like", protect, likePost);
router.get("/", getAllPosts);
router.get("/slug/:slug", getPostBySlug);
router.get("/tag/:tag", getPostByTag);
router.get("/search", searchPosts);
router.post("/:id/views", incrementViews);
router.get("/trending", getTopPosts);

module.exports = router;
