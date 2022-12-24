const express = require("express");

const youthRouter = express.Router();
youthRouter.use(express.json());

module.exports = {
    youthRouter
};