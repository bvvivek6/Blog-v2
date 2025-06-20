const Blog = require("../models/blog");
const Comment = require("../models/Comment");

const getDashboardData = async (req, res) => {
  try {
    const [totalPost, totalComments, drafts, published, aiGenerated] =
      await Promise.all([
        Blog.countDocuments({}),
        Comment.countDocuments({}),
        Blog.countDocuments({ status: "draft" }),
        Blog.countDocuments({ status: "published" }),
        Blog.countDocuments({ aiGenerated: true }),
      ]);

    const totalViewsAgg = await Blog.aggregate([
      { $group: { _id: null, totalViews: { $sum: "$views" } } },
    ]);

    const totalLikesAgg = await Blog.aggregate([
      { $group: { _id: null, totalLikes: { $sum: "$likes" } } },
    ]);

    const totalViews =
      totalViewsAgg.length > 0 ? totalViewsAgg[0].totalViews : 0;
    const totalLikes =
      totalLikesAgg.length > 0 ? totalLikesAgg[0].totalLikes : 0;

    //top performing posts
    const topPosts = await Blog.find({ status: "published" })
      .select("title coverImage views likes")
      .sort({ views: -1, likes: -1 })
      .limit(5);

    const recentComments = await Comment.find({})
      .sort({ createdAt: -1 })
      .limit(5)
      .populate("post", "title coverImageUrl")
      .populate("author", "name profileImage");

    //for pie chart visualization
    const tagUsage = await Blog.aggregate([
      { $unwind: "$tags" },
      { $group: { _id: "$tags", count: { $sum: 1 } } },
      { $project: { tag: "$_id", count: 1, _id: 0 } },
      { $sort: { count: -1 } },
    ]);

    res.status(200).json({
      stats: {
        totalPost,
        totalComments,
        drafts,
        published,
        aiGenerated,
        totalViews,
        totalLikes,
      },
      recentComments,
      tagUsage,
      topPosts,
    });
  } catch (err) {
    return res.status(500).json({
      message: "Server error",
      error: err.message,
    });
  }
};

module.exports = {
  getDashboardData,
};
