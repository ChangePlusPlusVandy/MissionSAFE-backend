const express = require("express");
const { 
    getAllStaff,
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
staffRouter.get('/:fireID', async(req, res) => {
    try {
        let staff = await getStaffByID(req.params.fireID);
        res.status(200).send(staff);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET Youth document matching param email
staffRouter.get('/:email', async(req, res) => {
    try {
        let staff = await getStaffByEmail(req.params.email);
        res.status(200).send(staff);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET Youth documents enrolled in param program
staffRouter.get('/:program', async(req, res) => {
    try {
        let staff = await getStaffByProgram(req.params.program);
        res.status(200).send(staff);
    } catch (err) {
        res.status(404).send(err);
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

//POST adding new youths
staffRouter.post("/newYouth", async (req, res) => {
    const newStaff = new Staff({...req.body})
    try { 
        await newStaff.save()
        res.status(200).send("Youth successfully added")
    } catch (error){
        res.status(500).send(error)
    }
})

module.exports = {
    staffRouter
};