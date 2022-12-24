const express = require("express");
const { updateActiveStaff } = require("../controllers/staff.controller");

const staffRouter = express.Router();
staffRouter.use(express.json());

staffRouter.put('/:fireID/deactivate', async (req, res) => {
    try {
        await updateActiveStaff(req.params.fireID, false);
        res.status(200).send("User deactivated");
    } catch (err) {
        res.status(500).send(err);
    }
});

staffRouter.put('/:fireID/activate', async (req, res) => {
    try {
        await updateActiveStaff(req.params.fireID, true);
        res.status(200).send("User activated");
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = {
    staffRouter
};