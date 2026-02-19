const followModel = require("../models/follow.model");

async function followUserController(req, res) {
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  if (followerUsername == followeeUsername)
    return res.status(400).json({
      message: "you cannot follow yourself",
    });

  const isFolloweeExist = await followModel.findOne({
    username: followeeUsername,
  });

  if (!isFolloweeExist)
    return res.status(404).json({
      message: "User you are trying to follow does not exist",
    });

  const isFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
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
    follower: followerUsername,
    followee: followeeUsername,
    status: "pending",
  });

  res.status(201).json({
    message: `Follow request sent to ${followeeUsername}`,
    follow: followRecord,
  });
}

async function updateFollowStatusController(req, res) {
  const followeeUsername = req.user.username;
  const { followerUsername, status } = req.body;

  if (!["accepted", "rejected"].includes(status)) {
    return res.status(400).json({
      message: "Invalid status. Use 'accepted' or 'rejected'.",
    });
  }

  const followRequest = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
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
  const followerUsername = req.user.username;
  const followeeUsername = req.params.username;

  const isFollowing = await followModel.findOne({
    follower: followerUsername,
    followee: followeeUsername,
  });

  if (!isFollowing)
    res.status(200).json({
      message: `You are not following ${followerUsername}`,
    });

  await followModel.findByIdAndDelete(isFollowing._id);

  res.status(200).json({
    message: `You unfollowed -> ${followeeUsername}`,
  });
}

module.exports = {
  followUserController,
  unfollowUserController,
  updateFollowStatusController,
};
