const express = require("express");
const authRouter = express.Router();
const authController = require("../auth/controller");
const authenticate = require("../../middlewares/authenticate");
//routes
authRouter.get("/me", authenticate, authController.me);

authRouter.post("/login", authController.login);

module.exports = authRouter;
