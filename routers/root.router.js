const express = require("express");
const {userRouter} = require("./user.router");
const {eventRouter} = require("./event.router");
const { formRouter } = require("./form.router");

const router = express.Router();

router.use("/users", userRouter);
router.use("/events", eventRouter);
router.use("/forms", formRouter);

module.exports = {router};