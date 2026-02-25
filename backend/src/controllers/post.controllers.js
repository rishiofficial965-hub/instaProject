const postModel = require("../models/post.model");
const likeModel = require("../models/like.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");
const jwt = require("jsonwebtoken");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function createPostController(req, res) {
  const file = await imagekit.files.upload({
    file: await toFile(Buffer.from(req.file.buffer), "file"),
    fileName: "Test",
    folder: "instaClone",
  });

  const post = await postModel.create({
    caption: req.body.caption,
    imgUrl: file.url,
    user: req.user.id,
  });

  res.status(201).json({
    message: "post created successfully",
    post,
  });
}

async function getPostController(req, res) {
  const userId = req.user.id;

  const post = await postModel.find({
    user: userId,
  });
  res.status(200).json({
    message: "post fetched successfully",
    post,
  });
}

async function getPostDetailController(req, res) {
  const userId = req.user.id;
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
    post,
  });
}

async function likePostController(req, res) {
  try {
    const username = req.user.username;
    const postId = req.params.postId;

    const post = await postModel.findById(postId);

    if (!post) {
      return res.status(404).json({
        message: "Post not found",
      });
    }

    const existingLike = await likeModel.findOne({
      post: postId,
      user: username,
    });

    if (existingLike) {
      // Toggle off (unlike)
      await likeModel.deleteOne({ _id: existingLike._id });
      return res.status(200).json({
        message: "unliked successfully",
        isLiked: false,
      });
    } else {
      // Toggle on (like)
      const like = await likeModel.create({
        post: postId,
        user: username,
      });
      return res.status(200).json({
        message: "liked successfully",
        isLiked: true,
        like,
      });
    }
  } catch (err) {
    console.error("Like error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

async function getFeedController(req, res) {
  try {
    const posts = await postModel.find().populate("user").lean();
    
    const enrichedPosts = await Promise.all(
      posts.map(async (post) => {
        const likeCount = await likeModel.countDocuments({ post: post._id });
        const isLiked = await likeModel.findOne({
          user: req.user.username,
          post: post._id,
        });

        return {
          ...post,
          likeCount,
          isLiked: !!isLiked,
        };
      })
    );

    res.status(200).json({
      message: "post fetched successfully",
      posts: enrichedPosts,
    });
  } catch (err) {
    console.error("Feed error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
}

module.exports = {
  createPostController,
  getPostController,
  getPostDetailController,
  likePostController,
  getFeedController,
};
