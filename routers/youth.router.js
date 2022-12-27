const express = require("express");
const { 
    getAllYouth,
    getYouthByActive,
    getYouthByID,
    getYouthByEmail,
    getYouthByProgram,
    updateYouth, 
} = require("../controllers/youth.controller");
const { addFormToYouth } = require("../controllers/form.controller");

const youthRouter = express.Router();
youthRouter.use(express.json());

// GET all Youth documents
youthRouter.get('/', async(_req, res) => {
    try {
        let allYouth = await getAllYouth();
        res.status(200).send(allYouth);
    } catch (err) {
        res.status(404).send(err);
    }
})  

// GET active Youth
youthRouter.get('/active', async(_req, res) => {
    try {
        let activeYouth = await getYouthByActive(true);
        res.status(200).send(activeYouth);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET inactive Youth
youthRouter.get('/inactive', async(_req, res) => {
    try {
        let inactiveYouth = await getYouthByActive(false);
        res.status(200).send(inactiveYouth);
    } catch (err) {
        res.status(404).send(err);
    }
})


// GET Youth document matching param fireID
youthRouter.get('/:fireID', async(req, res) => {
    try {
        let youth = await getYouthByID(req.params.fireID);
        res.status(200).send(youth);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET Youth document matching param email
youthRouter.get('/:email', async(req, res) => {
    try {
        let youth = await getYouthByEmail(req.params.email);
        res.status(200).send(youth);
    } catch (err) {
        res.status(404).send(err);
    }
})

// GET Youth documents enrolled in param program
youthRouter.get('/:program', async(req, res) => {
    try {
        let youth = await getYouthByProgram(req.params.program);
        res.status(200).send(youth);
    } catch (err) {
        res.status(404).send(err);
    }
})

// PUT active to true for Youth document matching 
//     param fireID
youthRouter.put('/:fireID/activate', async(req, res) => {
    try {
        await updateYouth(req.params.fireID, {active: true});
        res.status(200).send("Youth activated");
    } catch (err) {
        res.status(500).send(err);
    }
})

// PUT active to false for Youth document matching 
//     param fireID
youthRouter.put('/:fireID/deactivate', async(req, res) => {
    try {
        await updateYouth(req.params.fireID, {active: false});
        res.status(200).send("Youth deactivated");
    } catch (err) {
        res.status(500).send(err);
    }
})

// PUT new form in notes for youth matching param
//     fireID
youthRouter.put('/:fireID/newForm', async(req, res) => {
    try {
        await addFormToYouth(req.params.fireID, req.body);
        res.status(200).send("Form added");
    } catch (err) {
        res.status(500).send(err);
    }
})

//POST adding new youths
youthRouter.post("/newYouth", async (req, res) => {
    const newYouth = new Youth({...req.body})
    try { 
        await newYouth.save()
        res.status(200).send("Youth successfully added")
    } catch (error){
        res.status(500).send(error)
    }
})

module.exports = {
    youthRouter
};