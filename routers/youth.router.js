const express = require("express");
const {
	getAllYouth,
	createYouth,
	getYouthByActive,
	getYouthByID,
	getYouthByEmail,
	getYouthByProgram,
	getFormsForYouth,
	getEventsForYouth,
	updateYouth,
} = require("../controllers/youth.controller");
const { addFormToYouth } = require("../controllers/form.controller");

const youthRouter = express.Router();
youthRouter.use(express.json());

// GET all Youth documents
youthRouter.get("/", async (_req, res) => {
	try {
		let allYouth = await getAllYouth();
		res.status(200).send(allYouth);
	} catch (err) {
		res.status(404).send(err);
	}
});

// POST adding new Youth document
youthRouter.post("/", async (req, res) => {
	try {
		let newYouth = await createYouth(req.body);
		res.status(201).send(newYouth);
	} catch (err) {
		res.status(500).send(err);
	}
});

// GET active Youth
youthRouter.get("/active", async (_req, res) => {
	try {
		let activeYouth = await getYouthByActive(true);
		res.status(200).send(activeYouth);
	} catch (err) {
		res.status(404).send(err);
	}
});

// GET inactive Youth
youthRouter.get("/inactive", async (_req, res) => {
	try {
		let inactiveYouth = await getYouthByActive(false);
		res.status(200).send(inactiveYouth);
	} catch (err) {
		res.status(404).send(err);
	}
});

// GET Youth document matching param fireID
youthRouter.get("/byID/:fireID", async (req, res) => {
	try {
		let youths = await getYouthByID(req.params.fireID);
		res.status(200).send(youths);
	} catch (err) {
		res.status(404).send(err);
	}
});

// GET Youth document matching param email
youthRouter.get("/byEmail/:email", async (req, res) => {
	try {
		let youths = await getYouthByEmail(req.params.email);
		res.status(200).send(youths);
	} catch (err) {
		res.status(404).send(err);
	}
});

// GET Youth documents enrolled in param program
youthRouter.get("/byProgram/:program", async (req, res) => {
	try {
		let youths = await getYouthByProgram(req.params.program);
		res.status(200).send(youths);
	} catch (err) {
		res.status(404).send(err);
	}
});

// PUT active to true for Youth document matching
//     param fireID
youthRouter.put("/activate/:fireID", async (req, res) => {
	try {
		await updateYouth(req.params.fireID, { active: true });
		res.status(200).send("Youth activated");
	} catch (err) {
		res.status(500).send(err);
	}
});

// PUT active to false for Youth document matching
//     param fireID
youthRouter.put("/deactivate/:fireID", async (req, res) => {
	try {
		await updateYouth(req.params.fireID, { active: false });
		res.status(200).send("Youth deactivated");
	} catch (err) {
		res.status(500).send(err);
	}
});

// PUT new Form in notes for Youth matching param
//     fireID
youthRouter.put("/form/:fireID", async (req, res) => {
	try {
		await addFormToYouth(req.params.fireID, req.body);
		res.status(200).send("Form added");
	} catch (err) {
		res.status(500).send(err);
	}
});

// GET all Forms for youth matching param fireID
youthRouter.get("/forms/:fireID", async (req, res) => {
	try {
		let forms = await getFormsForYouth(req.params.fireID);
		res.status(200).send(forms);
	} catch (err) {
		res.status(500).send(err);
	}
});

// GET all Events for youth matching param fireID
youthRouter.get("/events/:fireID", async (req, res) => {
	try {
		let events = await getEventsForYouth(req.params.fireID);
		res.status(200).send(events);
	} catch (err) {
		res.status(500).send(err);
	}
});

module.exports = {
	youthRouter,
};
