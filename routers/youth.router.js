const express = require("express");
const {defaultFunc} = require("../controllers/youth.controller");

const youthRouter = express.Router();
youthRouter.use(express.json());

youthRouter.get("/", defaultFunc);

module.exports = {youthRouter};