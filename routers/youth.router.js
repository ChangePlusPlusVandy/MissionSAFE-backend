const express = require("express");
const { youthExample } = require("../controllers/youth.controller");

const youthRouter = express.Router();
youthRouter.use(express.json());

youthRouter.get("/", youthExample);

module.exports = {
    youthRouter
};