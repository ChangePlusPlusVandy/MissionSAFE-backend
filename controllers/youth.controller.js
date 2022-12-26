const Youth = require("../models/Youth").model;
const Event = require("../models/Event").model;

const getAllYouth = async () => {
    const allYouth = await Youth.find({});
    if(!allYouth) throw new Error("No youth found");
    return allYouth;
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

const updateYouth = async (fireID, update) => {
    const youth = await Youth.findOneAndUpdate({fireID}, update);
    if(!youth) throw new Error("Youth not found");
}

const attendEvent = async (fireID, eventCode) => {
    let event = await Event.findOne({code: eventCode});
    if(!event) throw new Error("Event not found");

    let youth = await Youth.findOne({fireID});
    if(!youth) throw new Error("Youth not found");

    event.attended_youth.push(fireID);
    youth.attended_events.push(eventCode);

    await event.save();
    await youth.save();
}

module.exports = { 
    getAllYouth,
    getYouthByActive,
    getYouthByID,
    getYouthByEmail,
    getYouthByProgram,
    updateYouth,
    attendEvent,
}