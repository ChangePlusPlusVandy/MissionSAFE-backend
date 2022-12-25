const express = require("express");
const { createEvent, addStaffToEvent } = require("../controllers/staff.controller");
const { attendEvent } = require("../controllers/youth.controller");

const eventRouter = express.Router();

// POST Event document for staff with param fireID
eventRouter.post('/', async (req, res) => {
    try {
        let event = await createEvent(req.body);
        res.status(200).send(event);
    } catch (err) {
        res.status(500).send(err);
    }
})

// PUT param fireID as staff for event at param eventCode
eventRouter.put('/:eventCode', async (req, res) => {
    try {
        let event = await addStaffToEvent(req.body.fireID, req.params.eventCode);
        res.status(200).send(event);
    } catch (err) {
        res.status(500).send(err);
    }
})

// PUT mark youth with param fireID as present at
//     event with param eventID
eventRouter.put('/:eventCode/attend', async(req, res) => {
    try {
        await attendEvent(req.body.fireID, req.params.eventCode);
        res.status(200).send("Youth marked as present");
    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = {
    eventRouter
}