const express = require("express");
const {staffRouter} = require("./routers/staff.router");
const {youthRouter} = require("./routers/youth.router");

const userRouter = express.Router();
userRouter.use("/staff", staffRouter);
userRouter.use("/youth", youthRouter);

module.exports = {userRouter};