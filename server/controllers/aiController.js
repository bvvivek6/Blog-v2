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
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      content: prompt,
    });
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
    const { topics } = req.body;
    if (!topics) {
      return res.status(400).json({
        message: "Topics must be a non-empty array",
      });
    }

    const prompt = blogPostIdeasPrompt(topics);
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-lite" });
    const result = await model.generateContent(prompt);
    const rawText = result.response.text();

    let cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    let data;
    try {
      data = JSON.parse(cleanText);
    } catch (e) {
      // fallback: try to return the raw text if not valid JSON
      return res.status(200).json({
        message: "Blog post ideas generated (not valid JSON)",
        data: cleanText,
      });
    }

    res.status(200).json({
      message: "Blog post ideas generated successfully",
      data: data,
    });
  } catch (err) {
    res.status(500).json({
      message: "Error generating blog post ideas",
      error: err.message,
    });
  }
};

const generateCommentReply = async (req, res) => {
  try {
    const { author, content } = req.body;

    if (!author || !content) {
      return res.status(400).json({
        message: "Author and content are required",
      });
    }

    const prompt = generateReplyPrompt(author, content);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      content: prompt,
    });

    const result = await model.generateContent(prompt);
    let rawText = result.response.text();

    res.status(200).json({
      message: "Comment reply generated successfully",
      content: rawText,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Error generating comment reply",
      error: err.message,
    });
  }
};

const generatePostSummary = async (req, res) => {
  try {
    const { content } = req.body;
    if (!content) {
      return res.status(400).json({
        message: "Content is required",
      });
    }
    const prompt = blogSummaryPrompt(content);
    const model = genAI.getGenerativeModel({
      model: "gemini-2.0-flash-lite",
      content: prompt,
    });

    const result = await model.generateContent(prompt);
    let rawText = result.response.text();
    let cleanText = rawText
      .replace(/^```json\s*/, "")
      .replace(/```$/, "")
      .trim();

    const data = JSON.parse(cleanText);
    return res.status(200).json({
      message: "Post summary generated successfully",
      data: {
        title: data.title,
        summary: data.summary,
        whatYouWillLearn: data["What You'll Learn"],
      },
    });
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
