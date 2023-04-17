const express = require("express");
const { getFormByID, getFormsByEventCode, getAllForms } = require("../controllers/form.controller");

const formRouter = express.Router();
formRouter.use(express.json());

// GET a Form by its mongodb id
formRouter.get("/:id", async (req, res) => {
	try {
		let form = await getFormByID(req.params.id);
		res.status(200).send(form);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

// GET all Forms by event code
formRouter.get("/byEvent/:eventCode", async (req, res) => {
	try {
		let forms = await getFormsByEventCode(req.params.eventCode);
		res.status(200).send(forms);
	} catch (err) {
		console.log(err);
		res.status(500).send(err);
	}
});

// GET all Forms
formRouter.get("/", async (_req, res) => {
	try {
		let forms = await getAllForms();
		res.status(200).send(forms);
	} catch (err) {
		console.log(err);
	}
});

module.exports = {
	formRouter,
};
