const mongoose = require("mongoose")

const modelSchema = new mongoose.Schema({
    caption:{
        type:String,
        default:"",
    },
    imgUrl:{
        type:String,
        required:[true,"imgUrl is required"]
    },
    user:{
        ref:"user",
        type: mongoose.Schema.Types.ObjectId,
        required:[true,"userId id required"]
    }
})

const postModel = mongoose.model("post",modelSchema)

module.exports = postModel
