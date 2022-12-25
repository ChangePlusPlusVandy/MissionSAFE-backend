const express = require("express");
const { getAllStaff, getStaffByID, updateStaff, createEvent, addStaffToEvent } = require("../controllers/staff.controller");

const staffRouter = express.Router();
staffRouter.use(express.json());

// GET all Staff documents
staffRouter.get('/', async(_req, res) => {
    try {
        let allStaff = await getAllStaff();
        res.status(200).send(allStaff);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET Staff document matching param fireID
staffRouter.get('/:fireID', async(req, res) => {
    try {
        let staff = await getStaffByID(req.params.fireID);
        res.status(200).send(staff);
    } catch (err) {
        res.status(404).send(err);
    }
})

// POST Event document for staff with param fireID
staffRouter.post('/:fireID/event', async (req, res) => {
    try {
        let event = await createEvent(req.params.fireID, req.body);
        res.status(200).send(event);
    } catch (err) {
        res.status(500).send(err);
    }
})

// PUT param fireID as staff for event at param eventCode
staffRouter.put('/:fireID/event/:eventCode', async (req, res) => {
    try {
        let event = await addStaffToEvent(req.params.fireID, req.params.eventCode);
        res.status(200).send(event);
    } catch (err) {
        res.status(500).send(err);
    }
})

// PUT active to true for Staff document matching 
//     param fireID
staffRouter.put('/:fireID/activate', async (req, res) => {
    try {
        await updateStaff(req.params.fireID, {active: true});
        res.status(200).send("Staff activated");
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT active to false for Staff document matching 
//     param fireID
staffRouter.put('/:fireID/deactivate', async (req, res) => {
    try {
        await updateStaff(req.params.fireID, {active: false});
        res.status(200).send("Staff deactivated");
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = {
    staffRouter
};