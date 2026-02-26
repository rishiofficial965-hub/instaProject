const userModel = require("../models/user.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function registerHandler(req, res) {
  try {
    const { email, username, password, bio, profileImage } = req.body;

    const isUserAlreadyExists = await userModel.findOne({
      $or: [{ email }, { username }],
    });

    if (isUserAlreadyExists)
      return res.status(409).json({
        message:
          isUserAlreadyExists.email == email
            ? "Email already exists"
            : "Username already exists",
      });

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      bio,
      profileImage,
      password: hash,
    });

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "user created successfully",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("Registration Error:", err);
    res.status(500).json({
      message: "Internal Server Error during registration",
      error: err.message,
    });
  }
}

async function loginHandler(req, res) {
  try {
    const { username, email, password } = req.body;
    const user = await userModel
      .findOne({
        $or: [{ email: email }, { username: username }],
      })
      .select("+password");

    if (!user)
      return res.status(404).json({
        message: "user not found",
      });

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({
        message: "password invalid..",
      });
    }

    const token = jwt.sign(
      {
        id: user._id,
        username: user.username,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
    );

    res.cookie("token", token);

    res.status(201).json({
      message: "login successfully",
      user: {
        username: user.username,
        email: user.email,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({
      message: "Internal Server Error during login",
      error: err.message,
    });
  }
}
const postModel = require("../models/post.model");
const followModel = require("../models/follow.model");

async function getMeController(req, res) {
  const userId = req.user.id;
  const username = req.user.username;

  const user = await userModel.findById(userId);
  
  const postCount = await postModel.countDocuments({ user: userId });
  const followersCount = await followModel.countDocuments({ followee: username, status: "accepted" });
  const followingCount = await followModel.countDocuments({ follower: username, status: "accepted" });

  res.status(200).json({
    user: {
      username: user.username,
      email: user.email,
      bio: user.bio,
      profileImage: user.profileImage,
      stats: {
        postCount,
        followersCount,
        followingCount,
      },
    },
  });
}
module.exports = { loginHandler, registerHandler, getMeController };
