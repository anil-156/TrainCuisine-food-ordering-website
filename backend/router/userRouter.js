const express = require("express");
const { userSignup, userLogin } = require("../controller/User");

const userRouter = express.Router();

userRouter.route("/usersignup").post(userSignup);

userRouter.route("/userlogin").post(userLogin);

module.exports = userRouter;
