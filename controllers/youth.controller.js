const Youth = require("../models/Youth").model;
const Event = require("../models/Event").model;

const getAllYouth = async () => {
    try {
        const allYouth = await Youth.find({});
        if(!allYouth) throw new Error("No youth found");
        return allYouth;
    } catch (err) {
        throw err;
    }
}

const getYouthByID = async (fireID) => {
    try {
        const youth = await Youth.findOne({fireID: fireID});
        if(!youth) throw new Error("Youth not found");
        return youth;
    } catch (err) {
        throw err;
    }
}

const updateYouth = async (fireID, update) => {
    try {
        const youth = await Youth.findOneAndUpdate({fireID: fireID}, update);
        if(!youth) throw new Error("Youth not found");
    } catch (err) {
        throw err;
    }
}

const attendEvent = async (fireID, eventID) => {
    // find event by eventID
    // add youth to attendees by fireID
    // add event to events by eventID
}

module.exports = { 
    getAllYouth,
    getYouthByID,
    updateYouth,
    attendEvent,
}