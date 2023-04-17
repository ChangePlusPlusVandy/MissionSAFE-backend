const Event = require("../models/Event").model;

const getEventByCode = async (eventCode) => {
    const event = await Event.findOne({code: eventCode});
    if(!event) throw new Error("No event found with given event code");
    return event
}

module.exports = {
    getEventByCode
}