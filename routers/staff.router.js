const express = require("express");
const { staffExample } = require("../controllers/staff.controller");

const staffRouter = express.Router();
staffRouter.use(express.json());

staffRouter.get("/", staffExample)

module.exports = {
    staffRouter
};