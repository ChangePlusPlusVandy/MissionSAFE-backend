const express = require("express");
const { getAllYouth, getYouthByID, updateYouth } = require("../controllers/youth.controller");

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

// GET Youth document matching param fireID
youthRouter.get('/:fireID', async(req, res) => {
    try {
        let youth = await getYouthByID(req.params.fireID);
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

    } catch (err) {
        res.status(500).send(err);
    }
})

module.exports = {
    youthRouter
};