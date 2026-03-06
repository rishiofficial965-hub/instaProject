const express = require("express")
const userRouter = express.Router();
const userController = require("../controllers/user.controller");
const identifyUser = require("../middleware/auth.middleware");
const multer = require("multer");
const upload = multer({ storage: multer.memoryStorage() });


userRouter.post("/follow/:username",identifyUser,userController.followUserController)

userRouter.patch("/follow/status",identifyUser,userController.updateFollowStatusController)

userRouter.post("/unfollow/:username",identifyUser,userController.unfollowUserController)

userRouter.patch("/profile", identifyUser, upload.single("image"), userController.updateProfileController);

module.exports = userRouter
