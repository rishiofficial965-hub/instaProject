const express = require("express");
const authRouter = express.Router();
const authController = require("../controllers/auth.controllers");
const identifyUser = require("../middleware/auth.middleware");

authRouter.post("/register", authController.registerHandler);

authRouter.post("/login", authController.loginHandler);

authRouter.get("/get-me", identifyUser, authController.getMeController);

module.exports = authRouter;
