const followModel = require("../models/follow.model");
const userModel = require("../models/user.model");
const ImageKit = require("@imagekit/nodejs");
const { toFile } = require("@imagekit/nodejs");

const imagekit = new ImageKit({
  privateKey: process.env.IMAGEKIT_PRIVATE_KEY,
});

async function followUserController(req, res) {
  const followerId = req.user.id;
  const followeeUsername = req.params.username;

  const followee = await userModel.findOne({ username: followeeUsername });

  if (!followee) {
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });
  }

  if (followerId.toString() === followee._id.toString()) {
    return res.status(400).json({
      message: "you cannot follow yourself",
    });
  }

  const isFollowing = await followModel.findOne({
    follower: followerId,
    followee: followee._id,
  });

  if (isFollowing) {
    if (isFollowing.status === "accepted") {
      return res.status(200).json({
        message: `You are already following ${followeeUsername}`,
        follow: isFollowing,
      });
    } else if (isFollowing.status === "pending") {
      return res.status(200).json({
        message: `Follow request to ${followeeUsername} is already pending`,
        follow: isFollowing,
      });
    }
  }

  const followRecord = await followModel.create({
    follower: followerId,
    followee: followee._id,
    status: "pending",
  });

  res.status(201).json({
    message: `Follow request sent to ${followeeUsername}`,
    follow: followRecord,
  });
}

async function updateFollowStatusController(req, res) {
  const followeeId = req.user.id;
  const { followerUsername, status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Use 'accepted' or 'rejected'.",
    });
  }

  const follower = await userModel.findOne({ username: followerUsername });
  if (!follower) {
    return res.status(404).json({ message: "Follower not found" });
  }

  const followRequest = await followModel.findOne({
    follower: follower._id,
    followee: followeeId,
  });

  if (!followRequest) {
    return res.status(404).json({
      message: "Follow request not found",
    });
  }

  if (status === "accepted") {
    followRequest.status = "accepted";
    await followRequest.save();
    return res.status(200).json({
      message: `Follow request from ${followerUsername} accepted`,
      follow: followRequest,
    });
  } else {
    await followModel.findByIdAndDelete(followRequest._id);
    return res.status(200).json({
      message: `Follow request from ${followerUsername} rejected`,
    });
  }
}

async function unfollowUserController(req, res) {
  const followerId = req.user.id;
  const followeeUsername = req.params.username;

  const followee = await userModel.findOne({ username: followeeUsername });
  if (!followee) {
    return res.status(404).json({ message: "User not found" });
  }

  const isFollowing = await followModel.findOne({
    follower: followerId,
    followee: followee._id,
  });

  if (!isFollowing)
    return res.status(200).json({
      message: `You are not following ${followeeUsername}`,
    });

  await followModel.findByIdAndDelete(isFollowing._id);

  res.status(200).json({
    message: `You unfollowed -> ${followeeUsername}`,
  });
}

async function updateProfileController(req, res) {
  const { fullName, bio, profileImage } = req.body || {};
  const userId = req.user.id;

  console.log("Update profile request:", { userId, body: req.body, hasFile: !!req.file });

  try {
    const user = await userModel.findById(userId);
    if (!user) {
      console.log("User not found for update:", userId);
      return res.status(404).json({ message: "User not found" });
    }

    if (fullName !== undefined) user.fullName = fullName;
    if (bio !== undefined) user.bio = bio;
    
    if (req.file) {
      console.log("Uploading profile image for user:", userId);
      const uploadFile = await imagekit.files.upload({
        file: await toFile(Buffer.from(req.file.buffer), "file"),
        fileName: `${user.username}-profile`,
        folder: "profile_pictures",
      });
      user.profileImage = uploadFile.url;
    } else if (profileImage !== undefined) {
      user.profileImage = profileImage;
    }

    await user.save();
    console.log("Profile updated successfully for user:", userId);

    res.status(200).json({
      message: "Profile updated successfully",
      user: {
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        bio: user.bio,
        profileImage: user.profileImage,
      },
    });
  } catch (error) {
    res.status(500).json({ message: "Error updating profile", error: error.message });
  }
}

module.exports = {
  followUserController,
  unfollowUserController,
  updateFollowStatusController,
  updateProfileController,
};
