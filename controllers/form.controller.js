const Youth = require("../models/Youth").model;
const Event = require("../models/Event").model;
const Form = require("../models/Form").model;

const addFormToYouth = async (fireID, options) => {
    let youth = await Youth.findOne({fireID: fireID});
    if(!youth) throw new Error("Youth not found");

    const newNote = new Form({
        date: new Date(),
        content: options.content,
        programs: options.programs,
        associated_youth_id: options.associated_youth_id,
    })
    await newNote.save();

    youth.attached_forms.push(newNote._id);
    await youth.save();
}

const addFormToEvent = async (eventCode, options) => {
    let event = await Event.findOne({eventCode: eventCode});
    if(!event) throw new Error("Event not found");

    const newNote = new Form({
        date: new Date(),
        content: options.content,
        programs: options.programs,
        associated_event_id: options.associated_event_id,
    })
    await newNote.save();

    event.attached_forms.push(newNote._id);
    await event.save();
}

module.exports = {
    addFormToYouth,
    addFormToEvent,
}