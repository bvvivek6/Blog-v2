const dotenv = require("dotenv").config();
const express = require("express");
const app = express();
const port = process.env.PORT || 3000;
const connectDB = require("./config/db");
const cors = require("cors");
const path = require("path");

const authRoutes = require("./routes/authRoutes");
const blogRoutes = require("./routes/blogPostRoutes");
// const commentRotes = require("./routes/commentRoutes");
// const blogRoutes = require("./routes/blogRoutes");
// const aiRoutes = require("./routes/aiRoutes");
// const dashboardRoutes = require("./routes/dashboardRoutes");

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

connectDB();

app.use(express.json());
app.use("/api/auth", authRoutes);
app.use("/api/blogs", blogRoutes);
// app.use("/api/comments", commentRotes);
// app.use("/api/ai", aiRoutes);
// app.use("/api/dashboard", dashboardRoutes);

app.use("/uploads", express.static(path.join(__dirname, "uploads"), {}));

app.listen(port, () => {
  console.log(`Server is running on PORT: ${port}`);
});
