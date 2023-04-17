const express = require("express");
const {
  createEvent,
  addStaffToEvent,
} = require("../controllers/staff.controller");
const {
  attendEvent,
  getYouthByID,
} = require("../controllers/youth.controller");
const { addFormToEvent } = require("../controllers/form.controller");
const { getEventByCode } = require("../controllers/event.controller");
const Form = require("../models/Form");

const eventRouter = express.Router();

// POST Event document for staff with param fireID
eventRouter.post("/", async (req, res) => {
  try {
    let event = await createEvent(req.body);
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT param fireID as staff for event at param eventCode
eventRouter.put("addStaff/:eventCode", async (req, res) => {
  try {
    let event = await addStaffToEvent(req.body.fireID, req.params.eventCode);
    res.status(200).send(event);
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT mark youth with param fireID as present at
//     event with param eventID
eventRouter.put("/attend/:eventCode", async (req, res) => {
  try {
    await attendEvent(req.body.email, req.params.eventCode);
    res.status(200).send("Youth marked as present");
  } catch (err) {
    res.status(500).send(err);
  }
});

// PUT new form in notes for event matching param
//     eventCode
eventRouter.put("/form/:eventCode", async (req, res) => {
  try {
    await addFormToEvent(req.params.eventCode, req.body);
    res.status(200).send("Form added");
  } catch (err) {
    res.status(500).send(err);
  }
});

//GET event by event code
eventRouter.get("/:eventCode", async (req, res) => {
  try {
    const event = await getEventByCode(req.params.eventCode);
    const youthIDs = event.attended_youth;
    const formIDs = event.attached_forms;

    const youthArray = await Promise.all(
      youthIDs.map(async (youthID) => {
        const youth = await getYouthByID(youthID);
        return {
          _id: youth._id,
          firstName: youth.firstName,
          lastName: youth.lastName,
          email: youth.email,
        };
      })
    );

    const formArray = await Promise.all(
      formIDs.map(async (formID) => {
        const form = await Form.findByID(formID);
        return {
          _id: form._id,
          name: form.name,
          description: form.description,
        };
      })
    );

    results = [youthArray, formArray];

    res.status(200).send(results);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = {
  eventRouter,
};
