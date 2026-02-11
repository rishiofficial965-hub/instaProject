const mongoose = require("mongoose")

async function connectToDb(){
    await mongoose.connect(process.env.MONGO_URL).then(()=>console.log("connected to database......"))
}


module.exports = connectToDb