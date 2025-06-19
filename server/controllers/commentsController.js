const Comment = require("../models/Comment");
const Blog = require("../models/BlogPost");

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;

    const post = await Blog.findBYId(postId);
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    const comment = new Comment({
      post: postId,
      author: req.user._id,
      content,
      parentComment: parentComment || null,
    });

    await comment.populate("author", "name profileImage");
    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: "Server error" || err.message });
  }
};

const getAllComments = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//author or admin only
const deleteComment = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

module.exports = {
  addComment,
  getAllComments,
  getCommentsByPost,
  deleteComment,
};
