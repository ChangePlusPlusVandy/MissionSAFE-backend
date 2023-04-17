const express = require("express");
const { 
    getFormByID 
} = require("../controllers/form.controller");

const formRouter = express.Router();
formRouter.use(express.json());

// GET a Form by its mongodb id
formRouter.get('/:id', async(req, res) => {

    try {
        let form = await getFormByID(req.params.id);
        res.status(200).send(form);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
})

module.exports = {
    formRouter
};