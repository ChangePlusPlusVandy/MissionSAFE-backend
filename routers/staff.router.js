const express = require("express");
const {defaultFunc} = require("../controllers/staff.controller");

const staffRouter = express.Router();
staffRouter.use(express.json());

staffRouter.get("/", defaultFunc)

module.exports = {staffRouter};