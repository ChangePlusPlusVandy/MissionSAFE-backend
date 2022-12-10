const express = require("express");
const { staffRouter } = require("./staff.router");
const { youthRouter } = require("./youth.router");

const userRouter = express.Router();
userRouter.use("/staff", staffRouter);
userRouter.use("/youth", youthRouter);

module.exports = {
    userRouter
};