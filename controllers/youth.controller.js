const Youth = require("../models/Youth").model;
const Event = require("../models/Event").model;
const Form = require("../models/Form").model;

const getAllYouth = async () => {
    const allYouth = await Youth.find({});
    if(!allYouth) throw new Error("No youth found");
    return allYouth;
}

const getYouthByID = async (fireID) => {
    const youth = await Youth.findOne({fireID: fireID});
    if(!youth) throw new Error("Youth not found");
    return youth;
}

const updateYouth = async (fireID, update) => {
    const youth = await Youth.findOneAndUpdate({fireID: fireID}, update);
    if(!youth) throw new Error("Youth not found");
}

const attendEvent = async (fireID, eventCode) => {
    let event = await Event.findOne({code: eventCode});
    if(!event) throw new Error("Event not found");

    let youth = await Youth.findOne({fireID: fireID});
    if(!youth) throw new Error("Youth not found");

    event.attended_youth.push(fireID);
    youth.attended_events.push(eventCode);

    await event.save();
    await youth.save();
}

module.exports = { 
    getAllYouth,
    getYouthByID,
    updateYouth,
    attendEvent,
}