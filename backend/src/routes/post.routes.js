const express = require("express");
const postController = require("../controllers/post.controllers");
const postRoutes = express.Router();
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });

postRoutes.post(
  "/",
  upload.single("image"),
  postController.createPostController,
);

postRoutes.get("/", postController.getPostController);

postRoutes.get("/details/:postId", postController.getPostDetailController);

module.exports = postRoutes;
