const express = require("express");
const router = express.Router();
const { protect } = require("../middlewares/authMiddleware"); //authenticated or not
const { getDashboardData } = require("../controllers/dashboardController");

//admin only allowed
const adminOnly = (req, res, next) => {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    return res.status(403).json({ message: "Access denied, admin only" });
  }
};

router.get("/", protect, adminOnly, getDashboardData);

module.exports = router;
