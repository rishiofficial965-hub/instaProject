const userModel = require("../models/user.model");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

async function registerHandler(req, res) {
  const { email, username, password, bio, profileImage } = req.body;

  const isUserAlreadyExists = await userModel.findOne({
    $or: [{ email }, { username }],
  });

  if (isUserAlreadyExists)
    return res.send(409).json({
      message:
        isUserAlreadyExists.email == email
          ? "Email already exists"
          : "Username already exists",
    });

  const hash = crypto.createHash("sha256").update(password).digest("hex");

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
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "user created successfully",
    username: user.username,
    bio: user.bio,
    profileImage: user.profileImage,
  });
}

async function loginHandler(req, res) {
  const { username, email, password } = req.body;
  const user = await userModel.findOne({
    $or: [{ email: email }, { username: username }],
  });
  if (!user)
    return res.status(404).json({
      message: "user not found",
    });

  const hash = crypto.createHash("sha265").update(password).digest("hex");
  const isPasswordValid = hash == user.password;

  if (!isPasswordValid) {
    return res.send(401).json({
      message: "password invalid..",
    });
  }

  const token = jwt.sign(
    {
      id: user._id,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
  );

  res.cookie("token", token);

  res.status(201).json({
    message: "login successfully",
    username: user.username,
    bio: user.bio,
    profileImage: user.profileImage,
  });
}

module.exports = {loginHandler, registerHandler}
