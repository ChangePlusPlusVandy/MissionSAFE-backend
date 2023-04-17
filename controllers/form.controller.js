const Youth = require("../models/Youth").model;
const Event = require("../models/Event").model;
const Form = require("../models/Form").model;

const addFormToYouth = async (fireID, options) => {
    let youth = await Youth.findOne({fireID});
    if(!youth) throw new Error("Youth not found");

    const newNote = new Form({
        date: new Date(),
        content: options.content,
        programs: options.programs,
        associated_youth_id: fireID,
    })
    await newNote.save();

    youth.attached_forms.push(newNote._id);
    await youth.save();
}

const addFormToEvent = async (eventCode, options) => {
    let event = await Event.findOne({code: eventCode});
    if(!event) throw new Error("Event not found");

    const newNote = new Form({
        name: options.name,
        description: options.description,
        date: new Date(),
        content: options.content,
        programs: options.programs,
        associated_event_id: eventCode,
    })
    await newNote.save();

    event.attached_forms.push(newNote._id);
    await event.save();
}

const getFormByID = async (id) => {
    const form = await Form.findById(id);

    if(!form) throw new Error("Form not found");
    return {
        _id: form._id,
        name: form.name,
        description: form.description,
        date: form.date,
        content: form.content,
        programs: form.programs,
        associated_youth: await Youth.findById(form.associated_youth_id),
        associated_event: await Event.findById(form.associated_event_id)
    }
}

module.exports = {
    addFormToYouth,
    addFormToEvent,
    getFormByID
}
