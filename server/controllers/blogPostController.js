const Blog = require("../models/blog");
const User = require("../models/user");
const mongoose = require("mongoose");

// Create a new blog post
// @route GET api/posts (admin only)
const createPost = async (req, res) => {
  try {
    const { title, content, coverImageUrl, tags, isDraft, generatedByAi } =
      req.body;
    const slug = title
      .toLowerCase()
      .replace(/ /g, "-")
      .replace(/[^\w-]+/g, "");

    const newPost = new Blog({
      title,
      slug,
      content,
      coverImageUrl,
      tags,
      author: req.user._id,
      isDraft,
      generatedByAi,
    });

    //save to db
    await newPost.save();
    return res.status(201).json({
      message: "Blog post created successfully",
      post: newPost,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//upate an blog post admin ony access
// @route PUT api/posts/:id
const updatePost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    // Check if the user is the author or an admin
    if (
      post.author.toString() !== req.user._id.toString() &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({
        message: "You are not authorized to update this post",
      });
    }
    const updatedData = req.body;
    //upade the slug if changed
    if (updatedData.title) {
      updatedData.slug = updatedData.title
        .toLowerCase()
        .replace(/ /g, "-")
        .replace(/[^\w-]+/g, "");
    }

    const updatePost = await Blog.findByIdAndUpdate(
      req.params.id,
      updatedData,
      { new: true }
    );

    res.status(200).json({
      message: "Blog post updated successfully",
      post: updatePost,
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// Delete a blog post
// @route DELETE api/posts/:id (admin only)
const deletePost = async (req, res) => {
  try {
    const post = await Blog.findById(req.params.id);
    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }
    await post.deleteOne();
    return res.status(200).json({
      message: "Blog post deleted successfully",
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

// get all posts by status  (published, drafts etc)
// @route GET api/posts?status=published|draft|all&page=1
const getAllPosts = async (req, res) => {
  try {
    const status = req.query.status || "published";
    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const skip = (page - 1) * limit;

    //filters for the posts
    let filter = {};
    if (status === "published") {
      filter.isDraft = false;
    } else if (status === "draft") {
      filter.isDraft = true;
    }

    //fetch paginated posts
    const posts = await Blog.find(filter)
      .populate("author", "name prfileImageUrl")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit);

    //count total for pagination and tabs count
    const { totalCount, allcount, publishedCount, draftCount } =
      await Promise.all([
        Blog.countDocuments(filter), //for current tab
        Blog.countDocuments(),
        Blog.countDocuments({ isDraft: false }),
        Blog.countDocuments({ isDraft: true }),
      ]);

    res.json({
      posts,
      page,
      totalPages: Math.ceil(totalCount / limit),
      totalCount,
      counts: {
        all: allcount,
        published: publishedCount,
        draft: draftCount,
      },
    });
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//get a single post by slug
// @route GET/api/posts/:slug
//public access

const getPostBySlug = async (req, res) => {
  try {
    const post = await Blog.findOne({ slug: req.params.slug }).populate(
      "author",
      "name profileImage"
    );
    if (!post) {
      return res.status(404).json({ message: "Post not found" });
    }

    res.status(200).json({
      post,
    });
  } catch (err) {
    return res.status(500).json({ message: err.message });
  }
};

//get post by tag
// route GET/api/posts/tag/:tag . public

const getPostByTag = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//search posts
// GET api/posts/search?q=keyword .  public

const searchPosts = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//increment post views
// PUT/api/posts/:id/view
const incrementView = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

//like a post
// POST/api/posts/:id/like
const likePost = async (req, res) => {
  try {
  } catch (err) {
    return res.status(500).json({
      message: err.message,
    });
  }
};

module.exports = {
  createPost,
  updatePost,
  deletePost,
  getAllPosts,
  getPostBySlug,
  getPostByTag,
  searchPosts,
  incrementView,
  likePost,
};
