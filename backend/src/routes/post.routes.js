const express = require("express");
const postController = require("../controllers/post.controllers");
const postRoutes = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });
const identifyUser = require("../middleware/auth.middleware");

postRoutes.post(
  "/",
  upload.single("image"),
  identifyUser,
  postController.createPostController,
);

postRoutes.get("/", identifyUser, postController.getPostController);

postRoutes.get(
  "/details/:postId",
  identifyUser,
  postController.getPostDetailController,
);

postRoutes.post("/like/:postId",identifyUser,postController.likePostController)

postRoutes.get("/feed",identifyUser,postController.getFeedController)

module.exports = postRoutes;
