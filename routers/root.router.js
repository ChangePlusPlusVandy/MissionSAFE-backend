const express = require("express");
const {userRouter} = require("./user.router");
const {staffRouter} = require("./staff.router");

const router = express.Router();
router.use("/users", userRouter);
router.use("/staff", staffRouter);

module.exports = {router};