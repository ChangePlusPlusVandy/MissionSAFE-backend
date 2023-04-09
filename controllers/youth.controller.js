const Youth = require("../models/Youth").model;
const Event = require("../models/Event").model;
const Form = require("../models/Form").model;

const getAllYouth = async () => {
    const allYouth = await Youth.find({});
    if(!allYouth) throw new Error("No youth found");
    return allYouth;
}

const createYouth = async (options) => {
    const newYouth = new Youth(options)
    await newYouth.save();
    return newYouth;
}

const getYouthByActive = async (active) => {
    const youth = await Youth.find({active});
    if(!youth) throw new Error("Youth not found");
    return youth;
}

const getYouthByID = async (fireID) => {
    const youth = await Youth.findOne({fireID});
    if(!youth) throw new Error("Youth not found");
    return youth;
}

const getYouthByEmail = async (email) => {
    const youth = await Youth.findOne({email});
    if(!youth) throw new Error("Youth not found");
    return youth;
}

const getYouthByProgram = async (program) => {
    const youth = await Youth.find({programs: program});
    if(!youth) throw new Error("Youth not found");
    return youth;
}

const getFormsForYouth = async (fireID) => {
    const youth = await Youth.findOne({fireID});
    if(!youth) throw new Error("Youth not found");

    let forms = youth.attached_forms.map(async formID => { // Batch request for forms
        return Form.findById(formID);
    })

    return await Promise.all(forms); // Wait for all requests
}

const getEventsForYouth = async (fireID) => {
    const youth = await Youth.findOne({fireID});
    if(!youth) throw new Error("Youth not found");

    let events = youth.attended_events.map(async eventCode => { // Batch request for events
        return Event.findOne({code: eventCode});
    })

    return await Promise.all(events); // Wait for all requests
}

const updateYouth = async (fireID, update) => {
    const youth = await Youth.findOneAndUpdate({fireID}, update);
    if(!youth) throw new Error("Youth not found");
}

const attendEvent = async (email, eventCode) => {
    let event = await Event.findOne({code: eventCode});
    if(!event) throw new Error("Event not found");

    let youth = await Youth.findOne({email});
    if(!youth) throw new Error("Youth not found");

    event.attended_youth.push(youth.fireID);
    youth.attended_events.push(eventCode);

    await event.save();
    await youth.save();
}

module.exports = { 
    getAllYouth,
    createYouth,
    getYouthByActive,
    getYouthByID,
    getYouthByEmail,
    getYouthByProgram,
    getFormsForYouth,
    getEventsForYouth,
    updateYouth,
    attendEvent,
}