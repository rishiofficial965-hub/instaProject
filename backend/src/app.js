const express = require("express");
const cookieParser = require("cookie-parser");

const path = require("path");
const cors = require("cors");
const app = express();
const authRouter = require("./routes/auth.routes");
const postRoutes = require("./routes/post.routes");
const userRouter = require("./routes/user.routes");
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    credentials: true,
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
  }),
);

app.use("/api/auth", authRouter);
app.use("/api/post", postRoutes);
app.use("/api/users", userRouter);

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, "../public")));

// Catch-all route to serve index.html for SPA
app.get("/(.*)", (req, res) => {
  res.sendFile(path.join(__dirname, "../public", "index.html"));
});

module.exports = app;
