const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    unique: [true, "User name already exists"],
    required: [true, "User is required"],
  },
  email: {
    type: String,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  password: {
    type: String,
    required: [true, "Password is required"],
    select:false,
  },
  bio: String,
  profileImage: {
    type: String,
    default:
      "https://www.w3schools.com/howto/img_avatar.png",
  },
});

const userModel = mongoose.model("user",userSchema)

module.exports = userModel
