const express = require("express");
const {userRouter} = require("./user.router");
const {eventRouter} = require("./event.router");

const router = express.Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);

module.exports = {router};