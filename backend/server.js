// imp for injecting from .env
require("dotenv").config()
const app = require("./src/app")
const connectToDb = require("./src/config/database")



//calling func which will connect our server to database
connectToDb()

// starting the server
app.listen(3000,()=>console.log("server is running...."))