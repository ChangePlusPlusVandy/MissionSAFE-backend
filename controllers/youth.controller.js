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

const attendEvent = async (fireID, eventCode) => {
    try {
        let event = await Event.findOne({code: eventCode});
        if(!event) throw new Error("Event not found");

        let youth = await Youth.findOne({fireID: fireID});
        if(!youth) throw new Error("Youth not found");

        event.attended_youth.push(fireID);
        youth.attended_events.push(eventCode);

        await event.save();
        await youth.save();
    } catch (err) {
        res.status(500).send(err);
    }
}

module.exports = { 
    getAllYouth,
    getYouthByID,
    updateYouth,
    attendEvent,
}