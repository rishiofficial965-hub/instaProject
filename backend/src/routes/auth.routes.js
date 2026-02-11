const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controllers")

authRouter.post("/register", authController.registerHandler );

authRouter.post("/login", authController.loginHandler);
module.exports = authRouter;

