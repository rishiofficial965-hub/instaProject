const postModel = require("../models/post.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  console.log(req.body, req.file);

  const token = req.cookies.token;

  if (!token) {
    return res.status(401).json({
      message: "Token not provided,Unauthorized user",
    });
  }
  let decoded = null;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (err) {
    return res.status(401).json({
      message: "Unauthorized user",
    });
  }

  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "instaClone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: decoded.id,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const token = req.cookies.token;
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (res) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }
  const userId = decoded.id;

  const post = await postModel.find({
    user: userId,
  });
  res.status(201).json({
    message: "post fetched successfully",
    post,
  });
}

async function getPostDetailController(req, res) {
  const token = req.cookies.token;
  if (!token)
    return res.status(401).json({
      message: "unauthorized access",
    });
  let decoded;
  try {
    decoded = jwt.verify(token, process.env.JWT_SECRET);
  } catch (res) {
    return res.status(401).json({
      message: "Token invalid",
    });
  }

  const userId = decoded.id;

  const postId = req.params.postId;
  const post = await postModel.findById(postId);

  if (!post)
    return res.status(404).json({
      message: "post not found",
    });

  const isValiduser = post.user == userId;

  if (!isValiduser)
    return res.status(403).json({
      message: "Forbidden content",
    });
  
  res.status(200).json({
      message: "Post fetched successfully",
      post
    });
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
};
