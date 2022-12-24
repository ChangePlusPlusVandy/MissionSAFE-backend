const express = require("express");
const { staffExample, deactivateStaff, activateStaff } = require("../controllers/staff.controller");

const staffRouter = express.Router();
staffRouter.use(express.json());

staffRouter.get("/", staffExample)

staffRouter.put('/:fireID/deactivate', async (req, res) => {
    try {
        await deactivateStaff(req.params.fireID);
        res.status(200).send("User deactivated");
    } catch (err) {
        res.status(500).send(err);
    }
});

staffRouter.put('/:fireID/activate', async (req, res) => {
    try {
        await activateStaff(req.params.fireID);
        res.status(200).send("User activated");
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = {
    staffRouter
};