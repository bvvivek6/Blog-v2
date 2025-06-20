const Comment = require("../models/Comment");
const Blog = require("../models/blog");

const addComment = async (req, res) => {
  try {
    const { postId } = req.params;
    const { content, parentComment } = req.body;

    const post = await Blog.findById(postId); // Fixed typo here
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
    await comment.save(); // Save the comment to the database
    res.status(201).json({
      message: "Comment added successfully",
      comment,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message || "Server error" });
  }
};

const getAllComments = async (req, res) => {
  try {
    //get all comments with populated post and author
    const comments = await Comment.find()
      .populate("author", "name profileImage")
      .populate("post", "title coverImage")
      .sort({ createdAt: 1 });

    //comments map for commentId->comment Object
    const commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject();
      comment.replies = [];
      commentMap[comment._id] = comment;
    });

    //nest replies under the parent comment
    const nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });

    res.status(200).json({
      message: "Comments fetched successfully",
      comments: nestedComments,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

const getCommentsByPost = async (req, res) => {
  try {
    const { postId } = req.params;
    const comments = await Comment.find({ post: postId })
      .populate("author", "name profileImage")
      .populate("post", "title coverImage")
      .sort({ createdAt: 1 });

    const commentMap = {};
    comments.forEach((comment) => {
      comment = comment.toObject();
      comment.replies = [];
      commentMap[comment._id] = comment;
    });
    //nest replies under the parent comment
    const nestedComments = [];
    comments.forEach((comment) => {
      if (comment.parentComment) {
        const parent = commentMap[comment.parentComment];
        if (parent) {
          parent.replies.push(commentMap[comment._id]);
        }
      } else {
        nestedComments.push(commentMap[comment._id]);
      }
    });
    res.status(200).json({
      message: "Comments fetched successfully",
      comments: nestedComments,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//author or admin only
const deleteComment = async (req, res) => {
  try {
    const { commentId } = req.params;
    const comment = await Comment.findById(commentId); // Fixed typo here
    if (!comment) {
      return res.status(404).json({ message: "Comment not found" });
    }

    await Comment.deleteOne({ _id: commentId });
    //delete all its replies
    await Comment.deleteMany({ parentComment: commentId });

    res.status(200).json({ message: "Comment deleted successfully" });
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
