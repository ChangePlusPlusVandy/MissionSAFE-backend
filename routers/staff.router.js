const express = require("express");
const { 
    getAllStaff,
    createStaff,
    getStaffByActive, 
    getStaffByID,
    getStaffByEmail,
    getStaffByProgram, 
    updateStaff 
} = require("../controllers/staff.controller");

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

// POST add new Staff document
staffRouter.post("/", async (req, res) => {
    try {
        let newStaff = await createStaff(req.body);
        res.status(201).send(newStaff);
    } catch (err) {
        res.status(500).send(err);
    }
})

// GET active Staff
staffRouter.get('/active', async(_req, res) => {
    try {
        let activeStaff = await getStaffByActive(true);
        res.status(200).send(activeStaff);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET inactive Staff
staffRouter.get('/inactive', async(_req, res) => {
    try {
        let inactiveStaff = await getStaffByActive(false);
        res.status(200).send(inactiveStaff);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET Staff document matching param fireID
staffRouter.get('/byID/:fireID', async(req, res) => {
    try {
        let staff = await getStaffByID(req.params.fireID);
        res.status(200).send(staff);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET Youth document matching param email
staffRouter.get('/byEmail/:email', async(req, res) => {
    try {
        let staff = await getStaffByEmail(req.params.email);
        res.status(200).send(staff);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET Youth documents enrolled in param program
staffRouter.get('/byProgram/:program', async(req, res) => {
    try {
        let staff = await getStaffByProgram(req.params.program);
        res.status(200).send(staff);
    } catch (err) {
        res.status(404).send(err);
    }
})

// PUT active to true for Staff document matching 
//     param fireID
staffRouter.put('/activate/:fireID', async (req, res) => {
    try {
        await updateStaff(req.params.fireID, {active: true});
        res.status(200).send("Staff activated");
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT active to false for Staff document matching 
//     param fireID
staffRouter.put('/deactivate/:fireID', async (req, res) => {
    try {
        await updateStaff(req.params.fireID, {active: false});
        res.status(200).send("Staff deactivated");
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT counselor to true for Staff document matching 
//     param fireID
staffRouter.put('/giveCounselor/:fireID', async (req, res) => {
    try {
        await updateStaff(req.params.fireID, {counselor: true});
        res.status(200).send("Staff set as counselor");
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT counselor to false for Staff document matching 
//     param fireID
staffRouter.put('/removeCounselor/:fireID', async (req, res) => {
    try {
        await updateStaff(req.params.fireID, {counselor: false});
        res.status(200).send("Staff removed as counselor");
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT admin to true for Staff document matching 
//     param fireID
staffRouter.put('/giveAdmin/:fireID', async (req, res) => {
    try {
        await updateStaff(req.params.fireID, {admin: true});
        res.status(200).send("Staff given admin");
    } catch (err) {
        res.status(500).send(err);
    }
});

// PUT admin to false for Staff document matching 
//     param fireID
staffRouter.put('/removeAdmin/:fireID', async (req, res) => {
    try {
        await updateStaff(req.params.fireID, {admin: false});
        res.status(200).send("Staff removed admin");
    } catch (err) {
        res.status(500).send(err);
    }
});

module.exports = {
    staffRouter
};