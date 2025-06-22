const { GoogleGenerativeAI } = require("@google/generative-ai");
const express = require("express");
const router = express.Router();

const {
  blogPostIdeasPrompt,
  generateReplyPrompt,
  blogSummaryPrompt,
} = require("../utils/prompts");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const generateBlogPost = async (req, res) => {
  try {
    const { title, tone } = req.body;
    if (!title || !tone) {
      return res.status(400).json({
        message: "Title and tone are required",
      });
    }

    const prompt = `Write a markdown formatted ${tone} blog post about "${title}". The post should be engaging, informative, and suitable for a general audience.`;
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    if (!rawText) {
      return res.status(500).json({
        message: "No content generated",
      });
    }
    res.status(200).json({
      message: "Blog post generated successfully",
      content: rawText,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error generating blog post",
      error: err.message,
    });
  }
};

const generateBlogPostIdeas = async (req, res) => {
  try {
    // Implement your logic here
  } catch (err) {
    res.status(500).json({
      message: "Error generating blog post ideas",
      error: err.message,
    });
  }
};

const generateCommentReply = async (req, res) => {
  try {
    // Implement your logic here
  } catch (err) {
    return res.status(500).json({
      message: "Error generating comment reply",
      error: err.message,
    });
  }
};

const generatePostSummary = async (req, res) => {
  try {
    // Implement your logic here
  } catch (err) {
    return res.status(500).json({
      message: "Error generating post summary",
      error: err.message,
    });
  }
};
module.exports = {
  generateBlogPost,
  generateBlogPostIdeas,
  generateCommentReply,
  generatePostSummary,
};
